import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { QUADRAS, HORARIOS, SITE } from "@/lib/site";
import { toast } from "sonner";
import { CalendarCheck2, Loader2, CheckCircle2, MessageCircle } from "lucide-react";
import { z } from "zod";

const schema = z.object({
  quadra: z.string().min(1),
  data: z.string().min(1),
  horario: z.string().min(1),
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  telefone: z
    .string()
    .trim()
    .min(8, "Telefone inválido")
    .max(20, "Telefone inválido"),
});

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function Reserva() {
  const [quadra, setQuadra] = useState<string>(QUADRAS[0].id);
  const [data, setData] = useState<string>(todayISO());
  const [horario, setHorario] = useState<string>("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [ocupados, setOcupados] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<null | {
    quadra: string;
    data: string;
    horario: string;
    nome: string;
  }>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoadingSlots(true);
      const { data: rows, error } = await supabase
        .from("reservas")
        .select("horario")
        .eq("quadra", quadra)
        .eq("data", data);
      if (!cancelled) {
        if (error) {
          console.error(error);
          setOcupados([]);
        } else {
          setOcupados((rows ?? []).map((r) => r.horario));
        }
        setLoadingSlots(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [quadra, data]);

  const quadraNome = useMemo(
    () => QUADRAS.find((q) => q.id === quadra)?.nome ?? "",
    [quadra],
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ quadra, data, horario, nome, telefone });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Confira os campos.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("reservas").insert({
      quadra,
      data,
      horario,
      nome: nome.trim(),
      telefone: telefone.trim(),
    });
    setSubmitting(false);
    if (error) {
      if (error.code === "23505") {
        toast.error("Esse horário acabou de ser reservado. Escolha outro.");
        setOcupados((v) => [...v, horario]);
        setHorario("");
      } else {
        toast.error("Não foi possível confirmar. Tente novamente.");
        console.error(error);
      }
      return;
    }
    setSuccess({ quadra: quadraNome, data, horario, nome });
    setOcupados((v) => [...v, horario]);
    setHorario("");
    setNome("");
    setTelefone("");
    toast.success("Reserva confirmada!");
  }

  const dataBR = data
    ? new Date(data + "T00:00:00").toLocaleDateString("pt-BR")
    : "";

  return (
    <section id="reserva" className="relative bg-hero-gradient py-24 text-white sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-widest text-highlight">
            Reserva online
          </span>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            Escolha, agende e é jogo.
          </h2>
          <p className="mt-4 text-lg text-white/75">
            Selecione a quadra, a data e o horário. Confirmação imediata e o
            horário fica automaticamente indisponível para outros.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-glow backdrop-blur-xl sm:p-10">
          {success ? (
            <div className="flex flex-col items-center gap-6 py-8 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-highlight text-highlight-foreground">
                <CheckCircle2 className="size-8" />
              </div>
              <div>
                <h3 className="font-display text-3xl font-bold">Reserva confirmada!</h3>
                <p className="mt-2 text-white/75">
                  Nos vemos em breve, <strong>{success.nome}</strong>.
                </p>
              </div>
              <div className="grid w-full max-w-md gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
                <Row label="Quadra" value={success.quadra} />
                <Row
                  label="Data"
                  value={new Date(success.data + "T00:00:00").toLocaleDateString("pt-BR")}
                />
                <Row label="Horário" value={success.horario} />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={`${SITE.whatsappLink}?text=${encodeURIComponent(
                    `Olá! Acabei de reservar a ${success.quadra} para ${new Date(success.data + "T00:00:00").toLocaleDateString("pt-BR")} às ${success.horario}. Meu nome é ${success.nome}.`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-highlight px-6 py-3 font-semibold text-highlight-foreground"
                >
                  <MessageCircle className="size-5" />
                  Enviar detalhes no WhatsApp
                </a>
                <button
                  onClick={() => setSuccess(null)}
                  className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10"
                >
                  Fazer outra reserva
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Quadra">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {QUADRAS.map((q) => (
                      <button
                        type="button"
                        key={q.id}
                        onClick={() => setQuadra(q.id)}
                        className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-all ${
                          quadra === q.id
                            ? "border-highlight bg-highlight text-highlight-foreground"
                            : "border-white/15 bg-white/5 text-white hover:border-white/40"
                        }`}
                      >
                        {q.nome}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Data">
                  <input
                    type="date"
                    required
                    min={todayISO()}
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-highlight"
                  />
                </Field>
              </div>

              <Field
                label={`Horários disponíveis ${dataBR ? `— ${dataBR}` : ""}`}
              >
                {loadingSlots ? (
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <Loader2 className="size-4 animate-spin" /> Verificando disponibilidade…
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                    {HORARIOS.map((h) => {
                      const taken = ocupados.includes(h);
                      const selected = horario === h;
                      return (
                        <button
                          key={h}
                          type="button"
                          disabled={taken}
                          onClick={() => setHorario(h)}
                          className={`rounded-lg border px-2 py-2.5 text-sm font-semibold transition-all ${
                            taken
                              ? "cursor-not-allowed border-white/5 bg-white/[0.03] text-white/25 line-through"
                              : selected
                                ? "border-highlight bg-highlight text-highlight-foreground"
                                : "border-white/15 bg-white/5 text-white hover:border-highlight/60"
                          }`}
                        >
                          {h}
                        </button>
                      );
                    })}
                  </div>
                )}
              </Field>

              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Seu nome">
                  <input
                    required
                    minLength={2}
                    maxLength={100}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome completo"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-highlight"
                  />
                </Field>
                <Field label="Telefone / WhatsApp">
                  <input
                    required
                    minLength={8}
                    maxLength={20}
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(31) 99999-9999"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-highlight"
                  />
                </Field>
              </div>

              <button
                type="submit"
                disabled={submitting || !horario}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-highlight px-8 py-4 text-base font-bold text-highlight-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <CalendarCheck2 className="size-5" />
                )}
                {submitting ? "Confirmando…" : "Confirmar reserva"}
              </button>
              <p className="text-center text-xs text-white/50">
                Ao confirmar, o horário fica imediatamente indisponível para outras pessoas.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/70">
        {label}
      </span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-white/10 pb-2 last:border-0 last:pb-0">
      <span className="text-white/60">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

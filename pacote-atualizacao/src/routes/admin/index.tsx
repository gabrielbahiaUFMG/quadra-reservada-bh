import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Ban, Loader2, LogOut, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminSession } from "@/hooks/use-admin-session";
import { QUADRAS, HORARIOS } from "@/lib/site";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboardPage,
});

type Reserva = Tables<"reservas">;

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function AdminDashboardPage() {
  const { session, loading } = useAdminSession();
  const navigate = useNavigate();

  const [data, setData] = useState(todayISO());
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loadingReservas, setLoadingReservas] = useState(false);
  const [bloqueando, setBloqueando] = useState<{ quadra: string; horario: string } | null>(null);
  const [motivo, setMotivo] = useState("Manutenção");

  useEffect(() => {
    if (!loading && !session) {
      navigate({ to: "/admin/login" });
    }
  }, [loading, session, navigate]);

  async function carregarReservas() {
    setLoadingReservas(true);
    const { data: rows, error } = await supabase
      .from("reservas")
      .select("*")
      .eq("data", data)
      .order("quadra", { ascending: true })
      .order("horario", { ascending: true });
    if (error) {
      console.error(error);
      toast.error("Não foi possível carregar as reservas.");
    } else {
      setReservas(rows ?? []);
    }
    setLoadingReservas(false);
  }

  useEffect(() => {
    if (session) carregarReservas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, data]);

  const porQuadra = useMemo(() => {
    return QUADRAS.map((q) => ({
      quadra: q,
      linhas: reservas.filter((r) => r.quadra === q.id),
    }));
  }, [reservas]);

  async function cancelar(id: string) {
    if (!confirm("Cancelar esta reserva?")) return;
    const { error } = await supabase.from("reservas").delete().eq("id", id);
    if (error) {
      toast.error("Não foi possível cancelar.");
      return;
    }
    toast.success("Reserva cancelada.");
    carregarReservas();
  }

  async function confirmarBloqueio() {
    if (!bloqueando) return;
    const { error } = await supabase.from("reservas").insert({
      quadra: bloqueando.quadra,
      data,
      horario: bloqueando.horario,
      nome: motivo.trim() || "Bloqueio manual",
      telefone: "00000000",
      bloqueado: true,
    });
    if (error) {
      if (error.code === "23505") {
        toast.error("Esse horário já está ocupado ou bloqueado.");
      } else {
        toast.error("Não foi possível bloquear o horário.");
      }
      return;
    }
    toast.success("Horário bloqueado.");
    setBloqueando(null);
    setMotivo("Manutenção");
    carregarReservas();
  }

  async function sair() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  }

  if (loading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary pb-20">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">Painel do dono</h1>
            <p className="text-sm text-muted-foreground">Bola & Cia — reservas</p>
          </div>
          <button
            onClick={sair}
            className="inline-flex items-center gap-2 rounded-lg border border-input px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
          >
            <LogOut className="size-4" /> Sair
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <label className="block max-w-xs">
          <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">
            Ver reservas do dia
          </span>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground outline-none focus:border-primary"
          />
        </label>

        {loadingReservas ? (
          <div className="mt-10 flex items-center gap-2 text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Carregando…
          </div>
        ) : (
          <div className="mt-8 grid gap-8">
            {porQuadra.map(({ quadra, linhas }) => (
              <section
                key={quadra.id}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="border-b border-border bg-muted/40 px-5 py-3">
                  <h2 className="font-display font-bold text-foreground">{quadra.nome}</h2>
                </div>

                <div className="grid gap-2 p-5">
                  {HORARIOS.map((h) => {
                    const linha = linhas.find((l) => l.horario === h);
                    return (
                      <div
                        key={h}
                        className="flex items-center justify-between gap-3 rounded-lg border border-border/60 px-4 py-2.5"
                      >
                        <span className="w-14 shrink-0 font-mono text-sm font-semibold text-foreground">
                          {h}
                        </span>

                        {!linha && (
                          <>
                            <span className="flex-1 text-sm text-muted-foreground">Livre</span>
                            <button
                              onClick={() => setBloqueando({ quadra: quadra.id, horario: h })}
                              className="inline-flex items-center gap-1.5 rounded-md border border-input px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent"
                            >
                              <Ban className="size-3.5" /> Bloquear
                            </button>
                          </>
                        )}

                        {linha && linha.bloqueado && (
                          <>
                            <span className="flex-1 truncate text-sm text-muted-foreground">
                              Bloqueado — {linha.nome}
                            </span>
                            <button
                              onClick={() => cancelar(linha.id)}
                              className="inline-flex items-center gap-1.5 rounded-md border border-input px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent"
                            >
                              <Trash2 className="size-3.5" /> Desbloquear
                            </button>
                          </>
                        )}

                        {linha && !linha.bloqueado && (
                          <>
                            <span className="flex-1 truncate text-sm text-foreground">
                              <strong>{linha.nome}</strong>
                              <span className="text-muted-foreground"> — {linha.telefone}</span>
                            </span>
                            <button
                              onClick={() => cancelar(linha.id)}
                              className="inline-flex items-center gap-1.5 rounded-md border border-destructive/30 px-2.5 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="size-3.5" /> Cancelar
                            </button>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {bloqueando && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-lg font-bold text-foreground">Bloquear horário</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {QUADRAS.find((q) => q.id === bloqueando.quadra)?.nome} às {bloqueando.horario}
            </p>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">
                Motivo (opcional)
              </span>
              <input
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground outline-none focus:border-primary"
                placeholder="Manutenção, reserva por telefone…"
              />
            </label>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setBloqueando(null)}
                className="flex-1 rounded-lg border border-input px-4 py-2.5 font-medium text-foreground hover:bg-accent"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarBloqueio}
                className="flex-1 rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground hover:opacity-90"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

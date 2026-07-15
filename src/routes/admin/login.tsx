import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, LockKeyhole } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminSession } from "@/hooks/use-admin-session";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const { session, loading } = useAdminSession();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  if (!loading && session) {
    navigate({ to: "/admin" });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErro(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: senha,
    });
    setSubmitting(false);
    if (error) {
      setErro("E-mail ou senha incorretos.");
      return;
    }
    navigate({ to: "/admin" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <LockKeyhole className="size-6" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
            Painel do dono
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Entre para gerenciar as reservas.
          </p>
        </div>

        <form onSubmit={submit} className="mt-8 grid gap-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">
              E-mail
            </span>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground outline-none focus:border-primary"
              placeholder="dono@boliacia.com.br"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">
              Senha
            </span>
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground outline-none focus:border-primary"
              placeholder="••••••••"
            />
          </label>

          {erro && <p className="text-sm text-destructive">{erro}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {submitting && <Loader2 className="size-4 animate-spin" />}
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

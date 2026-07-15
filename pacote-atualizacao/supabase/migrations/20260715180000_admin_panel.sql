-- Painel do dono: bloqueio manual de horários + acesso restrito aos dados pessoais

-- 1) Coluna para diferenciar "bloqueio manual" (ex: manutenção) de reserva real
ALTER TABLE public.reservas
  ADD COLUMN bloqueado BOOLEAN NOT NULL DEFAULT false;

-- 2) A partir de agora, só o dono (usuário autenticado) pode ver nome/telefone
--    dos clientes. O site público passa a usar a view abaixo, que não expõe
--    dados pessoais.
DROP POLICY IF EXISTS "Anyone can view booked slots" ON public.reservas;

CREATE POLICY "Owner can view full reservation details"
  ON public.reservas FOR SELECT
  TO authenticated
  USING (true);

-- 3) View pública somente com o necessário para montar a grade de horários
--    (sem nome/telefone). SECURITY DEFINER (padrão) para poder expor esses
--    3 campos mesmo com a tabela agora restrita a authenticated.
CREATE VIEW public.horarios_ocupados AS
  SELECT quadra, data, horario
  FROM public.reservas;

GRANT SELECT ON public.horarios_ocupados TO anon, authenticated;

-- 4) Dono (autenticado) pode cancelar reservas e criar/remover bloqueios manuais
CREATE POLICY "Owner can update reservas"
  ON public.reservas FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Owner can delete reservas"
  ON public.reservas FOR DELETE
  TO authenticated
  USING (true);

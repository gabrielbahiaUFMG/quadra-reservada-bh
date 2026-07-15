
CREATE TABLE public.reservas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quadra TEXT NOT NULL,
  data DATE NOT NULL,
  horario TEXT NOT NULL,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT reservas_unique_slot UNIQUE (quadra, data, horario)
);

GRANT SELECT, INSERT ON public.reservas TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reservas TO authenticated;
GRANT ALL ON public.reservas TO service_role;

ALTER TABLE public.reservas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view booked slots"
  ON public.reservas FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create a reservation"
  ON public.reservas FOR INSERT
  WITH CHECK (
    length(nome) BETWEEN 2 AND 100
    AND length(telefone) BETWEEN 8 AND 20
    AND data >= CURRENT_DATE
  );

CREATE INDEX reservas_quadra_data_idx ON public.reservas (quadra, data);

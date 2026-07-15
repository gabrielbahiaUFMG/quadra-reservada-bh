export const SITE = {
  name: "Bola & Cia",
  phone: "(31) 98399-2520",
  phoneDigits: "31983992520",
  whatsapp: "5531983992520", // country + area + number (fallback)
  whatsappLink: "https://wa.me/5531983992520",
  address: {
    street: "Praça Irajá, 20",
    district: "Concórdia",
    city: "Belo Horizonte - MG",
  },
  hours: "Seg a Dom · 09h às 23h",
};

export const QUADRAS = [
  { id: "principal", nome: "Campo Society Principal" },
  { id: "menor", nome: "Campo Society Menor" },
] as const;

export const HORARIOS = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

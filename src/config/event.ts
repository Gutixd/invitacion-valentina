// Edita aquí los datos de la invitación. Los valores de ejemplo están señalados.
export const event = {
  name: "Valentina",
  age: 22,
  timezone: "America/Santiago",
  // Fecha real confirmada; Santiago utiliza UTC-03:00 el 10 de octubre de 2026.
  dateTime: "2026-10-10T12:00:00-03:00" as string,
  venue: "Parcela 21",
  address: "Camino Las Flores, Parcela 21",
  city: "Padre Hurtado",
  country: "Chile",
  // Se abre una búsqueda de la dirección, no un pin de coordenadas sin verificar.
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Camino%20Las%20Flores%2C%20Parcela%2021%2C%20Padre%20Hurtado%2C%20Chile",
  rsvpDeadline: "" as string,
  rsvpUrl: `https://wa.me/56995630607?text=${encodeURIComponent("Hola Valentina 💗 Confirmo mi asistencia a tu cumpleaños el 10 de octubre de 2026 a las 12:00.")}`,
  mapsEmbedUrl: "https://maps.google.com/maps?q=Camino%20Las%20Flores%20Parcela%2021%2C%20Padre%20Hurtado%2C%20Chile&output=embed",
  albumUrl: "" as string,
  hashtag: "#Valentina22", // Sugerencia editable.
  giftMessage: "Si buscas ideas para un regalo, estas son algunas cosas que me gustan:",
  giftIdeas: ["Maquillaje", "Perfume", "Accesorios", "Bolsos / carteras", "Cremas"],
  giftDetails: "" as string,
  musicSrc: "" as string, // Por ejemplo: "/audio/cancion.mp3".
  photos: [
    { src: "/images/birthday-still-life.webp", alt: "Pastel rosa, lazos y globos de corazón; imagen decorativa provisional", position: "35% 65%" },
    { src: "/images/coquette-lemonade.webp", alt: "Limonadas rosas con lazos sobre una mesa de encaje", position: "50% 50%" },
    { src: "/images/coquette-pool.webp", alt: "Traje de baño rosa, toalla y accesorios junto a la piscina", position: "50% 50%" },
    { src: "/images/coquette-beauty.webp", alt: "Maquillaje, perfume, crema, cartera rosa y accesorios", position: "50% 50%" },
    ...[
      "Ballerinas de satén rosa con lazos sobre encaje",
      "Pastel rosa de corazón con frambuesas",
      "Peonías rosas en un jarrón de cristal",
      "Collar de perlas y lazo rosa en una bandeja",
      "Cesta de picnic con fresas y tela de cuadros rosa",
      "Mesa de cumpleaños con flores y servilletas con lazos",
      "Flotador rosa junto al agua de la piscina",
      "Tarta de fresas y crema en un plato rosa",
      "Accesorios de pelo y gafas sobre una toalla",
      "Frasco de perfume con pétalos de rosa",
      "Limonadas con fresas en vasos sobre una mesa",
      "Caja de regalo rosa con lazo de satén y flores",
    ].map((alt, index) => ({ src: `/images/coquette-unique-${index + 1}.webp`, alt, position: "50% 50%" })),
  ],
  photosAreProvisional: true,
  detailsAreProvisional: false,
  footer: "Valentina · 22 · 10.10.2026",
};

export function getEventDateParts(dateTime = event.dateTime) {
  if (!dateTime || !Number.isFinite(Date.parse(dateTime))) return null;
  const date = new Date(dateTime);
  const options = { timeZone: event.timezone };
  return {
    day: new Intl.DateTimeFormat("es-CL", { ...options, day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("es-CL", { ...options, month: "long" }).format(date),
    monthNumber: new Intl.DateTimeFormat("es-CL", { ...options, month: "2-digit" }).format(date),
    weekday: new Intl.DateTimeFormat("es-CL", { ...options, weekday: "long" }).format(date),
    time: new Intl.DateTimeFormat("es-CL", { ...options, hour: "2-digit", minute: "2-digit", hour12: false }).format(date),
    year: new Intl.DateTimeFormat("es-CL", { ...options, year: "numeric" }).format(date),
  };
}

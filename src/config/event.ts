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

// Enlace "Agregar a Google Calendar". Duración estimada: edita durationHours si hace falta.
const durationHours = 5;
export function getGoogleCalendarUrl() {
  const start = new Date(event.dateTime);
  const end = new Date(start.getTime() + durationHours * 3600_000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Cumpleaños de ${event.name} (${event.age})`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: "Ven con ropa cómoda y trae tu traje de baño.",
    location: `${event.address}, ${event.city}, ${event.country}`,
    ctz: event.timezone,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

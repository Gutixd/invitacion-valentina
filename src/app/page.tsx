import Image from "next/image";
import QRCode from "qrcode";
import { event, getEventDateParts, getGoogleCalendarUrl } from "@/config/event";
import { Bow, PartyGlass, Sparkles } from "@/components/artwork";
import { Countdown } from "@/components/interactions";
import { InvitationEffects } from "@/components/invitation-effects";

function SectionTitle({ title, handwritten, id }: { title: string; handwritten: string; id: string }) {
  return <div className="section-title"><h2 id={id}>{title}</h2><span className="script title-annotation" aria-hidden="true">{handwritten}</span></div>;
}

export default async function Home() {
  const date = getEventDateParts();
  const deadline = getEventDateParts(event.rsvpDeadline);
  const qr = event.rsvpUrl ? await QRCode.toDataURL(event.rsvpUrl, { errorCorrectionLevel: "M", margin: 4, width: 600, color: { dark: "#9e4c60", light: "#fffaf2" } }) : null;
  return <>
    <a className="skip-link" href="#invitation">Ir a la invitación</a>
    <div className="ambient-background" aria-hidden="true" />
    <main id="invitation" className="invitation">
      <h1 className="sr-only">Estás invitado a celebrar los {event.age} de {event.name}</h1>
      <header className="cover watercolor">
        <Sparkles />
        <div className="floral-canopy" aria-hidden="true"/>
        <div className="cover-graphic"><div className="cover-script script" aria-hidden="true">it’s<br/><span>party</span><br/>time!</div><PartyGlass/><Bow/></div>
        <div className="cover-name"><p className="script">{event.name}</p><span className="eyebrow">MIS {event.age} · {date ? `${date.day} ${date.month.toUpperCase()} ${date.year}` : "MUY PRONTO"}</span></div>
      </header>

      <section className="opening-photos watercolor" aria-label="Cuenta regresiva">
        <p className="eyebrow countdown-intro">CUENTA REGRESIVA · 10 DE OCTUBRE</p>
        <Countdown dateTime={event.dateTime}/>
        <div className="tiny-divider" aria-hidden="true"><span/>♡<span/></div>
      </section>

      <section className="date-section watercolor" data-reveal aria-labelledby="date-title">
        <Sparkles/>
        <h2 id="date-title" className="sr-only">Cuándo y dónde</h2>
        <p className="script date-month">{date?.month || "Muy pronto"}</p>
        <span className="date-day">{date?.day || "—"}</span>
        <p className="eyebrow date-weekday">{date ? `${date.weekday} · ${date.time} HRS` : "FECHA POR CONFIRMAR"}</p>
        <p className="script venue-name">{event.venue}</p>
        <address>{event.address}<br/>{event.city}, {event.country}</address>
        <a className="text-link" href={event.mapsUrl} target="_blank" rel="noopener noreferrer">Cómo llegar <span aria-hidden="true">↗</span></a>
        <a className="text-link" href={getGoogleCalendarUrl()} target="_blank" rel="noopener noreferrer">Guardar en Google Calendar <span aria-hidden="true">↗</span></a>
        <p className="body-copy small-copy">Ven con ropa cómoda<br/><strong>y trae tu traje de baño.</strong></p>
      </section>

      <section className="rsvp-section watercolor" data-reveal aria-labelledby="rsvp-title">
        <Sparkles/><SectionTitle id="rsvp-title" title="rsvp" handwritten="por WhatsApp"/>
        <p className="body-copy">Confirma tu asistencia por WhatsApp.<br/>El mensaje ya está preparado.</p>
        {qr ? <div className="qr-frame"><Image src={qr} width={280} height={280} alt="Código QR para confirmar asistencia" unoptimized/><span className="eyebrow">ESCANEA Y CONFIRMA</span></div> : null}
        {event.rsvpUrl ? <a className="pill-button" href={event.rsvpUrl} target="_blank" rel="noopener noreferrer">Confirmar por WhatsApp <span aria-hidden="true">↗</span></a> : <button type="button" className="pill-button" disabled>Confirmación próximamente</button>}
        {deadline ? <p className="body-copy small-copy">Confirma antes del {deadline.day} de {deadline.month}.<br/>¡Me encantará verte!</p> : <p className="script personal-note">+56 9 9563 0607</p>}
      </section>

      <section className="gifts-section watercolor" data-reveal aria-labelledby="gift-title">
        <SectionTitle id="gift-title" title="Wishlist" handwritten="ideas de regalo"/>
        <p className="body-copy">{event.giftMessage}</p>
        <ul className="gift-list">{event.giftIdeas.map(idea => <li key={idea}>{idea}</li>)}</ul>
        {event.giftDetails ? <p className="body-copy small-copy">{event.giftDetails}</p> : null}
        <p className="script signature">{event.name}</p>
      </section>

      <footer><span>{event.footer}</span></footer>
    </main>
    <InvitationEffects/>
  </>;
}

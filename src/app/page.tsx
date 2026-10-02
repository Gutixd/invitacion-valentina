import Image from "next/image";
import QRCode from "qrcode";
import { event, getEventDateParts } from "@/config/event";
import { Bow, PartyGlass, Sparkles } from "@/components/artwork";
import { Countdown, CopyHashtag, MusicPlayer } from "@/components/interactions";
import { InvitationEffects } from "@/components/invitation-effects";
import { Collage, Photo } from "@/components/photo";

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

      <section className="opening-photos watercolor" aria-label="Recuerdos de cumpleaños">
        <div className="photo-stack"><Photo index={0} priority/><Photo index={1} priority/><span className="vertical-note">VALENTINA · 22 · 10.10.26</span></div>
        <p className="eyebrow countdown-intro">CUENTA REGRESIVA · 10 DE OCTUBRE</p>
        <Countdown dateTime={event.dateTime}/><MusicPlayer src={event.musicSrc}/>
        <div className="tiny-divider" aria-hidden="true"><span/>♡<span/></div>
      </section>

      <section className="hello-section watercolor" data-reveal aria-labelledby="hello-title">
        <Sparkles/>
        <div className="hello-title"><span className="script" aria-hidden="true">hello</span><h2 id="hello-title">friends.</h2></div>
        <p className="body-copy">El sábado 10 de octubre cumplo 22<br/>y quiero celebrarlo contigo.</p>
        <p className="script personal-note">Nos juntamos a las 12:00.</p>
        <div className="age-block"><span className="age-number">{event.age}</span><span className="script age-annotation">años</span></div>
        <p className="body-copy">Una tarde de cumpleaños en Parcela 21,<br/>Camino Las Flores, Padre Hurtado.</p>
        <p className="body-copy small-copy">Ven con ropa cómoda<br/>y trae tu traje de baño.</p>
        <p className="script signature">{event.name}</p>
      </section>

      <section className="main-collage-section watercolor" data-reveal aria-label="Collage de recuerdos"><Collage/></section>

      <section className="date-section watercolor" data-reveal aria-labelledby="date-title">
        <Sparkles/><div className="editorial-photo date-photo"><Photo index={9}/><Bow className="photo-ribbon"/></div>
        <h2 id="date-title" className="sr-only">Cuándo y dónde</h2>
        <p className="script date-month">{date?.month || "Muy pronto"}</p>
        <span className="date-day">{date?.day || "—"}</span>
        <p className="eyebrow date-weekday">{date ? `${date.weekday} · ${date.time} HRS` : "FECHA POR CONFIRMAR"}</p>
        <p className="script venue-name">{event.venue}</p>
        <address>{event.address}<br/>{event.city}, {event.country}</address>
        <div className="map-frame"><iframe title="Mapa: Camino Las Flores, Parcela 21, Padre Hurtado" src={event.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/><span className="script">aquí nos juntamos</span></div>
        <a className="text-link" href={event.mapsUrl} target="_blank" rel="noopener noreferrer">Cómo llegar <span aria-hidden="true">↗</span></a>
      </section>

      <section className="pool-section watercolor" data-reveal aria-labelledby="pool-title">
        <SectionTitle id="pool-title" title="Pool day." handwritten="qué llevar"/>
        <div className="editorial-photo pool-photo"><Photo index={2}/><span className="tape" aria-hidden="true"/></div>
        <div className="packing-note"><Bow/><p className="body-copy">Ropa cómoda<br/><strong>Y no olvides tu traje de baño.</strong></p></div>
      </section>

      <section className="rsvp-section watercolor" data-reveal aria-labelledby="rsvp-title">
        <Sparkles/><SectionTitle id="rsvp-title" title="rsvp" handwritten="por WhatsApp"/>
        <p className="body-copy">Confirma tu asistencia por WhatsApp.<br/>El mensaje ya está preparado.</p>
        {qr ? <div className="qr-frame"><Image src={qr} width={280} height={280} alt="Código QR para confirmar asistencia" unoptimized/><span className="eyebrow">ESCANEA Y CONFIRMA</span></div> : <div className="rsvp-pending"><span className="pending-corner" aria-hidden="true"/><Bow/><p className="script">Un lugar para ti.</p><p className="fine-print">Muy pronto podrás confirmar<br/>tu asistencia por aquí.</p></div>}
        {event.rsvpUrl ? <a className="pill-button" href={event.rsvpUrl} target="_blank" rel="noopener noreferrer">Confirmar por WhatsApp <span aria-hidden="true">↗</span></a> : <button type="button" className="pill-button" disabled>Confirmación próximamente</button>}
        {deadline ? <p className="body-copy small-copy">Confirma antes del {deadline.day} de {deadline.month}.<br/>¡Me encantará verte!</p> : <p className="script personal-note">+56 9 9563 0607</p>}
      </section>

      <section className="memories-section watercolor" data-reveal aria-label="Más recuerdos de cumpleaños"><Collage variant="memories"/></section>

      <section className="gifts-section watercolor" data-reveal aria-labelledby="gift-title">
        <SectionTitle id="gift-title" title="Wishlist" handwritten="ideas de regalo"/>
        <p className="body-copy">{event.giftMessage}</p>
        <div className="editorial-photo beauty-photo"><Photo index={3}/></div><ul className="gift-list">{event.giftIdeas.map(idea => <li key={idea}>{idea}</li>)}</ul>
        {event.giftDetails ? <p className="body-copy small-copy">{event.giftDetails}</p> : null}
        <Bow className="gift-bow"/>
        <div className="tiny-divider" aria-hidden="true"><span/>♡<span/></div>
        <p className="script album-note">Fotos del cumpleaños</p>
        {event.albumUrl ? <a className="pill-button" href={event.albumUrl} target="_blank" rel="noopener noreferrer">Ver fotos <span aria-hidden="true">↗</span></a> : <button type="button" className="pill-button" disabled>Álbum próximamente</button>}
        {!event.albumUrl ? <p className="fine-print album-pending">Después de la celebración, compartiremos las fotos.</p> : null}
      </section>

      <section className="hashtag-section watercolor" data-reveal aria-labelledby="hashtag-title">
        <SectionTitle id="hashtag-title" title="Birthday" handwritten="hashtag"/>
        <p className="body-copy">Si subes fotos, puedes usar este hashtag.</p>
        <CopyHashtag hashtag={event.hashtag}/>
        
      </section>

      <section className="goodbye-section watercolor" data-reveal aria-labelledby="goodbye-title">
        <Sparkles/><div className="editorial-photo goodbye-photo"><Photo index={14}/><Bow className="photo-ribbon"/></div>
        <h2 id="goodbye-title" className="script goodbye-title">See<br/><span>you!</span></h2>
        <p className="body-copy">10 de octubre · 12:00</p>
        <div className="final-polaroid"><span className="paint-stroke" aria-hidden="true"/><span className="tape final-tape" aria-hidden="true"/><Photo index={15} caption={`${event.name} · 22`}/></div>
        <p className="eyebrow final-date">{date ? `${date.day} · ${date.monthNumber} · ${date.year}` : "PRÓXIMAMENTE"} <span>♡</span> {event.city}</p>
      </section>

      <footer><span>{event.footer}</span></footer>
    </main>
    <InvitationEffects/>
  </>;
}

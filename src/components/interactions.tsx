"use client";

import { useEffect, useRef, useState } from "react";

export function Countdown({ dateTime }: { dateTime: string }) {
  const [remaining, setRemaining] = useState<number | null>(null);
  const target = Date.parse(dateTime);
  useEffect(() => {
    if (!Number.isFinite(target)) return;
    const update = () => setRemaining(Math.max(0, Math.floor((target - Date.now()) / 1000)));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [target]);
  if (!Number.isFinite(target)) return <p className="fine-print">Muy pronto anunciaremos la fecha.</p>;
  if (remaining === 0) return <p className="celebration script" role="status">¡Llegó el día de celebrar!</p>;
  const values = remaining === null ? [null, null, null, null] : [Math.floor(remaining / 86400), Math.floor(remaining / 3600) % 24, Math.floor(remaining / 60) % 60, remaining % 60];
  return <div className="countdown" role="timer" aria-label="Tiempo que falta para el cumpleaños">
    {values.map((value, index) => <div className="countdown-unit" key={index}><span className="countdown-number">{value === null ? "—" : String(value).padStart(2, "0")}</span><span className="countdown-label">{["días", "horas", "minutos", "segundos"][index]}</span></div>)}
  </div>;
}

export function MusicPlayer({ src }: { src: string }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);
  if (!src) return null;
  async function toggle() {
    if (!audio.current) return;
    if (playing) audio.current.pause();
    else { try { await audio.current.play(); } catch { setFailed(true); } }
  }
  return <div className="music-player">
    <audio ref={audio} src={src} preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => setFailed(true)} onTimeUpdate={() => { const player = audio.current; if (player && Number.isFinite(player.duration) && player.duration > 0) setProgress(player.currentTime / player.duration * 100); }} />
    <span className="music-line" aria-hidden="true" />
    <button className="play-button" type="button" onClick={toggle} disabled={failed} aria-label={playing ? "Pausar música" : "Reproducir música"}>{playing ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5H10V19H7ZM14 5H17V19H14Z"/></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5L19 12L8 19Z"/></svg>}</button>
    <span className="music-line" aria-hidden="true" />
    <progress value={progress} max={100} aria-label="Progreso de la música" />
    {failed ? <p className="fine-print" role="status">La música no está disponible.</p> : null}
  </div>;
}

export function CopyHashtag({ hashtag }: { hashtag: string }) {
  const [message, setMessage] = useState("");
  async function copy() {
    try { await navigator.clipboard.writeText(hashtag); setMessage("¡Hashtag copiado!"); }
    catch { setMessage(`Puedes copiarlo manualmente: ${hashtag}`); }
  }
  return <div className="hashtag-control"><button type="button" className="hashtag-button" onClick={copy} aria-label={`Copiar hashtag ${hashtag}`}>{hashtag}<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5A2 2 0 0 0 14 3H5A2 2 0 0 0 3 5V14A2 2 0 0 0 5 16H8"/></svg></button><span className="copy-status" role="status">{message}</span></div>;
}

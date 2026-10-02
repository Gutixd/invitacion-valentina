import Image from "next/image";
import { event } from "@/config/event";

export function Photo({ index = 0, className = "", caption, priority = false }: { index?: number; className?: string; caption?: string; priority?: boolean }) {
  const photo = event.photos[index];
  if (!photo) return null;
  return <figure className={`photo ${className}`}>
    <div className="photo-image"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 480px) 90vw, 420px" loading={priority ? "eager" : "lazy"} style={{ objectFit: "cover", objectPosition: photo.position }} /></div>
    {caption ? <figcaption className="script">{caption}</figcaption> : null}
  </figure>;
}

export function Collage({ variant = "main" }: { variant?: "main" | "memories" }) {
  const start = variant === "main" ? 4 : 10;
  return <div className={`collage collage-${variant}`}>
    <Photo index={start} className="collage-photo collage-photo-one" />
    <Photo index={start + 1} className="collage-photo collage-photo-two" />
    <Photo index={start + 2} className="collage-photo collage-photo-three" caption={variant === "memories" ? "10.10.26" : undefined} />
    <Photo index={start + 3} className="collage-photo collage-photo-four" />
    {variant === "main" ? <Photo index={start + 4} className="collage-photo collage-photo-five" /> : null}
    <span className="tape tape-one" aria-hidden="true"/><span className="tape tape-two" aria-hidden="true"/>
  </div>;
}

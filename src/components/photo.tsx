import Image from "next/image";
import { event } from "@/config/event";

export function Photo({ index = 0, className = "", caption, priority = false }: { index?: number; className?: string; caption?: string; priority?: boolean }) {
  const photo = event.photos[index % event.photos.length];
  if (!photo) return null;
  return <figure className={`photo ${className}`}>
    <div className="photo-image"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 480px) 90vw, 420px" loading={priority ? "eager" : "lazy"} style={{ objectFit: "cover", objectPosition: photo.position }} /></div>
    {caption ? <figcaption className="script">{caption}</figcaption> : null}
  </figure>;
}

export function Collage({ variant = "main" }: { variant?: "main" | "memories" }) {
  return <div className={`collage collage-${variant}`}>
    <Photo index={0} className="collage-photo collage-photo-one" />
    <Photo index={1} className="collage-photo collage-photo-two" />
    <Photo index={2} className="collage-photo collage-photo-three" caption={variant === "memories" ? "10.10.26" : undefined} />
    <Photo index={3} className="collage-photo collage-photo-four" />
    {variant === "main" ? <Photo index={0} className="collage-photo collage-photo-five" /> : null}
    <span className="tape tape-one" aria-hidden="true"/><span className="tape tape-two" aria-hidden="true"/>
  </div>;
}

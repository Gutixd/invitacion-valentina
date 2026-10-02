import { useId } from "react";

type ArtProps = { className?: string };

export function Sparkles({ className = "" }: ArtProps) {
  return <span aria-hidden="true" className={`sparkles ${className}`}><i>✦</i><i>✧</i><i>✦</i><i>✧</i><i>✦</i><i>✧</i></span>;
}

export function Bow({ className = "" }: ArtProps) {
  const silk = `silk-${useId()}`;
  return <svg aria-hidden="true" className={`bow-art ${className}`} viewBox="0 0 220 140" fill="none">
    <defs><linearGradient id={silk} x1="0" y1="0" x2=".6" y2="1"><stop stopColor="#f8c9d2"/><stop offset=".3" stopColor="#ffdce2"/><stop offset=".55" stopColor="#e8a2b5"/><stop offset=".8" stopColor="#f9bdcb"/><stop offset="1" stopColor="#e99eb1"/></linearGradient></defs>
    <path d="M104 65C79 32 33 17 23 31C11 49 27 85 52 85C74 84 91 75 106 67Z" fill={`url(#${silk})`} stroke="#dc99a7" strokeWidth="1" />
    <path d="M117 65C143 31 183 16 197 31C212 49 194 86 169 84C147 83 131 73 117 65Z" fill={`url(#${silk})`} stroke="#dc99a7" strokeWidth="1" />
    <path d="M105 68C99 87 83 113 59 129L87 126L103 137C115 107 118 87 117 68" fill="#f1a5b7" stroke="#d58092" strokeWidth="1.5" />
    <path d="M115 69C130 81 141 106 155 131L163 109L185 105C158 94 141 77 121 63" fill="#f4bbca" stroke="#d58092" strokeWidth="1.5" />
    <path d="M35 44C57 53 79 63 104 66M183 42C159 54 141 61 119 65" stroke="#cb8399" strokeWidth="1.2" />
    <path d="M32 53Q69 65 96 66M128 66Q162 61 188 51" stroke="#ffe4e9" strokeWidth="2" opacity=".7"/>
    <rect x="101" y="55" width="23" height="23" rx="8" transform="rotate(-8 101 55)" fill="#f4bbc7" stroke="#d58092" strokeWidth="2" />
    <path d="M30 33C55 30 80 45 98 60M131 57C148 41 173 29 190 34" stroke="#ffe8ec" strokeWidth="3" strokeLinecap="round" />
  </svg>;
}

export function PartyGlass({ className = "" }: ArtProps) {
  return <svg aria-hidden="true" className={`glass-art ${className}`} viewBox="0 0 220 400" fill="none">
    <defs>
      <linearGradient id="glass-fill" x1="49" y1="80" x2="183" y2="232" gradientUnits="userSpaceOnUse"><stop stopColor="#ffffff" stopOpacity=".6"/><stop offset="1" stopColor="#fff9ef" stopOpacity=".12"/></linearGradient>
      <linearGradient id="lemonade" x1="50" y1="160" x2="180" y2="220" gradientUnits="userSpaceOnUse"><stop stopColor="#f5dc83"/><stop offset=".5" stopColor="#e6c35a"/><stop offset="1" stopColor="#f6da76"/></linearGradient>
    </defs>
    <path d="M154 79L188 62L194 154L165 176Z" fill="#edcb69" opacity=".75"/><path d="M161 81L182 70L186 145L168 151Z" fill="#fff1a4"/>
    <path d="M57 88L168 88L188 181C198 227 149 249 113 251C76 247 28 225 39 179Z" fill="url(#glass-fill)" stroke="#fff9f0" strokeWidth="2.5"/>
    <ellipse cx="112" cy="88" rx="55" ry="5" fill="#fffaf6" opacity=".35" stroke="#fffdfb" strokeWidth="1"/>
    <path d="M79 105L94 113L84 139L69 132ZM126 108L148 102L159 128L139 135Z" fill="#fffefa" opacity=".26"/>
    <path d="M43 164Q107 151 181 163L188 182C196 220 147 246 112 247C79 243 32 223 39 182Z" fill="url(#lemonade)" opacity=".9"/>
    <ellipse cx="112" cy="164" rx="69" ry="11" fill="#f8e7a3"/>
    <path d="M113 251L113 358M112 358C90 358 60 365 66 369C81 379 146 379 161 369C166 364 135 358 112 358Z" stroke="#fff8f0" strokeWidth="4"/>
    <path d="M63 100L49 164M49 181C44 208 69 226 88 232" stroke="white" strokeWidth="5" opacity=".55" strokeLinecap="round"/>
    <path d="M158 103L174 165M169 214Q146 236 126 238" stroke="#fffaef" strokeWidth="1.5" opacity=".6" strokeLinecap="round"/>
  </svg>;
}

export function ToastGlasses({ className = "", filled = false }: ArtProps & { filled?: boolean }) {
  const wine = `wine-${useId()}`;
  return <svg aria-hidden="true" className={`toast-art ${className}`} viewBox="0 0 300 220" fill="none">
    <defs><linearGradient id={wine} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e4a5c4"/><stop offset=".5" stopColor="#a94574"/><stop offset="1" stopColor="#6f345c"/></linearGradient></defs>
    <g stroke="#cf8390" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <g transform="rotate(-19 105 100)"><path d="M70 29H132L143 78C150 104 124 124 101 124C79 124 54 104 60 79Z" fill={filled ? "#f8d7e4" : "none"}/>{filled ? <><path d="M62 73H142C147 97 124 117 101 118C79 118 57 99 62 73Z" fill={`url(#${wine})`} opacity=".9"/><ellipse cx="102" cy="73" rx="39" ry="6" fill="#e09cbb" stroke="#a96288" strokeWidth=".7"/><path d="M99 143C82 120 77 149 97 147C114 134 129 148 104 151L116 180L105 174L99 180Z" fill="#efbdce" stroke="#d697af" strokeWidth="1"/></> : null}<path d="M101 124V177M76 184Q101 170 126 184ZM76 184H126M70 36H132"/><path d="M66 86Q66 99 81 107" stroke="#ffe9ee" strokeWidth="3"/></g>
      <g transform="rotate(20 197 100)"><path d="M165 29H228L240 78C246 104 220 124 198 124C175 124 151 104 157 79Z" fill={filled ? "#f8d7e4" : "none"}/>{filled ? <><path d="M159 72H237C244 99 220 118 198 118C175 118 153 99 159 72Z" fill={`url(#${wine})`} opacity=".9"/><ellipse cx="198" cy="72" rx="39" ry="6" fill="#e09cbb" stroke="#a96288" strokeWidth=".7"/><path d="M196 143C180 120 173 149 194 147C211 134 226 148 201 151L213 180L202 174L196 180Z" fill="#efbdce" stroke="#d697af" strokeWidth="1"/></> : null}<path d="M198 124V177M173 184Q198 170 223 184ZM173 184H223M165 36H228"/><path d="M164 87Q164 102 177 108" stroke="#ffe9ee" strokeWidth="3"/></g>
      <path d="M143 16L149 5M156 21L165 10M164 31L178 26"/>
      <path d="M64 218C65 203 60 196 50 188L39 180C30 170 38 163 46 170L64 185M64 192L86 159C92 150 99 153 94 163L83 182M83 182L112 181C127 180 129 188 118 192L98 198L88 218M246 218C244 203 250 196 261 189L275 182C285 173 278 163 269 171L247 187M247 192L227 159C221 150 214 153 219 163L230 182M230 182L202 181C187 180 185 188 196 192L216 198L226 218"/>
    </g>
  </svg>;
}

export function DressCodeArt() {
  return <svg className="dress-art" role="img" aria-label="Vestido largo rosa y traje oscuro con detalle rosa" viewBox="0 0 310 340">
    <defs><linearGradient id="dress-satin"><stop stopColor="#b86779"/><stop offset=".3" stopColor="#da8793"/><stop offset=".55" stopColor="#c47783"/><stop offset=".8" stopColor="#dc8e99"/><stop offset="1" stopColor="#b86376"/></linearGradient></defs>
    <g transform="translate(20 12)">
      <path d="M70 23L74 69L113 69L118 23" fill="none" stroke="#a45d6c" strokeWidth="4"/>
      <path d="M74 58Q93 89 113 58L121 106L154 291Q132 311 94 304Q58 311 31 289L67 106Z" fill="url(#dress-satin)"/>
      <path d="M70 101L95 109L119 100M96 111L93 302M74 115L56 291M114 116L135 294M67 107L43 281" fill="none" stroke="#a55d70" strokeWidth="2"/>
      <path d="M72 64L94 94L116 63" fill="none" stroke="#e398a7" strokeWidth="3"/>
    </g>
    <g transform="translate(166 20)">
      <path d="M37 145L97 147L112 293L87 300L63 190L58 301L29 300Z" fill="#454047"/>
      <path d="M58 170L57 282M77 173L93 284" stroke="#80737c" strokeWidth="2"/>
      <path d="M47 26L75 22L96 35L113 152L94 159L81 94L86 156L33 156L41 91L26 157L9 151L22 38Z" fill="#fffaf3" stroke="#e9d6d2" strokeWidth="2"/>
      <path d="M48 26L63 42L74 22L86 40L73 54L67 47L54 55L40 41Z" fill="#f6eae4"/>
      <path d="M62 43L72 44L72 54L81 128L66 142L59 127L64 54Z" fill="#d68697"/>
      <path d="M38 154H87" stroke="#4b444a" strokeWidth="8"/><rect x="59" y="148" width="13" height="10" fill="#c7b9ae"/>
      <path d="M31 51L22 141M94 52L104 139" stroke="#e5d4d0" strokeWidth="2"/>
    </g>
  </svg>;
}

import Link from "next/link";
import { FAQ, PRICING_PERKS } from "@/data/home";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function Pricing() {
  return (
    <Reveal className="home-section">
      <SectionHead kicker="// 04" title="PRECIOS" accent="green" />
      <div className="pricing-grid">
        <div className="price-card">
          <div className="pc-label pixel">PLAN ÚNICO</div>
          <h3 className="pc-name pixel m-0 font-normal">JUGADOR VAULT</h3>
          <div className="pc-amount">
            <span className="pc-amount-n">$0</span>
            <span className="pc-amount-u">/ SIEMPRE</span>
          </div>
          <div className="pc-tag">SIN TRUCOS · SIN LETRA PEQUEÑA</div>
          <ul className="pc-list">
            {PRICING_PERKS.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>
          <Link href="/acceso" className="home-btn xl home-btn-pulse w-full">
            EMPEZAR GRATIS →
          </Link>
          <div className="pc-foot">No pedimos tarjeta. Nunca lo haremos.</div>
          <div className="pc-stamp pixel" aria-hidden="true">
            FREE
            <br />
            PLAY
          </div>
        </div>

        <div className="pricing-faq">
          {FAQ.map((item) => (
            <div key={item.question} className="faq-item">
              <h3 className="faq-q pixel font-normal">{item.question}</h3>
              <div className="faq-a">{item.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

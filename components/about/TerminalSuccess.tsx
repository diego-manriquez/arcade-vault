"use client";

import { useEffect, useRef } from "react";

interface TerminalSuccessProps {
  /** Nombre de quien escribió; se muestra en mayúsculas. */
  name: string;
  onReset: () => void;
}

/** Pantalla de éxito estilo terminal. Recibe el foco al aparecer. */
export function TerminalSuccess({ name, onReset }: TerminalSuccessProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const thanks = name ? `GRACIAS, ${name.toUpperCase()}.` : "GRACIAS.";

  return (
    <div
      ref={ref}
      className="terminal-success"
      tabIndex={-1}
      role="status"
      aria-live="polite"
    >
      <div className="term-bar" aria-hidden="true">
        <span className="dot r" />
        <span className="dot y" />
        <span className="dot g" />
        <span className="term-title">VAULT-OS // TERMINAL</span>
      </div>
      <div className="term-body">
        <div className="line">
          <span className="prompt">vault@arcade:~$</span> ./send_message --to=team
        </div>
        <div className="line dim">[OK] Conectando con servidor…</div>
        <div className="line dim">[OK] Validando contenido…</div>
        <div className="line dim">[OK] Transmitiendo paquete…</div>
        <div className="line success">
          &gt; MENSAJE RECIBIDO. TE RESPONDEREMOS PRONTO. {thanks}
          <span className="caret" aria-hidden="true">
            _
          </span>
        </div>
        <div style={{ marginTop: 18 }}>
          <button type="button" className="home-btn ghost" onClick={onReset}>
            ENVIAR OTRO MENSAJE
          </button>
        </div>
      </div>
    </div>
  );
}

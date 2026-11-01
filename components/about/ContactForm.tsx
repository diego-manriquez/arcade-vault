"use client";

import { useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { sendContactMessage } from "@/app/acerca-de/actions";
import {
  CONTACT_LIMITS,
  validateContact,
  type ContactFieldErrors,
  type ContactInput,
  type ContactState,
} from "@/lib/contact";
import { TerminalSuccess } from "./TerminalSuccess";

const INITIAL_STATE: ContactState = { status: "idle" };
const EMPTY_VALUES: ContactInput = { name: "", email: "", message: "" };
const SHAKE_MS = 400;

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, INITIAL_STATE);
  const [clientErrors, setClientErrors] = useState<ContactFieldErrors | null>(null);
  const [shake, setShake] = useState(false);
  const shakeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (shakeTimer.current) clearTimeout(shakeTimer.current);
    };
  }, []);

  // "Enviar otro mensaje": se descarta el éxito actual; un nuevo envío genera otro estado.
  const [dismissed, setDismissed] = useState<ContactState | null>(null);

  // Tras un error de servidor, los campos se reponen con lo que escribió la persona.
  const values = state.status === "error" ? state.values : EMPTY_VALUES;
  const fieldErrors: ContactFieldErrors =
    clientErrors ?? (state.status === "error" ? (state.fieldErrors ?? {}) : {});

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const form = new FormData(event.currentTarget);
    const result = validateContact({
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    });

    if (!result.ok) {
      // Evita la llamada a la Server Action: no hay petición de red.
      event.preventDefault();
      setClientErrors(result.fieldErrors);
      setShake(true);
      if (shakeTimer.current) clearTimeout(shakeTimer.current);
      shakeTimer.current = setTimeout(() => setShake(false), SHAKE_MS);
      return;
    }
    setClientErrors(null);
  }

  if (state.status === "success" && state !== dismissed) {
    return (
      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <TerminalSuccess
          name={state.name}
          onReset={() => {
            setDismissed(state);
            setClientErrors(null);
          }}
        />
      </form>
    );
  }

  return (
    <form
      className={"contact-form" + (shake ? " shake" : "")}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      aria-busy={pending}
    >
      {state.status === "error" && clientErrors === null && (
        <p className="contact-alert" role="alert">
          {state.message}
        </p>
      )}

      <div className="contact-field">
        <label className="contact-label" htmlFor="contact-name">
          NOMBRE
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          className="contact-input"
          placeholder="px_kai"
          maxLength={CONTACT_LIMITS.name}
          autoComplete="nickname"
          defaultValue={values.name}
          aria-invalid={fieldErrors.name ? true : undefined}
          aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
        />
        {fieldErrors.name && (
          <span id="contact-name-error" className="contact-field-error">
            {fieldErrors.name}
          </span>
        )}
      </div>

      <div className="contact-field">
        <label className="contact-label" htmlFor="contact-email">
          CORREO ELECTRÓNICO
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          className="contact-input"
          placeholder="jugador@vault.gg"
          maxLength={CONTACT_LIMITS.email}
          autoComplete="email"
          defaultValue={values.email}
          aria-invalid={fieldErrors.email ? true : undefined}
          aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
        />
        {fieldErrors.email && (
          <span id="contact-email-error" className="contact-field-error">
            {fieldErrors.email}
          </span>
        )}
      </div>

      <div className="contact-field">
        <label className="contact-label" htmlFor="contact-message">
          MENSAJE
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          className="contact-input"
          placeholder="Cuéntanos qué tienes en mente…"
          maxLength={CONTACT_LIMITS.message}
          defaultValue={values.message}
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
        />
        {fieldErrors.message && (
          <span id="contact-message-error" className="contact-field-error">
            {fieldErrors.message}
          </span>
        )}
      </div>

      {/* Honeypot: las personas no lo ven ni lo enfocan; los bots lo rellenan. */}
      <div className="contact-hp" aria-hidden="true">
        <label htmlFor="contact-website">No rellenar este campo</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        className="home-btn xl press contact-submit"
        disabled={pending}
      >
        {pending ? "ENVIANDO…" : "▶  ENVIAR MENSAJE"}
      </button>

    </form>
  );
}

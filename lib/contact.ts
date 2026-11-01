/** Límites del formulario de contacto (compartidos por cliente y servidor). */
export const CONTACT_LIMITS = { name: 60, email: 254, message: 2000 } as const;

export interface ContactInput {
  name: string; // trim, 1..60
  email: string; // trim, formato válido, ≤254
  message: string; // trim, 1..2000
}

export type ContactField = keyof ContactInput;

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; name: string } // nombre para "GRACIAS, {NOMBRE}"
  | {
      status: "error";
      message: string; // texto para role="alert"
      fieldErrors?: ContactFieldErrors;
      values: ContactInput; // se reponen en el formulario
    };

export type ContactValidation =
  | { ok: true; data: ContactInput }
  | { ok: false; fieldErrors: ContactFieldErrors; values: ContactInput };

// Formato práctico: algo@dominio.tld, sin espacios ni saltos de línea.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Valida y normaliza el contenido del formulario. Función pura: la usa el
 * cliente (feedback inmediato) y el servidor (autoridad).
 */
export function validateContact(raw: {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}): ContactValidation {
  const values: ContactInput = {
    name: clean(raw.name),
    email: clean(raw.email),
    message: clean(raw.message),
  };
  const fieldErrors: ContactFieldErrors = {};

  if (!values.name) {
    fieldErrors.name = "Escribe tu nombre.";
  } else if (values.name.length > CONTACT_LIMITS.name) {
    fieldErrors.name = `Máximo ${CONTACT_LIMITS.name} caracteres.`;
  }

  if (!values.email) {
    fieldErrors.email = "Escribe tu correo electrónico.";
  } else if (
    values.email.length > CONTACT_LIMITS.email ||
    !EMAIL_RE.test(values.email)
  ) {
    fieldErrors.email = "Escribe un correo válido.";
  }

  if (!values.message) {
    fieldErrors.message = "Escribe un mensaje.";
  } else if (values.message.length > CONTACT_LIMITS.message) {
    fieldErrors.message = `Máximo ${CONTACT_LIMITS.message} caracteres.`;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors, values };
  }
  return { ok: true, data: values };
}

/** Sustituye saltos de línea por espacios (evita inyección de cabeceras en el asunto). */
export function stripLineBreaks(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

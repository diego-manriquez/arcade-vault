"use server";

import { Resend } from "resend";
import {
  stripLineBreaks,
  validateContact,
  type ContactState,
} from "@/lib/contact";

const GENERIC_ERROR =
  "No pudimos enviar tu mensaje. Inténtalo de nuevo en unos minutos.";

function formString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

/**
 * Server Action del formulario de contacto de /acerca-de.
 * Trata toda entrada como no confiable: honeypot, validación y límites en servidor.
 */
export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const validation = validateContact({
    name: formString(formData, "name"),
    email: formString(formData, "email"),
    message: formString(formData, "message"),
  });

  // Honeypot: un bot rellena el campo oculto. Se responde éxito sin enviar nada.
  if (formString(formData, "website").trim() !== "") {
    return { status: "success", name: validation.ok ? validation.data.name : "" };
  }

  if (!validation.ok) {
    return {
      status: "error",
      message: "Revisa los campos marcados e inténtalo de nuevo.",
      fieldErrors: validation.fieldErrors,
      values: validation.values,
    };
  }

  const { name, email, message } = validation.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  const missing = [
    !apiKey && "RESEND_API_KEY",
    !to && "CONTACT_TO_EMAIL",
    !from && "CONTACT_FROM_EMAIL",
  ].filter(Boolean);

  if (!apiKey || !to || !from) {
    console.error(
      `[contacto] Faltan variables de entorno: ${missing.join(", ")}`,
    );
    return { status: "error", message: GENERIC_ERROR, values: validation.data };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Arcade Vault] Mensaje de ${stripLineBreaks(name)}`,
      text: [
        `Nombre: ${stripLineBreaks(name)}`,
        `Correo: ${email}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contacto] Resend rechazó el envío:", error);
      return {
        status: "error",
        message: GENERIC_ERROR,
        values: validation.data,
      };
    }
  } catch (err) {
    console.error("[contacto] Error inesperado al enviar:", err);
    return { status: "error", message: GENERIC_ERROR, values: validation.data };
  }

  return { status: "success", name };
}

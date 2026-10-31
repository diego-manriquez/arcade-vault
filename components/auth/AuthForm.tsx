"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";

type Mode = "login" | "register";

const MIN_PASSWORD = 6;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Fields {
  user: string;
  mail: string;
  pass: string;
}

/** Devuelve el primer error de validación o `null`. Solo validación visual: no autentica. */
function validate(mode: Mode, { user, mail, pass }: Fields): string | null {
  if (!user.trim()) return "Escribe tu usuario.";
  if (mode === "register" && !EMAIL_PATTERN.test(mail.trim())) {
    return "Escribe un correo válido, por ejemplo tucorreo@ejemplo.com.";
  }
  if (pass.length < MIN_PASSWORD) {
    return `La contraseña debe tener al menos ${MIN_PASSWORD} caracteres.`;
  }
  return null;
}

export function AuthForm() {
  const [mode, setMode] = useState<Mode>("login");
  const [fields, setFields] = useState<Fields>({ user: "", mail: "", pass: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isRegister = mode === "register";

  const changeMode = (next: string) => {
    setMode(next as Mode);
    setError(null);
    setSubmitted(false);
  };

  const setField = (name: keyof Fields) => (value: string) =>
    setFields((current) => ({ ...current, [name]: value }));

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const problem = validate(mode, fields);
    setError(problem);
    // Sin backend (SPEC 01): un envío válido no inicia sesión ni navega.
    setSubmitted(problem === null);
  };

  return (
    <>
      <Tabs
        variant="line"
        label="Acceso"
        className="mb-6"
        selectedId={mode}
        onSelect={changeMode}
        items={[
          { id: "login", label: "INICIAR SESIÓN" },
          { id: "register", label: "CREAR CUENTA" },
        ]}
      />

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-[18px]">
        <div>
          <label className="lbl" htmlFor="av-user">
            Usuario
          </label>
          <input
            id="av-user"
            className="field"
            type="text"
            autoComplete="username"
            placeholder="Tu alias de jugador"
            value={fields.user}
            onChange={(e) => setField("user")(e.target.value)}
            aria-invalid={error !== null && !fields.user.trim()}
          />
        </div>

        {isRegister && (
          <div>
            <label className="lbl" htmlFor="av-mail">
              Correo electrónico
            </label>
            <input
              id="av-mail"
              className="field"
              type="email"
              autoComplete="email"
              placeholder="tucorreo@ejemplo.com"
              value={fields.mail}
              onChange={(e) => setField("mail")(e.target.value)}
              aria-invalid={error !== null && !EMAIL_PATTERN.test(fields.mail.trim())}
            />
          </div>
        )}

        <div>
          <label className="lbl" htmlFor="av-pass">
            Contraseña
          </label>
          <input
            id="av-pass"
            className="field"
            type="password"
            autoComplete={isRegister ? "new-password" : "current-password"}
            placeholder={`Mínimo ${MIN_PASSWORD} caracteres`}
            value={fields.pass}
            onChange={(e) => setField("pass")(e.target.value)}
            aria-invalid={error !== null && fields.pass.length < MIN_PASSWORD}
          />
        </div>

        {error && (
          <p role="alert" className="m-0 text-[15px] text-[#ff5c9d]">
            {error}
          </p>
        )}
        {submitted && (
          <p role="status" className="m-0 text-[15px] text-[#b9b9d2]">
            Datos válidos. El acceso real todavía no está disponible en esta
            versión.
          </p>
        )}

        <Button type="submit" variant="solid" className="w-full">
          {isRegister ? "Crear cuenta" : "Iniciar sesión"}
        </Button>
      </form>
    </>
  );
}

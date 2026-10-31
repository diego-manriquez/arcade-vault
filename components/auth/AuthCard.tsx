import { Button } from "@/components/ui/Button";
import { AuthForm } from "./AuthForm";

/** Tarjeta de acceso: formulario, proveedores sociales (inertes) y entrada como invitado. */
export function AuthCard() {
  return (
    <div className="auth-card">
      <div className="mb-[26px] flex flex-col gap-3 text-center">
        <span className="px flicker text-[20px]">
          <span className="neon-c">ARCADE</span>{" "}
          <span className="neon-m">VAULT</span>
        </span>
        <span className="px neon-y text-[8px]">JUGADOR 1, PREPÁRATE</span>
      </div>

      <AuthForm />

      <div className="mb-[18px] mt-6 flex items-center gap-3 text-[13px] text-[#8e8eab]">
        <span className="h-px grow bg-[#2d2d45]" />
        O CONTINÚA CON
        <span className="h-px grow bg-[#2d2d45]" />
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <Button variant="ghost" className="!text-[9px]">
          Google
        </Button>
        <Button variant="ghost" className="!text-[9px]">
          GitHub
        </Button>
      </div>

      <div className="mt-6 flex flex-col items-center gap-2.5 border-t-2 border-dashed border-[#2d2d45] pt-[22px] text-center">
        <Button href="/" variant="yellow" className="w-full">
          Jugar como invitado
        </Button>
        <span className="text-sm text-[#b9b9d2]">
          Sin cuenta. Tus puntuaciones no entran al ranking global.
        </span>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { NeonText } from "@/components/ui/NeonText";
import { Tabs } from "@/components/ui/Tabs";
import { Tag } from "@/components/ui/Tag";

/**
 * TEMPORAL (SPEC 01, paso 4): galería para verificar los componentes base.
 * Se elimina en el paso 6, cuando `/` pase a mostrar la Biblioteca.
 */
export function UiShowcase() {
  const [tab, setTab] = useState("login");
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 pb-24 text-left">
      <section className="flex flex-wrap gap-3" aria-label="Botones">
        <Button>Cian</Button>
        <Button variant="magenta">Magenta</Button>
        <Button variant="yellow">Amarillo</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="solid">Sólido</Button>
        <Button variant="cyan" disabled>
          Deshabilitado
        </Button>
        <Button href="/" variant="magenta">
          Enlace
        </Button>
      </section>

      <section className="flex flex-wrap items-center gap-4" aria-label="Texto">
        <Tag>ROMPELADRILLOS</Tag>
        <Badge label="MEJOR PUNTUACIÓN" value="048200" />
        <NeonText color="cyan" className="text-[12px]">
          CIAN
        </NeonText>
        <NeonText color="magenta" flicker className="text-[12px]">
          MAGENTA
        </NeonText>
        <NeonText color="yellow" blink className="text-[12px]">
          AMARILLO
        </NeonText>
      </section>

      <section className="flex flex-col gap-4" aria-label="Pestañas">
        <Tabs
          label="Juegos"
          selectedId="tet"
          items={[
            { id: "ark", label: "ARKANOID", href: "/" },
            { id: "tet", label: "TETRIS", href: "/" },
          ]}
        />
        <Tabs
          label="Acceso"
          variant="line"
          selectedId={tab}
          onSelect={setTab}
          items={[
            { id: "login", label: "INICIAR SESIÓN" },
            { id: "register", label: "CREAR CUENTA" },
          ]}
        />
      </section>

      <section aria-label="Modal">
        <Button variant="yellow" onClick={() => setOpen(true)}>
          Abrir modal
        </Button>
        {open && (
          <Modal label="Modal de prueba" onClose={() => setOpen(false)}>
            <NeonText as="h2" color="magenta" className="text-[20px]">
              MODAL
            </NeonText>
            <p>Escape o el botón lo cierran.</p>
            <Button onClick={() => setOpen(false)}>Cerrar</Button>
          </Modal>
        )}
      </section>
    </div>
  );
}

const ARROWS = [
  { label: "Arriba", path: "M9 3L16 13H2Z" },
  { label: "Izquierda", path: "M3 9L13 2V16Z" },
  { label: "Abajo", path: "M9 15L2 5H16Z" },
  { label: "Derecha", path: "M15 9L5 16V2Z" },
] as const;

function Arrow({ label, path }: (typeof ARROWS)[number]) {
  // Visual por ahora: no hay juego al que enviar la dirección.
  return (
    <button type="button" className="dbtn" aria-label={label}>
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <path d={path} fill="#00f5ff" />
      </svg>
    </button>
  );
}

/** Cruceta táctil. Disposición: arriba en el centro, y las otras tres en la fila inferior. */
export function Dpad() {
  const [up, left, down, right] = ARROWS;
  return (
    <div className="dpad" role="group" aria-label="Controles táctiles">
      <span />
      <Arrow {...up} />
      <span />
      <Arrow {...left} />
      <Arrow {...down} />
      <Arrow {...right} />
    </div>
  );
}

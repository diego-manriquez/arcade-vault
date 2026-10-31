/**
 * Fondo decorativo del Vault: sol magenta difuso y rejilla en perspectiva.
 * Las scanlines y el movimiento de la rejilla se activan con las clases
 * `scan` y `grid-anim` del contenedor (ver app/layout.tsx).
 */
export function Backdrop() {
  return (
    <>
      <div className="sun" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />
    </>
  );
}

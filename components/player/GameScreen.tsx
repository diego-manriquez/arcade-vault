interface GameScreenProps {
  loading: boolean;
  paused: boolean;
}

/**
 * Marco CRT del juego. El `<canvas>` queda vacío: reserva el espacio donde
 * los juegos futuros se mostrarán (no se dibuja nada en esta spec).
 */
export function GameScreen({ loading, paused }: GameScreenProps) {
  return (
    <div
      className="bezel"
      tabIndex={0}
      aria-label="Pantalla de juego. Pulsa P para pausar."
    >
      <div className="screen">
        <canvas width={480} height={480} aria-hidden="true" />

        {loading && (
          <div className="screen-msg !bg-[#050508]" role="status">
            <div className="wipe" />
            <div className="spinner" aria-hidden="true">
              {Array.from({ length: 9 }, (_, i) => (
                <span key={i} />
              ))}
            </div>
            <span className="px neon-c text-[10px]">CARGANDO CARTUCHO…</span>
          </div>
        )}

        {paused && !loading && (
          <div className="screen-msg" role="status">
            <span className="px neon-y blink text-lg">PAUSA</span>
            <span className="text-[#b9b9d2]">
              Pulsa P o el botón para continuar
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

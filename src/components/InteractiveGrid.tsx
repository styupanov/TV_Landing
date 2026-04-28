import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const COLS = 24;
const ROWS = 12;

const InteractiveGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: -1, y: -1 });
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setDimensions({ w: rect.width, h: rect.height });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => setMouse({ x: -1, y: -1 });

  const { w, h } = dimensions;
  const cellW = w / COLS;
  const cellH = h / ROWS;
  const radius = 180;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 1.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full overflow-hidden cursor-crosshair"
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${w} ${h}`}
        className="absolute inset-0"
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        {Array.from({ length: COLS + 1 }).map((_, i) => {
          const x = i * cellW;
          return (
            <line
              key={`v${i}`}
              x1={x}
              y1={0}
              x2={x}
              y2={h}
              stroke="black"
              strokeWidth={0.5}
              opacity={0.06}
            />
          );
        })}
        {Array.from({ length: ROWS + 1 }).map((_, i) => {
          const y = i * cellH;
          return (
            <line
              key={`h${i}`}
              x1={0}
              y1={y}
              x2={w}
              y2={y}
              stroke="black"
              strokeWidth={0.5}
              opacity={0.06}
            />
          );
        })}

        {/* Interactive nodes at intersections */}
        {w > 0 &&
          Array.from({ length: (COLS + 1) * (ROWS + 1) }).map((_, idx) => {
            const col = idx % (COLS + 1);
            const row = Math.floor(idx / (COLS + 1));
            const cx = col * cellW;
            const cy = row * cellH;

            if (mouse.x < 0) {
              return (
                <circle
                  key={idx}
                  cx={cx}
                  cy={cy}
                  r={1}
                  fill="black"
                  opacity={0.1}
                />
              );
            }

            const dx = cx - mouse.x;
            const dy = cy - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const influence = Math.max(0, 1 - dist / radius);
            const r = 1 + influence * 3;
            const opacity = 0.1 + influence * 0.4;

            return (
              <circle
                key={idx}
                cx={cx}
                cy={cy}
                r={r}
                fill="black"
                opacity={opacity}
                style={{ transition: "r 0.15s, opacity 0.15s" }}
              />
            );
          })}
      </svg>
    </motion.div>
  );
};

export default InteractiveGrid;

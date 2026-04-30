import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const GRID_SIZE = 15; // Fixed size for cells
const radius = 180;

const InteractiveGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: -1, y: -1 });
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      // Using Math.floor to ensure we work with integer pixels
      setDimensions({ w: Math.floor(rect.width), h: Math.floor(rect.height) });
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
  
  // Calculate grid offsets to center the grid
  const centerX = w / 2;
  const centerY = h / 2;
  
  const colsCount = Math.ceil(w / GRID_SIZE) + 2;
  const rowsCount = Math.ceil(h / GRID_SIZE) + 2;
  
  const startCol = -Math.floor(colsCount / 2);
  const endCol = Math.ceil(colsCount / 2);
  const startRow = -Math.floor(rowsCount / 2);
  const endRow = Math.ceil(rowsCount / 2);

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
        width={w}
        height={h}
        className="absolute inset-0"
        style={{ shapeRendering: "crispEdges" }}
      >
        {/* Vertical Grid lines */}
        {Array.from({ length: endCol - startCol + 1 }).map((_, i) => {
          const x = centerX + (startCol + i) * GRID_SIZE;
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
        {/* Horizontal Grid lines */}
        {Array.from({ length: endRow - startRow + 1 }).map((_, i) => {
          const y = centerY + (startRow + i) * GRID_SIZE;
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
          Array.from({ length: (endCol - startCol + 1) * (endRow - startRow + 1) }).map((_, idx) => {
            const colIdx = idx % (endCol - startCol + 1);
            const rowIdx = Math.floor(idx / (endCol - startCol + 1));
            
            const cx = centerX + (startCol + colIdx) * GRID_SIZE;
            const cy = centerY + (startRow + rowIdx) * GRID_SIZE;

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
                fill={influence > 0.3 ? "#e57373" : "black"}
                opacity={opacity}
                style={{ transition: "r 0.15s, opacity 0.15s, fill 0.3s" }}
              />
            );
          })}
      </svg>
    </motion.div>
  );
};

export default InteractiveGrid;

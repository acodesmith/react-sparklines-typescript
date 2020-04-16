import React, { FC, CSSProperties } from "react";
import { Point } from "./types";

export interface SparklinesLineProps {
  color?: string;
  data?: number[];
  height?: number;
  margin?: number;
  onMouseMove?: (e: string, n: number, p: Point) => void;
  points?: Point[];
  style?: CSSProperties;
  width?: number;
}

const SparklinesLine: FC<SparklinesLineProps> = (
  props: SparklinesLineProps
) => {
  const {
    data = [],
    points = [],
    height = 0,
    margin = 0,
    color,
    style = {},
    onMouseMove = () => {},
  } = props;

  const linePoints = points
    .map((p) => [p.x, p.y])
    .reduce((a, b) => a.concat(b));

  const closePolyPoints = [
    points[points.length - 1].x,
    height - margin,
    margin,
    height - margin,
    margin,
    points[0].y,
  ];

  const fillPoints = linePoints.concat(closePolyPoints);

  const lineStyle: CSSProperties = {
    stroke: color || style.stroke || "slategray",
    strokeWidth: style.strokeWidth || "1",
    strokeLinejoin: style.strokeLinejoin || "round",
    strokeLinecap: style.strokeLinecap || "round",
    fill: "none",
  };
  const fillStyle: CSSProperties = {
    stroke: style.stroke || "none",
    strokeWidth: "0",
    fillOpacity: style.fillOpacity || 0.1,
    fill: style.fill || color || "slategray",
    pointerEvents: "auto",
  };

  const tooltips = points.map((p, i) => {
    return (
      <circle
        key={i}
        cx={p.x}
        cy={p.y}
        r={2}
        style={fillStyle}
        onMouseEnter={() => onMouseMove("enter", data[i], p)}
        onClick={() => onMouseMove("click", data[i], p)}
      />
    );
  });

  return (
    <g>
      {tooltips}
      <polyline points={fillPoints.join(" ")} style={fillStyle} />
      <polyline points={linePoints.join(" ")} style={lineStyle} />
    </g>
  );
};

export default SparklinesLine;

import React, { FC, CSSProperties } from "react";
import { Point } from "./types";

export interface SparklinesSpotsProps {
  points?: Point[];
  width?: number;
  height?: number;
  size?: number;
  style?: CSSProperties;
  spotColors?: string[];
}

const lastDirection = (points: Point[]) => {
  Math.sign =
    Math.sign ||
    function (x) {
      return x > 0 ? 1 : -1;
    };

  return points.length < 2
    ? 0
    : Math.sign(points[points.length - 2].y - points[points.length - 1].y);
};

const SparklinesSpots: FC<SparklinesSpotsProps> = (
  props: SparklinesSpotsProps
) => {
  const { points = [], size, style, spotColors = [] } = props;

  const startSpot = (
    <circle cx={points[0].x} cy={points[0].y} r={size} style={style} />
  );

  const endSpot = (
    <circle
      cx={points[points.length - 1].x}
      cy={points[points.length - 1].y}
      r={size}
      style={style || { fill: spotColors[lastDirection(points)] }}
    />
  );

  return (
    <g>
      {style && startSpot}
      {endSpot}
    </g>
  );
};

export default SparklinesSpots;

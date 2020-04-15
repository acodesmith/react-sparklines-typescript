import React, { FC, CSSProperties } from "react";
import * as dataProcessing from "./dataProcessing";
import { Point } from "./types";

export enum SparklinesReferenceLineTypes {
  max = "max",
  min = "min",
  mean = "mean",
  avg = "avg",
  median = "median",
  custom = "custom",
}

export interface SparklinesReferenceLineProps {
  margin: number;
  points: Point[];
  type: SparklinesReferenceLineTypes;
  value: number;
  style: CSSProperties;
}

const SparklinesReferenceLine: FC = (props: SparklinesReferenceLineProps) => {
  const {
    points,
    margin,
    type = SparklinesReferenceLineTypes.mean,
    style = { stroke: "red", strokeOpacity: 0.75, strokeDasharray: "2, 2" },
    value,
  } = props;

  const ypoints = points.map((p) => p.y);
  const y =
    type == "custom"
      ? value
      : ((dataProcessing as any)[type] as (p: number[]) => number)(ypoints);

  return (
    <line
      x1={points[0].x}
      y1={y + margin}
      x2={points[points.length - 1].x}
      y2={y + margin}
      style={style}
    />
  );
};

export default SparklinesReferenceLine;

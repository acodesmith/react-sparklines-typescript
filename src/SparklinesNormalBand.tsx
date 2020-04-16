import React, { FC, CSSProperties } from "react";
import mean from "./dataProcessing/mean";
import stdev from "./dataProcessing/stdev";
import { Point } from "./types";

interface SparklinesNormalBandProps {
  margin?: number;
  points?: Point[];
  style?: CSSProperties;
}

const SparklinesNormalBand: FC<SparklinesNormalBandProps> = (
  props: SparklinesNormalBandProps
) => {
  const {
    points = [],
    margin = 0,
    style = { fill: "red", fillOpacity: 0.1 },
  } = props;

  const ypoints = points.map((p) => p.y);
  const dataMean = mean(ypoints);
  const dataStdev = stdev(ypoints);

  return (
    <rect
      x={points[0].x}
      y={dataMean - dataStdev + margin}
      width={points[points.length - 1].x - points[0].x}
      height={2 * +stdev}
      style={style}
    />
  );
};

export default SparklinesNormalBand;

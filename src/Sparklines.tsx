import React, { FC, ReactNode, ReactElement, CSSProperties } from "react";
import dataToPoints from "./dataProcessing/dataToPoints";
import SparklinesBars from "./SparklinesBars";
import SparklinesNormalBand from "./SparklinesNormalBand";
import SparklinesReferenceLine from "./SparklinesReferenceLine";
import SparklinesLine from "./SparklinesLine";
import SparklinesSpots from "./SparklinesSpots";
import SparklinesText from "./SparklinesText";

type ReactText = string | number;
type ReactChild = ReactElement<any> | ReactText;

export interface SparklinesProps {
  children: ReactNode;
  data: number[];
  height?: number;
  limit?: number;
  margin?: number;
  max?: number;
  min?: number;
  onMouseMove?: () => void;
  preserveAspectRatio?: string;
  svgWidth?: number;
  svgHeight?: number;
  style?: { [key: string]: string };
  width?: number;
}

interface SVGOpts {
  height?: number | string;
  preserveAspectRatio: string;
  style: CSSProperties;
  viewBox: string;
  width?: number | string;
}

const Sparklines: FC = (props: SparklinesProps) => {
  const {
    data = [],
    limit,
    width = 240,
    height = 60,
    preserveAspectRatio = "none",
    margin = 2,
    svgWidth,
    svgHeight,
    style,
    max,
    min,
  } = props;

  if (data.length === 0) {
    return null;
  }

  const points = dataToPoints({ data, limit, width, height, margin, max, min });

  const svgOpts: SVGOpts = {
    style: style,
    viewBox: `0 0 ${width} ${height}`,
    preserveAspectRatio: preserveAspectRatio,
  };
  if (svgWidth && svgWidth > 0) svgOpts.width = svgWidth;
  if (svgHeight && svgHeight > 0) svgOpts.height = svgHeight;

  return (
    <svg {...svgOpts}>
      {React.Children.map(props.children, function (child: ReactChild) {
        return React.cloneElement(child, {
          data,
          points,
          width,
          height,
          margin,
        });
      })}
    </svg>
  );
};

export {
  Sparklines,
  SparklinesBars,
  SparklinesLine,
  SparklinesNormalBand,
  SparklinesReferenceLine,
  SparklinesSpots,
  SparklinesText,
};

import arrayMin from "./min";
import arrayMax from "./max";

export interface DataToPointsArgs {
  data: number[];
  limit?: number;
  width: number;
  height: number;
  margin: number;
  max?: number;
  min?: number;
}

export default ({
  data,
  limit,
  width = 1,
  height = 1,
  margin = 0,
  max = arrayMax(data),
  min = arrayMin(data),
}: DataToPointsArgs) => {
  const len = data.length;

  if (limit && limit < len) {
    data = data.slice(len - limit);
  }

  const vfactor = (height - margin * 2) / (max - min || 2);
  const hfactor = (width - margin * 2) / ((limit || len) - (len > 1 ? 1 : 0));

  return data.map((d, i) => ({
    x: i * hfactor + margin,
    y: (max === min ? 1 : max - d) * vfactor + margin,
  }));
};

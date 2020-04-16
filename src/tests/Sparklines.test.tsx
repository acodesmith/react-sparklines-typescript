import React from "react";
import { render } from "@testing-library/react";
import {
  Sparklines,
  SparklinesLine,
  SparklinesBars,
  SparklinesCurve,
  SparklinesNormalBand,
  SparklinesReferenceLine,
  SparklinesSpots,
  SparklinesText,
} from "../Sparklines";
import "@testing-library/jest-dom/extend-expect";

describe("Basic Sparkline Component Rendering", () => {
  it("should return null", () => {
    const component = (
      <Sparklines data={[]}>
        <SparklinesLine />
      </Sparklines>
    );
    const { container } = render(component);
    expect(container.firstChild).toEqual(null);
  });

  it("should render a simple sparkline with sparkline lines", () => {
    const component = (
      <Sparklines data={[1, 2]}>
        <SparklinesLine />
      </Sparklines>
    );
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });

  it("should render a simple sparkline with sparkline lines and set width/height", () => {
    const component = (
      <Sparklines svgWidth={100} svgHeight={100} data={[1, 2]}>
        <SparklinesLine />
      </Sparklines>
    );
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });

  it("should render all the sparkline pieces together", () => {
    const component = (
      <Sparklines
        svgWidth={100}
        svgHeight={100}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
      >
        <SparklinesLine />
        <SparklinesBars />
        <SparklinesCurve />
        <SparklinesNormalBand />
        <SparklinesReferenceLine />
        <SparklinesSpots />
        <SparklinesText text={"Hello!"} />
      </Sparklines>
    );
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });
});

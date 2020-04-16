//@global describe
import dataToPoints from "../dataProcessing/dataToPoints";
import mean from "../dataProcessing/mean";
import median from "../dataProcessing/median";
import midRange from "../dataProcessing/midRange";
import stdev from "../dataProcessing/stdev";
import variance from "../dataProcessing/variance";

describe("dataToPoints", () => {
  it("should return an array", () => {
    expect(Array.isArray(dataToPoints({ data: [] }))).toEqual(true);
    expect(Array.isArray(dataToPoints({ data: [1, 2, 3] }))).toEqual(true);
    expect(Array.isArray(dataToPoints({ data: [1, null, undefined] }))).toEqual(
      true
    );
  });

  it("should return only `limit` items", () => {
    expect(dataToPoints({ data: [1, 2, 3, 4, 5] }).length).toEqual(5);
    expect(dataToPoints({ data: [1, 2, 3, 4, 5], limit: 2 }).length).toEqual(2);
    expect(dataToPoints({ data: [1, 2, 3, 4, 5], limit: 5 }).length).toEqual(5);
    expect(dataToPoints({ data: [1, 2, 3, 4, 5], limit: 10 }).length).toEqual(
      5
    );
  });

  it("should return proper values for 1 value", () => {
    expect(dataToPoints({ data: [1] })).toEqual([{ x: 0, y: 0.5 }]);
  });

  it("should return proper values 2+ values", () => {
    expect(dataToPoints({ data: [1, 1] })).toEqual([
      { x: 0, y: 0.5 },
      { x: 1, y: 0.5 },
    ]);

    expect(dataToPoints({ data: [0, 1] })).toEqual([
      { x: 0, y: 1 },
      { x: 1, y: 0 },
    ]);

    expect(dataToPoints({ data: [1, 0] })).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 1 },
    ]);

    expect(dataToPoints({ data: [0, 1, 2] })).toEqual([
      { x: 0, y: 1 },
      { x: 0.5, y: 0.5 },
      { x: 1, y: 0 },
    ]);
  });

  it("should inerpolate values properly", () => {
    expect(dataToPoints({ data: [0, 1, 2], width: 10, height: 10 })).toEqual([
      { x: 0, y: 10 },
      { x: 5, y: 5 },
      { x: 10, y: 0 },
    ]);
  });

  it("should take min and max into account", () => {
    expect(
      dataToPoints({ data: [1, 2, 3, 4], width: 6, height: 10, max: 2, min: 3 })
    ).toEqual([
      { x: 0, y: -10 },
      { x: 2, y: 0 },
      { x: 4, y: 10 },
      { x: 6, y: 20 },
    ]);
  });

  it("should return y == height for 0 and null values", () => {
    expect(dataToPoints({ data: [0] })).toEqual([{ x: 0, y: 0.5 }]);
    expect(dataToPoints({ data: [0, null, 0] })).toEqual([
      { x: 0, y: 0.5 },
      { x: 0.5, y: 0.5 },
      { x: 1, y: 0.5 },
    ]);
  });

  it("shoud test mean", () => {
    expect(mean([1, 2, 3])).toEqual(2);
  });

  it("shoud test median", () => {
    expect(median([1, 4, 7, 8, 10])).toEqual(7);
  });

  it("shoud test midRange", () => {
    expect(midRange([50, 100])).toEqual(75);
  });

  it("shoud test stdev", () => {
    expect(stdev([50, 100])).toEqual(25);
  });

  it("shoud test variance", () => {
    expect(variance([1, 2, 3, 4, 5])).toEqual(2);
  });
});

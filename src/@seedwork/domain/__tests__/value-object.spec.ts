import ValueObject from "../value-objects/value-object";

class StubClass extends ValueObject {}

describe("ValueObject unit tests", () => {
  it("should set value", () => {
    let vo = new StubClass("string value");

    expect(vo.value).toBe("string value");

    vo = new StubClass({ props1: '"string value"' });
    expect(vo.value).toStrictEqual({ props1: '"string value"' });
  });
});

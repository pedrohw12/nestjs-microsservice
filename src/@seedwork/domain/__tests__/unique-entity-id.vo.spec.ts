import InvalidUuidError from "../../errors/invalid-uuid.error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";

function spyValidateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}

describe("Unity Entity ID Unit Tests", () => {
  it("should thrown error when uuid is not valid", () => {
    const validateSpy = spyValidateMethod();
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept an uuid passed in the constructor", () => {
    const validateSpy = spyValidateMethod();
    const uuid = "29f00aa0-4a22-4b5a-ba49-619383248e4f";
    const valueObject = new UniqueEntityId(uuid);
    expect(valueObject.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept an uuid passed in the constructor", () => {
    const validateSpy = spyValidateMethod();
    const valueObject = new UniqueEntityId();
    expect(uuidValidate(valueObject.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});

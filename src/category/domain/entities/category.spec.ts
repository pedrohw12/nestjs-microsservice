import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo"
import { Category } from "./category";
import { omit } from "lodash";

describe("Category Unit Test", () => {
  test("constructor of category class", () => {
    let category = new Category({ name: "Movie" });
    let props = omit(category.props, "created_at");

    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });

    expect(category.props.created_at).toBeInstanceOf(Date);

    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
    });

    let created_at = new Date();

    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });

    category = new Category({
      name: "Movie",
      description: "other description",
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      description: "other description",
    });

    category = new Category({
      name: "Movie",
      is_active: false,
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: false,
    });

    created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      created_at,
    });
  });

  test("Getter of name field", () => {
    const category = new Category({ name: "Movie" });

    expect(category.name).toBe("Movie");
  });

  test("Getter and setter of description field", () => {
    let category = new Category({ name: "Movie" });

    expect(category.description).toBeNull();

    category = new Category({ name: "Movie", description: "desc" });

    expect(category.description).toBe("desc");

    category = new Category({ name: "Movie" });
    category["description"] = "other desc";
    expect(category.description).toBe("other desc");

    category["description"] = undefined;
    expect(category.description).toBeNull();

    category["description"] = null;
    expect(category.description).toBeNull();
  });

  test("Getter and Setter of is_active field", () => {
    let category = new Category({ name: "Movie" });

    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: true });

    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: false });

    expect(category.is_active).toBeFalsy();
  });

  test("Getter of created_at field", () => {
    let category = new Category({ name: "Movie" });

    expect(category.created_at).toBeInstanceOf(Date);

    const created_at = new Date();
    category = new Category({ name: "Movie", created_at });

    expect(category.created_at).toBe(created_at);
  });

  test("ID field", () => {
    const data = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: new UniqueEntityId() },
    ];

    data.forEach((i) => {
      const category = new Category(i.props, i.id as any);

      expect(category.id).not.toBeNull();
      expect(category.id).toBeInstanceOf(UniqueEntityId);
    });
  });
});

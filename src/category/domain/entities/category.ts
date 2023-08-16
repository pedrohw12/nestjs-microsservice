import ValueObject from "@seedwork/domain/value-objects/value-object";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import Entity from "../../../@seedwork/domain/entity/entity";

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};
export abstract class AggregateRoot<
  EntityId extends ValueObject = any,
  Props = any,
  JsonProps = Required<{ id: string } & Props>
> extends Entity<EntityId, Props, JsonProps> {}

export type CategoryPropsJson = Required<{ id: string } & CategoryProperties>;

export class CategoryId extends UniqueEntityId {}

export class Category extends AggregateRoot<
  CategoryId,
  CategoryProperties,
  CategoryPropsJson
> {
  toJSON(): Required<{ id: string } & CategoryProperties> {
    throw new Error("Method not implemented.");
  }
  constructor(
    public readonly props: CategoryProperties,
    entityId?: CategoryId
  ) {
    super(props, entityId ?? new CategoryId());
    this.description = this.props.description;
    this.is_active = this.props.is_active;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  update(name: string, description: string): void {
    this.name = name;
    this.description = description;
  }

  activate() {
    this.props.is_active = true;
  }

  deactivate() {
    this.props.is_active = false;
  }

  get name() {
    return this.props.name;
  }

  private set name(value) {
    this.props.name = value;
  }

  get description() {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get is_active() {
    return this.props.is_active;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get created_at() {
    return this.props.created_at;
  }
}

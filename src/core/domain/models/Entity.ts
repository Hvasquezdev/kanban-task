interface Entity {
  id: string;
  name: string;
}

export class EntityNotFoundException extends Error {
  constructor(
    public entityType: 'Board' | 'BoardTask' | 'BoardColumn' | 'BoardSubtask',
    public id: string
  ) {
    super(`"${entityType}" not found with ID: ${id}`);
    this.name = 'ENTITY_NOT_FOUND_ERROR';
  }
}

interface EntityRepository<T> {
  get(id: Entity['id']): Promise<T>;
  getAll(): Promise<T[]>;
  create(item: T): Promise<T>;
  update(item: T): Promise<T>;
  delete(id: Entity['id']): Promise<boolean>;
}

export type { EntityRepository, Entity };

import { BoardErrorName } from '../constants/Board';
import { BoardError } from '../domain/models/Board';
import { Entity } from '../domain/models/Entity';

export default class BoardValidator {
  static ensureNonExistingEntityName(
    type: 'Board' | 'BoardTask' | 'BoardColumn' | 'BoardSubtask',
    collection: Array<Entity>,
    entity: Entity
  ) {
    if (
      collection.some((item) => {
        const isSameName = item.name.toLowerCase() === entity.name.toLocaleLowerCase();
        const isSameEntity = item.id === entity.id;
        return isSameName && !isSameEntity;
      })
    ) {
      const errorName: { [key in typeof type]: BoardErrorName } = {
        Board: BoardErrorName.ExistingBoardName,
        BoardTask: BoardErrorName.ExistingTaskName,
        BoardColumn: BoardErrorName.ExistingColumnName,
        BoardSubtask: BoardErrorName.ExistingSubtaskName
      };

      throw new BoardError(errorName[type]);
    }
  }
}

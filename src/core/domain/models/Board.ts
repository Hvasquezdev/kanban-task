import { BoardColumnColorKey, BoardErrorMessages, BoardErrorName } from '../../constants/Board';
import { Entity } from './Entity';

interface Board extends Entity {}

interface BoardColumn extends Entity {
  boardId: Board['id'];
  tasks: Array<BoardTask>;
  color: string;
}

interface BoardTask extends Entity {
  description: string;
  subtasks: Array<BoardSubtask>;
  column: Pick<BoardColumn, 'id' | 'name'>;
}

interface BoardSubtask extends Entity {
  isCompleted: boolean;
}

export class BoardError extends Error {
  constructor(name: BoardErrorName) {
    super();
    this.name = name;
    this.message = BoardErrorMessages[name];
  }
}

export type { Board, BoardColumn, BoardTask, BoardSubtask, BoardColumnColorKey };

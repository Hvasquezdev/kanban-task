import { BoardSubtask, BoardTask } from '../domain/models/Board';
import { Entity, EntityNotFoundException, EntityRepository } from '../domain/models/Entity';

const LS_KEY = 'BOARD_REPOSITORY';

export interface BoardRepositorySubTask extends BoardSubtask {
  columnId: string;
}

export interface BoardRepositoryTask extends BoardTask {
  boardId: string;
  description: string;
  subtasks: Array<BoardRepositorySubTask>;
  column: { id: string; name: string };
}

export interface BoardRepositoryColumnEntity extends Entity {
  boardId: string;
  tasks: Array<BoardRepositoryTask>;
  color: string;
}

export interface BoardRepositoryEntity extends Entity {
  columns: Array<BoardRepositoryColumnEntity>;
}

class BoardRepository implements EntityRepository<BoardRepositoryEntity> {
  private collection: { [boardId: string]: BoardRepositoryEntity } = BoardRepository.initializeLocalStorage();

  public async get(id: string): Promise<BoardRepositoryEntity> {
    if (!(id in this.collection)) {
      throw new EntityNotFoundException('Board', id);
    }

    return this.collection[id];
  }

  public async getAll(): Promise<BoardRepositoryEntity[]> {
    return Object.values(this.collection);
  }

  public async create(item: BoardRepositoryEntity): Promise<BoardRepositoryEntity> {
    this.collection[item.id] = item;
    localStorage.setItem(LS_KEY, JSON.stringify(this.collection));
    return this.get(item.id);
  }

  public async update(item: BoardRepositoryEntity): Promise<BoardRepositoryEntity> {
    this.collection[item.id] = { ...item };
    localStorage.setItem(LS_KEY, JSON.stringify(this.collection));
    return this.get(item.id);
  }

  public async delete(id: string): Promise<boolean> {
    delete this.collection[id];
    localStorage.setItem(LS_KEY, JSON.stringify(this.collection));
    return true;
  }

  async getByColumnId(columnId: string) {
    const allBoards = await this.getAll();

    const board = allBoards.find((boardEntity) => {
      return boardEntity.columns.some((column) => column.id === columnId);
    });

    if (!board) {
      throw new EntityNotFoundException('Board', `columnId: ${columnId}`);
    }

    return board;
  }

  async getByTaskId(taskId: string) {
    const allBoards = await this.getAll();

    const board = allBoards.find((boardEntity) => {
      return boardEntity.columns.some((column) => column.tasks.some((task) => task.id === taskId));
    });

    if (!board) {
      throw new EntityNotFoundException('Board', `taskId: ${taskId}`);
    }

    return board;
  }

  private static initializeLocalStorage() {
    const items = localStorage.getItem(LS_KEY);

    if (!items) {
      localStorage.setItem(LS_KEY, JSON.stringify({}));
    }

    return items ? (JSON.parse(items as string) as { [boardId: string]: BoardRepositoryEntity }) : {};
  }
}

export default new BoardRepository();

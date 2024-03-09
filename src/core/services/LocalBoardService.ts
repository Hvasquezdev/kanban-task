import { Board } from '../domain/models/Board';
import { EntityNotFoundException } from '../domain/models/Entity';
import { BoardService, BoardColumnData } from '../domain/services/BoardService';
import BoardRepository, { BoardRepositoryColumnEntity } from '../repositories/BoardRepository';
import RandomUuidGenerator from '../utils/common';
import BoardValidator from '../validators/BoardValidator';

export default class LocalBoardService implements BoardService {
  private readonly boardRepository = BoardRepository;

  public async getAllBoards(): Promise<Board[]> {
    const boards = await this.boardRepository.getAll();

    return boards.map((boardEntity) => {
      return { name: boardEntity.name, id: boardEntity.id };
    });
  }

  public async createBoard(name: string, columns: Array<{ name: string; color: string }>): Promise<Board> {
    const boards = await this.getAllBoards();

    const newBoard: Board = { name, id: RandomUuidGenerator.get() };

    BoardValidator.ensureNonExistingEntityName('Board', boards, newBoard);

    await this.boardRepository.create({
      id: RandomUuidGenerator.get(),
      name: newBoard.name,
      columns: this.createBoardColumns(newBoard.id, columns)
    });

    return newBoard;
  }

  public async deleteBoard(boardId: string): Promise<void> {
    await this.boardRepository.delete(boardId);
    return undefined;
  }

  public async editBoard(
    boardId: string,
    payload: { name: string; columns: Array<{ name: string; color: string; id?: string }> }
  ): Promise<Board> {
    const boards = await this.getAllBoards();

    BoardValidator.ensureNonExistingEntityName('Board', boards, { name: payload.name, id: boardId });

    const updatedBoard: Board = {
      name: payload.name,
      id: boardId
    };

    let { columns } = await this.boardRepository.get(boardId);

    if (columns.length > payload.columns.length) {
      columns = columns.slice(0, payload.columns.length);
    }

    columns = payload.columns.map((column): BoardRepositoryColumnEntity => {
      let columnEntity: BoardRepositoryColumnEntity | undefined;

      if (column.id) {
        columnEntity = columns.find((item) => item.id === column.id);

        if (!columnEntity) {
          throw new EntityNotFoundException('BoardColumn', column.id);
        }
      }

      return columnEntity
        ? { ...columnEntity, name: column.name, color: column.color, boardId }
        : this.createBoardColumn({ name: column.name, boardId, color: column.color });
    });

    await this.boardRepository.update({
      name: payload.name,
      columns: columns.length ? columns : this.createBoardColumns(boardId, payload.columns),
      id: boardId
    });

    return updatedBoard;
  }

  public async getBoardColumns(boardId: string): Promise<BoardColumnData[]> {
    const board = await this.boardRepository.get(boardId);

    return board.columns.map((column) => {
      return {
        name: column.name,
        id: column.id,
        tasks: column.tasks.map((task) => {
          return {
            id: task.id,
            name: task.name,
            subtasksInfo: {
              completed: task.subtasks.filter((item) => item.isCompleted).length,
              total: task.subtasks.length
            }
          };
        }),
        boardId: column.boardId,
        color: column.color
      };
    });
  }

  private createBoardColumn(params: { name: string; boardId: string; color: string }) {
    return {
      name: params.name,
      id: RandomUuidGenerator.get(),
      boardId: params.boardId,
      tasks: [],
      color: params.color
    };
  }

  private createBoardColumns(boardId: string, columns: Array<{ name: string; color: string }>) {
    return columns.map((column) => {
      return this.createBoardColumn({ boardId, color: column.color, name: column.name });
    });
  }
}

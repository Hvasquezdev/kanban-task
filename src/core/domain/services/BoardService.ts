import { Board, BoardColumn } from '../models/Board';

interface BoardColumnDataTask {
  id: string;
  name: string;
  subtasksInfo: {
    completed: number;
    total: number;
  };
}

interface BoardColumnData extends Omit<BoardColumn, 'tasks'> {
  tasks: Array<BoardColumnDataTask>;
}

interface BoardService {
  createBoard(name: string, columns: Array<{ name: string; color: string }>): Promise<Board>;
  deleteBoard(boardId: string): Promise<void>;
  editBoard(
    boardId: string,
    newdData: { name: string; columns: Array<{ name: string; color: string; id?: string }> }
  ): Promise<Board>;
  getBoardColumns(boardId: string): Promise<BoardColumnData[]>;
  getAllBoards(): Promise<Board[]>;
}

export type { BoardColumnData, BoardService, BoardColumnDataTask };

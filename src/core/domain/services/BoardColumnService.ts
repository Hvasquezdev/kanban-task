import { BoardSubtask, BoardTask } from '../models/Board';

type CreateBoardTaskParams = {
  name: string;
  description: string;
  columnId: string;
  subtaskNames: string[];
};

type EditBoardTaskParams = {
  id: string;
  name: string;
  description: string;
  columnId: string;
  subtasks: Array<Omit<BoardSubtask, 'isCompleted'>>;
} & Omit<CreateBoardTaskParams, 'subtaskNames'>;

interface BoardColumnService {
  createTask(params: CreateBoardTaskParams): Promise<BoardTask>;
  deleteTask(id: string): Promise<void>;
  editTask(id: string, params: EditBoardTaskParams): Promise<void>;
  getTaskById(id: string): Promise<BoardTask>;
}

export type { CreateBoardTaskParams, BoardColumnService, EditBoardTaskParams };

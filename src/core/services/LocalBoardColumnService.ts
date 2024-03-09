import { BoardTask } from '../domain/models/Board';
import { BoardColumnService, CreateBoardTaskParams, EditBoardTaskParams } from '../domain/services/BoardColumnService';
import BoardRepository, { BoardRepositoryTask } from '../repositories/BoardRepository';
import RandomUuidGenerator from '../utils/common';

export default class LocalBoardColumnService implements BoardColumnService {
  private readonly boardRepository = BoardRepository;

  public async createTask(params: CreateBoardTaskParams): Promise<BoardTask> {
    const currentBoard = await this.boardRepository.getByColumnId(params.columnId);
    const currentColumn = currentBoard.columns.find((col) => col.id === params.columnId);

    if (!currentColumn) {
      throw new Error('An error occurred while creating the task, column not found.');
    }

    const subtasks = params.subtaskNames.map((subTaskName) => {
      return {
        name: subTaskName,
        isCompleted: false,
        id: RandomUuidGenerator.get(),
        columnId: params.columnId
      };
    });

    const newTask: BoardRepositoryTask = {
      column: { name: currentColumn.name, id: currentColumn.id },
      description: params.description,
      id: RandomUuidGenerator.get(),
      name: params.name,
      subtasks,
      boardId: currentBoard.id
    };

    this.boardRepository.update({
      ...currentBoard,
      columns: currentBoard.columns.map((column) => {
        if (column.id === params.columnId) {
          column.tasks.push(newTask);
        }

        return column;
      })
    });

    return newTask;
  }

  public async deleteTask(id: string): Promise<void> {
    const currentBoard = await this.boardRepository.getByTaskId(id);

    const currentColumn = currentBoard.columns.find((column) => {
      return column.tasks.some((task) => task.id === id);
    });

    if (!currentColumn) {
      throw new Error('An error occurred while creating the task, column not found.');
    }

    await this.boardRepository.update({
      ...currentBoard,
      columns: currentBoard.columns.map((column) => {
        if (column.id === currentColumn.id) {
          return {
            ...column,
            tasks: currentColumn.tasks.filter((taksItem) => taksItem.id !== id)
          };
        }

        return column;
      })
    });

    return undefined;
  }

  public async editTask(id: string, params: EditBoardTaskParams): Promise<void> {
    const currentBoard = await this.boardRepository.getByColumnId(params.columnId);
    const targetColumn = currentBoard.columns.find((col) => col.id === params.columnId);

    if (!targetColumn) {
      throw new Error('An error occurred while creating the task, column not found.');
    }

    const currentTask = targetColumn.tasks.find((task) => task.id === id);

    if (!currentTask) {
      throw new Error('An error occurred while updating the task, task not found.');
    }

    let newBoardColumns = [...currentBoard.columns];

    if (targetColumn.id !== currentTask.column.id) {
      newBoardColumns = newBoardColumns.map((column) => {
        // Delete from current column
        if (column.id === currentTask.column.id) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== currentTask.id)
          };
        }

        // Add to target column
        if (column.id === targetColumn.id) {
          return { ...column, tasks: [...column.tasks, currentTask] };
        }

        return column;
      });
    }

    const updatedTask: BoardRepositoryTask = {
      ...currentTask,
      description: params.description,
      name: params.name,
      subtasks: [], // Todo: Implement subtasks update logic
      boardId: currentBoard.id
    };

    newBoardColumns = newBoardColumns.map((column) => {
      if (column.id === targetColumn.id) {
        return {
          ...column,
          tasks: column.tasks.map((task) => (task.id === id ? updatedTask : task))
        };
      }

      return column;
    });

    this.boardRepository.update({
      ...currentBoard,
      columns: newBoardColumns
    });

    return undefined;
  }

  public async getTaskById(id: string): Promise<BoardTask> {
    const currentBoard = await this.boardRepository.getByTaskId(id);

    const currentColumn = currentBoard.columns.find((column) => {
      return column.tasks.some((task) => task.id === id);
    });

    if (!currentColumn) {
      throw new Error('An error occurred while getting the task, column not found.');
    }

    const currentTask = currentColumn.tasks.find((task) => task.id === id);

    if (!currentTask) {
      throw new Error('An error occurred while getting the task, task not found.');
    }

    return {
      name: currentTask.name,
      subtasks: currentTask.subtasks,
      id: currentTask.id,
      description: currentTask.description,
      column: { name: currentColumn.name, id: currentColumn.id }
    };
  }
}

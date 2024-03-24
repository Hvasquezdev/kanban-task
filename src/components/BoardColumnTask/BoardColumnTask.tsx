import BaseCard from '../BaseCard';
import BaseHeading from '../BaseHeading';
import './BoardColumnTask.css';

interface BoardColumnTaskProps {
  name: string;
  subtasks: {
    completed: number;
    total: number;
  };
}

function BoardColumnTask({ name, subtasks }: BoardColumnTaskProps) {
  return (
    <BaseCard className="board-column-task">
      <BaseHeading variant="h5" size="md" className="board-column-task__name" fontWeight="bold">
        {name}
      </BaseHeading>
      {subtasks.total > 0 && (
        <BaseHeading variant="h6" size="sm" className="board-column-task__subtask" fontWeight="bold">
          {subtasks.completed} of {subtasks.total} subtasks
        </BaseHeading>
      )}
    </BaseCard>
  );
}

export default BoardColumnTask;

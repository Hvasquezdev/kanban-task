import BaseHeading from '../BaseHeading';
import './BoardNewColumn.css';

interface BoardNewColumnProps {
  onClick?: () => void;
  label?: string;
}

function BoardNewColumn({ onClick, label = '' }: BoardNewColumnProps) {
  return (
    <button className="board-new-column" onClick={onClick}>
      <BaseHeading variant="h6" size="xl" className="board-new-column__label" fontWeight="bold">
        {label}
      </BaseHeading>
    </button>
  );
}

export default BoardNewColumn;

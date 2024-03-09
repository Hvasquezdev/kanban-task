enum BoardErrorName {
  ExistingBoardName = 'BOARD_NAME_ALREADY_EXIST',
  ExistingColumnName = 'COLUMN_NAME_ALREADY_EXIST',
  ExistingTaskName = 'TASK_NAME_ALREADY_EXIST',
  ExistingSubtaskName = 'SUBTASK_NAME_ALREADY_EXIST'
}

const BoardErrorMessages: { [name in BoardErrorName]: string } = {
  [BoardErrorName.ExistingBoardName]: 'A board with the same name already exist, please try another name.',
  [BoardErrorName.ExistingColumnName]: '',
  [BoardErrorName.ExistingTaskName]: '',
  [BoardErrorName.ExistingSubtaskName]: ''
};

enum BoardColumnColorKey {
  ImperialPurple = 'IMPERIAL_PURPLE',
  SkyBlue = 'SKY_BLUE',
  BlushGreen = 'BLUSH_GREEN',
  Salmon = 'SALMON',
  Gray = 'GRAY'
}

const BOARD_COLUMN_COLORS_HEX: { [name in BoardColumnColorKey]: string } = {
  [BoardColumnColorKey.ImperialPurple]: '#8471F2',
  [BoardColumnColorKey.SkyBlue]: '#49C4E5',
  [BoardColumnColorKey.BlushGreen]: '#67E2AE',
  [BoardColumnColorKey.Salmon]: '#FF9898',
  [BoardColumnColorKey.Gray]: '#828FA3'
};

const BOARD_COLUMN_COLORS_LABELS: { [name in BoardColumnColorKey]: string } = {
  [BoardColumnColorKey.ImperialPurple]: 'Imperial purple',
  [BoardColumnColorKey.SkyBlue]: 'Sky blue',
  [BoardColumnColorKey.BlushGreen]: 'Blush green',
  [BoardColumnColorKey.Salmon]: 'Salmon',
  [BoardColumnColorKey.Gray]: 'Gray'
};

export { BOARD_COLUMN_COLORS_HEX, BOARD_COLUMN_COLORS_LABELS, BoardColumnColorKey, BoardErrorMessages, BoardErrorName };

export type BoardPartial = {
  id: string;
  name: string;
  ownerId: string;
  editorsIds: string[];
};

export type Board = {
  id: string;
  name: string;
  cols: BoardCol[];
  ownerId: string;
  editorsIds: string[];
};

export type BoardCol = {
  id: string;
  name: string;
  items: BoardCard[];
};

export type BoardCard = {
  id: string;
  name: string;
  assigneeId?: string;
};

export type CreateBoardData = {
  name: string;
  ownerId: string;
  editorsIds: string[];
};

export type UpdateBoardData = {
  name?: string;
  ownerId?: string;
  editorsIds?: string[];
};

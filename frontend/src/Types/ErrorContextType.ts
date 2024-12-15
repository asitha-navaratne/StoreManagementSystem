type ErrorContextType = {
  errorList: ErrorListItemType[];
  newError: ErrorListItemType | null;
  errorCount: number;
  handlePushError: (error: ErrorListItemType) => void;
  handleRemoveError: (id: number) => void;
};

export type ErrorListItemType = {
  id: number;
  type: string;
  component: string;
  description: string;
};

export type ErrorContextStateType = {
  errorList: ErrorListItemType[];
  newError: ErrorListItemType | null;
};

export type ErrorContextActionType =
  | {
      type: "PUSH";
      payload: ErrorListItemType;
    }
  | { type: "REMOVE"; payload: number };

export default ErrorContextType;

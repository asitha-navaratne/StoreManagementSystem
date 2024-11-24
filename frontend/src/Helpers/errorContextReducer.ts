import {
  ErrorContextStateType,
  ErrorContextActionType,
} from "../Types/ErrorContextType";

function errorContextReducer(
  state: ErrorContextStateType,
  action: ErrorContextActionType
): ErrorContextStateType {
  switch (action.type) {
    case "push":
      return {
        errorList: [action.payload, ...state.errorList],
        newError: action.payload,
      };
    case "remove":
      return {
        errorList: [
          ...state.errorList.filter((item) => item.id !== action.payload),
        ],
        newError: null,
      };
    default:
      return { ...state };
  }
}

export default errorContextReducer;

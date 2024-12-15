import {
  ErrorContextStateType,
  ErrorContextActionType,
} from "../Types/ErrorContextType";

function errorContextReducer(
  state: ErrorContextStateType,
  action: ErrorContextActionType
): ErrorContextStateType {
  switch (action.type) {
    case "PUSH":
      return {
        errorList: [action.payload, ...state.errorList],
        newError: action.payload,
      };
    case "REMOVE":
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

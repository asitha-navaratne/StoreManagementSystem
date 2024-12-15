import { createContext, FC, useCallback, useMemo, useReducer } from "react";

import ErrorContextType, { ErrorListItemType } from "../Types/ErrorContextType";
import ContextProviderProps from "../Types/ContextProviderProps";

import errorContextReducer from "../Helpers/errorContextReducer";

export const ErrorContext = createContext<ErrorContextType | null>(null);

const ErrorProvider: FC<ContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(errorContextReducer, {
    errorList: [],
    newError: null,
  });

  const handlePushError = useCallback(function (error: ErrorListItemType) {
    dispatch({ type: "PUSH", payload: error });
  }, []);

  const handleRemoveError = useCallback(function (id: number) {
    dispatch({ type: "REMOVE", payload: id });
  }, []);

  const errorCount = useMemo(() => state.errorList.length, [state.errorList]);

  const payload = {
    errorList: state.errorList,
    newError: state.newError,
    errorCount,
    handlePushError,
    handleRemoveError,
  };

  return (
    <ErrorContext.Provider value={payload}>{children}</ErrorContext.Provider>
  );
};

export default ErrorProvider;

import { createContext, useCallback, useMemo, useReducer } from "react";

import ContextProviderPropTypes from "../Types/ContextProviderPropTypes";
import ErrorContextType, { ErrorListItemType } from "../Types/ErrorContextType";
import errorContextReducer from "../Helpers/errorContextReducer";

export const ErrorContext = createContext<ErrorContextType | null>(null);

const ErrorProvider = ({ children }: ContextProviderPropTypes) => {
  const [state, dispatch] = useReducer(errorContextReducer, {
    errorList: [],
    newError: null,
  });

  const handlePushError = useCallback(function (error: ErrorListItemType) {
    dispatch({ type: "push", payload: error });
  }, []);

  const handleRemoveError = useCallback(function (id: number) {
    dispatch({ type: "remove", payload: id });
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

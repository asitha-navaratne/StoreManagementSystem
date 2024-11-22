import { useContext } from "react";

import { ErrorContext } from "../Contexts/ErrorProvider";

const useErrorContext = () => {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error(
      "useErrorContext must be called within the Error Context Provider"
    );
  }

  return context;
};

export default useErrorContext;

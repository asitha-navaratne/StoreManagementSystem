import { AxiosError } from "axios";
import randomInteger from "random-int";

import { ErrorListItemType } from "../Types/ErrorContextType";
import StoreManagementSystemErrorType from "../Types/StoreManagementSystemErrorType";

function handleErrors<T extends { id: number }>(
  err: AxiosError<StoreManagementSystemErrorType<T>, T>,
  component: string
): { errorObject: ErrorListItemType; id: number } {
  const errorId = randomInteger(2 ** 9, 2 ** 10);

  const processedErrorObject = {
    id: errorId,
    type: "error",
    description: "",
    component,
  };

  if (err?.response?.status === 422) {
    processedErrorObject["description"] =
      err.response.data.errors[0].msg +
      ': Field "' +
      err.response.data.errors[0].loc[1] +
      '"';
  } else if (err.response?.data?.message) {
    processedErrorObject["description"] = err.response.data.message;
  } else if (err.message && typeof err.message === "string") {
    console.log(err);
    processedErrorObject["description"] = err.message;
  } else {
    processedErrorObject["description"] =
      err.response?.data.message ??
      err.response?.data.errors[0].msg ??
      "An error occurred!";
  }

  const id = err.response?.data.body?.id ?? 0;

  return { errorObject: processedErrorObject, id };
}

export default handleErrors;

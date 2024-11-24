type FastApiErrorType = {
  input?: string | null;
  loc: string[];
  msg: string;
  type: string;
};

type StoreManagementSystemErrorType<T> = {
  message: string;
  errors: FastApiErrorType[];
  body: T;
  detail?: FastApiErrorType[];
};

export default StoreManagementSystemErrorType;

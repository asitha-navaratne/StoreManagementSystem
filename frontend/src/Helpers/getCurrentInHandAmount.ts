const getCurrentInHandAmount = function (
  enteredAmount: number | string | null,
  previousStockAmount: number,
  purchasedAmount: number
): number {
  if (typeof enteredAmount !== "number") {
    return 0;
  } else if (enteredAmount > previousStockAmount + purchasedAmount) {
    return previousStockAmount + purchasedAmount;
  } else {
    return enteredAmount;
  }
};

export default getCurrentInHandAmount;

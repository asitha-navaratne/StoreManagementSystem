import dayjs from "dayjs";

import StockMovementsGridColumnsType from "../Views/StockMovementsPage/types/GridColumnsType";

const getHeadersForGroupedColumns = function (
  row: StockMovementsGridColumnsType | null
): string[] {
  const firstRecordDate = row?.recordDate ? dayjs(row?.recordDate) : dayjs();

  const secondRecordDate = row?.secondRecordDate
    ? dayjs(row?.secondRecordDate)
    : dayjs(firstRecordDate).subtract(1, "day");

  const thirdRecordDate = row?.thirdRecordDate
    ? dayjs(row?.thirdRecordDate)
    : dayjs(secondRecordDate).subtract(1, "day");

  const fourthRecordDate = row?.fourthRecordDate
    ? dayjs(row?.fourthRecordDate)
    : dayjs(thirdRecordDate).subtract(1, "day");

  return [
    firstRecordDate.format("YYYY-MM-DD"),
    secondRecordDate.format("YYYY-MM-DD"),
    thirdRecordDate.format("YYYY-MM-DD"),
    fourthRecordDate.format("YYYY-MM-DD"),
  ];
};

export default getHeadersForGroupedColumns;

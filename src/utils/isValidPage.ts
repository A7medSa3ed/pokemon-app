export const isValidPage = (page: number) => {
  if (!page || typeof page !== "number" || isNaN(page)) {
    throw new Error("Invalid page number: must be a number greater than 0");
  }
  return page;
};

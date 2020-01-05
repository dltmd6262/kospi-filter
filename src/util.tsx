export const sanitizeCompanyCode = (code: string): string => {
  while (code.length !== 6) {
    code = "0" + code;
  }

  return code;
};

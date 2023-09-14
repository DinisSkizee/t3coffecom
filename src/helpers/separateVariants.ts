export const separateVariants = (variantsString: string): string[] => {
  const variantsList = variantsString.split(" / ");

  const result: string[] = [];

  for (const item of variantsList) {
    if (item.includes(" & ")) {
      const parts = item.split(" & ");
      result.push(...parts);
    } else {
      result.push(item);
    }
  }

  return result;
};

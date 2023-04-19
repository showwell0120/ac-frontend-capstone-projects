export interface CategoryName {
  emoji: string;
  text: string;
}

export function splitCategoryName(categoryName: string): CategoryName {
  const [emoji, text] = categoryName.split(':');
  return { emoji, text };
}

export function mergeCategoryName(categoryName: CategoryName): string {
  return Object.values(categoryName).join(':');
}

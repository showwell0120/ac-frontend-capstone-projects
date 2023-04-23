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

export function getGreeting() {
  const time = new Date().getHours();

  if (time >= 5 && time < 12) {
    return '早安';
  } else if (time >= 12 && time < 18) {
    return '午安';
  } else {
    return '晚安';
  }
}

export function transformDuration(durationInMs: number) {
  const durationInSeconds = Math.round(durationInMs / 1000);
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds - hours * 3600) / 60);

  if (hours > 0 && minutes > 0) {
    return `${hours} 時 ${minutes} 分`;
  } else if (hours > 0) {
    return `${hours} 時`;
  } else {
    return `${minutes} 分`;
  }
}

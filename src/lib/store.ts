export type Item = {
  id: string;
  name: string;
  priceCents: number;
  categoryId: string;
};

const items: Item[] = [
  { id: 'a1', name: 'Pencil', priceCents: 199, categoryId: 'cat2' },
  { id: 'b2', name: 'Notebook', priceCents: 599, categoryId: 'cat1' },
  { id: 'c3', name: 'Eraser', priceCents: 149, categoryId: 'cat3' },
];

export function listItems(): Item[] {
  return items.slice();
}

export function getItemById(id: string): Item | undefined {
  return items.find((x) => x.id === id);
}

export function getItemsByCategoryId(categoryId: string): Item[] {
  return items.filter((x) => x.categoryId === categoryId);
}

export type Category = {
  id: string;
  name: string;
  description: string;
};

const categories: Category[] = [
  { id: 'cat1', name: 'Office Supplies', description: 'Essential office supplies for everyday use' },
  { id: 'cat2', name: 'Writing Tools', description: 'Pens, pencils, and markers' },
  { id: 'cat3', name: 'Art Supplies', description: 'Materials for creative projects' },
];

export function listCategories(): Category[] {
  return categories.slice();
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((x) => x.id === id);
}

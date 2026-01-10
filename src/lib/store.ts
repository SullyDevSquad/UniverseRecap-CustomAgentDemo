export type Item = {
  id: string;
  name: string;
  priceCents: number;
};

const items: Item[] = [
  { id: 'a1', name: 'Pencil', priceCents: 199 },
  { id: 'b2', name: 'Notebook', priceCents: 599 },
  { id: 'c3', name: 'Eraser', priceCents: 149 },
];

export function listItems(): Item[] {
  return items.slice();
}

export function getItemById(id: string): Item | undefined {
  return items.find((x) => x.id === id);
}

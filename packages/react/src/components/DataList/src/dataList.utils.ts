import { faker } from "@faker-js/faker";

export interface RowProps {
  id: number;
  date: Date;
  clientName: string;
  total: string;
  qty: string;
  status: boolean;
}

export const generateOrders = (count: number): RowProps[] => {
  const orders: RowProps[] = [];
  for (let i = 1; i <= count; i += 1) {
    orders.push({
      id: i,
      date: faker.date.recent(15),
      clientName: faker.name.fullName(),
      total: faker.finance.amount(3, 100000, 2, "R$", true),
      qty: faker.random.numeric(),
      status: false,
    });
  }
  return orders.reverse();
};

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

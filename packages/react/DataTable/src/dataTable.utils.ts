import { faker } from "@faker-js/faker";

export interface RowProps {
  id: number;
  clientName: string;
  total: string;
  qty: string;
  status: boolean;
}

type OrderProps = RowProps;

export const generateOrders = (count: number): OrderProps[] => {
  const orders: OrderProps[] = [];
  for (let i = 1; i <= count; i += 1) {
    orders.push({
      id: i,
      clientName: faker.name.fullName(),
      total: faker.finance.amount(3, 100000, 2, "R$", true),
      qty: faker.random.numeric(),
      status: false
    });
  }
  return orders.reverse();
};

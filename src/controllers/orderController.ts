import { Order } from "../models/order";
import { v4 as uuidv4 } from "uuid";

const orders: Order[] = [];

export const listOrders = (): Order[] => orders;

export const getOrder = (id: string): Order | undefined =>
  orders.find((o) => o.id === id);

export const createOrder = (data: Partial<Order>): Order => {
  const order: Order = {
    id: uuidv4(),
    item: data.item || "",
    qty: data.qty || 0,
    price: data.price || 0,
    status: data.status || "pending",
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  return order;
};

export const updateOrder = (id: string, data: Partial<Order>): Order | undefined => {
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return undefined;
  orders[idx] = { ...orders[idx], ...data } as Order;
  return orders[idx];
};

export const deleteOrder = (id: string): boolean => {
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return false;
  orders.splice(idx, 1);
  return true;
};

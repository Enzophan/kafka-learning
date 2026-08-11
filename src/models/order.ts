export interface Order {
  id: string;
  item: string;
  qty: number;
  price: number;
  status?: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}

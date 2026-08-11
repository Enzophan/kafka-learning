import { Router } from "express";
import {
  listOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController";

const router = Router();

router.get("/", (req, res) => {
  res.json(listOrders());
});

router.get("/:id", (req, res) => {
  const order = getOrder(req.params.id);
  if (!order) return res.status(404).json({ error: "Not found" });
  res.json(order);
});

router.post("/", (req, res) => {
  const created = createOrder(req.body);
  res.status(201).json(created);
});

router.put("/:id", (req, res) => {
  const updated = updateOrder(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

router.delete("/:id", (req, res) => {
  const ok = deleteOrder(req.params.id);
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
});

export default router;

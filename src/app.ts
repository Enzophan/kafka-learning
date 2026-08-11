import express from "express";
import ordersRouter from "./routes/orders";

const app = express();

app.use(express.json());
app.use("/orders", ordersRouter);

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Order API" });
});

export default app;

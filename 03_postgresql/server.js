import 'dotenv/config';
import express from "express";
import { db } from './db.js';
import { cars } from './schema.js';
import { eq } from 'drizzle-orm';
import cors from 'cors'; 

const app = express();
const PORT = 3000;

const router = express.Router();
app.use(cors()); 
app.use(express.json());

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello from Car API!");
});

router.get("/cars", async (req, res, next) => {
  try {
    const allCars = await db.select().from(cars);
    res.json(allCars);
  } catch (e) { next(e); }
});

router.post("/cars", async (req, res, next) => {
  try {
    const { make, model, year, price } = req.body;
    if (!make || !model || !year || !price) return res.status(400).json({ error: "Missing fields" });

    const [newCar] = await db.insert(cars).values({ make, model, year, price }).returning();
    res.status(201).json(newCar);
  } catch (e) { next(e); }
});

router.put("/cars/:id", async (req, res, next) => {
  try {
    const carId = parseInt(req.params.id);
    const { make, model, year, price } = req.body;

    const [updatedCar] = await db.update(cars)
      .set({ make, model, year, price })
      .where(eq(cars.id, carId)) // Fixed syntax
      .returning();

    if (!updatedCar) return res.status(404).json({ error: "Car not found" });
    res.json(updatedCar);
  } catch (e) { next(e); }
});

router.delete("/cars/:id", async (req, res, next) => {
  try {
    const carId = parseInt(req.params.id);
    const [deletedCar] = await db.delete(cars)
      .where(eq(cars.id, carId)) // Fixed syntax
      .returning();

    if (!deletedCar) return res.status(404).json({ error: "Car not found" });
    res.json({ message: "Car deleted successfully", car: deletedCar });
  } catch (e) { next(e); }
});

router.get("/cars/:id", async (req, res, next) => {
  try {
    const carId = parseInt(req.params.id);
    const [car] = await db.select().from(cars).where(eq(cars.id, carId)); // Fixed syntax

    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json(car);
  } catch (e) { next(e); }
});

app.use("/api/v1", router);

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

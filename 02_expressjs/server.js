import express, { application } from 'express';

const app = express();
const PORT = 3000; 

const router = express.Router();

app.use(express.json());

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
})

let cars = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2020, price: 28000},
    { id: 2, make: 'Tesla', model: 'Model S', year: 2019, price: 25000 },
    { id: 3, make: 'Ford', model: 'Mustang', year: 2021, price: 35000 }
];

app.get('/', (req, res) => {
    res.send('Hello from the Cars API!');
});

router.get('/', (req, res) => {
    res.json(cars);
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const car = cars.find(car => car.id === id);

    if(!car) return res.status(404).send('Car not found');
    res.json(car);
});

router.post('/', (req, res) => {
    const { make, model, year, price } = req.body;

    if (!make || !model || !year || !price) {
        return res.status(400).json({ message: 'Make, model, year and price are required' });
    }
    const newCar = {
        id: cars.length + 1,
        make,
        model,
        year: Number(year),
        price: Number(price)
    };
    cars.push(newCar);
    res.status(201).json(newCar);
});

router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = cars.findIndex(car => car.id === id);

    if (index === -1) return res.status(404).send('Car not found');

    const { make, model, year, price } = req.body;
    if (!make || !model || !year || !price) {
        return res.status(400).json({ message: 'Make, model, year and price are required' });
    }
    cars[index] = { ...cars[index], make, model, year: Number(year), price: Number(price) };
    res.status(201).json({ message: 'Car updated' });
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const car = cars.find(car => car.id === id);
    if(!car) return res.status(404).send('Car not found');
    const carIndex = cars.findIndex(car => car.id === id);
    cars.splice(carIndex, 1);
    res.status(201).json({ message: 'Car deleted' });
});

app.use('/api/v1/cars', router);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
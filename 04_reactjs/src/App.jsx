import Car from './components/Car.jsx';
import CarForm from './components/CarForm.jsx'; // Make sure to import your form!
import { useState, useEffect } from 'react';

const App = () => {
    const [cars, setCars] = useState([]);

    // 1. Initial Data Fetch (GET)
    useEffect(() => {
        fetch('/api/v1/cars')
            .then(res => res.json())
            .then(data => setCars(data))
            .catch(err => console.error(err));
    }, []);

    // 2. Logic Functions (POST, PUT, DELETE)
    const addCar = async (car) => {
        try {
            const res = await fetch('/api/v1/cars', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(car)
            });
            const newCar = await res.json();
            setCars([...cars, newCar]);
        } catch (err) { console.error(err); }
    };

    const updateCar = async (id, updatedCar) => {
        try {
            const res = await fetch(`/api/v1/cars/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCar)
            });
            const updated = await res.json();
            setCars(cars.map(car => car.id === id ? updated : car));
        } catch (err) { console.error(err); }
    };

    const deleteCar = async (id) => {
        try {
            await fetch(`/api/v1/cars/${id}`, { method: 'DELETE' });
            setCars(cars.filter(car => car.id !== id));
        } catch (err) { console.error(err); }
    };

    // 3. The Single UI Return
    return ( 
        <div>
            <h1>Car Store administrator page</h1>

            {/* The Entry Panel */}
            <CarForm onAdd={addCar} />

            {/* The Results Display */}
            <ul>
                {cars.map(car => (
                    <Car 
                        key={car.id} 
                        {...car} 
                        onDelete={deleteCar} 
                        onUpdate={updateCar} 
                    />
                ))}
            </ul>
        </div>
    );
};

export default App;
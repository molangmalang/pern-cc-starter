import { useState } from 'react';

const CarForm = ({ onAdd }) => {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the page from refreshing
        onAdd({ make, model, year, price }); // Sends the new "culture" data to the manager
        setMake(''); setModel(''); setYear(''); setPrice(''); // Clears the form
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={make} onChange={(e) => setMake(e.target.value)} placeholder="Make" />
            <input value={model} onChange={(e) => setModel(e.target.value)} placeholder="Model" />
            <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" />
            <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
            <button type="submit">Add Car</button>
        </form>
    );
};

export default CarForm;
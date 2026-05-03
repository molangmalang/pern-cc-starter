import { useState } from 'react';

const Car = ({ id, make, model, year, price, onUpdate, onDelete }) => {
    // 1. Local state to track if we are in "Edit Mode"
    const [isEditing, setIsEditing] = useState(false);
    
    // 2. Local state to hold the "Temporary" changes before saving
    const [editCar, setEditCar] = useState({ make, model, year, price });

    const handleSave = () => {
        onUpdate(id, editCar); // Send the whole updated object to App.jsx
        setIsEditing(false);   // Switch back to display mode
    };

    // If Editing, show the "Lab Entry" view
    if (isEditing) {
        return (
            <li style={{ borderBottom: '1px solid #ccc', padding: '10px', listStyle: 'none' }}>
                <input value={editCar.make} onChange={(e) => setEditCar({...editCar, make: e.target.value})} />
                <input value={editCar.model} onChange={(e) => setEditCar({...editCar, model: e.target.value})} />
                <input type="number" value={editCar.year} onChange={(e) => setEditCar({...editCar, year: Number(e.target.value)})} />
                <input type="number" value={editCar.price} onChange={(e) => setEditCar({...editCar, price: Number(e.target.value)})} />
                
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </li>
        );
    }

    // Otherwise, show the standard "Results" view
    return (
        <li style={{ borderBottom: '1px solid #ccc', padding: '10px', listStyle: 'none' }}>
            <h3>{make} {model}</h3>
            <p>Year: {year} | Price: ${price}</p>
            <button onClick={() => setIsEditing(true)}>Edit Car</button>
            <button onClick={() => onDelete(id)} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
        </li>
    );
};

export default Car;
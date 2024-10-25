import React, { useState } from 'react';
import axios from 'axios';

const TemperatureConverter = () => {
    const [celsius, setCelsius] = useState('');
    const [fahrenheit, setFahrenheit] = useState(null);
    const [error, setError] = useState(null);

    const handleConvert = async () => {
        try {
            setError(null);  // Clear previous errors
            const response = await axios.get('https://deployment-practice-five-beta.vercel.app/convert', {
                params: { celsius }
            });
            setFahrenheit(response.data.fahrenheit);  // Set the Fahrenheit value
        } catch (err) {
            setError(err.response ? err.response.data.error : 'Error converting temperature');
        }
    };

    return (
        <div>
            <h2>Convert Celsius to Fahrenheit</h2>
            <input
                type="number"
                value={celsius}
                onChange={(e) => setCelsius(e.target.value)}
                placeholder="Enter Celsius"
            />
            <button onClick={handleConvert}>Convert</button>

            {fahrenheit !== null && (
                <p>{celsius}°C is equal to {fahrenheit}°F</p>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default TemperatureConverter;

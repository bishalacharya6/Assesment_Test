import React, { useState, useEffect } from 'react';

const AddCountry = () => {
    const [countries, setCountries] = useState([]);
    const [newCountryName, setNewCountryName] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/country');
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const handleAddCountry = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/country', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ country: newCountryName }),
            });

            const data = await response.json();
            setCountries(prevCountries => [...prevCountries, data]);
            setNewCountryName('');
        } catch (error) {
            console.error('Error adding country:', error);
        }
    };

    return (
        <div className="container mx-auto mt-8 px-20">
            {/* Add Country Section at the top */}
            <div className="mb-4">
                <div className='flex justify-center'>
                    <h2 className="text-2xl font-bold mb-4">Add Country</h2>
                </div>
                <div className='flex justify-center'>
                    <input
                        className="border p-2 mr-2"
                        type="text"
                        placeholder="Enter Country Name"
                        value={newCountryName}
                        onChange={(e) => setNewCountryName(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white p-2 rounded"
                        onClick={handleAddCountry}
                    >
                        Add Country
                    </button>
                </div>
            </div>

            {/* List of Countries Section below */}
            <div>
                <h2 className="text-2xl font-bold mb-4">List of Countries</h2>
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Country Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countries.map(country => (
                            <tr key={country._id} className="border">
                                <td className="border p-2">{country.country}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddCountry;

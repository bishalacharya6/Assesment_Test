import React, { useState, useEffect } from 'react';

const AddCities = () => {
  const [cities, setCities] = useState([]);
  const [newCityName, setNewCityName] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/cities');
        const data = await response.json();
        console.log(data)
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  const handleAddCity = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: newCityName }),
      });

      const data = await response.json();
      setCities(prevCities => [...prevCities, data]);
      setNewCityName('');
    } catch (error) {
      console.error('Error adding city:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 px-20">
      {/* Add City Section at the top */}
      <div className="mb-4 flex justify-center">
        <h2 className="text-2xl font-bold mb-4">Add City</h2>
      </div>
      <div className="mb-4 flex justify-center">
        <input
          className="border p-2 mr-2"
          type="text"
          placeholder="Enter City Name"
          value={newCityName}
          onChange={(e) => setNewCityName(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={handleAddCity}
        >
          Add City
        </button>
      </div>

      {/* List of Cities Section below */}
      <div>
        <h2 className="text-2xl font-bold mb-4">List of Cities</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">City Name</th>
            </tr>
          </thead>
          <tbody>
            {cities.map(city => (
              <tr key={city._id} className="border">
                <td className="border p-2">{city.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddCities;

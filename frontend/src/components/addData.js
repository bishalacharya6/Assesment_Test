import React, { useState, useEffect } from 'react';

const AddData = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedpopulation, setSelectedpopulation] = useState('');
  const [old, setOld] = useState(0);
  const [young, setYoung] = useState(0);
  const [children, setChildren] = useState(0);
  const [error, setError] = useState('');
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);


  // Dummy data for demonstration purposes
  // const countries = ['India', 'Nepal', 'Bangladesh', 'Bhutan'];
  // const citiesByCountry = {
  //   India: ['Delhi', 'Mumbai', 'Bangalore'],
  //   Nepal: ['Kathmandu', 'Pokhara', 'Chitwan'],
  //   Bangladesh: ['Dhaka', 'Chittagong', 'Sylhet'],
  //   Bhutan: ['Thimphu', 'Paro', 'Phuentsholing'],
  // };
  const population = ['100000', '5000000', '6000000'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      country: selectedCountry,
      city: selectedCity,
      population: selectedpopulation,
      old,
      young,
      children,
    };

    try {
      const response = await fetch('http://localhost:8000/api/population', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();
      console.log(json)

      // Check if the response indicates success
      if (response.ok) {
        window.alert('Data added successfully!');
        // Reset form and clear error on success
        setError('');
        setSelectedCountry('');
        setSelectedCity('');
        setSelectedpopulation('');
        setOld(0);
        setYoung(0);
        setChildren(0);
      } else {
        // Handle server-side errors
        setError(json.message || 'An unknown error occurred.');
      }
    } catch (error) {
      console.error(error);
      // Handle network errors
      setError('Failed to connect to the server. Please try again later.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'country':
        setSelectedCountry(value);
        // Reset city when the country changes
        setSelectedCity('');
        break;
      case 'city':
        setSelectedCity(value);
        break;
      case 'population':
        setSelectedpopulation(value);
        break;
      case 'old':
        setOld(value);
        break;
      case 'young':
        setYoung(value);
        break;
      case 'children':
        setChildren(value);
        break;
      default:
        break;
    }
  };

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

    const fetchCities = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/cities');
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCountries();
    fetchCities();
  }, []);

  return (
    <div className="flex justify-center items-center px-40">
      <div className="container p-6">
        <h1 className="text-3xl font-semibold mb-6">Add Data</h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* First Pair: Country Dropdown & City Dropdown */}
          <div className="flex mb-4">
            <div className="mr-4 w-1/2">
              <label htmlFor="country" className="block text-sm font-medium text-gray-600">
                Select Country:
              </label>
              <select
                id="country"
                name="country"
                className="mt-1 p-2 border rounded-md w-full"
                value={selectedCountry}
                onChange={handleChange}
              >
                <option value="">-- Select Country --</option>
                {countries.map((country) => (
                  <option key={country._id} value={country.country}>
                    {country.country}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-1/2">
              <label htmlFor="city" className="block text-sm font-medium text-gray-600">
                Select City:
              </label>
              <select
                id="city"
                name="city"
                className="mt-1 p-2 border rounded-md w-full"
                value={selectedCity}
                onChange={handleChange}
              >
                <option value="">-- Select City --</option>
                {cities.map((city) => (
                    <option key={city._id} value={city.city}>
                      {city.city}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Second Pair: Population Range Dropdown & Old Population Input */}
          <div className="flex mb-4">
            <div className="mr-4 w-1/2">
              <label htmlFor="population" className="block text-sm font-medium text-gray-600">
                Select Population Range:
              </label>
              <select
                id="population"
                name="population"
                className="mt-1 p-2 border rounded-md w-full"
                value={selectedpopulation}
                onChange={handleChange}
              >
                <option value="">-- Select Population Range --</option>
                {population.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-1/2">
              <label htmlFor="old" className="block text-sm font-medium text-gray-600">
                Old Population:
              </label>
              <input
                type="number"
                id="old"
                name="old"
                className="mt-1 p-2 border rounded-md w-full"
                value={old}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Third Pair: Young Population Input & Children Population Input */}
          <div className="flex mb-4">
            <div className="mr-4 w-1/2">
              <label htmlFor="young" className="block text-sm font-medium text-gray-600">
                Young Population:
              </label>
              <input
                type="number"
                id="young"
                name="young"
                className="mt-1 p-2 border rounded-md w-full"
                value={young}
                onChange={handleChange}
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="children" className="block text-sm font-medium text-gray-600">
                Children Population:
              </label>
              <input
                type="number"
                id="children"
                name="children"
                className="mt-1 p-2 border rounded-md w-full"
                value={children}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddData;

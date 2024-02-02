import React, { useState, useEffect } from "react";
import SearchBar from "material-ui-search-bar";

const Homepage = () => {
    const [rows, setRows] = useState([]);
    const [searched, setSearched] = useState("");

    const fetchPopulationData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/population");
            const json = await response.json();
            console.log(json)

            // Check if the response indicates success
            if (response.ok) {
                setRows(json);
            } else {
                // Handle server-side errors
                console.error(
                    "Failed to fetch population data:",
                    json.message || "An unknown error occurred."
                );
            }
        } catch (error) {
            console.error("Failed to connect to the server:", error);
        }
    };

    useEffect(() => {
        fetchPopulationData();
    }, []);

    const requestSearch = (searchedVal) => {
        if (searchedVal === "") {
            fetchPopulationData(); // Fetch all data when the search bar is empty
        } else {
            const filteredRows = rows.filter((row) => {
                return (
                    row.country.toLowerCase().includes(searchedVal.toLowerCase()) ||
                    row.city.toLowerCase().includes(searchedVal.toLowerCase())
                );
            });
            setRows(filteredRows);
        }
        setSearched(searchedVal);
    };



    const cancelSearch = () => {
        setSearched("");
        // Refetch data from the backend
        fetchPopulationData();
    };

    return (
        <>
            <div className="flex justify-center items-center px-10">
                <div className="container mx-auto p-6">
                    <h1 className="text-3xl font-semibold mb-6">Population Data</h1>

                    <div className="mb-4">
                        <SearchBar
                            value={searched}
                            onChange={(searchVal) => requestSearch(searchVal)}
                            onCancelSearch={() => cancelSearch()}
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Country</th>
                                    <th className="border border-gray-300 px-4 py-2">City</th>
                                    <th className="border border-gray-300 px-4 py-2 text-right">
                                        Population
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-right">
                                        Old
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-right">
                                        Young
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-right">
                                        Children
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {(rows || []).map((row) => (
                                    <tr key={row._id}>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {row.country}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {row.city}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-right">
                                            {row.population}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-right">
                                            {row.old}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-right">
                                            {row.young}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-right">
                                            {row.children}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Homepage;

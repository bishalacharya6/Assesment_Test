import React from 'react';
import { Link, useNavigate } from 'react-router-dom'


const Navbar = () => {

    let history = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        history('/login');
    }

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    <span>Bishal</span>
                </div>

                {localStorage.getItem('token') ? (
                    <div>

                        <ul className="flex space-x-4">
                            <li>
                                <a href="/" className="text-white hover:text-gray-300">Home</a>
                            </li>
                            <li>
                                <a href="/addcountry" className="text-white hover:text-gray-300">Country</a>
                            </li>
                            <li>
                                <a href="/addcities" className="text-white hover:text-gray-300">City</a>
                            </li>
                            <li>
                                <a href="/add_data" className="text-white hover:text-gray-300">Add Data</a>
                            </li>
                        </ul>
                    </div>) : null}

                {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                    <Link className="button p-2" to="/login">Login</Link>
                    <Link className="button p-2" to="/signup">Sign Up</Link>
                </form> : <button onClick={handleLogout} className='btn btn-primary' >Logout </button>}

            </div>
        </nav >
    );
};

export default Navbar;

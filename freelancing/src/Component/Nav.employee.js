// Nav.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/nav.employee.css';

function Nav() {
    const navigate = useNavigate(); // Initialize useNavigate

    const handlePostClick = () => {
        navigate('/post'); // Navigate to the Post component
    };

    const handleProfileClick = () => {
        navigate('/profile'); // Navigate to the Profile component
    };

    return (
        <nav className="navbar">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Freelance Marketplace</a>
                <form className="d-flex" role="search">
                    <input
                        className="search me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button
                        className="searchBtn"
                        type="submit"
                    >
                        Search
                    </button>
                    <button className='posting' type='button' onClick={handlePostClick}>
                        Post
                    </button>
                    <button className='profile' type='button' onClick={handleProfileClick}>
                        Profile
                    </button>
                </form>
            </div>
        </nav>
    );
}

export default Nav;

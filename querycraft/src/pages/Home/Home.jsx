import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/VYjvhYM/library-922998-1280.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-lg">
                    <h1 className="mb-5 text-5xl font-bold">Empowering Education: Querycraft</h1>
                    <p className="mb-5">Our Queryqraft streamlines student record management, tracks academic progress, and enhances communication between students, teachers, and administrators. Simplify your educational processes and support student success with our intuitive and powerful platform.</p>
                    <button className="btn btn-primary"><Link to='/Heroregister'>Join Now</Link></button>
                </div>
            </div>
        </div>
    );
};

export default Home;
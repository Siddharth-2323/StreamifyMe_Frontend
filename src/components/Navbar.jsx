import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-zinc-800 text-white">
      <h1 className="text-xl font-bold">StreamifyMe</h1>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/library">Library</Link>
      </div>
    </nav>
  );
}

export default Navbar;

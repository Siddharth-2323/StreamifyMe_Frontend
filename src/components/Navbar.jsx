// Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-xl font-bold text-green-400">StreamifyMe</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-green-400">Home</Link>
        <Link to="/search" className="hover:text-green-400">Search</Link>
        <Link to="/library" className="hover:text-green-400">Library</Link>
      </div>
    </nav>
  );
}

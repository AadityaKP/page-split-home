import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow rounded-b-xl mb-8">
      <div className="text-2xl font-extrabold text-purple-700 tracking-tight">Dashboard</div>
      <div className="flex gap-2 bg-gray-100 rounded-full p-1">
        <Link
          to="/"
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-150 ${location.pathname === '/' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow' : 'text-purple-700 hover:bg-purple-200'}`}
        >
          Home
        </Link>
        <Link
          to="/trends"
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-150 ${location.pathname === '/trends' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow' : 'text-purple-700 hover:bg-purple-200'}`}
        >
          Trends
        </Link>
      </div>
    </nav>
  );
}

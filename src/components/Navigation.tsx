import { Link } from "react-router-dom";

export function Navigation() {
    return (
        <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <h3 className="font-bold text-gray-200">Github Search</h3>
            <span>
                <Link to="/" className="mr-8 font-bold text-yellow-300 hover:text-yellow-100">Home</Link>
                <Link to="/favourites" className="mr-2 font-bold text-yellow-300 hover:text-yellow-100">Favourites</Link>
            </span>
        </nav>
    );
}

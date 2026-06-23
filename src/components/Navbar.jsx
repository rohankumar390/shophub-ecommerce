import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

import { logout } from "../redux/slices/authSlice";

function Navbar() {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated } = useAuth();

  const cartItems = useCart().items;

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  console.log(totalItems);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg">
      {" "}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold tracking-wide">
            ShopHub
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-blue-400 transition">
              Home
            </Link>

            <Link to="/products" className="hover:text-blue-400 transition">
              Products
            </Link>

            <Link
              to="/admin/products"
              className="hover:text-blue-400 transition"
            >
              Admin
            </Link>

            <Link
              to="/cart"
              className="relative hover:text-blue-400 transition"
            >
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="border border-white hover:bg-white hover:text-slate-900 px-4 py-2 rounded-lg transition"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 pb-4">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>

            <Link to="/products" onClick={() => setIsOpen(false)}>
              Products
            </Link>

            <Link to="/admin/products" onClick={() => setIsOpen(false)}>
              Admin
            </Link>

            <Link to="/cart" onClick={() => setIsOpen(false)}>
              Cart ({totalItems})
            </Link>

            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="bg-red-500 px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="bg-blue-600 px-4 py-2 rounded-lg text-center"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="border border-white px-4 py-2 rounded-lg text-center"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

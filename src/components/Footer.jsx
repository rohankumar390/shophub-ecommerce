import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold">
              ShopHub
            </h2>

            <p className="mt-4 text-slate-300 max-w-md">
              A modern e-commerce application
              built with React, Redux Toolkit,
              React Hook Form and Tailwind CSS.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-slate-300 hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="text-slate-300 hover:text-white transition"
              >
                Products
              </Link>

              <Link
                to="/cart"
                className="text-slate-300 hover:text-white transition"
              >
                Cart
              </Link>
            </div>
          </div>
        </div>

        <hr className="border-slate-700 my-8" />

        <p className="text-center text-slate-400">
          © 2026 ShopHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
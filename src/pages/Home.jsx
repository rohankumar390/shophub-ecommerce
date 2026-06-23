import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../redux/slices/productSlice";
import useProduct from "../hooks/useProduct";
function Home() {
  const dispatch = useDispatch();

  const { products, loading } = useProduct();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-20">
      <section className="bg-linear-to-r from-slate-900 to-slate-700 text-white rounded-3xl p-8 md:p-16">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Modern Shopping
            <br />
            Made Simple
          </h1>

          <p className="mt-6 text-lg text-slate-300">
            Discover quality products, secure checkout, and a seamless shopping
            experience built with modern web technologies.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/products"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition"
            >
              Shop Now
            </Link>

            <Link
              to="/cart"
              className="border border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-slate-900 transition"
            >
              View Cart
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>

            <p className="text-gray-600">
              Get your products delivered quickly with reliable shipping
              partners.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>

            <p className="text-gray-600">
              Shop confidently with secure checkout and protected transactions.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>

            <p className="text-gray-600">
              Explore carefully curated products backed by quality standards.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>

          <Link to="/products" className="text-blue-600 font-medium">
            View All
          </Link>
        </div>

        {loading ? (
          <h2>Loading Products...</h2>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="grid md:grid-cols-4 gap-6 text-center">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-3xl font-bold text-blue-600">5K+</h3>

          <p className="text-gray-600 mt-2">Products</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-3xl font-bold text-blue-600">10K+</h3>

          <p className="text-gray-600 mt-2">Customers</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-3xl font-bold text-blue-600">99%</h3>

          <p className="text-gray-600 mt-2">Satisfaction</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-3xl font-bold text-blue-600">24/7</h3>

          <p className="text-gray-600 mt-2">Support</p>
        </div>
      </section>

      <section className="bg-slate-900 text-white rounded-3xl p-10 text-center">
        <h2 className="text-4xl font-bold">Ready to Start Shopping?</h2>

        <p className="text-slate-300 mt-4">
          Explore our product catalog and discover quality products at
          competitive prices.
        </p>

        <Link
          to="/products"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-medium transition"
        >
          Browse Products
        </Link>
      </section>
    </div>
  );
}

export default Home;

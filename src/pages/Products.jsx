import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../redux/slices/productSlice";
import useProduct from "../hooks/useProduct";

const PRODUCTS_PER_PAGE = 8;
function Products() {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { products, loading, error } = useProduct();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    switch (sortBy) {
      case "price-low-high":
        return [...filtered].sort((a, b) => a.price - b.price);

      case "price-high-low":
        return [...filtered].sort((a, b) => b.price - a.price);

      case "name-asc":
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title));

      case "name-desc":
        return [...filtered].sort((a, b) => b.title.localeCompare(a.title));

      default:
        return filtered;
    }
  }, [products, searchTerm, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <h2 className="text-2xl font-semibold">Loading Products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <h2 className="text-red-500 text-xl">{error}</h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Products</h1>

          <p className="text-gray-500 mt-2">
            Explore our collection of quality products.
          </p>
        </div>
        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium w-fit">
          Showing {paginatedProducts.length} Products
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg p-3"
        >
          <option value="">Sort By</option>

          <option value="price-low-high">Price: Low to High</option>

          <option value="price-high-low">Price: High to Low</option>

          <option value="name-asc">Name: A-Z</option>

          <option value="name-desc">Name: Z-A</option>
        </select>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">No Products Found</h2>

          <p className="text-gray-500 mt-2">
            Try searching with another keyword.
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <>
          <div className="text-center text-gray-500">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex justify-center items-center gap-2 flex-wrap">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "border"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Products;

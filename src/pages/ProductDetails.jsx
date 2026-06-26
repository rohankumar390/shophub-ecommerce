import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useProduct from "../hooks/useProduct";
import { addToCart } from "../redux/slices/cartSlice";
import { fetchProducts } from "../redux/slices/productSlice";

function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { products, loading } = useProduct();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const product = products.find((item) => item.id === Number(id));

  const handleAddToCart = useCallback(() => {
    if (!product) return;

    dispatch(addToCart(product));

    toast.success("Product added to cart");
  }, [dispatch, product]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <h2 className="text-2xl font-semibold">Loading Product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <h2 className="text-xl text-red-500">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-10 p-8">
          <div>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full rounded-xl"
            />
          </div>

          <div>
            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mb-4">
              {product.category}
            </span>

            <h1 className="text-4xl font-bold">{product.title}</h1>

            <p className="text-gray-600 mt-6 leading-7">
              {product.description}
            </p>

            <div className="mt-8">
              <p className="text-4xl font-bold text-green-600">
                ${product.price}
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <p>
                <span className="font-semibold">Brand:</span>{" "}
                {product.brand || "N/A"}
              </p>

              <p>
                <span className="font-semibold">Rating:</span>{" "}
                {product.rating || "N/A"}
              </p>

              <p>
                <span className="font-semibold">Stock:</span>{" "}
                {product.stock ?? "N/A"}
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

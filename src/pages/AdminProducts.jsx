import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { fetchProducts, deleteProduct } from "../redux/slices/productSlice";
import useProduct from "../hooks/useProduct";

function AdminProducts() {
  const dispatch = useDispatch();

  const { products, loading } = useProduct();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        {" "}
        <h2 className="text-2xl font-semibold">Loading Products... </h2>{" "}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">Product Management</h1>

          <p className="text-gray-500 mt-2">
            Manage products, edit details, and maintain inventory.
          </p>
        </div>

        <Link
          to="/admin/products/create"
          className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
        >
          Add Product
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-100 p-4 font-semibold">
          <div className="col-span-6">Product</div>

          <div className="col-span-2">Price</div>

          <div className="col-span-4 text-right">Actions</div>
        </div>

        {products.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-12 items-center p-4 border-b"
          >
            <div className="col-span-6">
              <h3 className="font-medium">{product.title}</h3>
            </div>

            <div className="col-span-2">${product.price}</div>

            <div className="col-span-4 flex justify-end gap-3">
              <Link
                to={`/admin/products/edit/${product.id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Edit
              </Link>

              <button
                onClick={() => {
                  dispatch(deleteProduct(product.id));

                  toast.success("Product deleted successfully");
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;

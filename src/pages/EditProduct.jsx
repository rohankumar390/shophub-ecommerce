import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { updateProduct } from "../redux/slices/productSlice";

function EditProduct() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.products);

  const product = products.find((item) => item.id === Number(id));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  const onSubmit = (data) => {
    dispatch(
      updateProduct({
        ...product,
        ...data,
        id: product.id,
        price: Number(data.price),
      }),
    );
    toast.success("Product updated successfully");
    navigate("/admin/products");
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        {" "}
        <h2 className="text-xl text-red-500">Product Not Found </h2>{" "}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold mb-2">Edit Product</h1>

        <p className="text-gray-500 mb-8">Update product information.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              className="w-full border rounded-lg p-3"
              placeholder="Product Name"
              {...register("title", {
                required: "Product name is required",
              })}
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="number"
              step="0.01"
              min="0"
              className="w-full border rounded-lg p-3"
              placeholder="Price"
              {...register("price", {
                required: "Price is required",
                min: {
                  value: 0,
                  message: "Price cannot be negative",
                },
              })}
            />

            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <input
              className="w-full border rounded-lg p-3"
              placeholder="Category"
              {...register("category", {
                required: "Category is required",
              })}
            />

            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              rows="5"
              className="w-full border rounded-lg p-3"
              placeholder="Description"
              {...register("description", {
                required: "Description is required",
              })}
            />

            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <input
              className="w-full border rounded-lg p-3"
              placeholder="Image URL"
              {...register("thumbnail")}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addProduct } from "../redux/slices/productSlice";

function CreateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(
      addProduct({
        ...data,
        price: Number(data.price),
        thumbnail: data.thumbnail || "https://via.placeholder.com/300",
      }),
    );
    toast.success("Product created successfully");
    navigate("/admin/products");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold mb-2">Create Product</h1>

        <p className="text-gray-500 mb-8">Add a new product to the catalog.</p>

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
              className="w-full border rounded-lg p-3"
              placeholder="Price"
              {...register("price", {
                required: "Price is required",
                min: {
                  value: 1,
                  message: "Price must be greater than 0",
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
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
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
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;

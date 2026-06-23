import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold truncate">{product.title}</h2>

        <p className="text-gray-600 text-sm mt-2 h-10 overflow-hidden">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-green-600">
            ${product.price}
          </span>

          <span className="bg-gray-100 px-2 py-1 rounded text-xs">
            {product.category}
          </span>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="block text-center mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;

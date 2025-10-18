import { useNavigate } from "react-router-dom";
import { useSearch } from "@/contextapi/searchcontext";
const SearchProduct = () => {
  const { query, filteredProducts, allProducts, setQuery } = useSearch();
  const navigate = useNavigate();
  const productsToShow = query ? filteredProducts : allProducts;

  return (
    <>
      {productsToShow && productsToShow.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:py-4 py-3 md:px-12 px-6">
          {productsToShow.map((p) => (
            <div
              key={p._id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer relative transition duration-300 `}
              onClick={() => {
                navigate(`/items/${p._id}`);
                setTimeout(() => setQuery(""), 0);
              }}
            >
              {/* Image */}
              <div className="relative w-full h-40 sm:h-52 md:h-60 lg:h-64 overflow-hidden">
                <img
                  src={p.image?.[0]}
                  alt={`Product ${p._id}`}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="uppercase text-[10px] sm:text-xs tracking-wide text-gray-500">
                    CITYFAB Collection
                  </p>
                  <h3 className="text-sm sm:text-base font-medium text-gray-900">
                    {p.name || `Product ${p._id}`}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-gray-800">
                    ₹ {p.price} INR
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-4">No products found.</p>
      )}
    </>
  );
};

export default SearchProduct;

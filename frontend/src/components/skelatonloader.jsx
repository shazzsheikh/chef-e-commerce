const HomeSkeletonLoader = () => {
  return (
    <div className="md:space-y-6 space-y-2 px-4 py-6">
      {/* Hero Banner Skeleton */}
      <div className="bg-gray-300 rounded-lg animate-pulse w-full h-[250px] md:h-[400px]"></div>

      {/* ImageSliderTailwind Skeleton 1 */}
      <div>
        <div className="h-8 w-48 bg-gray-300 rounded mb-4 animate-pulse"></div>{" "}
        {/* title */}
        <div className="flex space-x-4 overflow-x-auto">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="min-w-[140px] h-36 bg-gray-300 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* ImageSliderTailwind Skeleton 2 */}
      <div>
        <div className="h-8 w-48 bg-gray-300 rounded mb-4 animate-pulse"></div>
        <div className="flex space-x-4 overflow-x-auto">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="min-w-[140px] h-36 bg-gray-300 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* ImageSliderTailwind Skeleton 3 */}
      <div>
        <div className="h-8 w-48 bg-gray-300 rounded mb-4 animate-pulse"></div>
        <div className="flex space-x-4 overflow-x-auto">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="min-w-[140px] h-36 bg-gray-300 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* CraftSection Skeleton */}
      <div className="bg-gray-300 rounded-lg h-48 animate-pulse"></div>

      {/* ImageSliderTailwind Skeleton 4 */}
      <div>
        <div className="h-8 w-48 bg-gray-300 rounded mb-4 animate-pulse"></div>
        <div className="flex space-x-4 overflow-x-auto">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="min-w-[140px] h-36 bg-gray-300 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSkeletonLoader;

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
          <div className="w-full h-56 bg-gray-300"></div>
          <div className="p-5 space-y-3">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div className="space-y-1">
                  <div className="h-3 bg-gray-300 rounded w-20"></div>
                  <div className="h-2 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;

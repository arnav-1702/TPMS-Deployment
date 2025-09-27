import React from "react";

const Loader = () => (
  <section className="px-8 py-16 lg:px-16 animate-pulse">
    <div className="max-w-6xl mx-auto grid lg:grid-cols-[55%_45%] gap-12 items-center">
      {/* Text Section Skeleton */}
      <div className="lg:pr-8 space-y-6">
        <div className="h-12 bg-gray-300 rounded w-2/3"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>

        {/* Search Bar Skeleton */}
        <div className="flex items-center bg-gray-200 rounded-full px-6 py-4 shadow-md space-x-4">
          <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
          <div className="h-5 w-32 bg-gray-300 rounded"></div>
          <div className="h-8 w-24 bg-gray-400 rounded-full ml-auto"></div>
        </div>

        {/* Popular Searches Skeleton */}
        <div className="space-y-3">
          <div className="h-6 w-40 bg-gray-300 rounded"></div>
          <div className="flex flex-wrap gap-3">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="h-8 w-24 bg-gray-300 rounded-full"></div>
              ))}
          </div>
        </div>
      </div>

      {/* Image Section Skeleton */}
      <div className="flex justify-center lg:justify-end">
        <div className="w-full max-w-4xl h-72 bg-gray-200 rounded"></div>
      </div>
    </div>
  </section>
);

export default Loader;

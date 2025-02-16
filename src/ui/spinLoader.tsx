"use client";

const SpinLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-primary-600 border-gray-300"></div>
    </div>
  );
};

export default SpinLoader;

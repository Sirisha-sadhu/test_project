import React, { memo } from "react";

const StackCardSkeleton = memo(() => (
  <div className="rounded-xl bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
        <div className="h-6 w-32 rounded bg-gray-200 animate-pulse" />
      </div>
      <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
    </div>
    <div className="mt-4 flex items-center space-x-2">
      <div className="h-4 w-16 rounded bg-gray-200 animate-pulse" />
      <div className="h-4 w-12 rounded bg-gray-200 animate-pulse" />
    </div>
  </div>
));

const ChartSkeleton = memo(({ height = "h-72" }) => (
  <div className={`rounded-xl bg-white p-6 shadow-sm ${height}`}>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-5 w-48 rounded bg-gray-200 animate-pulse" />
        <div className="h-8 w-32 rounded bg-gray-200 animate-pulse" />
      </div>
      <div className="h-full w-full min-h-[180px] rounded-lg bg-gray-100 animate-pulse" />
    </div>
  </div>
));

const DashboardSkeleton = () => {
  return (
    <div className="h-screen w-full bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-3">
          <div className="h-6 w-48 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-64 rounded bg-gray-200 animate-pulse" />
        </div>
        <div className="flex space-x-3">
          <div className="h-10 w-32 rounded-lg bg-gray-200 animate-pulse" />
          <div className="h-10 w-10 rounded-lg bg-gray-200 animate-pulse" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <StackCardSkeleton key={index} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <ChartSkeleton height="h-96" />
        <ChartSkeleton height="h-96" />
      </div>
    </div>
  );
};

export default memo(DashboardSkeleton);

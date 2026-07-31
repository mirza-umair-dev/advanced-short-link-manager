const NavbarSkeleton = () => {
  return (
    <div className="flex items-center justify-between px-10 py-2 bg-surface border-b border-bd sticky top-0 left-0 w-full animate-pulse">
      
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gray-600"></div>
        <div className="h-5 w-28 rounded-md bg-gray-600"></div>
      </div>

      
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gray-600"></div>
        <div className="hidden sm:flex flex-col gap-1">
          <div className="h-3 w-24 rounded bg-gray-600"></div>
          <div className="h-3 w-16 rounded bg-gray-600"></div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSkeleton;
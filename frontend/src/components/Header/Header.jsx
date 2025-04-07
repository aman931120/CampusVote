import React from "react";

const Header = () => {
  return (
    <nav className="bg-white shadow-md w-full px-6 py-3 flex items-center justify-between fixed top-0 left-0 z-50 h-16">
      {/* Left: Logo */}
      <div className="flex items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmtTXiHI0b2cZ_-AcWB2-t5MajNbUvVz9TQ&s"
          className="h-10 w-10 object-contain"
        />
      </div>

      {/* Center: College Name */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-xl font-semibold text-gray-800 text-center">
          Indian Institute of Information Technology, Manipur
        </h1>
      </div>
    </nav>
  );
};

export default Header;

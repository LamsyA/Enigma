import React from "react";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div
            className="text-3xl cursor-pointer  font-bold
         text-white z-50"
          >
            <a href={"/"} className="z-50">
              Enigma
            </a>
          </div>
          <div>Hello</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

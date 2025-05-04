"use client";

import { CircleXIcon, MenuIcon } from "lucide-react";
import { useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {!isOpen ? (
        <MenuIcon
          className="w-6 h-6 cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      ) : (
        <CircleXIcon
          className="w-6 h-6 cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
      )}

      {isOpen && (
        <div className="absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white flex flex-col items-center gap-8">
          <div>Home</div>
          <div>Friends</div>
          <div>Groups</div>
          <div>Stories</div>
          <div>Login</div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;

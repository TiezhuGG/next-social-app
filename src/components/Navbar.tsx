import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { BookIcon, BookUserIcon, HouseIcon } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="h-24 flex items-center justify-between">
      <div className="hidden md:block">
        <Link href="/">HOME</Link>
      </div>

      <div className="text-sm">
        <div className="flex gap-5">
          <Link className="flex items-center gap-1" href="/">
            <HouseIcon className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link className="flex items-center gap-1" href="/">
            <BookUserIcon className="w-4 h-4" />
            <span>Friends</span>
          </Link>
          <Link className="flex items-center gap-1" href="/">
            <BookIcon className="w-4 h-4" />
            <span>Stories</span>
          </Link>
        </div>
      </div>

      <div>
        <MobileMenu />
      </div>
    </div>
  );
};

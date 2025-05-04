import Link from "next/link";
import MobileMenu from "./MobileMenu";
import {
  BookIcon,
  BookUserIcon,
  HouseIcon,
  Loader2,
  Mail,
  MessageCircle,
  Search,
  UserIcon,
  Users,
} from "lucide-react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <div className="h-24 flex items-center justify-between">
      <div className="hidden md:block">
        <Link href="/" className="text-blue-500 font-bold text-2xl">HOME</Link>
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

      <div className="hidden xl:flex p-2 bg-slate-100 items-center rounded-xl">
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none"
        />
        <Search className="w-4 h-4 " />
      </div>

      <div>
        <ClerkLoading>
          <Loader2 className="w-4 h-4 animate-spin" />
        </ClerkLoading>
        <div className="flex items-center gap-6">
          <ClerkLoaded>
            <SignedIn>
              <div className="flex items-center gap-5">
                <Users className="cursor-pointer w-4 h-4" />
                <MessageCircle className="cursor-pointer w-4 h-4" />
                <Mail className="cursor-pointer w-4 h-4" />
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <div className="flex items-center gap-2 cursor-pointer">
                <UserIcon className="w-4 h-4" />
                <Link href="/sign-in">Login</Link>
              </div>
            </SignedOut>
          </ClerkLoaded>
          <MobileMenu />
        </div>
      </div>
    </div>
  );
};

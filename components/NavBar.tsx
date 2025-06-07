import Link from "next/link";
import { Button } from "./ui/button";
import { auth } from "@/auth";
import Logout from "./Logout";

export default async function NavBar() {
  const session = await auth();

  const isAuthenticated = !!session?.user;

  return (
    <nav>
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center justify-between py-2">
          <div className="flex gap-10">
            <Link href={"/"} className="text-2xl font-bold">
              ET
            </Link>
            {isAuthenticated && (
              <div className="sm:flex gap-4 hidden">
                <Link
                  href={"/templates"}
                  className="text-sm border px-2 py-1 rounded-md hover:bg-accent"
                >
                  Templates
                </Link>
              </div>
            )}
          </div>
          <div className="items-center gap-6 sm:flex hidden">
            {!isAuthenticated ? (
              <>
                <Link
                  href={"/signup"}
                  className="rounded-md border px-2 py-1.5 hover:bg-slate-100 transition-all duration-200 ease-in-out"
                >
                  Signup
                </Link>
                <Link
                  href={"/signin"}
                  className="rounded-md border px-2 py-1.5 bg-primary text-white hover:opacity-65 transition-all duration-200 ease-in-out"
                >
                  Login
                </Link>
              </>
            ) : (
              <div className="flex gap-6 items-center">
                <Logout />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

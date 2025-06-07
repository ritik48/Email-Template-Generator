import Link from "next/link";
import { Button } from "./ui/button";

export default function NavBar() {
  const isAuthenticated = false;

  return (
    <nav>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between py-2">
          <div className="flex gap-10">
            <Link href={"/"} className="text-2xl font-bold">
              Ai
            </Link>
            {isAuthenticated && (
              <div className="sm:flex gap-4 hidden">
                <Link
                  href={"/home"}
                  className="text-sm border px-2 py-1 rounded-md hover:bg-accent"
                >
                  Analyze Data
                </Link>
                <Link
                  href={"/dashboard"}
                  className="text-sm border px-2 py-1 rounded-md hover:bg-accent"
                >
                  Dashboard
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
                <Button>Logut</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

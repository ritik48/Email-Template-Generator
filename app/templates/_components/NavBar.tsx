import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { Code } from "lucide-react";
import { ScreenChange } from "./ScreenChange";
import { CopyCode } from "./CopyCode";
import { SaveTemplateButton } from "./SaveTemplateButton";

export default async function NavBar({ id }: { id: string }) {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <nav>
      <div className="mx-auto px-4 py-0 border-b">
        <div className="flex items-center justify-between py-2">
          <div className="flex gap-10">
            <Link href={"/"} className="text-2xl font-bold">
              ET
            </Link>
          </div>
          <ScreenChange />
          <div className="flex items-center gap-4">
            <CopyCode />
            <SaveTemplateButton id={id} />
          </div>
        </div>
      </div>
    </nav>
  );
}

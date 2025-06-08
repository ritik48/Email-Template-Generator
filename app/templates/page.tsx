import { auth } from "@/auth";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import { redirect } from "next/navigation";
import { EmailTemplate, IEmailTemplate } from "../_models/email-template.model";
import { Button } from "@/components/ui/button";
import { TemplateList } from "./_components/TemplateList";
import { NewTemplateButton } from "./_components/NewTemplateDialog";
import { getTemplates } from "@/server-fns";
import { Provider } from "@/Provider";

export default async function TemplatesPage() {
  const session = await auth();

  const isAuthenticated = !!session?.user;
  if (!isAuthenticated) {
    redirect("/signin");
  }

  const templates = (await getTemplates(
    session.user!._id
  )) as unknown as IEmailTemplate[];

  return (
    <div className="">
      <NavBar />
      <div className="max-w-7xl mx-auto min-h-[calc(100vh-100px)] flex flex-col">
        {templates.length > 0 && (
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">Templates</h1>

            <NewTemplateButton />
          </div>
        )}

        <TemplateList templates={templates} />

        <div className="flex-1 justify-center flex">
          <div className="flex flex-col items-center gap-4 mt-40">
            <p className="text-gray-500 text-lg">
              You don't have any templates yet. Start by creating one.
            </p>
            <NewTemplateButton />
          </div>
        </div>
      </div>
    </div>
  );
}

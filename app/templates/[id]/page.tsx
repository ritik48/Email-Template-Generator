import { Provider } from "@/Provider";
import NavBar from "../_components/NavBar";
import { ItemSelectionSideBar } from "../_components/ItemSelectionSideBar";
import { Canvas } from "../_components/Canvas";
import { Settings } from "../_components/Settings";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getemailTemplate } from "@/server-fns";
import { IEmailTemplate } from "@/app/_models/email-template.model";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  const isAuthenticated = !!session?.user;
  if (!isAuthenticated) {
    redirect("/signin");
  }

  const { id } = await params;

  const emailTemplate = await getemailTemplate(id);
  if (!emailTemplate) {
    redirect("/templates");
  }

  const templateData = JSON.parse(emailTemplate.template || "[]");

  return (
    <div>
      <Provider initialTemplateStructure={templateData}>
        <NavBar id={id} />

        <div className="flex items-start justify-between h-[calc(100vh-55px)] overflow-hidden">
          <ItemSelectionSideBar />

          <Canvas />

          <Settings />
        </div>
      </Provider>
    </div>
  );
}

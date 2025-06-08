"use client";

import { IEmailTemplate } from "@/app/_models/email-template.model";
import Link from "next/link";

export function TemplateList({ templates }: { templates: IEmailTemplate[] }) {
  return (
    <div className="space-y-4 mt-10">
      {templates.map((template) => (
        <Link
          href={`/templates/${template._id}`}
          key={template._id}
          className="p-4 w-full border-2 rounded-md flex flex-col justify-between"
        >
          <h3 className="text-lg font-semibold">{template.title}</h3>
          <p className="text-sm text-gray-600">{template.description}</p>
          <p className="text-sm text-gray-500">
            Created at:{" "}
            {new Date(template.createdAt).toISOString().split("T")[0]}
          </p>
        </Link>
      ))}
    </div>
  );
}

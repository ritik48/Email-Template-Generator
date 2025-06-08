"server-only";

import {
  EmailTemplate,
  IEmailTemplateDocument,
} from "./app/_models/email-template.model";
import { connectDB } from "./lib/db";

export async function getTemplates(userId: string) {
  await connectDB();
  const templates = await EmailTemplate.find({ user: userId }).lean<
    IEmailTemplateDocument[]
  >();

  // Convert MongoDB documents to plain objects
  return templates.map((template) => ({
    ...template,
    _id: template._id.toString(),
    user: template.user.toString(),
    createdAt: template.createdAt.toISOString(),
    updatedAt: template.updatedAt?.toISOString(),
  }));
}
export async function getemailTemplate(id: string) {
  await connectDB();
  const template = await EmailTemplate.findOne({
    _id: id,
  }).lean<IEmailTemplateDocument>();
  return template;
}

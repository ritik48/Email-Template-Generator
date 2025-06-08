"server-only";

import { EmailTemplate } from "./app/_models/email-template.model";
import { connectDB } from "./lib/db";

export async function getTemplates(userId: string) {
  await connectDB();
  const templates = await EmailTemplate.find({ user: userId }).lean();
  return templates;
}
export async function getemailTemplate(id: string) {
  await connectDB();
  const template = await EmailTemplate.findOne({ _id: id }).lean();
  return template;
}

"use server";

import { revalidatePath } from "next/cache";
import {
  EmailTemplate,
  IEmailTemplate,
} from "./app/_models/email-template.model";
import { auth } from "./auth";
import { connectDB } from "./lib/db";

export async function createTemplate(title: string, description?: string) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { error: "Unauthorized", data: null };
    }

    await connectDB();

    const template: IEmailTemplate = await EmailTemplate.create({
      title,
      description,
      user: session.user._id,
    });

    revalidatePath("/templates");

    return { error: null, data: template };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, data: null };
    } else {
      return { error: "An unexpected error occurred", data: null };
    }
  }
}

export async function saveTemplate(id: string, template: string) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { error: "Unauthorized", data: null };
    }

    await connectDB();

    const templateToSave: IEmailTemplate | null = await EmailTemplate.findOne({
      _id: id,
    });

    if (!templateToSave) {
      return { error: "Template not found", data: null };
    }

    templateToSave.template = template;

    await templateToSave.save();

    return { error: null, data: templateToSave };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, data: null };
    } else {
      return { error: "An unexpected error occurred", data: null };
    }
  }
}

import { Schema, model, Document, Types, models } from "mongoose";

export interface IEmailTemplateDocument extends Document {
  title: string;
  description?: string;
  template?: string;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId;
}

export interface IEmailTemplate {
  _id: string;
  title: string;
  description?: string;
  template?: string;
  user: string;
  createdAt: string;
  updatedAt?: string;
}

const emailTemplateSchema = new Schema<IEmailTemplateDocument>(
  {
    title: { type: String, required: true },
    description: { type: String },
    template: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const EmailTemplate =
  models.EmailTemplate ||
  model<IEmailTemplateDocument>("EmailTemplate", emailTemplateSchema);

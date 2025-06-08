import { Schema, model, Document, Types, models } from "mongoose";

export interface IEmailTemplate extends Document {
  title: string;
  description?: string;
  template?: string;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const emailTemplateSchema = new Schema<IEmailTemplate>(
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
  model<IEmailTemplate>("EmailTemplate", emailTemplateSchema);

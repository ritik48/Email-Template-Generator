import { Schema, model, Document, Types } from "mongoose";

export interface IEmailTemplate extends Document {
  title: string;
  description?: string;
  template: string;
  user: Types.ObjectId;
}

const emailTemplateSchema = new Schema<IEmailTemplate>(
  {
    title: { type: String, required: true },
    description: { type: String },
    template: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const EmailTemplate = model<IEmailTemplate>(
  "EmailTemplate",
  emailTemplateSchema
);

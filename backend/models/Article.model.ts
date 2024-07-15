import { Schema, model, Document } from 'mongoose';

export interface IArticle extends Document {
    name: string;
    content: string;
    category: string;
    date?: Date;
}

const articleSchema: Schema = new Schema<IArticle>({
    name: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

export const Article = model<IArticle>('Article', articleSchema);
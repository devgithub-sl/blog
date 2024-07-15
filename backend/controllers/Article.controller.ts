import { Article, IArticle } from "../models/Article.model";
import { Request, Response } from 'express';

export const createArticle = async (req: Request, res: Response): Promise<void> => {
    const { name, content, category } = req.body;
    
    const newArticle: IArticle = new Article({
        name,
        content,
        category
    });

    try {
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(400).json({ message: "Error creating article", error });
    }
};

export const getAllArticles = async (req: Request, res: Response): Promise<void> => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ message: "Error fetching articles", error });
    }
};

export const getArticleById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const article = await Article.findById(id);
        if (article) {
            res.status(200).json(article);
        } else {
            res.status(404).json({ message: "Article not found" });
        }
    } catch (error) {
        console.error('Error fetching article by ID:', error);
        res.status(500).json({ message: "Error fetching article", error });
    }
};

export const updateArticle = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, content, category } = req.body;

    try {
        const updatedArticle = await Article.findByIdAndUpdate(id, { name, content, category }, { new: true });
        if (updatedArticle) {
            res.status(200).json(updatedArticle);
        } else {
            res.status(404).json({ message: "Article not found" });
        }
    } catch (error) {
        console.error('Error updating article:', error);
        res.status(400).json({ message: "Error updating article", error });
    }
};

export const deleteArticle = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedArticle = await Article.findByIdAndDelete(id);
        if (deletedArticle) {
            res.status(200).json({ message: "Article deleted successfully" });
        } else {
            res.status(404).json({ message: "Article not found" });
        }
    } catch (error) {
        console.error('Error deleting article:', error);
        if (!res.headersSent) {
            res.status(500).json({ message: "Error deleting article", error });
        }
    }
};

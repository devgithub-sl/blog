import { Router } from "express";
import { createArticle, deleteArticle, getAllArticles, getArticleById, updateArticle } from "../controllers/Article.controller";
import { validateObjectId } from "../utils/validateObjectId";

const router: Router = Router();

router.post("/articles", createArticle);
router.get("/articles", getAllArticles);
router.get("/articles/:id", validateObjectId, getArticleById);
router.put("/articles/:id", validateObjectId, updateArticle);
router.delete("/articles/:id", validateObjectId, deleteArticle);

export default router;

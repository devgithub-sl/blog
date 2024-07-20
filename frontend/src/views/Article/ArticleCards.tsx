import { ReactNode, useEffect, useState } from "react";
import { Article } from "./ReadArticle";

// Standalone Imports
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Box from "@mui/material/Box";
import axios from "axios";
import Typography from "@mui/material/Typography";



const ArticleCards = () : ReactNode => {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get("http://localhost:4000/articles");
                setArticles(response.data);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        fetchArticles();
    }, []);

    return(
        <>
            <NavBar/>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ m: 2 }}
            >
                    {articles.map((article) => (
                        <Box
                            key={article.id}
                            sx={{
                                p: 2,
                                m: 1,
                                border: '1px solid grey',
                                borderRadius: '8px',
                                width: '80%',
                                backgroundColor: '#f9f9f9'
                            }}
                        >
                            <Typography variant="h6" component="div">
                                {article.name}
                            </Typography><br/>
                            <Typography variant="body2" component="p">
                                {article.content}
                            </Typography><br/>
                            <Typography variant="body2" component="p">
                                Category: {article.category}
                            </Typography><br/>
                            <Typography variant="body2" component="p">
                                Date: {new Date(article.date).toLocaleDateString()}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            <Footer/>
        </>
    );
};

export default ArticleCards;
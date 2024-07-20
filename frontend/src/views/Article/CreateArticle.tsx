import { ReactNode } from "react";

// Standalone Imports
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Box from "@mui/material/Box";
import ArticleForm from "../../components/ArticleForm";


const CreateArticle = () : ReactNode => {
    return(
        <>
            <NavBar/>
            <h1 style={{
                display: "flex",
                marginLeft: "15rem",
            }}>Create New Article</h1>
            <Box sx={{
                display: "flex",
                marginLeft: "15rem"
            }}>
                <ArticleForm/>
            </Box>
            <Footer/>
        </>
    )
};

export default CreateArticle;
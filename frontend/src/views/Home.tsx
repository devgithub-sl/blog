import { ReactNode } from "react";
import NavBar from "../components/NavBar";
import ArticleForm from "../components/ArticleForm";

const Home  = () : ReactNode => {
    return(
        <>  
            <NavBar/>
            <ArticleForm/>
            <h1>Hallo</h1>
        </>
    )
};

export default Home;
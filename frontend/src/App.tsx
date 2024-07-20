import { Route, Routes } from "react-router-dom"
import Home from "./views/Home"
import CreateArticle from "./views/Article/CreateArticle";
import ReadArticle from "./views/Article/ReadArticle";
import UpdateArticle from "./views/Article/UpdateArticle";
import DeleteArticle from "./views/Article/DeleteArticle";
import ArticleCards from "./views/Article/ArticleCards";

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/create_article" element={<CreateArticle/>}/>
          <Route path="/read_article" element={<ReadArticle />}/>
          <Route path="/update_article" element={<UpdateArticle/>}/>
          <Route path="/delete_article" element={<DeleteArticle/>}/>
          <Route path="/article_cards" element={<ArticleCards/>}/>
      </Routes>
    </>
  )
}

export default App;
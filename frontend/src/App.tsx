import { Route, Routes } from "react-router-dom"
import Home from "./views/Home"
import ArticleHome from "./views/Article/ArticleHome";

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticleHome />} />
      </Routes>
    </>
  )
}

export default App;
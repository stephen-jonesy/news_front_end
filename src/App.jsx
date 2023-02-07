import { Routes, Route } from 'react-router-dom';
import './App.scss';
import ArticleItem from './components/ArticleItem';
import Articles from './components/Articles';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Articles />}/>
        <Route path="/article/:article_id" element={<ArticleItem />}/>

      </Routes>
    </div>
  );
}

export default App;

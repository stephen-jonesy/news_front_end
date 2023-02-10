import { Routes, Route } from 'react-router-dom';
import './App.scss';
import ArticleItem from './components/ArticleItem';
import Articles from './components/Articles';
import Errors from './components/Errors';
import Header from './components/Header';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <Header />
      <Errors />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path="/" element={<Articles />}/>
        <Route path="/article/:article_id" element={<ArticleItem />}/>

      </Routes>
    </div>
  );
}

export default App;

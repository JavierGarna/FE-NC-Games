import './App.css';
import Header from './components/header'
import ReviewList from './components/reviewList';
import { Routes, Route } from 'react-router-dom';
import Review from './components/review';


function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<ReviewList/>}/>
        <Route path='/:category' element={<ReviewList/>}/>
        <Route path='/reviews/:review_id' element={<Review/>}/>
      </Routes>
    </div>
  );
}

export default App;

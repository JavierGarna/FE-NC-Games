import './App.css';
import Header from './components/header'
import ReviewList from './components/reviewList';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<ReviewList/>}/>
        <Route path='/:category' element={<ReviewList/>}/>
      </Routes>
    </div>
  );
}

export default App;

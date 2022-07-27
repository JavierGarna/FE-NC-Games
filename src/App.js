import './App.css';
import Header from './components/header'
import ReviewList from './components/reviewList';
import { Routes, Route } from 'react-router-dom';
import SingleReview from './components/singleReview';
import UserList from './components/userList';
import userContext from './contexts/userContext';
import { useEffect, useState } from 'react';

function App() {
  const [loggedUser, setLoggedUser] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [headerLoading, setHeaderLoading] = useState(true);
  useEffect(() => {
    const data = window.localStorage.getItem("loggedUser");
    if (data) {setLoggedUser(JSON.parse(data))}
    else {setLoggedUser("")};
  }, []);

  return (
    <userContext.Provider value={{loggedUser, setLoggedUser, pageLoading, setPageLoading, headerLoading, setHeaderLoading}}>
      <div className="App">
        <Header></Header>
        <Routes>
          <Route path='/' element={<ReviewList/>}/>
          <Route path='/:category' element={<ReviewList/>}/>
          <Route path='/reviews/:review_id' element={<SingleReview/>}/>
          <Route path='/users' element={<UserList/>}/>
        </Routes>
      </div>
    </userContext.Provider>
  );
}

export default App;

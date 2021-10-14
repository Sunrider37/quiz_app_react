import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Quiz from './pages/quiz/Quiz';
import Result from './pages/result/Result';

function App() {

  const [name, setName] = useState('')
  const [questions, setQuestions] = useState()
  const [score, setScore] = useState(0)

  const fetchQuestions = async (category ="", difficulty="") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=15${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    setQuestions(data.results);
  }

  return (
    <BrowserRouter  >
    <div className="app" style={{backgroundImage: 'url(./ques1.png) '}}>
      <Header />
      <Switch>
        <Route path="/" exact >
          <Home
           name={name} 
          setName={setName}
          fetchQuestions={fetchQuestions}
          />
        </Route>
        <Route path="/quiz" exact>
          <Quiz
          name={name}
          questions={questions}
          score={score}
          setScore={setScore}
          setQuestions={setQuestions}
          />
        </Route>
        <Route path="/result" exact >
          <Result name={name} score={score} />
        </Route>
      </Switch>
    </div>
    <Footer />
    </BrowserRouter>
  );
}

export default App;

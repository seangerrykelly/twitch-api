import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TopGamesPage from './pages/TopGamesPage.js';
import GamePage from './pages/GamePage.js';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route exact path="/games" component={TopGamesPage}>
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/games/:id" component={GamePage}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

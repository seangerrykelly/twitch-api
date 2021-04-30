import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TopGamesPage from './components/TopGamesPage.js';
import GamePage from './components/GamePage.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/games">
            <TopGamesPage></TopGamesPage>
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

import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import TopGamesPage from './pages/TopGamesPage.js';
import GamePage from './pages/GamePage.js';
import ChannelPage from './pages/ChannelPage.js';
import StreamsPage from './pages/StreamsPage';
import WatchPage from './pages/WatchPage';
import SearchResultsPage from './pages/SearchResultsPage';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
        </Switch>
        <Switch>
          <Route exact path="/games" component={TopGamesPage}/>
        </Switch>
        <Switch>
          <Route exact path="/games/:id" component={GamePage}/>
        </Switch>
        <Switch>
          <Route exact path="/channels/:id" component={ChannelPage}/>
        </Switch>
        <Switch>
          <Route exact path="/streams" component={StreamsPage}/>
        </Switch>
        <Switch>
          <Route exact path="/watch/:type/:id" component={WatchPage}/>
        </Switch>
        <Switch>
          <Route exact path="/search/:id" component={SearchResultsPage}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

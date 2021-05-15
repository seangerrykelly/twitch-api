import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TopGamesPage from './pages/TopGamesPage.js';
import GamePage from './pages/GamePage.js';
import ChannelPage from './pages/ChannelPage.js';
import StreamsPage from './pages/StreamsPage';
import WatchPage from './pages/WatchPage';
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
        <Switch>
          <Route exact path="/channels/:id" component={ChannelPage}/>
        </Switch>
        <Switch>
          <Route exact path="/streams" component={StreamsPage}/>
        </Switch>
        <Switch>
          <Route exact path="/watch/:type/:id" component={WatchPage}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

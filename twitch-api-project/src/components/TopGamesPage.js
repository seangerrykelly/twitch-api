import React from 'react'
import {Link} from 'react-router-dom';

export default class TopGamesPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            games: "",
            backend_response: ""
        };
    }

    componentDidMount() {
        this.callTopGamesAPI();
    }

    callTopGamesAPI = async() => {
        try {
            const response = await fetch("http://localhost:9000/topGames")
                .then(res => res.json())
                .then(res => this.setState({games: res.data}));
                this.fixBoxArtUrls();
        } catch (err) {
            console.log(err);
        }
    }

    fixBoxArtUrls() {
        this.state.games.forEach( function(game) {
            game.box_art_url = game.box_art_url.replace('{width}x{height}', '225x400');
        });
        this.forceUpdate();
    }

    render() {
        if (this.state.games.length === 0) {
            return (
                <div></div>
            )
        } 
        else {
            return (
                <div>
                    {
                        this.state.games.map((game, index) =>
                            <div class="row">
                                <img src={game.box_art_url}/>
                                <p>{game.name}</p>
                                <Link to={`/games/${game.id}`}>
                                    See More
                                </Link>
                            </div>
                        )
                    }
                </div>
            )
        }
    }
}
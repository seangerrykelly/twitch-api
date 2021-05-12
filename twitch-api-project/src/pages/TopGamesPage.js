import React from 'react';
import {Card} from 'react-bootstrap';
import { InfoLink } from './ButtonVariants';
import "./Box.css";

export default class TopGamesPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            games: "",
            pagination: ""
        };
    }

    componentDidMount() {
        this.callTopGamesAPI();
    }

    callTopGamesAPI = async(cursor) => {

        var url = "http://localhost:9000/topGames";
        if(cursor) {
            url += "/" + cursor;
        }

        try {
            
            if (!cursor) {
                await fetch(url)
                    .then(res => res.json())
                    .then(res => this.setState({
                        games: res.data,
                        pagination: res.pagination
                    }));
            } else {
                await fetch(url)
                    .then(res => res.json())
                    .then(res => this.setState({
                        games: this.state.games.concat(res.data),
                        pagination: res.pagination
                    }));
            }

            this.cleanGameDataForDisplay();
        } catch (err) {
            console.log(err);
        }
    }

    loadMoreGames() {
        this.callTopGamesAPI(this.state.pagination.cursor);
        this.forceUpdate();
    }

    cleanGameDataForDisplay() {
        this.state.games.forEach( function(game) {
            game.box_art_url = game.box_art_url.replace('{width}x{height}', '225x400');
            game.name = 
                game.name.length > 22
                    ?   game.name.substring(0,22)
                    :   game.name;
            
            game.name = 
                game.name.length === 22
                    ?   game.name.substring(
                            0,
                            Math.min(
                                game.name.length,
                                game.name.lastIndexOf(" ")
                            )
                        ) + "..."
                    :   game.name;
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
                <div    className="row"
                        style={{
                        display: 'flex', 
                        flexWrap: 'wrap',
                        justifyContent:'center', 
                        alignItems: 'center', 
                        height: '90vh'
                        }}
                >
                    {
                        this.state.games.map((game, index) => 
                            <Card key={index} style={{ width: '18rem' }} className="box">
                                <Card.Img variant="left" src={game.box_art_url} />
                                <Card.Body>
                                    <Card.Title>{game.name}</Card.Title>
                                    <Card.Text>
                                        
                                    </Card.Text>
                                    <InfoLink href={`/games/${game.id}`}>See More</InfoLink>
                                </Card.Body>
                            </Card>
                        )
                    }
                    <InfoLink variant="primary"
                                onClick={this.loadMoreGames.bind(this)}
                                >Load More</InfoLink>
                </div>
            )
        }
    }
}
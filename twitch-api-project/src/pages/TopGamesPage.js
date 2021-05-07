import React from 'react';
import {Card, Button} from 'react-bootstrap';
import { InfoLink } from './ButtonVariants';
import "./Box.css";

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
                this.cleanGameDataForDisplay();
        } catch (err) {
            console.log(err);
        }
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
                <div style={{
                    display: 'flex', 
                    flexWrap: 'wrap',
                    justifyContent:'center', 
                    alignItems: 'center', 
                    height: '90vh'
                    }}
                >
                    {
                        this.state.games.map((game, index) => 
                            <Card style={{ width: '18rem' }} className="box">
                                <Card.Img variant="left" src={game.box_art_url} />
                                <Card.Body>
                                    <Card.Title>{game.name}</Card.Title>
                                    <Card.Text>
                                        
                                    </Card.Text>
                                    <InfoLink to={`/games/${game.id}`}>See More</InfoLink>
                                </Card.Body>
                            </Card>
                        )
                    }
                </div>
            )
        }
    }
}

{/* <div>
<img src={game.box_art_url}/>
<p>{game.name}</p>
<Link to={`/games/${game.id}`}>
    See More
</Link>
</div> */}
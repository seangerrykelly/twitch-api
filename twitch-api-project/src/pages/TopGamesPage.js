import React from 'react'
import {Card, Button} from 'react-bootstrap'
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
                                    <Button variant="primary" href={`/games/${game.id}`}>See More</Button>
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
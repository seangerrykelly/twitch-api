import React from 'react';
import PropTypes from 'prop-types';
import {Card, Tabs, Tab} from 'react-bootstrap';
import VideosTab from './VideosTab';
import ClipsTab from './ClipsTab';
import LiveStreamsTab from './LiveStreamsTab';
import "./Box.css";

export default class GamePage extends React.Component {

    static propTypes = {
        match: PropTypes.object.isRequired
    }

    constructor (props) {
        super(props);
        this.state = {
            game: ""
        };
    }

    componentDidMount() {
        this.callGameAPI();
    }

    callGameAPI = async() => {
        const { match} = this.props;
        const { params: {id} } = match;
        this.setState({id: id});

        try {
            await fetch("http://localhost:9000/games/" + id)
                .then(res => res.json())
                .then(res => this.setState({game: res[0]}));
            this.state.game.box_art_url = this.state.game.box_art_url.replace('{width}x{height}', '225x400');
            this.forceUpdate();
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        if (this.state.game.length === 0) {
            return (
                <div>No Data Available</div>
            )
        } 
        else {
            return (
                <div>
                    <Card style={{ width: '18rem'}} className="box">
                        <Card.Img variant="left" src={this.state.game.box_art_url} />
                        <Card.Body>
                            <Card.Title>{this.state.game.name}</Card.Title>
                            <Card.Text>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Tabs defaultActiveKey="streams">
                        <Tab eventKey="streams" title="Live Streams">
                            <LiveStreamsTab game_id={this.state.id}/>
                        </Tab>
                        <Tab eventKey="videos" title="Videos">
                            <VideosTab type="game" user_id={this.state.id}/>
                        </Tab>
                        <Tab eventKey="clips" title="Clips">
                            <ClipsTab type="game" user_id={this.state.id}/>
                        </Tab>
                    </Tabs>
                </div>
            )
        }
    }

}
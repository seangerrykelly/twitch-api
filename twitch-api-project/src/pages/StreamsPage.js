import React from 'react'
import {Link} from 'react-router-dom';
import {Card, Button} from 'react-bootstrap';
import { InfoLink } from './ButtonVariants';
import "./Box.css";

export default class StreamsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            streams: "",
            backend_response: "",
            base_url: "https://twitch.tv/"
        };
    }

    componentDidMount() {
        this.callStreamsAPI();
    }

    callStreamsAPI = async() => {
        try {
            const response = await fetch("http://localhost:9000/streams")
                .then(res => res.json())
                .then(res => this.setState({streams: res.data}));
                this.cleanStreamDataForDisplay();
        } catch (err) {
            console.log(err);
        }
    }

    cleanStreamDataForDisplay() {
        this.state.streams.forEach( function(stream) {
            stream.thumbnail_url = stream.thumbnail_url.replace('{width}x{height}', '400x225');
            stream.title = 
                stream.title.length > 39
                    ?   stream.title.substring(0,39)
                    :   stream.title;
            
            stream.title = 
                stream.title.length === 39
                    ?   stream.title.substring(
                            0,
                            Math.min(
                                stream.title.length,
                                stream.title.lastIndexOf(" ")
                            )
                        ) + "..."
                    :   stream.title;
        });
        this.forceUpdate();
    }

    render() {
        if (this.state.streams.length === 0) {
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
                        this.state.streams.map((stream, index) =>
                            <Card style={{ width: '18rem' }} className="box">
                                <Card.Img variant="left" src={stream.thumbnail_url} />
                                <Card.Body>
                                    <Card.Title>{stream.title}</Card.Title>
                                    <Card.Text>
                                        User: {stream.user_name}
                                    </Card.Text>
                                    <Card.Text>
                                        Viewers: {stream.viewer_count}
                                    </Card.Text>
                                    <InfoLink href={`/channels/${stream.user_id}`} >
                                        See More
                                    </InfoLink>
                                </Card.Body>
                            </Card>
                        )
                    }
                </div>
            )
        }
    }
}
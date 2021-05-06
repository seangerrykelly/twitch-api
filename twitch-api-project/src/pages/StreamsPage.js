import React from 'react'
import {Link} from 'react-router-dom';
import {Card, Button} from 'react-bootstrap'
import "./Box.css";

export default class StreamsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            streams: "",
            backend_response: ""
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
                this.fixThumbnails();
        } catch (err) {
            console.log(err);
        }
    }

    fixThumbnails() {
        this.state.streams.forEach( function(stream) {
            stream.thumbnail_url = stream.thumbnail_url.replace('{width}x{height}', '400x225');
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
                                        Viewers: {stream.viewer_count}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    }
                </div>
            )
        }
    }
}
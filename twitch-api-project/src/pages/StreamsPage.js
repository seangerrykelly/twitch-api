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
            pagination: ""
        };
    }

    componentDidMount() {
        this.callStreamsAPI();
    }

    callStreamsAPI = async(cursor) => {
        var url = "http://localhost:9000/streams";
        if(cursor) {
            url += "/" + cursor;
        }
        try {
            if (!cursor) {
                const response = await fetch(url)
                    .then(res => res.json())
                    .then(res => this.setState({
                        streams: res.data,
                        pagination: res.pagination
                    }));
            } else {
                const response = await fetch(url)
                    .then(res => res.json())
                    .then(res => this.setState({
                        streams: this.state.streams.concat(res.data),
                        pagination: res.pagination
                    }));
            }
            this.cleanStreamDataForDisplay();
            this.forceUpdate();
        } catch (err) {
            console.log(err);
        }
    }

    loadMoreStreams() {
        this.callStreamsAPI(this.state.pagination.cursor);
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
    }

    render() {
        if (this.state.streams.length === 0) {
            return (
                <div></div>
            )
        } 
        else {
            return (
                <div>
                    <div className="row" 
                        style={{
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
                        <InfoLink variant="primary"
                                onClick={this.loadMoreStreams.bind(this)}
                                >Load More</InfoLink>
                    </div>
                </div>
            )
        }
    }
}
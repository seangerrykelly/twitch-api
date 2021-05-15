import React from 'react';
import {Card} from 'react-bootstrap';
import { InfoLink, ChannelButton } from './ButtonVariants';
import "./Box.css";
import "./Card.css";

export default class LiveStreamsTab extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            game_id: this.props.game_id,
            type: this.props.type,
            streams: "",
            pagination: ""
        };
    }

    componentDidMount() {
        this.callGameStreamsAPI();
    }

    callGameStreamsAPI = async(cursor) => {

        var url = "http://localhost:9000/gameStreams/" + this.state.game_id;
        if (cursor) {
            url += "/" + cursor;
        }
        try {
            if (!cursor) {
                await fetch(url)
                    .then(res => res.json())
                    .then(res => this.setState({
                        streams: res.data,
                        pagination: res.pagination
                    }));
            } else {
                await fetch(url)
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
        this.callGameStreamsAPI(this.state.pagination.cursor);
    }

    shortenText(text, charCount) {
        text = 
            text.length > charCount
                ?   text.substring(0,charCount)
                :   text;
    
        text = 
            text.length === charCount
                ?   text.substring(
                        0,
                        Math.min(
                            text.length,
                            text.lastIndexOf(" ")
                        )
                    ) + "..."
                :   text;
        return text;
    }

    cleanStreamDataForDisplay() {
        var instance = this;
        this.state.streams.forEach( function(stream) {
            console.log(stream.thumbnail_url);
            stream.thumbnail_url = stream.thumbnail_url.replace('{width}x{height}', '400x225');
            console.log(stream.thumbnail_url);
            stream.title = instance.shortenText(stream.title, 39);
        });
        this.forceUpdate();
    }

    render() {
        if (this.state.streams.length === 0) {
            return (
                <div>This game does not have any live streams right now.</div>
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
                        this.state.streams.map((stream, index) =>
                            <Card key={index} style={{ width: '18rem' }} className="box video-card">
                                <Card.Img alt="Stream" variant="left" src={stream.thumbnail_url} />
                                <Card.Body>
                                    <Card.Title>{stream.title}</Card.Title>
                                    <ChannelButton  href={`/channels/${stream.user_id}`}>
                                            <i className="fas fa-user"/>
                                            {stream.user_name}
                                    </ChannelButton>
                                    <Card.Text>
                                        {stream.viewer_count} Viewers
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    }
                    <InfoLink variant="primary"
                                onClick={this.loadMoreStreams.bind(this)}
                                >Load More</InfoLink>
                </div>
            )
        }
    }

}
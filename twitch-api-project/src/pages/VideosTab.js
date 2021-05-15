import React from 'react';
import {Card} from 'react-bootstrap';
import { InfoLink, WatchButton } from './ButtonVariants';
import "./Box.css";
import "./Card.css";

export default class VideosTab extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            user_id: this.props.user_id,
            type: this.props.type,
            videos: "",
            pagination: ""
        };
    }

    componentDidMount() {
        this.callVideosAPI();
    }

    callVideosAPI = async(cursor) => {

        var url = "http://localhost:9000/videos/" + this.state.type + "/" + this.state.user_id;
        if (cursor) {
            url += "/" + cursor;
        }
        try {
            if (!cursor) {
                await fetch(url)
                    .then(res => res.json())
                    .then(res => this.setState({
                        videos: res.data,
                        pagination: res.pagination
                    }));
            } else {
                await fetch(url)
                    .then(res => res.json())
                    .then(res => this.setState({
                        videos: this.state.videos.concat(res.data),
                        pagination: res.pagination
                    }));
            }
            this.cleanVideoDataForDisplay();
            this.forceUpdate();
        } catch (err) {
            console.log(err);
        }
    }

    loadMoreVideos() {
        this.callVideosAPI(this.state.pagination.cursor);
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

    cleanVideoDataForDisplay() {
        var instance = this;
        this.state.videos.forEach( function(video) {
            video.thumbnail_url = video.thumbnail_url.replace('%{width}x%{height}', '400x225');
            video.title = instance.shortenText(video.title, 39);
            video.description = instance.shortenText(video.description, 39);
        });
        this.forceUpdate();
    }

    render() {
        if (this.state.videos.length === 0) {
            return (
                <div>This channel does not have any videos</div>
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
                        this.state.videos.map((video, index) =>
                            <Card key={index} style={{ width: '18rem' }} className="box video-card">
                                <Card.Img alt="Video" variant="left" src={video.thumbnail_url} />
                                <Card.Body>
                                    <Card.Title>{video.title}</Card.Title>
                                    <WatchButton href={`/watch/video/${video.id}`}>
                                        <i className="fas fa-play"/>
                                        Watch
                                    </WatchButton>
                                    <Card.Text>
                                        {video.view_count} Views
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    }
                    <InfoLink variant="primary"
                                onClick={this.loadMoreVideos.bind(this)}
                                >Load More</InfoLink>
                </div>
            )
        }
    }

}
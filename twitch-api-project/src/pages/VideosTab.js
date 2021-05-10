import React from 'react';
import {Card, Button, Tabs, Tab} from 'react-bootstrap';
import "./Box.css";

export default class VideosTab extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            user_id: this.props.user_id,
            videos: ""
        };
    }

    componentDidMount() {
        this.callVideosAPI();
    }

    callVideosAPI = async() => {

        try {
            const response = await fetch("http://localhost:9000/getVideos/" + this.state.user_id)
                .then(res => res.json())
                .then(res => this.setState({videos: res}));
            this.cleanVideoDataForDisplay();
            this.forceUpdate();
        } catch (err) {
            console.log(err);
        }
    }

    cleanVideoDataForDisplay() {
        this.state.videos.forEach( function(video) {
            video.thumbnail_url = video.thumbnail_url.replace('%{width}x%{height}', '400x225');
            video.title = 
                video.title.length > 39
                    ?   video.title.substring(0,39)
                    :   video.title;
            
            video.title = 
                video.title.length === 39
                    ?   video.title.substring(
                            0,
                            Math.min(
                                video.title.length,
                                video.title.lastIndexOf(" ")
                            )
                        ) + "..."
                    :   video.title;
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
                <div style={{
                    display: 'flex', 
                    flexWrap: 'wrap',
                    justifyContent:'center', 
                    alignItems: 'center', 
                    height: '90vh'
                    }}
                >
                    {
                        this.state.videos.map((video, index) =>
                            <Card style={{ width: '18rem' }} className="box">
                                <Card.Img variant="left" src={video.thumbnail_url} />
                                <Card.Body>
                                    <Card.Title>{video.title}</Card.Title>
                                    <Card.Text>
                                        {video.description}
                                    </Card.Text>
                                    <Card.Text>
                                        {video.view_count} Views
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
import React from 'react';
import {Card, Button, Tabs, Tab} from 'react-bootstrap';
import "./Box.css";

export default class ClipsTab extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            user_id: this.props.user_id,
            clips: ""
        };
    }

    componentDidMount() {
        this.callClipsAPI();
    }

    callClipsAPI = async() => {

        try {
            const response = await fetch("http://localhost:9000/getClips/" + this.state.user_id)
                .then(res => res.json())
                .then(res => this.setState({clips: res}));
            this.cleanClipDataForDisplay();
            this.forceUpdate();
        } catch (err) {
            console.log(err);
        }
    }

    cleanClipDataForDisplay() {
        this.state.clips.forEach( function(clip) {
            clip.thumbnail_url = clip.thumbnail_url.replace('%{width}x%{height}', '400x225');
            clip.title = 
                clip.title.length > 39
                    ?   clip.title.substring(0,39)
                    :   clip.title;
            
            clip.title = 
                clip.title.length === 39
                    ?   clip.title.substring(
                            0,
                            Math.min(
                                clip.title.length,
                                clip.title.lastIndexOf(" ")
                            )
                        ) + "..."
                    :   clip.title;
        });
        this.forceUpdate();
    }

    render() {
        if (this.state.clips.length === 0) {
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
                        this.state.clips.map((clip, index) =>
                            <Card style={{ width: '18rem' }} className="box">
                                <Card.Img variant="left" src={clip.thumbnail_url} />
                                <Card.Body>
                                    <Card.Title>{clip.title}</Card.Title>
                                    <Card.Text>
                                        {clip.broadcaster_name}
                                    </Card.Text>
                                    <Card.Text>
                                        {clip.view_count} Views
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
import React from 'react';
import {Card} from 'react-bootstrap';
import { InfoLink } from './ButtonVariants';
import "./Box.css";

export default class ClipsTab extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            user_id: this.props.user_id,
            clips: "",
            pagination: ""
        };
    }

    componentDidMount() {
        this.callClipsAPI(this.state.pagination.cursor);
    }

    callClipsAPI = async(cursor) => {
        var url = "http://localhost:9000/clips/user/" + this.state.user_id;
        if (cursor) {
            url += "/" + cursor;
        }

        try {

            if (!cursor) {
                await fetch(url)
                    .then(res => res.json())
                    .then(res => this.setState({
                        clips: res.data,
                        pagination: res.pagination
                    }));
            } else {
                await fetch(url)
                    .then(res => res.json())
                    .then(res => this.setState({
                        clips: this.state.clips.concat(res.data),
                        pagination: res.pagination
                    }));
            }
            this.cleanClipDataForDisplay();
            this.forceUpdate();
        } catch (err) {
            console.log(err);
        }
    }

    loadMoreClips() {
        this.callClipsAPI(this.state.pagination.cursor);
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
                        this.state.clips.map((clip, index) =>
                            <Card key={index} style={{ width: '18rem' }} className="box">
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
                    <InfoLink variant="primary"
                                onClick={this.loadMoreClips.bind(this)}
                                >Load More</InfoLink>
                </div>
            )
        }
    }

}
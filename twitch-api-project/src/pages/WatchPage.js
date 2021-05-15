import React from 'react';
import {Card} from 'react-bootstrap';
import { InfoLink, ChannelButton, WatchButton } from './ButtonVariants';
import "./Box.css";
import "./Card.css";

export default class WatchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            video: "",
            pagination: "",
            video_url: "",
        };
    }

    componentDidMount() {
        this.buildVideoUrl();
    }

    buildVideoUrl() {
        const { match } = this.props;
        const { params: {id, type} } = match;

        switch (type) {
            case "video":
                this.state.video_url = "https://player.twitch.tv?" + type + "=" + id + "&parent=localhost";
                break;
            case "clip":
                this.state.video_url = "https://clips.twitch.tv/embed?" + type + "=" + id + "&parent=localhost";
                break;
        }
        this.forceUpdate();
    }

    render() {
        console.log(this.state.video_url);
        return(
            <div>
                <iframe
                    src={this.state.video_url}
                    height="300"
                    width="400">
                </iframe>
            </div>
        )
    }
}
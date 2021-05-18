import React from 'react';
import "./Box.css";
import "./Card.css";

export default class WatchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            video_url: "",
        };
    }

    componentDidMount() {
        this.buildVideoUrl();
    }

    buildVideoUrl() {
        const { match } = this.props;
        const { params: {id, type} } = match;
        var url;

        switch (type) {
            case "video":
                url = "https://player.twitch.tv?" + type + "=" + id + "&parent=localhost";
                this.setState({ video_url: url});
                break;
            case "clip":
                url = "https://clips.twitch.tv/embed?" + type + "=" + id + "&parent=localhost";
                this.setState({ video_url: url});
                break;
            default:
                break;
        }
        this.forceUpdate();
    }

    render() {
        return(
            <div    style={{
                    display: 'flex',
                    justifyContent:'space-around', 
                    alignItems: 'center'
                    }}>
                <iframe
                    title="Video"
                    src={this.state.video_url}
                    height="600"
                    width="800"
                    allowFullScreen="true">
                </iframe>
            </div>
        )
    }
}
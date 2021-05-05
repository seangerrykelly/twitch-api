import React from 'react'
import {Link} from 'react-router-dom';

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
                    justifyContent:'start', 
                    alignItems: 'center', 
                    height: '90vh'
                    }}
                >
                    {
                        this.state.streams.map((stream, index) =>
                            <div>
                                <img src={stream.thumbnail_url}/>
                                <p>{stream.title}</p>
                                <p>Views: {stream.viewer_count}</p>
                            </div>
                        )
                    }
                </div>
            )
        }
    }
}
import React from 'react';
import { GitButton } from './ButtonVariants';
import "./Box.css";
import "./Card.css";

export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            streams: "",
            stream_url: ""
        };
    }

    componentDidMount() {
        this.getTopStream();
    }

    getTopStream = async() => {

        var request_url = "http://localhost:9000/streams";
        
        try {
            await fetch(request_url)
            .then(res => res.json())
            .then(res => this.setState({
                streams: res.data,
                pagination: res.pagination
            }));
        } catch (err) {
            console.log(err);
        }

        this.state.stream_url = "https://player.twitch.tv/?channel=" + this.state.streams[0].user_name + "&parent=localhost&autoplay=false";
        this.forceUpdate();
    }

    render() {

        if(this.state.streams.length === 0) {
            return(
                <div>Home</div>
            )
        } else {
            return(
                <div>
                    <h1 style={{color:'#6441A4'}}>Top Stream Right Now</h1>
                    <div    style={{
                                display: 'flex',
                                justifyContent:'space-around', 
                                alignItems: 'center'
                    }}>
                        <iframe
                            src={this.state.stream_url}
                            height="600"
                            width="800"
                            allowFullScreen="true">
                        </iframe>
                    </div>
                    <div>
                        <h1 style={{color:'#6441A4'}}>Welcome!</h1>
                        <p>I made this application using the Twitch API. The frontend was built using the React.js library, 
                            while the backend was developed using the Express framework for Node.js. Please consider taking a look
                            at the <a href="https://github.com/seangerrykelly/twitch-api">GitHub.</a>
                        </p>

                    </div>
                </div>
            )
        }
    }
}
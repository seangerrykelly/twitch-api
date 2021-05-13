import React from 'react';
import PropTypes from 'prop-types';
import {Card, Tabs, Tab} from 'react-bootstrap';
import VideosTab from './VideosTab';
import ClipsTab from './ClipsTab';
import "./Box.css";

export default class ChannelPage extends React.Component {

    static propTypes = {
        match: PropTypes.object.isRequired
    }

    constructor (props) {
        super(props);
        this.state = {
            channel: ""
        };
    }

    componentDidMount() {
        this.callChannelAPI();
    }

    callChannelAPI = async() => {
        const { match } = this.props;
        const { params: {id} } = match;
        this.setState({id: id});

        try {
            await fetch("http://localhost:9000/channels/" + id)
                .then(res => res.json())
                .then(res => this.setState({channel: res[0]}));
            this.forceUpdate();
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        if (this.state.channel.length === 0) {
            return (
                <div>Channel could not be found</div>
            )
        } 
        else {
            return (
                <div>
                    <Card style={{ width: '18rem' }} className="box">
                        <Card.Img variant="left" src={this.state.channel.profile_image_url} />
                        <Card.Body>
                            <Card.Title>{this.state.channel.display_name}</Card.Title>
                            <Card.Text>
                                {this.state.channel.broadcaster_type}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Tabs defaultActiveKey="videos">
                        <Tab eventKey="videos" title="Videos">
                            <VideosTab type="user" user_id={this.state.id}/>
                        </Tab>
                        <Tab eventKey="clips" title="Clips">
                            <ClipsTab type="user" user_id={this.state.id}/>
                        </Tab>
                    </Tabs>
                </div>
            )
        }
    }

}
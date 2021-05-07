import React from 'react';
import PropTypes from 'prop-types';

export default class ChannelPage extends React.Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
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
        const { match, location, history } = this.props;
        const { params: {id} } = match;
        this.setState({id: id});

        try {
            const response = await fetch("http://localhost:9000/getChannels/" + id)
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
                <div>no</div>
            )
        } 
        else {
            return (
                <div>
                    <div>
                        {this.state.channel.broadcaster_name}
                    </div>
                </div>
            )
        }
    }

}
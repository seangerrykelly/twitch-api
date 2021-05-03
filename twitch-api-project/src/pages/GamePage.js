import React from 'react';
import PropTypes from 'prop-types';

export default class GamePage extends React.Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    constructor (props) {
        super(props);
        this.state = {
            game: ""
        };
    }

    componentDidMount() {
        this.callGameAPI();
    }

    callGameAPI = async() => {
        const { match, location, history } = this.props;
        const { params: {id} } = match;
        this.setState({id: id});

        try {
            console.log("http://localhost:9000/getGames/" + id);
            const response = await fetch("http://localhost:9000/getGames/" + id)
                .then(res => res.json())
                .then(res => this.setState({game: res[0]}));
            this.state.game.box_art_url = this.state.game.box_art_url.replace('{width}x{height}', '225x400');
            this.forceUpdate();
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        if (this.state.game.length === 0) {
            return (
                <div>no</div>
            )
        } 
        else {
            return (
                <div>
                    <div class="row">
                        <img src={this.state.game.box_art_url}/>
                        <p>{this.state.game.name}</p>
                    </div>
                </div>
            )
        }
    }

}
import React from 'react';
import PropTypes from 'prop-types';
import {Card, Tabs, Tab} from 'react-bootstrap';
import "./Box.css";
import SearchResultsTab from './SearchResultsTab';

export default class SearchResultsPage extends React.Component {

    static propTypes = {
        match: PropTypes.object.isRequired
    }

    constructor (props) {
        super(props);
        this.state = {
            id: ""
        };
    }

    componentDidMount() {
        const { match } = this.props;
        const { params: {id} } = match;
        this.setState({id: id});
        console.log(id);
    }

    render() {

        if (this.state.id === "") {
            return (
                <div></div>
            )
        }
        return (
            <div>
                <Tabs defaultActiveKey="categories">
                    <Tab eventKey="categories" title="Categories">
                        <SearchResultsTab type="categories" id={this.state.id}/>
                    </Tab>
                    <Tab eventKey="channels" title="Channels">
                        <SearchResultsTab type="channels" id={this.state.id}/>
                    </Tab>
                </Tabs>
            </div>
        )
    }

}
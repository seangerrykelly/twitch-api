import React from 'react';
import {Card} from 'react-bootstrap';
import { InfoLink, WatchButton, ChannelButton } from './ButtonVariants';
import "./Box.css";
import "./Card.css";

export default class SearchResultsTab extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            id: this.props.id,
            type: this.props.type,
            results: []
        };
    }

    componentDidMount() {
        this.callSearchAPI();
    }

    callSearchAPI = async(cursor) => {

        var url = "http://localhost:9000/search/" + this.state.type + "/" + this.state.id;
        if (cursor) {
            url += "/" + cursor;
        }
        try {
            if (!cursor) {
                await fetch(url)
                    .then(res => res.json())
                    .then(res => this.setState({
                        results: res.data,
                        pagination: res.pagination
                    }));
            } else {
                await fetch(url)
                    .then(res => res.json())
                    .then(res => this.setState({
                        results: this.state.results.concat(res.data),
                        pagination: res.pagination
                    }));
            }
            this.cleanSearchResultDataForDisplay();
            this.forceUpdate();
        } catch (err) {
            console.log(err);
        }
    }

    loadMoreResults() {
        this.callSearchAPI(this.state.pagination.cursor);
    }

    shortenText(text, charCount) {
        text = 
            text.length > charCount
                ?   text.substring(0,charCount)
                :   text;
    
        text = 
            text.length === charCount
                ?   text.substring(
                        0,
                        Math.min(
                            text.length,
                            text.lastIndexOf(" ")
                        )
                    ) + "..."
                :   text;
        return text;
    }

    cleanSearchResultDataForDisplay() {
        var instance = this;
        this.state.results.forEach( function(result) {
            if (instance.state.type === "categories") {
                result.box_art_url = result.box_art_url.replace('52x72', '225x400');
                result.name = instance.shortenText(result.name, 22);
            } else if (instance.state.type === "channels") {
                result.thumbnail_url = result.thumbnail_url.replace('%{width}x%{height}', '400x225');
                result.title = instance.shortenText(result.title, 39);
            }
        });
        this.forceUpdate();
    }

    render() {
        if (!this.state.results || this.state.results.length === 0) {
            return(
                <div>No results were found</div>
            )
        }

        switch(this.state.type) {
            case "channels":
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
                            this.state.results.map((result, index) =>
                                <Card key={index} style={{ width: '18rem', height: '25rem' }} className="box video-card h-60">
                                    <Card.Img alt="Video" variant="left" src={result.thumbnail_url} />
                                    <Card.Body>
                                        <Card.Title>{result.title}</Card.Title>
                                        <Card.Text>
                                        <ChannelButton  href={`/channels/${result.id}`}>
                                            <i className="fas fa-user"/>
                                            {result.display_name}
                                        </ChannelButton>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )
                        }
                        <InfoLink variant="primary"
                                    onClick={this.loadMoreResults.bind(this)}
                                    >Load More</InfoLink>
                    </div>
                )
                case "categories":
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
                                this.state.results.map((result, index) =>
                                    <Card key={index} style={{ width: '18rem' }} className="box video-card">
                                        <Card.Img alt="Video" variant="left" src={result.box_art_url} />
                                        <Card.Body>
                                            <Card.Title>{result.name}</Card.Title>
                                            <WatchButton href={`/games/${result.id}`}>
                                                <i className="fas fa-play"/>
                                                Browse
                                            </WatchButton>
                                        </Card.Body>
                                    </Card>
                                )
                            }
                            <InfoLink variant="primary"
                                        onClick={this.loadMoreResults.bind(this)}
                                        >Load More</InfoLink>
                        </div>
                    )
                default:
                    return(
                        <div></div>
                    )
        }
    }

}
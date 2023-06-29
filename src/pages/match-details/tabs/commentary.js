import React, { Component } from 'react';
import { post } from '../../../api';
import { withRouter } from 'react-router-dom';
import { CommentarySimmer } from '../../../simmer-loader';
import imgYellowCard from '../../../assets/img/ycard.png';
import imgFootBall from '../../../assets/img/footballicon.png';

class Commentary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: {}
        },
            this.isMount;
    }

    componentDidMount() {
        this.isMount = true;
        this.getPredictionList()
        this.interval = setInterval(() => {
            this.getPredictionList();
        }, 30000);
    }

    getPredictionList = () => {
        const payload = new FormData();
        const _this = this;
        payload.append('id', this.props.match.params.id);
        post('getMatchDetailsByIdNew', payload)
            .then(res => {
                if (_this.isMount) {
                    const comments = res.data.match_details[0].comments;
                    if (res.data.matchType === 'passed' && res.data.matchType === 'future')
                        clearInterval(this.interval);
                    this.setState({ comments });
                }
            })
            .catch(err => console.log(err));
    }

    componentWillUnmount() {
        this.isMount = false;
        clearInterval(this.interval);
    }

    
    render() {
        const { comments } = this.state;
        return (
            <div className="col-xs-12 lm">
                {!comments.length  && <CommentarySimmer />}
                {comments.length  && comments.map((data, key) => (
                    <div className="row" key={key} style={{ borderBottom: '1px solid #ececec' }}>
                        <div className="col-xs-2">{data.minute}</div>
                        <div className="col-xs-10">{data.comment}</div>
                    </div>
                ))}
            </div>
        );
    }
};

export default withRouter(Commentary);
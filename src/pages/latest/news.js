import React, { Component, Fragment } from 'react';
import { Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { LatestNewsSimmer } from '../../simmer-loader';
import { isEmpty } from 'lodash';
import logoLoadMore from '../../assets/img/load-more.png';
import logoLoadMoreLoader from '../../assets/img/load-more-loader.gif';
import NewsComponent from './NewsComponent';

class News extends Component {
    constructor() {
        super();
        this.state = {
            limit: 10
        }
    }
    loadMore = () => {

        this.setState({
            limit: this.state.limit + 5
        })
    }
    render() {
        const { news, loading } = this.props;
        console.log(news.length)
        return (
            <Col xs={12} className="team lm ct">
                <div className="aside-widget">
                    {console.log(news)}
                    {!Boolean(news.length) && loading && <>
                        <LatestNewsSimmer />
                        <LatestNewsSimmer />
                        <LatestNewsSimmer />
                    </>}
                    {loading == false && isEmpty(news) &&
                        <div style={{
                            display: 'flex',
                            lineHeight: '400px',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <span style={{
                                // color: 'red',
                                fontSize: '20px',
                                fontWeight: 100,
                                letterSpacing: '1px'
                            }}> No news found!</span>
                        </div>
                    }


                    {loading == false && news && news.slice(3, this.state.limit).map((data, key) => (<NewsComponent key={key} data={data} />))}
                </div>
                <div className="clearfix"></div>
                {Boolean(news.length) && this.props.isLoadMore && !this.props.loading && <div style={{
                    textAlign: '-webkit-center',
                    padding: '10px'
                }}>
                    {this.state.limit < news.length &&
                        <div style={{
                            width: 'fit-content',
                            background: '#0F7B30',
                            color: '#fff',
                            borderRadius: '2px',
                            padding: '2px 10px'
                        }} onClick={this.loadMore}>

                            <img style={{
                                height: '12px',
                                width: '12px',
                                marginRight: '5px',
                                marginTop: '-3px'
                            }} src={logoLoadMore} />Load More</div>}
                </div>}
                {Boolean(news.length) && this.props.loading && <div style={{
                    textAlign: '-webkit-center',
                    padding: '10px'
                }}>
                    <img style={{
                        height: '25px',
                        width: '25px'
                    }} src={logoLoadMoreLoader} />
                </div>}
            </Col>
        );
    }
};

export default withRouter(News);

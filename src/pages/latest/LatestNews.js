import React, { Component } from 'react';
import { isArray, isEmpty } from 'lodash';
import { Row, Col } from 'react-bootstrap';

import axios from '../../_config/axios';
import { randomNewsBanner } from '../../_helper/random-image';
import News from './news';
import LatestNewsSlider from './latest-news-slider';
import { LatestNewsSliderSimmer } from '../../simmer-loader';

class LatestNews extends Component {
    constructor() {
        super();
        this.state = {
            news: [],
            page: 0,
            isLoadMore: true,
            isLoading: false
        }

    }
    componentDidMount() {
        this.getLatestNews();
    }
    getLatestNews = (page = 0) => {
        this.setState({
            isLoading: true
        })
        // const payload = new FormData();
        // payload.append('page', page);
        axios.post('/latestNewsSM').then(res => {
            if (res.data && res.data.success && res.data.success == 1) {
                if (res.data.news && isArray(res.data.news)) {


                    this.setState({
                        news: res.data.news,
                        isLoading: false
                    })
                }
            }
            if (res.data.success == 0) {
                this.setState({
                    isLoading: false,
                    isLoadMore: false
                })
            }
        })
            .catch(err => console.log(err));
    }
    render() {
        const { news } = this.state;
        return (
            <Row>
                <Col xs={12} className="ct">
                    {console.log(this.state.isLoading)}
                    <div className="mb-10 mt-12 latest-news-slider">
                        {!Boolean(news.length) && <LatestNewsSliderSimmer />}
                        {Boolean(news.length) && <LatestNewsSlider news={news.slice(0, 3)} />}

                    </div>
                </Col>
                <News
                    news={news}
                    isLoadMore={this.state.isLoadMore}
                    loading={this.state.isLoading}
                // loadMore={this.state.loadMore}
                />
            </Row>
        );
    }
}
export default LatestNews;








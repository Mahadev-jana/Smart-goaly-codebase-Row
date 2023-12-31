import React, { Component } from 'react';
// import Iframe from 'react-iframe';
import { Link, withRouter } from 'react-router-dom';
import { post } from '../../api';
import people from '../../assets/img/detail-club/people.png';
import people2 from '../../assets/img/detail-club/people2.png';
import people3 from '../../assets/img/detail-club/people3.png';
import '../../assets/css/local-news-contest.css';
import axios from '../../_config/axios';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';

class LocalLatestDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsContent: '',
            otherNewsContent: ''
        }
    }
    componentDidMount() {
        this.getLatestDetails()
    }
    getLatestDetails = () => {
        const payload = new FormData();
        payload.append('id', this.props.match.params.id);
        axios.post('getLocalNewsDetails', payload)
            .then(res => {
                console.log(res)
                this.setState({
                    newsContent: res.data.news,
                    otherNewsContent: res.data.Others_News
                });
            })
            .catch(err => console.log(err));
    }
    newsDetails=(id)=>{
        this.props.history.push(`/local/${id}`);
        window.location.reload();
    }
    render() {

        const { otherNewsContent, newsContent } = this.state;

        return (
            <React.Fragment>

                {/* <Helmet>
                    <title>Goaly | Local News</title>
                    <link rel="icon" type="image/png" href={icon} sizes="20x20" />

                </Helmet> */}
                <div class="row">
                    <div class="main-news">
                        <div class="cover"><img src={newsContent.urlToImage} alt="" /></div>
                        <div class="caption block" style={{ background: '#fff' }}>
                            <a><h4 class="m-0">{newsContent.title}</h4></a>
                            <h5 class="my-1">{newsContent.publishedAt}</h5>
                            <p class="m-0">{newsContent.content}</p>
                        </div>
                    </div>
                    <div class="block" style={{ background: '#fff' }}>
                        <div class="see-more p-1">
                            <a href="#">LIHAT LAINNYA</a>
                        </div>

                        {otherNewsContent && otherNewsContent.map((data, key) => (
                            <div class="item-news" key={key} onClick={()=>this.newsDetails(data.id)}>
                                <div class="cover"><img src={data.urlToImage} alt="" /></div>
                                <div class="caption">
                                    <div class="inner-caption">
                                        <a><h3>{data.title}</h3></a>
                                        <h5>{data.publishedAt}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}




                    </div>
                </div>
            </React.Fragment>
        );
    }
};
export default withRouter(LocalLatestDetails);
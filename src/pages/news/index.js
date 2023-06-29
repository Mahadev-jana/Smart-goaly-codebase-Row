import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import 'swiper/dist/css/swiper.min.css';
import MenuCategory from '../../components/menu-category';
import { post } from '../../api';
import { ItemSliderSimmer } from '../../simmer-loader';
import imgLatestNews from '../../assets/img/latest_news.png';
class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: []
        } 
    }
    componentDidMount() {
        this.getLatestNews()
    }
    getLatestNews = () => {
        post('getnews')
        .then( res=>{
            if(res.data.success)
           
            this.setState({
                news: res.data.news.newsItem
            });
        })
        .catch( err =>console.log(err));
    }
    render() {
        const { news } = this.state;
        return(
            <div className="page-content mt-10">
                <MenuCategory />
                <div className="team col-xs-12 lm ct">
                    <div className="title3">News</div>
                     <div className="aside-widget">
                        {news && news.map((data, key)=>(<NewsComponent key={key} data={data} />))}
                     </div>
                </div>
            </div>
        );
    }
};

export default withRouter(News);

const NewsComponent = ({data}) => (
    <div className="post post-widget">
        <a className="post-img" href={data.more} target="_blank">
            <img src={data.media_url===''? imgLatestNews : data.media_url} alt="" />
        </a>
        <div className="post-body">
            <h3 className="post-title">
                <a href={data.more}>{data.title}</a>
            </h3>
        </div>
    </div>
);

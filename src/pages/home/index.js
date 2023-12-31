import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { isAuthenticate } from '../../_helper/authentication';
import SetFavTeam from '../../components/set-fav-team/SetFavTeam';
import LatestNews from '../../components/latest-news';
import MyTeam from '../../components/my-team';
import OtherMatches from '../../components/other-matches/OtherMatches';
import ContestSlider from '../../components/ContestSlider';
import BigMatches from '../../components/big-matches/BigMatches';
// import LiveMatches from '../../components/live-matches/LiveMatches';
import LatestMatchSlider from '../../components/latest-match-slider';
import VideoHighlights from '../../components/highlights/VideoHighlights';
import MenuCategory from '../../components/menu-category';
import { post, authPost } from '../../api';
import RewardsSlider from '../reward/tabs/RewardsSlider';
import imgTeamAdd from '../../assets/img/tm-add.png';
import AddFavoriteClub from './add-favorite-clubs/AddFavoriteClubs';
import Prediction from './Prediction';
import ListMatches from './list-matches/ListMatches';
import ListPrediction from './ListPrediction';
import LiveMatches from './live-matches/LiveMatches';
import GoalyTV from './GoalyTV';
import Football from './Football';
import Transfer from './Transfer';
import Leagues from './Leagues';
import TopMatches from './TopMatches';
import axios from '../../_config/axios';
import LocalNewsDashboard from './live-matches/LocalNewsDashboard';
import icon from '../../assets/img/logo-goaly.png';
import ReactGA from "react-ga";
const TRACKING_ID = "UA-99013645-21";
ReactGA.initialize(TRACKING_ID);

const data = {
    Authorization: "Bearer cfe0df30-fd1b-3f91-a3db-fd6c977e093b",
    msisdn: "5485784536",
    msisdnwithprefix: "855",
    operator: "Smart"
}


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerDetails: [],
            news: [],
            setFavTeam: false,
            myTeams: [],
            isLogin: false,
            info: {},
            userDetails: {},
            jwt: [],
            // msisdnExist:''
        }
    }
    openSetFavTeam = () => {
        this.setState({ setFavTeam: true });
    }
    closeSetFavTeam = () => {
        this.setState({ setFavTeam: false });
    }
    componentDidMount() {
       
       ReactGA.pageview(window.location.pathname + window.location.search);

        console.log("cache issue flag");
        const user = JSON.parse(localStorage.getItem('userDetails'));
        if (user) {
            this.setState({ isLogin: true });
        }
        // post('getgoalybannerlist')
        //     .then(res => {
        //         if (res.data.success)
        //             this.setState({ bannerDetails: res.data.banner_details })
        //     })
        //     .catch(err => console.log(err));
        if (isAuthenticate())
            // this.getMyTeams();
            this.getLatestNews();
    }
    reload = () => {
        location.reload(true);
    }
    getMyTeams = (page = 0) => {
        const payload = new FormData();
        payload.append('page', page);
        authPost('getfavteam', payload)
            .then(res => {
                const team = res.data.team_list;
                this.setState(prevState => ({ myTeams: [...prevState.myTeams, ...team], page }));
            })
            .catch(err => console.log(err));
    }
    getLatestNews = () => {
        const payload = new FormData();
        payload.append('limit', 4);
        post('getlatestnews', payload)
            .then(res => {
                if (res.data.success)
                    this.setState({ news: res.data.news });
            })
            .catch(err => console.log(err));
    }


    render() {
        const {

            isLogin
        } = this.state;
        window.scrollTo(0, 0)
        return (
            <Fragment>
                {/* <Helmet>
                    <title> Goaly | Home </title>
                    <link rel="icon" type="image/png" href={icon} sizes="20x20" />
                </Helmet> */}
                <MenuCategory />
                <div style={{paddingTop:'65px'}}>
                <AddFavoriteClub />
                </div>
                
                <Prediction />
                {!isLogin && <TopMatches />}
                {!!isLogin && <LiveMatches />}
                {/* <div style={{ paddingTop: 7 }}> <RewardsSlider /></div> */}
                <ListMatches />
                {/* <ListPrediction /> */}
                <GoalyTV />
                <Football />
                <Transfer />
                <Leagues />
                <LocalNewsDashboard />
            </Fragment>
        );
    }
}

export default Home;
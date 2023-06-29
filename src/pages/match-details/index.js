import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import MenuCategory from '../../components/menu-category';
import { post } from '../../api';
import { ItemSliderSimmer } from '../../simmer-loader';
import Summary from './summary';
import TabComponent from './tab-component';
import { MatchDetailsSimmer } from '../../simmer-loader';
import { dateTimeFomat } from '../../_helper/date-format';
import imgMissingLogo from '../../assets/img/missing_photo.png';
import MatchTabs from '../home/live-matches/MatchTabs';
import LineUp from '../home/live-matches/LineUps';
import { isObject, has, hasIn, size, keys, isEmpty, isArray } from 'lodash';
import { Tabs, Tab } from 'react-bootstrap';
import axios from '../../_config/axios';
import LastMatch from '../score-prediction/LastMatch';
import HeadToHead from '../score-prediction/HeadToHead';
import moment from 'moment';
import Moment from 'react-moment';
// import moment from 'moment';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';
import '../../assets/css/detail-match.css';
import '../../assets/css/util.css';
import Manchester from '../../assets/img/Manchester united.svg';
import Chelsea from '../../assets/img/Chelsea.svg';
import goal from '../../assets/img/detail-match/goal.png';
import redcard from "../../assets/img/detail-match/reedcard.png";
import yellowcard from "../../assets/img/detail-match/yellowcard.png";
import lottie from 'lottie-web';
import line from '../../assets/img/222.gif';
import {statusLive,statusLivePast} from '../../_config/match_status';
let animObj = null;
class MatchDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matchDetails: {},
            homeTeamName: '',
            homeTeamId: 0,
            awayTeamId: 0,
            homeTeamname: '',
            cards: [],
            goals: [],
            comments: [],
            liveMinute: 0,
            matchStatus:'',
            intervalId:null,
            liveMatchTime:0
        }
    }

    componentDidMount() {
        this.getPredictionList();
    }

    getPredictionList = () => {
        const payload = new FormData();
        payload.append('id', this.props.match.params.id);
        post('getMatchDetailsByIdNew', payload)
            .then(res => {
                if (res.data.success === 1) {
                    if (res.data.match_details.length) {
                        
                        const matchDetails = res.data.match_details[0];
                        // console.log(matchDetails.comments.minute)
                        this.setState({ homeTeamId: matchDetails.homeTeam.id });
                        this.setState({ awayTeamId: matchDetails.awayTeam.id });
                        // this.setState({ homeTeamname: matchDetails.homeTeam.name });
                        this.setState({ matchDetails });
                        this.setState({ goals: matchDetails.goals });
                        // this.setState({ comments: matchDetails.comments });
                        this.setState({matchStatus:matchDetails.status},()=>{
                            // console.log(this.state.matchStatus)
                            if(statusLive.some(status=>status===this.state.matchStatus)){
                                // this.intervalId = setInterval(() => {
                                //     this.getPredictionList();
                                // }, 30000);
                                this.setState({liveMatchTime:matchDetails.time.minute})
                                let intervalId = setInterval(()=>this.getPredictionListAgain(), 40000)
                                this.setState({ intervalId: intervalId })
                            }
                        })
                        
                        // var arrayOfMinutes = matchDetails.comments.map(function (obj) {
                        //     return obj.minute;
                        // });
                        // //   console.log(arrayOfMinutes);
                        // if (isEmpty(arrayOfMinutes)) {
                        //     this.setState({ liveMinute: 0 })
                        // }
                        // else {
                        //     this.setState({ liveMinute: Math.max(...arrayOfMinutes) })
                        // }
                    }
                }
            })
            .catch(err => console.log(err));
        // this.liveMatchTime();

    }
    getPredictionListAgain = () => {
        const payload = new FormData();
        payload.append('id', this.props.match.params.id);
        post('getMatchDetailsByIdNew', payload)
            .then(res => {
                if (res.data.success === 1) {
                    if (res.data.match_details.length) {
                        
                        const matchDetails = res.data.match_details[0];
                        // console.log(matchDetails.comments.minute)
                        // this.setState({ homeTeamId: matchDetails.homeTeam.id });
                        // this.setState({ awayTeamId: matchDetails.awayTeam.id });
                        // this.setState({ homeTeamname: matchDetails.homeTeam.name });
                        this.setState({ matchDetails });
                        this.setState({ goals: matchDetails.goals });
                        // this.setState({ comments: matchDetails.comments });
                        this.setState({matchStatus:matchDetails.status},()=>{
                            // console.log(this.state.matchStatus)
                            if(statusLive.some(status=>status===this.state.matchStatus)){
                                // this.intervalId = setInterval(() => {
                                //     this.getPredictionList();
                                // }, 30000);
                                this.setState({liveMatchTime:matchDetails.time.minute})
                                // let intervalId = setInterval(()=>this.getPredictionListAgain(), 40000)
                                // this.setState({ intervalId: intervalId })
                            }
                        })
                        
                        // var arrayOfMinutes = matchDetails.comments.map(function (obj) {
                        //     return obj.minute;
                        // });
                        // //   console.log(arrayOfMinutes);
                        // if (isEmpty(arrayOfMinutes)) {
                        //     this.setState({ liveMinute: 0 })
                        // }
                        // else {
                        //     this.setState({ liveMinute: Math.max(...arrayOfMinutes) })
                        // }
                    }
                }
            })
            .catch(err => console.log(err));
        // this.liveMatchTime();

    }
    // liveMatchTime = () => {

    //     var arrayOfMinutes = this.state.comments.map(function (obj) {
    //         return obj.minute;
    //     });
    //     //   console.log(arrayOfMinutes);
    //     if (isEmpty(arrayOfMinutes)) {
    //         this.setState({ liveMinute: 0 })
    //     }
    //     else {
    //         this.setState({ liveMinute: Math.max(...arrayOfMinutes) })
    //     }

    // }

    componentWillUnmount() {
        clearInterval(this.state.intervalId)
    }




    render() {
        const { matchDetails, homeTeamId, awayTeamId, goals, liveMinute,matchStatus,liveMatchTime } = this.state;
        console.log()
        // console.log(homeTeamId, awayTeamId)
        // console.log(matchDetails)
        // console.log(liveMinute)
        // console.log(matchStatus)

        // const goalsTeamId = goals.map(goal=>goal.team_id)
        // console.log(goalsTeamId)
        //    const goalsHomeTeamIdArray= goalsTeamId.filter(goalsTeamId=>goalsTeamId==homeTeamId)
        //    console.log(goalsHomeTeamIdArray)
        const homeTeamGoals = goals.filter(goals => goals.team_id == homeTeamId)
        // console.log(homeTeamGoals)
        const awayTeamGoals = goals.filter(goals => goals.team_id == awayTeamId)
        // console.log(awayTeamGoals)
        // if(homeTeamGoals.length>=awayTeamGoals.length){
        //     const goalsLines=homeTeamGoals.length

        // }
        // else{
        //     const goalsLines=awayTeamGoals.length

        // }
        // console.log(goalsLins)
        // console.log(liveMatchTime,'timeeeee')

        return (
            <React.Fragment>
                {/* <Helmet>
                    <title>Goaly | Match Details</title>
                    <link rel="icon" type="image/png" href={icon} sizes="20x20" />

                </Helmet> */}

                <div>

                    <div class="row detail-match" style={{ paddingTop: " 6px" }}>

                        {!Boolean(Object.keys(matchDetails).length) && <MatchDetailsSimmer />}
                        {Boolean(Object.keys(matchDetails).length) &&
                            <div className="detail-match-header">
                                
                                {(!statusLive.some(status=>status===matchDetails.status)) &&
                                    <h4>{matchDetails.league_name}</h4>
                                }
                                {(statusLive.some(status=>status===matchDetails.status)) && 
                                    <div>
                                        <h4 style={{}}>{matchDetails.league_name}</h4>
                                        <div>
                                            <h4 style={{ textShadow: '2px 2px 9px #cb0707' }}><strong>{liveMatchTime}'</strong></h4>

                                            <img src={line}
                                                border="0" alt="animated-line-image-0558" style={{ width: '15%', height: '5px' }} />
                                        </div>

                                    </div>
                                }



                                <div className="row">
                                    <div className="col-xs-4 club" onClick={() => this.props.history.push(`/team/${homeTeamId}`)}>
                                        <img src={matchDetails.homeTeam.logo_path ? matchDetails.homeTeam.logo_path : imgMissingLogo} alt=""
                                        />
                                        <p>{matchDetails.homeTeam.name}</p>
                                    </div>
                                    <div className="col-xs-4">
                                        <div className="score-board">
                                            <div className="date">
                                                <Moment format="DD/MM/YYYY  HH:mm">{utcToLocal(matchDetails.date_time)}</Moment>
                                            </div>
                                            {(statusLivePast.some(status=>status===matchDetails.status)) &&
                                                <div className="score">{matchDetails.homeTeam.score} : {matchDetails.awayTeam.score}</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-xs-4 club" onClick={() => this.props.history.push(`/team/${awayTeamId}`)}>
                                        <img src={matchDetails.awayTeam.logo_path ? matchDetails.awayTeam.logo_path : imgMissingLogo} alt=""
                                        />
                                        <p>{matchDetails.awayTeam.name}</p>
                                    </div>
                                </div>
                                {(statusLivePast.some(status=>status===matchDetails.status)) &&
                                    <div className="sec-3">
                                        <div className="card">
                                            {matchDetails.goals.length &&
                                                <div className="row row-no-gutters d-flex ais-stretch" style={{ fontSize: '12px' }}>
                                                    <div className="col-xs-5 d-flex ais-center j-start">
                                                        {/* {console.log(matchDetails.homeTeam.id)} */}
                                                        {/* { console.log(found)} */}
                                                        {/* {(matchDetails.homeTeam.id===matchDetails.goals.team_id) && */}
                                                        <table>
                                                            {homeTeamGoals.map((goal,key) => (
                                                                <tr key={key}><td>{goal.player_name}- </td><td className="pl-3">{moment.duration(goal.minute, "minutes").format("*mm")}'</td></tr>
                                                            ))}
                                                        </table>
                                                        {/* } */}

                                                    </div>
                                                    <div className="col-xs-2 d-flex ais-center j-center">
                                                        <img src={goal} alt="" />
                                                    </div>
                                                    <div className="col-xs-5 d-flex ais-center j-center">

                                                        <table>
                                                            {awayTeamGoals.map((goal,key) => (
                                                                <tr key={key}><td>{goal.player_name}-</td><td className="pl-3">{moment.duration(goal.minute, "minutes").format("*mm")}'</td></tr>
                                                            ))}
                                                        </table>

                                                    </div>
                                                </div>
                                            }
                                        </div>

                                    </div>
                                }
                                <div className="row row-no-gutters">
                                    <div className="col-xs-6 stadium" style={{ borderRight: '1px solid white' }}>
                                        Stadium: <br /> <div style={{ textTransform: 'uppercase' }}>{matchDetails.venue.name}</div>
                                    </div>
                                    <div class="col-xs-6 referee">
                                        Referee: <br /><div style={{ textTransform: 'uppercase' }}>{matchDetails.referee.fullname}</div>
                                    </div>
                                </div>

                                {/* {(matchDetails.status === 'AET' || matchDetails.status === 'FT') &&
                                <div class="block sec-3" style={{ backgroundColor: '#700d7b' }}>
                                    <div class="card block"> */}
                                {/* {matchDetails.goals.length > 0 &&
                                            <div class="row row-no-gutters d-flex ais-stretch">

                                                <div class="col-xs-5 d-flex ais-center">
                                                    <img src={goal} alt="" />
                                                    <span>Goal</span>
                                                    <span class="ml-auto mr-2">:</span>
                                                </div>
                                                <div class="col-xs-5">
                                                    {matchDetails.goals.map(goal => (
                                                        <ul>
                                                            <li>-{goal.player_name}</li>

                                                        </ul>
                                                    ))}
                                                </div>
                                                <div class="col-xs-2">
                                                    {matchDetails.goals.map(goal => (
                                                        <ul>
                                                            <li>{goal.minute}'</li>

                                                        </ul>
                                                    ))}
                                                </div>
                                            </div>
                                        } */}
                                {/* {matchDetails.cards.filter(cards => cards.type === 'redcard').length > 0 &&

                                            <div class="row row-no-gutters d-flex ais-stretch">
                                                <div class="col-xs-5 d-flex ais-center">
                                                    <img src={redcard} alt="" />
                                                    <span>Red Card</span>
                                                    <span class="ml-auto mr-2">:</span>
                                                </div>
                                                <div class="col-xs-5">
                                                    {matchDetails.cards.filter(cards => cards.type === 'redcard').map(redcard => (
                                                        <ul><li>- {redcard.player_name}</li></ul>))}

                                                </div>
                                                <div class="col-xs-2">
                                                    {matchDetails.cards.filter(cards => cards.type === 'redcard').map(redcard => (
                                                        <ul><li>{redcard.minute}'</li></ul>))}

                                                </div>
                                            </div>
                                        } */}
                                {/* {matchDetails.cards.filter(cards => cards.type === 'yellowcard').length > 0 &&

                                            <div class="row row-no-gutters d-flex ais-stretch" style={{ backgroundColor: 'white' }}>
                                                <div class="col-xs-5 d-flex ais-center">
                                                    <img src={yellowcard} alt="" />
                                                    <span>Yellow Card</span>
                                                    <span class="ml-auto mr-2">:</span>
                                                </div>
                                                <div class="col-xs-5">
                                                    {matchDetails.cards.filter(cards => cards.type === 'yellowcard').map(yellowcard => (
                                                        <ul><li>- {yellowcard.player_name}</li></ul>))}

                                                </div>
                                                <div class="col-xs-2">
                                                    {matchDetails.cards.filter(cards => cards.type === 'yellowcard').map(yellowcard => (
                                                        <ul><li>{yellowcard.minute}'</li></ul>))}

                                                </div>
                                            </div>
                                        } */}
                                {/* </div>
                                </div>
                                
                            } */}

                                {/* <div className="clearfix"></div> */}
                            </div>}
                    </div>

                    {!!keys(matchDetails).length && <MatchTabs match={matchDetails} totallinesOfcardsGoals={matchDetails.goals.length + matchDetails.cards.length} />}
                </div>
            </React.Fragment>

        );

    }
};

export default withRouter(MatchDetails);

const ScorePredictionSlider = (props) => {
    const params = {
        slidesPerView: 2,
        spaceBetween: 10,
    };
    const { data } = props;
    if (data.length)
        return (
            <Swiper {...params}>
                {data && data.map((value, key) => (
                    <div key={key}>
                        <Slide match={value} />
                    </div>
                ))}
            </Swiper>
        );
    return (<ItemSliderSimmer />);
};

const Slide = ({ match }) => (
    <Link to={`score-preiction/${match.id}`} className="link display-block">
        <div className="thumb">
            <div className="cover-bg" style={{ background: `url(${match.warbanner}) center`, backgroundSize: 'cover' }}>
            </div>
            <div className="thumb-meta">
                <p>{match.team1} VS {match.team2}</p>
            </div>
        </div>
    </Link>
);


const utcToLocal = dateTime => {
    const stillUtc = moment.utc(dateTime).toDate();
    return moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
}





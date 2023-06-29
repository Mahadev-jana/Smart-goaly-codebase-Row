import React, { Fragment, useState, Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { isNull } from 'lodash';
import Modal from 'react-responsive-modal';
import { getUserDetails } from '../../_helper/authentication';
import bgContentgame from '../../assets/img/bg-contentgame.jpg';
import bgContentgame1 from '../../assets/img/bg-contentgame.jpg';
import icoStadium from '../../assets/thumb/ico-stadium.png';
import { dateTimeFomat } from '../../_helper/date-format';
import UserPlayContest from './UserPlayContest';
import Chelsea from '../../assets/img/Chelsea.svg';
import Moment from 'react-moment';
import NonCellularDataPopUup from '../../template/sidebar/sidebarNonCellularDataPopUp';
import InactiveNewMemberPopup from '../../template/sidebar/inactiveAndNewMemberPopup';
import PutUsernamePopup from '../../../src/components/current-prediction-card/PutUsernamePopup';

// const PredictionCard = (props) => {
// const [{ open, predictionId }, setModal] = useState({ open: false, predictionId: null });
class PredictionCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            predictionId: null,
            activeLoginUser: false,
            nonLoginUser: false,
            inactiveLoginUser: false,
            subscribeduser: false,
            msisdn: '',
            leauge_logo: '',
            noUsername: false,
            first_name: '',
            last_name: ''
        }
    }

    loginCheck = () => {
        // console.log(this.state.activeLoginUser);
        // if (localStorage.getItem('userDetails') !== null) {
        // console.log(getUserDetails().status,'userdetails')

        const loginUserInfo = JSON.parse(localStorage.getItem('userDetails'));
        const jwtloginUserInfo = localStorage.getItem('JWT')
        // console.log(loginUserInfo.status)
        // console.log(jwtloginUserInfo)
        if (getUserDetails() == null) {
            console.log('inactive status user');
            this.setState({
                subscribeduser: true
            })
        }
        if (getUserDetails() && getUserDetails().status === 'active' && getUserDetails().first_name !== '' && getUserDetails().last_name !== '') {
            console.log('active subscribed user');
            // this.setState({
            //     activeLoginUser: true
            // })
            this.props.history.push(`/contest/${this.props.prediction.id}`,
                { matchId: this.props.prediction.match_id, hometeamid: this.props.prediction.hometeamid, awayteamid: this.props.prediction.awayteamid })


        }
        if (getUserDetails() && getUserDetails().status === 'inactive') {
            console.log('inactive status user');
            this.setState({
                inactiveLoginUser: true,
                msisdn: getUserDetails().msisdn
            })
        }
        if (getUserDetails() && getUserDetails().status === 'active' && getUserDetails().first_name === '' && getUserDetails().last_name !== '') {
            console.log('only f name needed')
            this.setState({
                noUsername: true,
                first_name: '',
                last_name: getUserDetails().last_name,
                msisdn: getUserDetails().msisdn
            })

        }
        if (getUserDetails() && getUserDetails().status === 'active' && getUserDetails().first_name !== '' && getUserDetails().last_name === '') {
            console.log('only l name needed')
            this.setState({
                noUsername: true,
                first_name: getUserDetails().first_name,
                last_name: '',
                msisdn: getUserDetails().msisdn
            })

        }
        if (getUserDetails() && getUserDetails().status === 'active' && getUserDetails().first_name === '' && getUserDetails().last_name === '') {
            console.log('2 name needed')
            this.setState({
                noUsername: true,
                first_name: getUserDetails().first_name,
                last_name: getUserDetails().last_name,
                msisdn: getUserDetails().msisdn
            })


        }
        // }

        // if (this.state.activeLoginUser) {
        //     this.props.history.push(`/contest/${this.props.prediction.id}`,
        //         { matchId: this.props.prediction.match_id, hometeamid: this.props.prediction.hometeamid, awayteamid: this.props.prediction.awayteamid })
        // }
        // else if (!this.state.activeLoginUser) {
        //     this.setState({
        //         nonLoginUser: true,
        //         open: true
        //     })
        // }
    }
    onCloseModal = () => {
        this.setState({
            open: false
        })
    }

    render() {
        const { open, predictionId, inactiveLoginUser, subscribeduser, msisdn, noUsername, first_name, last_name } = this.state;
        // console.log('props');
        console.log(this.props.prediction.prediction_type);
        // console.log(this.state.nonLoginUser)

        // console.log(this.props.prediction.league_logo)
        return (
            <Fragment>

                <Modal open={noUsername} onClose={() => this.setState({ noUsername: false })} center
                    styles={{
                        modal: {
                            borderRadius: '5px'
                        }
                    }}
                    showCloseIcon={false}
                    focusTrapped={false}
                    onEntered={() => { document.getElementsByTagName('html')[0].style.width = '100%'; }}
                >
                    {<PutUsernamePopup noUsername={noUsername} first_name={first_name} last_name={last_name} msisdn={msisdn} onClose={() => this.setState({ noUsername: false })} />}
                </Modal>
                <Modal open={open} onClose={() => this.setState({ open: false, tab: '' })} center
                    styles={{
                        modal: {
                            borderRadius: '5px'
                        }
                    }}
                    showCloseIcon={false}
                    focusTrapped={false}
                    onEntered={() => { document.getElementsByTagName('html')[0].style.width = '100%'; }}
                >
                    {!isNull(predictionId) && <UserPlayContest predictionId={predictionId} closeModal={() => this.setState({ open: false, predictionId: null })} />}
                </Modal>
                {/* {this.state.nonLoginUser === true && */}
                <Modal open={subscribeduser} onClose={() => this.setState({ subscribeduser: false })} center>
                    <NonCellularDataPopUup onClose={() => this.setState({ subscribeduser: false })} />
                </Modal>
                {/* } */}
                {/* {this.state.nonLoginUser === true && */}
                <Modal open={inactiveLoginUser} onClose={() => this.setState({ inactiveLoginUser: false })} center>
                    <InactiveNewMemberPopup onClose={() => this.setState({ inactiveLoginUser: false })} msisdn={msisdn} />
                </Modal>
                {/* } */}



                <div>
                    <div className="ct-page" style={{ backgroundImage: `url(${bgContentgame})`, height: ' auto' }}>
                        <div className="predic">
                            <div className="d-flex j-center mt-2">
                                <div className="club-left mx-1 text-center">
                                    <Link to={`/team/${this.props.prediction.hometeamid}`}>
                                        <div className="logo">

                                            <img src={this.props.prediction.hometeamlogo} alt="" />
                                        </div>
                                    </Link>
                                    <h5 className="mb-0">{this.props.prediction.hometeam}</h5>
                                </div>
                                <div className="mid mx-2 d-flex ais-center">
                                    <div className="h-max-c">
                                        <div className="date p-1"><Moment format="dddd DD/MM/YY">{this.props.prediction.match_start}</Moment></div>
                                        <div className="place p-1">{this.props.prediction.venue}</div>
                                    </div>
                                </div>
                                <div className="club-right mx-1 text-center">
                                    <Link to={`/team/${this.props.prediction.awayteamid}`}>
                                        <div clclassNameass="logo">

                                            <img src={this.props.prediction.awayteamlogo} alt="" />

                                        </div>
                                    </Link>
                                    <h5 className="mb-0">{this.props.prediction.awayteam}</h5>
                                </div>
                            </div>
                            {(this.props.date.current_date < this.props.prediction.pred_start) && (this.props.date.current_date < this.props.prediction.pred_end) && <button type="button" className="btn btn-lg btn-grey w-100 my-2" style={{ fontSize: "11pt" }}
                            >Coming Up</button>}

                            {(this.props.date.current_date >= this.props.prediction.pred_start) && (this.props.date.current_date <= this.props.prediction.pred_end) &&
                                <div>
                                    <li>
                                        {this.props.prediction.prediction_type == "weekly" &&
                                            <span type="button" className="btn btn-lg btn-success my-2" style={{ fontSize: "10pt", backgroundColor: '#fff', color: 'black', margin: '0px 3px 0px -23px', padding: '12px' }}

                                            >Weekly Contest</span>
                                        }
                                        {this.props.prediction.prediction_type == "monthly" &&
                                            <span type="button" className="btn btn-lg btn-success my-2" style={{ fontSize: "9pt", backgroundColor: '#fff', color: 'black', margin: '0px 3px 0px -23px', padding: '12px' }}

                                            >Monthly Contest</span>
                                        }

                                        <span type="button" className="btn btn-lg btn-success my-2" style={{ fontSize: "10pt", backgroundColor: '#fff', color: 'black', padding: '5px', width: '210px' }}

                                        >  <img src={this.props.prediction.league_logo} height="30" />{this.props.prediction.league}</span>
                                    </li>

                                    <button type="button" className="btn btn-lg btn-success w-100 my-2" style={{ fontSize: "11pt", backgroundColor: '#159B3E' }}
                                        // onClick={() =>
                                        //     props.history.push(`/contest/${props.prediction.id}`,
                                        //         { matchId: props.prediction.match_id, hometeamid: props.prediction.hometeamid, awayteamid: props.prediction.awayteamid })
                                        //         }
                                        onClick={this.loginCheck}
                                    >LET'S PLAY</button>
                                </div>}
                            {(this.props.date.current_date > this.props.prediction.pred_end) && (this.props.date.current_date > this.props.prediction.pred_start) &&
                                <button type="button" className="btn btn-lg btn-grey w-100 my-2" style={{ fontSize: "11pt" }}
                                >Time Up</button>}
                            <span clclassNameass="d-block mb-2 text-center" style={{ color: ' white', fontSize: "13pt" }}><strong>Prediction :</strong></span>
                            <div className="card p-2">
                                <div className="row row-no-gutters">
                                    <div className="col-xs-6 text-center py-1 border-right">Start: <br /> <strong><Moment format="ddd, DD/MM/YY">{this.props.prediction.pred_start}</Moment></strong></div>
                                    <div className="col-xs-6 text-center py-1">End: <br /> <strong><Moment format="ddd, DD/MM/YY">{this.props.prediction.pred_end}</Moment></strong></div>
                                    <div className="col-xs-12 text-center py-2 border-top mt-1">Total point can win: <b>{this.props.winPoint.winpoint}</b></div>
                                    <div>
                                        {this.props.prediction.players && !!this.props.prediction.players.length &&
                                            <div className="col-xs-12 text-center py-2 border-top">User who play:
                                </div>}
                                        {this.props.prediction.players.map((player, key) => (
                                            <b key={key}>{key + 1}. {player.name} ({player.pts})</b>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="btn btn-lg btn-purple mt-2" onClick={() => this.setState({ open: true, predictionId: this.props.prediction.id })}>See Who Play</button>
                        </div>

                    </div>
                    <br />
                </div>
            </Fragment>
        )
    }
}

export default withRouter(PredictionCard);



{/* <Fragment>
            <Modal open={open} onClose={() => setModal({ open: false, tab: '' })} center
                styles={{
                    modal: {
                        borderRadius: '5px'
                    }
                }}
                showCloseIcon={false}
                focusTrapped={false}
                onEntered={() => { document.getElementsByTagName('html')[0].style.width = '100%'; }}
            >
                {!isNull(predictionId) && <UserPlayContest predictionId={predictionId} closeModal={() => setModal({ open: false, predictionId: null })} />}
            </Modal>
            <div className="col-xs-12 lm ct mt-10 pd-0">
                <div className="ct-page" style={{ backgroundImage: `url(${bgContentgame})` }}>
                    {(props.date.current_date < props.prediction.pred_start) && (props.date.current_date < props.prediction.pred_end) && <span style={{
                        position: 'absolute',
                        top: '35%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: '#fff',
                        padding: '10px 20px',
                        fontSize: '20px',
                        letterSpacing: '1px',
                        borderRadius: '5px'
                    }}
                    >Coming Up</span>}

                    {(props.date.current_date >= props.prediction.pred_start) && (props.date.current_date <= props.prediction.pred_end) && <span style={{
                        position: 'absolute',
                        top: '35%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: '#fff',
                        padding: '10px 20px',
                        fontSize: '20px',
                        letterSpacing: '1px',
                        borderRadius: '5px'
                    }}
                        onClick={() => 
                            props.history.push(`/contest/${props.prediction.id}`,
                            {matchId: props.prediction.match_id ,hometeamid:props.prediction.hometeamid,awayteamid:props.prediction.awayteamid})}                    >Let's Play</span>}

                    {(props.date.current_date > props.prediction.pred_end) && (props.date.current_date > props.prediction.pred_start) && <span style={{
                        position: 'absolute',
                        top: '35%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: '#fff',
                        padding: '10px 20px',
                        fontSize: '20px',
                        letterSpacing: '1px',
                        borderRadius: '5px'
                    }}
                    >Time Up</span>}



                    <div className="head">
                        <div className="col-xs-5 pl-10 pr-5">
                            <div className="left">
                                <img src={props.prediction.league_logo} height="34" alt="" />
                                &nbsp; {props.prediction.league}
                            </div>
                        </div>
                        <div className="col-xs-7 pr-10 pl-10 text-right">
                            <div className="right">

                                <div className="matchdate"><Moment format="ddd, DD/MM/YY">{props.prediction.match_start}</Moment></div>

                                <div className="stadium">
                                    {props.prediction.venue} &nbsp;
                            <img src={icoStadium} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mid">
                        {/* <div className="col-xs-3 pd-0"> */}
        //                 <div>
        //                     <Link to={`/my-team/${props.prediction.hometeamid}`}>
        //                         <div className="square">
        //                             <img src={props.prediction.hometeamlogo} height="60" alt="" />
        //                         </div>
        //                     </Link>
        //                 </div>
        //                 {/* <div className="col-xs-6 pd-0"> */}
        //                 <div style={{
        //                     display: 'block',
        //                     position: 'absolute',
        //                     top: 0,
        //                     bottom: 0,
        //                     left: '95px',
        //                     right: '95px',
        //                 }}>
        //                     <div className="">
        //                         <div className="left" style={{ width: 77, fontSize: 13, fontWeight: 600, float: 'left' }}>
        //                             <h3 style={{ width: 20, fontSize: 13, fontWeight: 600 }}>{props.prediction.hometeam} </h3>
        //                             {props.prediction.status && props.prediction.status == "FT" && <div style={{ float: 'right', marginTop: -25 }}>{props.prediction.score_home}</div>}
        //                         </div>
        //                         <div className="right" style={{ width: 77, fontSize: 13, fontWeight: 600, float: 'right' }}>
        //                             {props.prediction.status && props.prediction.status == "FT" && <div style={{ float: 'right', marginTop: 20 }}>{props.prediction.score_away}</div>}
        //                             <h3 style={{ width: 70, fontSize: 13, fontWeight: 600 }}>{props.prediction.awayteam}
        //                             </h3>
        //                         </div>

        //                     </div>
        //                 </div>
        //                 {/* <div className="col-xs-3 pd-0"> */}
        //                 <div>
        //                     <Link to={`/my-team/${props.prediction.awayteamid}`}>
        //                         <div className="square2">
        //                             <img src={props.prediction.awayteamlogo} height="60" alt="" />
        //                         </div>
        //                     </Link>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="bt-page">
        //             <ul>
        //                 <li>
        //                     <strong>Prediction:</strong>
        //                     <span className="pre-date"><strong>Start:</strong> <Moment format="ddd, DD/MM/YY">{props.prediction.pred_start}</Moment>  &nbsp;&nbsp;|&nbsp;&nbsp; <strong>End:</strong> <Moment format="ddd, DD/MM/YY">{props.prediction.pred_end}</Moment></span>
        //                 </li>
        //                 <li>
        //             <strong>Total point can win:{props.winPoint.winpoint}</strong>
        //                 </li>
        //                 <li>
        //                     {props.prediction.players && !!props.prediction.players.length && <strong>User who play:</strong>}
        //                     <span className="pre-date">
        //                         {props.prediction.players.map((player, key) => (
        //                             <span key={key} style={{ marginRight: '10px' }}>{key + 1}. {player.name} ({player.pts})</span>
        //                         ))}
        //                     </span>
        //                 </li>
        //                 <li className="text-center">
        //                     <a className="btn btn-who" onClick={() => setModal({ open: true, predictionId: props.prediction.id })}>Show Who Play</a>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        // </Fragment> */}
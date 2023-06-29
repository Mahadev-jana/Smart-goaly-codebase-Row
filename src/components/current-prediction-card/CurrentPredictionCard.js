import React, { Fragment, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import Modal from 'react-responsive-modal';
import { isNull } from 'lodash';
import UserPlayContest from '../../pages/contest/UserPlayContest';
import Swal from 'sweetalert2';
import { getUserDetails } from '../../_helper/authentication';
import NonCellularDataPopUup from '../../template/sidebar/sidebarNonCellularDataPopUp';
import InactiveNewMemberPopup from '../../template/sidebar/inactiveAndNewMemberPopup';
import PutUsernamePopup from './PutUsernamePopup';
const CurrentPredictionCard = React.memo(({ awayteam, awayteamid, awayteamlogo, hometeam, hometeamid, hometeamlogo, id,
    league, league_logo, match_start, players, pred_end, pred_start, venue, history, currentDate, score_home, score_away, status, winPoint ,prediction_type}) => {

    const [inactiveUser, setInactiveUser] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [msisdn, setmsisdn] = useState('');
    const [noUsername, setNousername] = useState(false);
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');

    function awayDetails() {

        history.push(`team/${awayteamid}`);


    }
    function homeDetails() {

        history.push(`team/${hometeamid}`);


    }
    function playContest() {
        // console.log(getUserDetails().first_name)
        if (getUserDetails() == null) {
            console.log('user not subscribed');
            setSubscribed(true)
        }
        if (getUserDetails() && getUserDetails().status === 'inactive') {
            console.log('inactive status user');
            setmsisdn(getUserDetails().msisdn);
            setInactiveUser(true)
        }

        if (getUserDetails() && getUserDetails().status === 'active' && getUserDetails().first_name !== '' && getUserDetails().last_name !== '') {
            history.push(`contest/${id}`);


        }
        if (getUserDetails() && getUserDetails().status === 'active' && getUserDetails().first_name === '' && getUserDetails().last_name !== '') {
            console.log('only f name needed')
            setNousername(true);
            setFirst_name('');
            setLast_name(getUserDetails().last_name);
            setmsisdn(getUserDetails().msisdn);
        }
        if (getUserDetails() && getUserDetails().status === 'active' && getUserDetails().first_name !== '' && getUserDetails().last_name === '') {
            console.log('only l name needed')
            setNousername(true);
            setFirst_name(getUserDetails().first_name);
            setLast_name('');
            setmsisdn(getUserDetails().msisdn);
        }
        if (getUserDetails() && getUserDetails().status === 'active' && getUserDetails().first_name === '' && getUserDetails().last_name === '') {
            console.log('2 name needed')
            setNousername(true);
            setFirst_name('');
            setLast_name('');
            setmsisdn(getUserDetails().msisdn);

        }


    }

    const [{ open, predictionId }, setModal] = useState({ open: false, predictionId: null });
    console.log(noUsername)
    return (

        <div>
            {/* when user subscribed and active but have no username */}

            <Modal open={noUsername} center onClose={() => setNousername(false)}
                styles={{
                    modal: {
                        borderRadius: '5px'
                    }
                }}
                showCloseIcon={false}
                focusTrapped={false}
                onEntered={() => { document.getElementsByTagName('html')[0].style.width = '100%'; }}
            >
                <PutUsernamePopup onClose={() => setNousername(false)} noUsername={noUsername} first_name={first_name} last_name={last_name} msisdn={msisdn} />
            </Modal>
            <Modal open={subscribed} center onClose={() => setSubscribed(false)}
                styles={{
                    modal: {
                        borderRadius: '5px'
                    }
                }}
                showCloseIcon={false}
                focusTrapped={false}
                onEntered={() => { document.getElementsByTagName('html')[0].style.width = '100%'; }}
            >
                <NonCellularDataPopUup onClose={() => setSubscribed(false)} />
            </Modal>
            <Modal open={inactiveUser} center onClose={() => setInactiveUser(false)}
                styles={{
                    modal: {
                        borderRadius: '5px'
                    }
                }}
                showCloseIcon={false}
                focusTrapped={false}
                onEntered={() => { document.getElementsByTagName('html')[0].style.width = '100%'; }}
            >
                {<InactiveNewMemberPopup onClose={() => setInactiveUser(false)} msisdn={msisdn} />}
            </Modal>
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
                {!isNull(id) && <UserPlayContest predictionId={predictionId} closeModal={() => setModal({ open: false, predictionId: null })} />}
            </Modal>
            <Row style={{ marginBottom: '30px' }}>
                <Col xs={12} className="lm ct pd-0">
                    <div className="ct-page">
                        {(currentDate < pred_start) && (currentDate < pred_end) && <Link to="">
                            <span style={{
                                position: 'absolute',
                                top: '28%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                // background: 'rgba(0, 0, 0, 0.5)',
                                background: '#1bbc1b',
                                color: 'rgb(255, 255, 255)',
                                padding: '10px 20px',
                                fontSize: '20px',
                                letterSpacing: '1px',
                                padding: '10px 35px 10px 35px'
                                // borderRadius: '5px'
                            }}>Coming Up</span>
                        </Link>}
                        {(currentDate >= pred_start) && (currentDate <= pred_end) &&
                            <div
                            //  to={`contest/${id}`}
                            >
                                <span style={{
                                    position: 'absolute',
                                    top: '28%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    // background: 'rgba(0, 0, 0, 0.5)',
                                    background: '#1bbc1b',
                                    color: 'rgb(255, 255, 255)',
                                    padding: '10px 20px',
                                    fontSize: '20px',
                                    letterSpacing: '1px',
                                    padding: '10px 35px 10px 35px'
                                    // borderRadius: '5px'
                                }}
                                    onClick={playContest}>Let's Play</span>

                            </div>
                        }
                        {(currentDate > pred_end) && (currentDate > pred_start) && <Link to="" >
                            <span style={{
                                position: 'absolute',
                                top: '28%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                // background: 'rgba(0, 0, 0, 0.5)',
                                background: '#1bbc1b',
                                color: 'rgb(255, 255, 255)',
                                padding: '10px 20px',
                                fontSize: '20px',
                                letterSpacing: '1px',
                                padding: '10px 35px 10px 35px'
                                // borderRadius: '5px'

                            }} >Time Up</span>
                        </Link>}

                        <div className="head">
                            <div className="col-xs-7 pl-10 pr-5">
                                <div className="left" style={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    <img src={league_logo} height="34" alt="" style={{
                                        width: 'auto'
                                    }} />
                                    &nbsp; {league}
                                </div>
                            </div>
                            <div className="col-xs-5 pr-10 pl-10 text-right">
                                <div className="right" style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <div className="matchdate"><Moment format="ddd, DD/MM/YY">{match_start}</Moment></div>
                                    <div className="stadium" style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        {venue} &nbsp;
									<img src="http://fe.linkit360.com/goaly/img/thumb/ico-stadium.png" alt="" style={{
                                            width: 'auto'
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Row className="mid2">
                            <Col xs={12} className="pd-0">
                                <Row>
                                    <Col xs={3} onClick={homeDetails}
                                    // {() => history.push(`team/${hometeamid}`)}
                                    >
                                        <div class="square">
                                            <img src={hometeamlogo} height="60" alt="" />
                                        </div>
                                    </Col>
                                    <Col xs={6} className="pd-0 text-center">
                                        <div className="line">
                                            <div className="text-center" style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <div>{hometeam}</div>
                                                {status && status == "FT" && <div style={{ padding: 5, paddingLeft: '15px' }}>{score_home}</div>}
                                                <div style={{ margin: '0 5px' }}>Vs</div>
                                                {status && status == "FT" && <div style={{ padding: 5, paddingLeft: '20px' }}>{score_away}</div>}
                                                <div>{awayteam}</div>

                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={3} onClick={awayDetails}
                                    // {() => history.push(`team/${awayteamid}`)}
                                    >
                                        <div className="square2 text-right">
                                            <img src={awayteamlogo} height="60" alt="" />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <div className="clearfix"></div>
                    {console.log(prediction_type)}
                    <div className="bt-page2">
                        <ul>
                            {!!pred_start && <li>
                                <strong>Prediction:</strong>  <span className="pre-date text-green"><strong>Start: </strong><Moment format="ddd, DD/MM/YY">{pred_start}</Moment>&nbsp;&nbsp;|&nbsp;&nbsp;<strong>End:</strong> <Moment format="ddd, DD/MM/YY">{pred_end}</Moment> </span>
                            </li>}
                            <li>
                                <strong>Total point can win:{winPoint}</strong>
                            </li>
                            <li>
                                {!!players.length && <strong >User who play:</strong>}
                                <span className="pre-date" >
                                    {players && players.map((prediction, key) => (
                                        <div key={key}>&nbsp; {key + 1}.{prediction.name}&nbsp;({prediction.prediction}) </div>
                                    ))}
                                </span>
                            </li>
                            {(currentDate >= pred_start) && (currentDate <= pred_end) ?
                                <li className="text-center">
                                    <a className="btn btn-who" onClick={() => setModal({ open: true, predictionId: id })} style={{ marginRight: '15px' }}>Show Who Play</a>
                                    {prediction_type=='weekly' &&  <span className="btn btn-who" style={{ background: 'white', color: 'black', border: '1px solid black' }}>Weekly Contest</span>}
                                    
                                    {prediction_type=='monthly' && <span className="btn btn-who" style={{ background: 'white', color: 'black', border: '1px solid black' }}>Monthly Contest</span>}
                           
                                </li>
                                :
                                <li className="text-center">
                                    <a className="btn btn-who" onClick={() => setModal({ open: true, predictionId: id })} >Show Who Play</a>

                                </li>
                            }

                        </ul>
                    </div>
                </Col>
            </Row>
        </div>
    )
});

export default withRouter(CurrentPredictionCard);
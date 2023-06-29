import React, { useState, useEffect } from 'react';
import axios from '../../_config/axios';
import Modal from 'react-responsive-modal';
import logoGoaly from '../../assets/img/logo-goaly.png';
import manchester from '../../assets/img/Manchester united.svg';
import chelsea from '../../assets/img/Chelsea.svg';
import ContentLoader from '../../loader/content-loader';
const data = [
    {
        name: 'Yim Darayuth',
        date: '20/10/20202 03:43:49',
        userAnsAway: 1,
        userAnsHome: 1,
        coreectAnsAway: 1,
        coreectAnsHome: 2,
        userAns1: 10,
        correctAns1: 2,
    },
    {
        question_id: 2,
        point1: 50,
        userAns12: 1,
        correctAns2: 2,
        point2: 50,
        userAns3: 1,
        correctAns3: 2,
        point3: 50,
        userAns4: 1,
        correctAns14: 2,
        point4: 50,
        totalPoints: 50



    }]
const data1 = [
    {
        user_id: "1266",
        question_id: "77",
        user_predicted_answer: "2 : 2",
        user_played_date: "2020-10-13 03:07:21",
        admin_submit_answer: "3 : 3",
        admin_submit_date: "2020-10-21 14:57:21",
        point: 0
    },
    {
        user_id: "1266",
        question_id: "78",
        user_predicted_answer: "1",
        user_played_date: "2020-10-13 03:07:21",
        admin_submit_answer: "1",
        admin_submit_date: "2020-10-21 14:57:21",
        point: 10
    },
    {
        user_id: "1266",
        question_id: "79",
        user_predicted_answer: "2",
        user_played_date: "2020-10-13 03:07:21",
        admin_submit_answer: "1",
        admin_submit_date: "2020-10-21 14:57:21",
        point: 0
    },
    {
        user_id: "1266",
        question_id: "80",
        user_predicted_answer: "1",
        user_played_date: "2020-10-13 03:07:21",
        admin_submit_answer: "1",
        admin_submit_date: "2020-10-21 14:57:21",
        point: 10
    },
    {
        user_id: "1266",
        question_id: "81",
        user_predicted_answer: "2",
        user_played_date: "2020-10-13 03:07:21",
        admin_submit_answer: "1",
        admin_submit_date: "2020-10-21 14:57:21",
        point: 0
    },
    {
        user_id: "1266",
        question_id: "82",
        user_predicted_answer: "2",
        user_played_date: "2020-10-13 03:07:21",
        admin_submit_answer: "1",
        admin_submit_date: "2020-10-21 14:57:21",
        point: 0
    }
]

const PointsDetailsPopup = (props) => {
    console.log(props)
    { console.log(props.pred_id, props.user_id) }
    console.log(data1[0])
    const [pointsDetails, setPointDetails] = useState([])
    const [totalPoints, setTotalPoints] = useState('')
    const [userName, setUserName] = useState('')
    const [homeTeamLogo, setHomeTeamLogo] = useState('')
    const [awayTeamLogo, setAwayTeamLogo] = useState('')
    const [matchStarted, setMatchStarted] = useState('')
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true);
        const payload = new FormData();
        payload.append('user_id', props.user_id);
        payload.append('pred_id', props.pred_id);
        axios.post('/getUserAndAdminAnswer', payload).then(res => {
            if (res.data && res.data.success && res.data.success == 1) {
                // console.log(res.data.response.data);
                setPointDetails(res.data.response.data);
                setTotalPoints(res.data.response.total_point)
                setUserName(res.data.response.user_name)
                setHomeTeamLogo(res.data.response.home_team_logo)
                setAwayTeamLogo(res.data.response.away_team_logo)
                setAwayTeamLogo(res.data.response.away_team_logo)
                setMatchStarted(res.data.response.match_start_time)
                // console.log(res.data.videos);
                // if (res.data.videos && isArray(res.data.videos)) {
                //     setVideos(res.data.videos);
                // }
                setLoading(false)
            }
        }).catch(err => {
            console.log({ err });
        })

    }, []);

    console.log(pointsDetails);
    return (
        <div>
            <Modal open={props.popupOpen} center
                styles={{
                    modal: {
                        borderRadius: '5px'
                    }
                }}
                onClose={props.onCloseModal}
                showCloseIcon={true}
                focusTrapped={false}
                onEntered={() => { document.getElementsByTagName('html')[0].style.width = '100%'; }}
            >
                {loading &&
                    <ContentLoader />
                }
                {!loading && pointsDetails.length == 0 &&
                    <div style={{ padding: '30px 10px 30px 10px' }}>Data not available right now</div>
                }
                {pointsDetails.length > 0 && !loading &&
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={logoGoaly} alt="" height="60" />
                        </div>
                        <div className="standing" style={{ minWidth: '300px' }}>
                            <h1>{userName}</h1>
                            <h2 style={{ color: 'black' }}>{"Prediction time - "}{pointsDetails[0].user_played_date}</h2>
                            <h2 style={{ color: 'black' }}>{"Match Started - "}{matchStarted}</h2>
                            <table className="table table-striped table-responsive">
                                <tbody>
                                    <tr style={{ backgroundColor: '#159B3E', height: '45px' }}>
                                        <th style={{ color: '#fff' }}>User Answer</th>
                                        <th style={{ color: '#fff' }}>Correct Answer</th>
                                        <th style={{ color: '#fff' }}>Point</th>
                                    </tr>

                                    <tr className="wpos">
                                        <td><img src={homeTeamLogo} style={{ maxWidth: '25px' }} />{" "}{pointsDetails[0].user_predicted_answer}{" "}<img src={awayTeamLogo} style={{ maxWidth: '25px' }} /></td>
                                        <td><img src={homeTeamLogo} style={{ maxWidth: '25px' }} />{" "}{pointsDetails[0].admin_submit_answer}{" "}<img src={awayTeamLogo} style={{ maxWidth: '25px' }} /></td>
                                        <td ><strong> {pointsDetails[0].point}</strong> </td>
                                    </tr>
                                    <tr className="wpos" >
                                        {pointsDetails[1].user_predicted_answer == "1" &&
                                            <td><img src={homeTeamLogo} style={{ maxWidth: '25px' }} />{" "}({pointsDetails[1].user_predicted_answer})</td>

                                        }
                                        {pointsDetails[1].user_predicted_answer == "2" &&
                                            <td><img src={awayTeamLogo} style={{ maxWidth: '25px' }} />{" "}({pointsDetails[1].user_predicted_answer})</td>

                                        }
                                        {pointsDetails[1].user_predicted_answer == "3" &&
                                            <td>{" "}({pointsDetails[1].user_predicted_answer})</td>

                                        }
                                        {pointsDetails[1].admin_submit_answer == "1" &&
                                            <td><img src={homeTeamLogo} style={{ maxWidth: '25px' }} />{" "}({pointsDetails[1].admin_submit_answer})</td>
                                        }
                                        {pointsDetails[1].admin_submit_answer == "2" &&
                                            <td><img src={awayTeamLogo} style={{ maxWidth: '25px' }} />{" "}({pointsDetails[1].admin_submit_answer})</td>
                                        }
                                        {pointsDetails[1].admin_submit_answer == "3" &&
                                            <td>{" "}({pointsDetails[1].admin_submit_answer})</td>
                                        }


                                        <td ><strong>{pointsDetails[1].point}</strong> </td>
                                    </tr>
                                    <tr className="wpos">
                                        {pointsDetails[2].user_predicted_answer == "1" &&
                                            <td><img src={homeTeamLogo} style={{ maxWidth: '25px' }} />{" "}({pointsDetails[2].user_predicted_answer})</td>

                                        }
                                        {pointsDetails[2].user_predicted_answer == "2" &&
                                            <td><img src={awayTeamLogo} style={{ maxWidth: '25px' }} />{" "}({pointsDetails[2].user_predicted_answer})</td>

                                        }
                                        {pointsDetails[2].user_predicted_answer == "3" &&
                                            <td>{" "}({pointsDetails[1].user_predicted_answer})</td>

                                        }
                                        {pointsDetails[2].admin_submit_answer == "1" &&
                                            <td><img src={homeTeamLogo} style={{ maxWidth: '25px' }} />{" "}({pointsDetails[2].admin_submit_answer})</td>
                                        }
                                        {pointsDetails[2].admin_submit_answer == "2" &&
                                            <td><img src={awayTeamLogo} style={{ maxWidth: '25px' }} />{" "}({pointsDetails[2].admin_submit_answer})</td>
                                        }
                                        {pointsDetails[2].admin_submit_answer == "3" &&
                                            <td>{" "}({pointsDetails[2].admin_submit_answer})</td>
                                        }
                                        <td ><strong>{pointsDetails[2].point}</strong> </td>
                                    </tr>
                                    <tr className="wpos">
                                        {pointsDetails[3].user_predicted_answer == "1" &&
                                            <td><img src={homeTeamLogo} style={{ maxWidth: '25px' }} />{" "}({pointsDetails[3].user_predicted_answer})</td>

                                        }
                                        {pointsDetails[3].user_predicted_answer == "2" &&
                                            <td><img src={awayTeamLogo} style={{ maxWidth: '25px' }} />{" "}({pointsDetails[3].user_predicted_answer})</td>

                                        }
                                        {pointsDetails[3].user_predicted_answer == "3" &&
                                            <td>{" "}({pointsDetails[3].user_predicted_answer})</td>

                                        }
                                        {pointsDetails[3].admin_submit_answer == "1" &&
                                            <td><img src={homeTeamLogo} style={{ maxWidth: '25px' }} />{" "}({pointsDetails[3].admin_submit_answer})</td>
                                        }
                                        {pointsDetails[3].admin_submit_answer == "2" &&
                                            <td><img src={awayTeamLogo} style={{ maxWidth: '25px' }} />{" "}({pointsDetails[3].admin_submit_answer})</td>
                                        }
                                        {pointsDetails[3].admin_submit_answer == "3" &&
                                            <td>{" "}({pointsDetails[3].admin_submit_answer})</td>
                                        }
                                        <td ><strong>{pointsDetails[3].point}</strong> </td>
                                    </tr>
                                    <tr className="wpos">
                                        {pointsDetails[4].user_predicted_answer == "1" &&
                                            <td><img src={homeTeamLogo} style={{ maxWidth: '25px' }} />{" "}({pointsDetails[4].user_predicted_answer})</td>

                                        }
                                        {pointsDetails[4].user_predicted_answer == "2" &&
                                            <td><img src={awayTeamLogo} style={{ maxWidth: '25px' }} />{" "}({pointsDetails[4].user_predicted_answer})</td>

                                        }
                                        {pointsDetails[4].user_predicted_answer == "3" &&
                                            <td>{" "}({pointsDetails[4].user_predicted_answer})</td>

                                        }
                                        {pointsDetails[4].admin_submit_answer == "1" &&
                                            <td><img src={homeTeamLogo} style={{ maxWidth: '25px' }} />{" "}({pointsDetails[4].admin_submit_answer})</td>
                                        }
                                        {pointsDetails[4].admin_submit_answer == "2" &&
                                            <td><img src={awayTeamLogo} style={{ maxWidth: '25px' }} />{" "}({pointsDetails[4].admin_submit_answer})</td>
                                        }
                                        {pointsDetails[4].admin_submit_answer == "3" &&
                                            <td>{" "}({pointsDetails[4].admin_submit_answer})</td>
                                        }
                                        <td ><strong>{pointsDetails[4].point}</strong> </td>
                                    </tr>
                                    <tr className="wpos">
                                        {pointsDetails[5].user_predicted_answer == "1" &&
                                            <td><img src={homeTeamLogo} style={{ maxWidth: '25px' }} />{" "}({pointsDetails[5].user_predicted_answer})</td>

                                        }
                                        {pointsDetails[5].user_predicted_answer == "2" &&
                                            <td><img src={awayTeamLogo} style={{ maxWidth: '25px' }} />{" "}({pointsDetails[5].user_predicted_answer})</td>

                                        }
                                        {pointsDetails[5].user_predicted_answer == "3" &&
                                            <td>{" "}({pointsDetails[5].user_predicted_answer})</td>

                                        }
                                        {pointsDetails[5].admin_submit_answer == "1" &&
                                            <td><img src={homeTeamLogo} style={{ maxWidth: '25px' }} />{" "}({pointsDetails[5].admin_submit_answer})</td>
                                        }
                                        {pointsDetails[5].admin_submit_answer == "2" &&
                                            <td><img src={awayTeamLogo} style={{ maxWidth: '25px' }} />{" "}({pointsDetails[5].admin_submit_answer})</td>
                                        }
                                        {pointsDetails[5].admin_submit_answer == "3" &&
                                            <td>{" "}({pointsDetails[5].admin_submit_answer})</td>
                                        }
                                        <td><strong>{pointsDetails[5].point}</strong> </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button type="button" className="btn-reg">
                                <strong style={{ paddingRight: '170px' }}>Total Points</strong><strong>{totalPoints}</strong>
                            </button>
                        </div>
                    </div>
                }

            </Modal>

        </div>
    )
}
export default PointsDetailsPopup;
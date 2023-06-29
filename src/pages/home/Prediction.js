import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Swiper from 'react-id-swiper';
import { isArray, isEmpty } from 'lodash';
import axios from '../../_config/axios';
import PredictionCard from '../../components/current-prediction-card/CurrentPredictionCard';
import { Link } from 'react-router-dom';
import '../../assets/css/how-to-play.css';
import NewSubscriberModal from '../../components/SplashScreen/NewSubscriberModal';
const params = {
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    slidesPerView: 1,
    spaceBetween: 10,
};


const Prediction = () => {
    const [predictions, setPredictions] = React.useState([]);
    const [currentDate, setCurrentDate] = React.useState([]);
    const [winPoint, setwinPoint] = React.useState([]);
    const [userDetails, setUserDetails] = React.useState([]);
    const [open, setOpen] = React.useState(true);

    React.useEffect(() => {
        axios.post('/getTopPrediction').then(res => {
            if (res.data && res.data.success && res.data.success == 1) {
                if (res.data.prediction_list && isArray(res.data.prediction_list)) {
                    setPredictions(res.data.prediction_list);
                    setCurrentDate(res.data.current_date);
                    setwinPoint(res.data.win_point);
                }
            }
        }).catch(err => {
            console.log({ err });
        })

        setUserDetails(JSON.parse(localStorage.getItem('userDetailsforPopup')))

    }, []);

    return (
        <React.Fragment>
            {userDetails && userDetails.login_count >= 0 && userDetails.checkboxstatus == 0 &&

                <NewSubscriberModal />
            }

            <Row>
                <div style={{ padding: 0 }}>
                    <Link to="/contest" style={{ float: 'right', marginTop: 6, paddingRight: 10,color:'#E7155D'}} >See All</Link>
                    <div className="title3" style={{ background: 'none', color: 'black', fontWeight: 700 }}>Prediction Game </div>
                </div>


                <Col xs={12} className="pd-0">
                    {!isEmpty(predictions) && <Swiper {...params}>
                        {predictions.map((prediction, key) => (
                            <Grid key={key}>
                                <PredictionCard {...prediction} winPoint={winPoint} currentDate={currentDate} />
                            </Grid>
                        ))}
                    </Swiper>}
                </Col>
            </Row>
        </React.Fragment>

    )
}

export default Prediction; 
import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';
import { Link, withRouter } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import MenuCategory from '../../components/menu-category';
import TabModal from './TabModal';
import UserPlayContestBlack from './UserPlayContestBlack';

import CurrentPrediction from './CurrentPrediction';
import PreviousPrediction from './PreviousPrediction';
import '../../assets/css/contest.css';
class Contest extends Component {
    render() {
        return (
            <Fragment>
                {/* <Helmet>
                    <title> Goaly | Contest </title>
                    <link rel="icon" type="image/png" href={icon} sizes="20x20" />
                </Helmet> */}
                <MenuCategory />
                <Row style={{ overflow: 'hidden',paddingTop:'65px' }}>
                    <div class="score-predic">
                        <h3 class="my-1">Score Prediction<Link to="/scores"></Link></h3>
                        <TabModal />

                    </div>
                    <div className="row">
                        <div class="header m-2" >
                            <h3 class="m-0" style={{ padding: '14px' }}>Current Prediction</h3>
                            <CurrentPrediction />
                        </div>
                        <div class="header m-2">
                            <h3 class="m-0" style={{ padding: '14px' }}>Previous Prediction</h3>
                            <PreviousPrediction />
                        </div>
                    </div>


                </Row>
                {/* <UserPlayContestBlack
                    id={this.state.userPlayContestId}
                    open={this.state.open}
                    modalClose={this.modalClose}
                /> */}
            </Fragment>
        );
    }
};

export default withRouter(Contest);

// <Fragment>
//                 <MenuCategory />
//                 <Row>

//                     <Col xs={12} className="lm ct">
//                         <h2 className="title-2" style={{ marginBottom: '15px' }}>Score Predictiongfsgb<Link to="/scores" className="pull-right text-small">
//                             </Link></h2>
//                     </Col>
//                     <TabModal />
//                     <Col xs={12} className="mt-10">
//                         <div className="title5">Current Prediction</div>
//                     </Col>
//                     <CurrentPrediction />
//                     <Col xs={12} className="mt-10">
//                         <div className="title5">Previous Prediction</div>
//                     </Col>
//                     <PreviousPrediction />
//                 </Row>
//                 {/* <UserPlayContestBlack
//                     id={this.state.userPlayContestId}
//                     open={this.state.open}
//                     modalClose={this.modalClose}
//                 /> */}
//             </Fragment>
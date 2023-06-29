import React, { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import classnames from 'classnames';
import { includes } from 'lodash';
import { Link } from 'react-router-dom';
import contest from '../../assets/icon/contest.png';
// import pinkwin from '../../assets/icon/pinkwin.png';
import greenwin from '../../assets/icon/greenwin.png';

const activeTab = {
    '/': 'HOME',
    '/contest': 'CONTEST',
    '/matches': 'MATCHES',
    '/news': 'NEWS'
};

const MenuCategory = () => (
    <Row>
        <Col sm={12} className="nnav" style={{position: 'fixed',
    top: '65px',
    left: 0,
    right: 0,
    zIndex: 999}}>
            <ul className="nav nav-tabs">
                <li className={classnames({ 'active': activeTab[window.location.pathname] === 'HOME' })}>
                    <Link to="/" className="ingrid">
                        <i className="far fa-futbol text-center"></i>
                        <span className="text-small">Home</span>
                    </Link>
                </li>
                <li className={classnames({ 'active': activeTab[window.location.pathname] === 'CONTEST' })}>
                    <Link to="/contest" className="ingrid">
                        {!classnames({ 'active': activeTab[window.location.pathname] === 'CONTEST' }) && <img src={contest} style={{height:23,marginLeft: 10}}/>}
                        {classnames({ 'active': activeTab[window.location.pathname] === 'CONTEST' }) && <img src={greenwin} style={{height:23,marginLeft: 11}}/>}

                        <span className="text-small" style={{margingLeft:2}}>Contest</span>
                    </Link>
                </li>
                <li className={classnames({ 'active': activeTab[window.location.pathname] === 'MATCHES' })}>
                    <Link to="/matches" className="ingrid">
                        <i className="far fa-clock text-center"></i>
                        <span className="text-small">Live</span>
                    </Link>
                </li>
                <li className={classnames({ 'active': activeTab[window.location.pathname] === 'NEWS' })}>
                    <Link to="/news" className="ingrid">
                        <i className="far fa-newspaper text-center"></i>
                        <span className="text-small">News</span>
                    </Link>
                </li>
            </ul>
        </Col>
    </Row>
);

export default MenuCategory;

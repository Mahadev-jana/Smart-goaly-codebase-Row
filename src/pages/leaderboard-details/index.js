import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { post } from "../../api";
import { LeaderboardSimmer } from "../../simmer-loader";
import { Tabs, Tab, DropdownButton, MenuItem, ButtonGroup, Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import All from "./all";
import Monthly from "./monthly";
import Quarterly from "./quarterly";
import Weekly from "./weekly";
import "../../assets/css/leaderboard.css";
// import '../../assets/css/bootstrap.min.css';

import shoe from '../../assets/img/slider/shoe.jpg';
import tshirt from '../../assets/img/slider/tshirt.jpg';
import football from '../../assets/img/slider/football.jpg';
import Slider from './slider';
import axios from '../../_config/axios';
import wcLeaderboardBanner1 from '../../assets/img/slider/world_cup_banner_leaderboard_smart_goaly.png' ;
import wcLeaderboardBanner2 from '../../assets/img/slider/smart_reward_banner_2.png' ;
import wcLeaderboardBanner3 from '../../assets/img/slider/smart_leadeboard_image_3.png';
import icon from '../../assets/img/logo-goaly.png';
import Previousweek from "./Previousweek";

const sliderData = [
  {
    id: 1,
    url: shoe,
    desc: 'shoe'

  },
  {
    id: 2,
    url: tshirt,
    desc: 'tshirt'
  },
  {
    id: 3,
    url: football,
    desc: 'football'
  }

]

const sliderData1 = [
  {
    id: 1,
    url: wcLeaderboardBanner3
  },
]
class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: [],
      allGen: [],
      user: [],
      weekly: [],
      monthly: [],
      quarterly: [],
      userData: [],
      prevWeek: [],
      loading: false,
      tab: "Monthly",
      sliderData: [],
      sliderData1: [],
      slideLoading: false,
      mergedArray: [],
      secondPartOfFirstArray: [],
      firstPartOfFirstArray: [],
      mergedArray2: []
    };
  }

  componentDidMount() {

    this.setState({
      slideLoading: true
    });
    setTimeout(() => {
      this.setState({ sliderData, slideLoading: false, sliderData1 });
    });
    this.setState({ loading: true });

    // const payload = new FormData();
    // const userdetails = JSON.parse(localStorage.getItem('userDetails'));

    // payload.append('user_id', userdetails.id);
    axios({
      method: 'post',
      url: 'getleaderboard',

      // headers: {
      //     'JWT': localStorage.getItem('JWT'),
      // },
      // data: payload
    }).then(res => {

      if (res.data.success) {
        // console.log(res.data.score_list.prevWeek);
        // console.log(this.state.prevWeek);
        // if(this.state.prevWeek.length != 0) {
        //   console.log(this.state.prevWeek);
        // }
        this.setState({
          all: res.data.score_list.general,
          weekly: res.data.score_list.weekly,
          monthly: res.data.score_list.monthly,
          quarterly: res.data.score_list.quarterly,
          prevWeek: res.data.score_list.prevWeek,
          userData: res.data.score_list.userData,
          // id:userdetails.id,

          loading: true,


        });

      }

    }).catch(err => {
      console.log({ err })
    })
  }


  setTab(tab) {
    this.setState({
      tab: tab
    });
    this.setState({ id: this.props.id });
  }

  render() {
    const { sliderData, slideLoading, id } = this.state;
    console.log(this.stateallGen)
    return (
      <React.Fragment>
        {/* {
          this.state.prevWeek.length != 0 && <div>Hello</div>
        } */}

				{/* <Helmet>
					<title>Goaly | Leaderboard</title>
					<link rel="icon" type="image/png" href={icon} sizes="20x20" />

				</Helmet> */}
      <div class="row leaderboard">
        <div class="header-leaderboard">
          <h4>LEADERBOARD</h4>

          <ul class="sortmenu">
            {/* <button className={this.state.tab === 'All' ? 'buttonGray' : 'buttonPink'}><a variant={this.state.tab} eventKey="All" onClick={() => this.setState({ tab: 'All' })}>All</a></button> */}
            {/* <button className={this.state.tab === 'Weekly' ? 'buttonGray' : 'buttonPink'}><a activeKey={this.state.tab} onClick={() => this.setState({ tab: 'Weekly' })}>Weekly</a></button>
            <button className={this.state.tab === 'LastWeek' ? 'buttonGray' : 'buttonPink'}><a activeKey={this.state.tab} onClick={() => this.setState({ tab: 'LastWeek' })}>Last Week</a></button> */}
            <button className={this.state.tab === 'Monthly' ? 'buttonGray' : 'buttonPink'}><a activeKey={this.state.tab} onClick={() => this.setState({ tab: 'Monthly' })}>Monthly</a></button>
            {/* <button className={this.state.tab === 'Quarterly' ? 'buttonGray' : 'buttonPink'}><a activeKey={this.state.tab} onClick={() => this.setState({ tab: 'Quarterly' })}>Quarterly</a></button> */}
          </ul>

        </div>
        <div id="slider" class="carousel slide" data-ride="carousel" style={{ height: '90px' }}>
          {!slideLoading && <Slider sliderData={this.state.sliderData1} />}
        </div>

        {this.state.tab === 'All' && !!this.state.all.length && <All scoreList={this.state.all} id={id}
        />}
        {this.state.tab === 'Weekly' && <Weekly scoreList={this.state.weekly} />}
        {this.state.tab === 'Monthly' && <Monthly scoreList={this.state.monthly} />}
        {this.state.tab === 'Quarterly' && <Quarterly scoreList={this.state.quarterly} />}
        {this.state.tab === 'LastWeek' && <Previousweek scoreList={this.state.prevWeek} />}
      </div>
      </React.Fragment>
    );
  }
}

export default withRouter(LeaderBoard);

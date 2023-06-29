import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { post } from '../../api';
import { LeaderboardSimmer } from '../../simmer-loader';
import { Row, Col } from 'react-bootstrap';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';
import Monthly from './monthly';
import Weekly from './weekly';
import All from './all';

import '../../assets/css/winners.css';
// import '../../assets/css/bootstrap.min.css';
import { Tabs, Tab, DropdownButton, MenuItem, ButtonGroup, Button } from "react-bootstrap";

class Winner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekly: [],
      monthly: [],
      all: [],
      monthlyPrizeList: [],
      weeklyPrizeList: [],
      allPrizeList: [],
      loading: false,
      tab: 'Monthly',
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    post('getWinnerBoard')
      .then(res => {
        if (res.data.success)
        {
          console.log('=================');
          console.log(res.data);
          this.setState({
            weekly: res.data.score_list.weekly,
            monthly: res.data.score_list.monthly,
            all: res.data.score_list.general,
            monthlyPrizeList: res.data.month_prize_list,
            weeklyPrizeList: res.data.week_prize_list,
            allPrizeList: res.data.all_prize_list,
          });
          if(this.state.weekly.length != 0) {
            console.log(this.state.weekly[14]);
            console.log(res.data.score_list.weekly[16]);
          }
          this.setState({ loading: false });
        }
         
      })
      .catch(err => console.log(err));
  }


  setTab(tab) {
    this.setState({
      tab: tab
    });
    this.setState({ id: this.props.id });
  }


  render() {
    return (
      <React.Fragment>
        {/* <Helmet>
          <title>Goaly | Winners</title>
          <link rel="icon" type="image/png" href={icon} sizes="20x20" />

        </Helmet> */}
        <div className="row winners">
          <div className="header-winners">
            <h4>WINNERS</h4>

            <ul className="sortmenu">
              {/* <button className={this.state.tab === 'All' ? 'buttonGray':'buttonPink'}><a variant={this.state.tab} eventKey="All"  onClick={() => this.setState({ tab: 'All' })}>All</a></button> */}
              {/* <button className={this.state.tab === 'Weekly' ? 'buttonGray' : 'buttonPink'} style={{ width: ' 150px' }}><a activeKey={this.state.tab} onClick={() => this.setState({ tab: 'Weekly' })}>Weekly</a></button> */}
              <button className={this.state.tab === 'Monthly' ? 'buttonGray' : 'buttonPink'} style={{ width: ' 150px' }}><a activeKey={this.state.tab} onClick={() => this.setState({ tab: 'Monthly' })}>Monthly</a></button>
            </ul>
          </div>

          {/* {this.state.tab === 'All' && <All scoreList={this.state.all} allPrize={this.state.allPrizeList} />} */}
          {/* {this.state.tab === 'Weekly' && <Weekly scoreList={this.state.weekly} weeklyPrize={this.state.weeklyPrizeList} loading={this.state.loading} />} */}
          {this.state.tab === 'Monthly' && <Monthly scoreList={this.state.monthly} monthlyPrize={this.state.monthlyPrizeList} loading={this.state.loading} />}
        </div>
      </React.Fragment>
    );
  }
};
export default withRouter(Winner);
import React, { Component } from 'react'
import { Grid, Col, Row, Image } from 'react-bootstrap';
import { hasIn, size } from 'lodash';
// import HomeTeamGoals from './HomeTeamGoals';
// import noImage from '../../../assets/img/noimage.jpg'
import { Link } from 'react-router-dom';
import noImage from '../../assets/img/noimage.jpg';
import Moment from 'react-moment';
import account from "../../assets/img/account-1@2x.png";
import cup from "../../assets/img/cup.svg";
import coins from "../../assets/img/coins.svg";
import manchester from '../../assets/img/Manchester united.svg';
import chelsea from '../../assets/img/Chelsea.svg';
import HistoryInfo from './HistoryInfo';
import axios from '../../_config/axios';


export class Previousweek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 3,
      visible: true,
      sortedScoreList: []
    }
  }
  componentDidMount() {
    const { scoreList } = this.props;
    this.setState({
      sortedScoreList: scoreList.sort(function (a, b) {
        if (parseInt(a.coins) > parseInt(b.coins)) return -1;
        if (parseInt(a.coins) < parseInt(b.coins)) return 1;
        if (a.first_pred_datetime > b.first_pred_datetime) return 1;
        if (a.first_pred_datetime < b.first_pred_datetime) return -1;
      })
    })

    // console.log("Scorelist is " + scoreList);
    // const payload = new FormData();
    // payload.append('weeklySortedList',JSON.stringify(scoreList));
    // axios.post('/getSortedLeaderboardData',payload)
    //   .then(res=>{
    //     console.log(res)
    //   }).catch(err=>{
    //     console.log(err)
    //   })
  }

  showAll = param => () => {

    this.setState({

      size: this.state.size + param,
      visible: false

    })
  }

  render() {
    const { size, visible } = this.state;
    return (

      <div class="cover-board" style={{ paddingTop: '24px' }}>
        {!!this.state.sortedScoreList && this.state.sortedScoreList.length > 0 &&
          this.state.sortedScoreList.slice(0, size).map((score, key) => {

            return <>
              <div class="board shadow" key={key}>
                <div class="player">
                  <div class="cover-img">
                    <img style={{ borderRadius: '50%' }} src={score.image} alt="" />
                    {/* <div>{score.rank}</div> */}
                    {/* {score.user_id == 280 &&
                        <div>1</div>
                      }
                      {score.user_id == 275 &&
                        <div>2</div>
                      }
                      {score.user_id == 271 &&
                        <div>3</div>
                      }
                      {score.user_id == 282 &&
                        <div>4</div>
                      }
                      {score.user_id == 1266 &&
                        <div>5</div>
                      } */}
                    <div>{key + 1}</div>
                  </div>
                  <span class="name my-2">{score.name}</span>
                  <div class="achievement">
                    <div class="win">
                      <img src={cup} alt="" />
                      <span>{score.wins} Won</span>
                    </div>
                    <span class="text-secondary">|</span>
                    <div class="point">
                      <img src={coins} alt="" />
                      <span>{score.coins} Points</span>
                    </div>
                  </div>
                </div>

                {!!score.history && <div class="history">
                  <h4>History Point</h4>
                  <div class="cover-record">
                  </div>
                </div>}



                <HistoryInfo history={score.history} />

              </div>


            </>
          })}
        {this.state.sortedScoreList && this.state.sortedScoreList.length <= size ?
          null
          :

          <div >
            {visible &&
              <button onClick={this.showAll(this.state.sortedScoreList.length - 1)} style={{ background: '#159B3E', width: '100%' }}>See All Leaders</button>

            }
          </div>


        }

        {this.state.sortedScoreList && this.state.sortedScoreList.length == 0 &&
          <div style={{ textAlign: 'center', padding: '50px 50px' }}>No data at the moment, point still being calculated</div>
        }

      </div>
    );
  }
}


export default Previousweek
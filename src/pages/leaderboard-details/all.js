import React, { Component } from "react";
import { Table } from 'react-bootstrap';
import account from "../../assets/img/account-1@2x.png";
import cup from "../../assets/img/cup.svg";
import coins from "../../assets/img/coins.svg";
import manchester from '../../assets/img/Manchester united.svg';
import chelsea from '../../assets/img/Chelsea.svg';
import Moment from 'react-moment';
import HistoryInfo from './HistoryInfo';
import userPredictionDetails from './userPredictionDetails';
import axios from '../../_config/axios';
class All extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startIndex: 0,
      mergedArray: [],
      all: [],
      user: [],
      secondPartOfFirstArray: [],
      size: 3,
      secondPart: [],
      firstPart: [],
      fullArray: [],
      fullArray2: [],
      visible: true,
      
    }
  }



  componentDidMount(){
    const {scoreList}=this.props;
    scoreList.sort(function (a, b) {
      if (parseInt(a.coins) > parseInt(b.coins)) return -1;
      if (parseInt(a.coins) < parseInt(b.coins)) return 1;
      if (a.first_pred_datetime > b.first_pred_datetime) return 1;
      if (a.first_pred_datetime < b.first_pred_datetime) return -1;
    })

    console.log(scoreList)

    const payload = new FormData();
    payload.append('allSortedList',JSON.stringify(scoreList));
    axios.post('/getSortedLeaderboardData',payload)
      .then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    // console.log(this.state.popupOpen)
  }
  showAll = param => () => {

    this.setState({

      size: this.state.size + param,
      visible: false
    })
  }
  


  render() {

    const { scoreList, id } = this.props;
    const { user, size, firstPart, visible } = this.state;



    // const winnerList = [
    //   {
    //     user_id: 280,
    //     rank: 1,
    //     coins: 50,
    //     wins: 2,
    //     datfirst_played_datee: '2020-10-15 10:43:57',
    //     name: ' Sky Shooter',
    //     img: ' http://smartcms.goaly.mobi/assets/uploads/profiles/user_no_image.png'

    //   },
    //   {
    //     user_id: 271,
    //     rank: 2,
    //     coins: 40,
    //     wins: 3,
    //     datfirst_played_datee: '2020-10-15 10:59:57',
    //     name: ' Sonny Sonny',
    //     img: ' http://smartcms.goaly.mobi/assets/uploads/profiles/47f0fd9a1aa4ae8220d9cd30bb0b4881.jpeg'

    //   },
    //   {
    //     user_id: 275,
    //     rank: 2,
    //     coins: 40,
    //     wins: 2,
    //     datfirst_played_datee: '2020-10-15 10:43:57',
    //     name: '  Yim Darayuth',
    //     img: ' http://smartcms.goaly.mobi/assets/uploads/profiles/user_no_image.png'

    //   },
    //   {
    //     user_id: 2700,
    //     rank: 2,
    //     coins: 40,
    //     wins: 2,
    //     datfirst_played_datee: '2020-10-15 10:46:57',
    //     name: ' sarani',
    //     img: ' http://smartcms.goaly.mobi/assets/uploads/profiles/user_no_image.png'

    //   },
    //   {
    //     user_id: 282,
    //     rank: 3,
    //     coins: 30,
    //     wins: 1,
    //     datfirst_played_datee: '2020-10-15 10:43:57',
    //     name: ' Khmer United',
    //     img: ' http://smartcms.goaly.mobi/assets/uploads/profiles/user_no_image.png'

    //   },
    //   {
    //     user_id: 1266,
    //     rank: 4,
    //     coins: 10,
    //     wins: 1,
    //     datfirst_played_datee: '2020-10-15 10:43:57',
    //     name: '  Bike Ridee',
    //     img: ' http://smartcms.goaly.mobi/assets/uploads/profiles/user_no_image.png'

    //   },
    //   {
    //     user_id: 120,
    //     rank: 4,
    //     coins: 10,
    //     wins: 1,
    //     datfirst_played_datee: '2020-10-15 10:42:57',
    //     name: '  Bike ',
    //     img: ' http://smartcms.goaly.mobi/assets/uploads/profiles/user_no_image.png'

    //   },
    //   {
    //     user_id: 12,
    //     rank: 4,
    //     coins: 10,
    //     wins: 1,
    //     datfirst_played_datee: '2020-10-15 10:42:56',
    //     name: '   Ridee',
    //     img: ' http://smartcms.goaly.mobi/assets/uploads/profiles/user_no_image.png'

    //   },

    // ]

    // const prizeList = [
    //   {
    //     id: 1,
    //     prize: 'tv'
    //   },
    //   {
    //     id: 2,
    //     prize: 'mobile'
    //   },
    //   {
    //     id: 3,
    //     prize: 'headphone'
    //   }

    // ]
    // console.log(winnerList)
    // console.log(prizeList)
    // console.log(winnerList.length)
    // console.log(prizeList.length)

    // winnerList.sort(function (a, b) {
    //   if (a.rank < b.rank) return -1;
    //   if (a.rank > b.rank) return 1;
    //   if (a.datfirst_played_datee > b.datfirst_played_datee) return 1;
    //   if (a.datfirst_played_datee < b.datfirst_played_datee) return -1;
    // })
    // const winnerSortedList = winnerList.slice(0, prizeList.length)
    // console.log(winnerSortedList)
    // const mergeWinnerWithPrize = winnerSortedList.map((item, i) => Object.assign({}, item, prizeList[i]));

    // console.log(mergeWinnerWithPrize)
    // console.log(scoreList)
    // scoreList.sort(function (a, b) {
    //   if (parseInt(a.coins) > parseInt(b.coins)) return -1;
    //   if (parseInt(a.coins) < parseInt(b.coins)) return 1;
    //   if (a.first_pred_datetime > b.first_pred_datetime) return 1;
    //   if (a.first_pred_datetime < b.first_pred_datetime) return -1;
    // })

    console.log(scoreList)
    // console.log(this.state.popupOpen)
    return (
      <React.Fragment>
             



        <div class="cover-board" style={{ paddingTop: '24px' }}>
          <>
            {scoreList && scoreList.length > 0 &&
              scoreList.slice(0, size).map((score, key) => {

                return <>
                  <div class="board shadow">
                    <div class="player">
                      <div class="cover-img" key={key}>
                        <img style={{ borderRadius: '50%' }} src={score.image} alt="" />

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
            {scoreList && scoreList.length <= size ?
              null
              :

              <div >
                {visible &&
                  <button onClick={this.showAll(scoreList.length - 1)} style={{ background: '#159B3E', width: '100%' }}>See All Leaders</button>

                }
              </div>


            }
            {scoreList && scoreList.length == 0 &&
              <div style={{ textAlign: 'center', padding: '50px 50px' }}>No data at the moment, point still being calculated</div>
            }


          </>

        </div>
      </React.Fragment>


    );
  }
}

export default All;




import React, { useState } from 'react';
import Moment from 'react-moment';

import PointsDetailsPopup from './PointsDetailsPopup';
const HistoryInfo = (props) => {
  const [limit, setLimit] = useState(2)
  const [visible, setVisible] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false);
  const [pred_id, setPred_id] = useState("");
  const [user_id, setUser_id] = useState("");

  console.log(props)
  const { history } = props;
  const onSeeAll = (param) => {
    setLimit(limit + param)
    setVisible(false)
  }
  var data = [{ id: 0, name: 'A', rank: 1, point: 6, time: 1 }, { id: 1, name: 'A', rank: 2, point: 40, time: 3 }, { id: 2, name: 'C', rank: 2, point: 30, time: 2 }, { id: 3, name: 'B', rank: 3, point: 20, time: 4 }, { id: 4, name: 'B', rank: 4, point: 10, time: 5 }];

  // var countList = data.reduce(function(p, c){
  //   p[c.rank] = (p[c.rank] || 0) + 1;
  //   return p;
  // }, {});

  // var result = data.filter(function(obj){
  //   return countList[obj.rank] > 1;
  // });
  const onCloseModal = () => {
    setPopupOpen(false)
  }
  return (
    <React.Fragment>

      {popupOpen && <PointsDetailsPopup onCloseModal={onCloseModal} popupOpen={popupOpen} pred_id={pred_id} user_id={user_id} />}


      {props.history && props.history.slice(0, limit).map((details, key) => {
        return <div class="record" key={key}>
          <div class="matches">
            <div class="left-team">
              <img
                src={details.homeTeamLogo}
                width="20%"
                alt=""
              />{" "}
              {details.homeTeamName}
            </div>
            <span class="score">{details.homeTeamScore}-{details.awayTeamScore}</span>
            <div class="right-team">
              <img src={details.awayTeamLogo}

                width="20%" alt="" />{" "}
              {details.awayTeamName}
            </div>
          </div>
          <div class="matches-point">
            {details.user_played_date === undefined ?
              <span class="date"><Moment format="ddd, DD/MM/YY">{details.history_createdAt}</Moment></span>
              :
              <span class="date"><Moment format="ddd, DD/MM/YY">{details.user_played_date}</Moment></span>
            }
            <span class="point" onClick={() => { setPopupOpen(true); setPopupOpen(true); setUser_id(details.user_id); setPred_id(details.id) }}>{details.coin_won} Points</span>
          </div>
        </div>
      })}
      {props.history.length <= limit ?
        null :
        <div>
          {visible &&
            <div class="see-all">
              <a onClick={() => onSeeAll(props.history.length - 1)}>See All</a>
            </div>

          }

        </div>


      }

    </React.Fragment>


  )
}
export default HistoryInfo;
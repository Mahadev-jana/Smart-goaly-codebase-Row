import React, { Component } from "react";

import { post } from "../../../api";
import { isEmpty } from "lodash";

import Stats from "../../match-details/tabs/stats";
import Timeline from "./timeline/Timeline";
import LineUps from "./LineUps";
import Comments from "../../match-details/tabs/comments";
import Players from "./players";
import Prediction from "../../match-details/tabs/predictions";
import News from "../../home/list-matches/News";
import HeadToHead from "../../score-prediction/HeadToHead";
import LastMatch from "../../score-prediction/LastMatch";

import timeline2 from "../../../assets/img/detail-match/icon-menu/timeline.png";
import player2 from "../../../assets/img/detail-match/icon-menu/players.png";
import lineups2 from "../../../assets/img/detail-match/icon-menu/lineups.png";
import stats2 from "../../../assets/img/detail-match/icon-menu/stats.png";
import head2head2 from "../../../assets/img/detail-match/icon-menu/head2head.png";
import prediction2 from "../../../assets/img/detail-match/icon-menu/prediction.png";
import livechat2 from "../../../assets/img/detail-match/icon-menu/live-chat.png";
import news2 from "../../../assets/img/detail-match/icon-menu/news.png";

import timeline from "../../../assets/img/detail-match/icon-menu/timeline2.png";
import player from "../../../assets/img/detail-match/icon-menu/players2.png";
import lineups from "../../../assets/img/detail-match/icon-menu/lineups2.png";
import stats from "../../../assets/img/detail-match/icon-menu/stats2.png";
import head2head from "../../../assets/img/detail-match/icon-menu/head2head2.png";
import prediction from "../../../assets/img/detail-match/icon-menu/prediction2.png";
import livechat11 from "../../../assets/img/detail-match/icon-menu/live-chat2.png";
import news from "../../../assets/img/detail-match/icon-menu/news2.png";
import "./live-matches.css";

class MatchTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      live: [],
      value: '',
      tab: 'timeline',
      scrolled:false,
      matches: [],
      pred: {},
      allowZeroExpanded: true,
      prediction: {},
      correct_score: [],
      status: {},
      homeWin: 0,
      awayWin: 0,
      draw: 0,
      homeTeamScore: 0,
      awayTeamScore: 0,
      homeTeam_logo: "",
      awayTeam_logo: "",
      homeTeamid: 0,
      awayTeamid: 0,
      headToHeadLoading: false,
      lastMatchLoading: false,

    }
  }
  componentDidMount(){
    
      window.addEventListener('scroll',()=>{
        // const isTop = window.scrollY<473.6000061035156;
        const isTop = window.scrollY<346;
        // console.log(window.scrollY)
        if(isTop!==true){
          this.setState({
            scrolled:true
          })
        }
        else{
          this.setState({
            scrolled:false
          })
        }
    })

    
    const { match } = this.props;
    this.setState({ headToHeadLoading: true });
    const payload = new FormData();
    payload.append("homeTeam", match.homeTeam.id);
    payload.append("awayTeam", match.awayTeam.id);
    post("getHeadToHead", payload)
      .then((res) => {
        this.setState({ matches: res.data.matches });
        let draw = 0;
        let homeWin = 0;
        let awayWin = 0;
        let homeTeamScore = 0;
        let awayTeamScore = 0;
        this.state.matches.forEach((matchDetails, key) => {
          if (matchDetails.status == 2) {
            draw = draw + 1;
            this.setState({ draw });

            this.setState({ headToHeadLoading: false });
          } else {
            if (matchDetails.winnerTeamId != "draw") {
              if (matchDetails.winnerTeamId == match.homeTeam.id) {
                homeWin = homeWin + 1;
                this.setState({ homeWin });
              } else {
                awayWin = awayWin + 1;
                this.setState({ awayWin });
              }

              this.setState({ headToHeadLoading: false });
            }
          }

          if (match.homeTeam.id == matchDetails.homeTeamId) {
            homeTeamScore = homeTeamScore + matchDetails.homeTeamScore;
          } else if (match.homeTeam.id == matchDetails.awayTeamId) {
            homeTeamScore = homeTeamScore + matchDetails.awayTeamScore;
          }
          if (match.awayTeam.id == matchDetails.homeTeamId) {
            awayTeamScore = awayTeamScore + matchDetails.homeTeamScore;
          } else if (match.awayTeam.id == matchDetails.awayTeamId) {
            awayTeamScore = awayTeamScore + matchDetails.awayTeamScore;
          }
          this.setState({ homeTeamScore });
          this.setState({ awayTeamScore });

          this.setState({ headToHeadLoading: false });
        });
      })
      .catch((err) => console.log(err));
    this.getTeamDetails();
  }

  getTeamDetails() {
    const { match } = this.props;
    this.setState({ lastMatchLoading: true });
    const payload = new FormData();
    payload.append("homeTeam", match.homeTeam.id);
    payload.append("awayTeam", match.awayTeam.id);
    post("getLastMatchByTeam", payload)
      .then((res) => {
        this.setState({ homeTeamid: res.data.home_id });
        this.setState({ awayTeamid: res.data.away_id });
        this.setState({ homeTeam_match: res.data.homeTeam_match });
        this.setState({ awayTeam_match: res.data.awayTeam_match });
        this.setState({ homeTeam_name: res.data.home_name });
        this.setState({ awayTeam_name: res.data.away_name });
        this.setState({ homeTeam_logo: res.data.home_logo });
        this.setState({ awayTeam_logo: res.data.away_logo });

        this.setState({ headToHeadLoading: false });
      })
      .catch((err) => console.log(err));


  }

  componentWillUnmount(){
    window.removeEventListener('scroll',()=>{});
  }

  setTab(tab) {
    this.setState({
      tab: tab
    });
    this.setState({ id: this.props.id });
  }

  render() {
    const {headToHeadLoading,lastMatchLoading,matches,homeTeam_logo,awayTeam_logo,homeWin,awayWin,draw,homeTeamScore,awayTeamScore} = this.state;
    const { match } = this.props
    return (
      <div class="row match-detail-body">
        <div class={this.state.scrolled ? "menu scrolled" : "menu"}>
          <ul class="nav nav-pills">
            <li 
            className={this.state.tab === "timeline" ? "active" : ""}>
            <a variant={this.state.tab} 
             onClick={() => this.setState({ tab: 'timeline' })}>
            {this.state.tab === "timeline" ? <img src= {timeline} /> : <img src= {timeline2} /> }Timeline</a></li>
            <li 
            className={this.state.tab === "players" ? "active" : ""}><a onClick={() => this.setState({ tab: 'players' })}>{this.state.tab === "players" ? <img src= {player} /> : <img src= {player2} /> }Players</a></li>
            <li  className={this.state.tab === "lineups" ? "active" : ""} ><a onClick={() => this.setState({ tab: 'lineups' })}>{this.state.tab === "lineups" ? <img src= {lineups} /> : <img src= {lineups2} /> }Lineups</a></li>
            <li className={this.state.tab === "stats" ? "active" : ""}><a   onClick={() => this.setState({ tab: 'stats' })}>{this.state.tab === "stats" ? <img src= {stats} /> : <img src= {stats2} /> }Stats</a></li>
            <li className={this.state.tab === "headtohead" ? "active" : ""}><a onClick={() => this.setState({ tab: 'headtohead' })}>{this.state.tab === "headtohead" ? <img src= {head2head} /> : <img src= {head2head2} /> }Head to Head</a></li>
            <li className={this.state.tab === "prediction" ? "active" : ""}><a onClick={() => this.setState({ tab: 'prediction' })}>{this.state.tab === "prediction" ? <img src= {prediction} /> : <img src= {prediction2} /> }Prediction</a></li>
            <li className={this.state.tab === "comments" ? "active" : ""}><a onClick={() => this.setState({ tab: 'comments' })}>{this.state.tab === "comments" ? <img src= {livechat11} /> : <img src= {livechat2} /> }Live Chat</a></li>
            <li className={this.state.tab === "news" ? "active" : ""}><a  onClick={() => this.setState({ tab: 'news' })}>{this.state.tab === "news" ? <img src= {news} /> : <img src= {news2} /> }News</a></li>
          </ul>
        </div>
        {
         
          this.state.tab === "timeline" && (
            <>
          <Timeline
            timelines={match.comments}
            homeTeamId={match.homeTeam.id}
            awayTeamId={match.awayTeam.id}
            scrolled={this.state.scrolled}
          />
          
          </>
        )}
        {
          this.state.tab === "players" && (
          <Players players={match.playersStats} scrolled={this.state.scrolled} />
        )}
        {this.state.tab === "lineups" && (
          <LineUps
            homeTeam={match.homeTeam}
            awayTeam={match.awayTeam}
            lineup={match.lineup}
            scrolled={this.state.scrolled}
          />
        )}
        {!!match &&
          match.homeTeam.logo_path &&
          match.awayTeam.logo_path && this.state.tab === "stats" && (
            <Stats
              stats={match.stats}
              home_logo={match.homeTeam.logo_path}
              away_logo={match.awayTeam.logo_path}
              scrolled={this.state.scrolled}
            />
          )}
        {!!match && !isEmpty(match) && match.predictions && this.state.tab === "headtohead" && (
          <div>
            <HeadToHead
              scrolled={this.state.scrolled}
              matches={matches}
              headToHeadLoading={headToHeadLoading} homeTeam_logo={homeTeam_logo} awayTeam_logo={awayTeam_logo}
              homeWin={homeWin} awayWin={awayWin} draw={draw} homeTeamScore={homeTeamScore} awayTeamScore={awayTeamScore}
            />
            <LastMatch
              teamName={match.homeTeam.name} homeTeam={match.homeTeam.id} awayTeam={match.awayTeam.id}
              scrolled={this.state.scrolled}
              lastMatchLoading={lastMatchLoading}
            />

          </div>
        )}
        {!!match && !isEmpty(match) && match.predictions && this.state.tab === "prediction" && (
          <Prediction
            homeTeam={match.homeTeam.id}
            awayTeam={match.awayTeam.id}
            prediction={match.predictions}
            scrolled={this.state.scrolled}
          />
        )}
        {!isEmpty(match) && this.state.tab === "comments" && <Comments
          id={match.id}
        />}
        {!!match && !isEmpty(match) && this.state.tab === "news" &&
          (
            <div>
              <News
                id={match.league_id}
                matchDetails={match}
                scrolled={this.state.scrolled}
              />
            </div>
          )}
      </div>

    );
  }
}

export default MatchTabs;

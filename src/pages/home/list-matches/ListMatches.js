import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import ListMatchesTabs from "./ListMatchesTabs";
import SwipeableTabs from "react-swipeable-tabs";
import { withRouter } from "react-router-dom";
import { post } from "../../../api";
import { isArray, isEmpty } from "lodash";
import axios from "../../../_config/axios";
// import "./demo.css";
class ListMatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      competitions: [],
      activeItemIndex: 0,
      items: [],
      selectedId: null,
      selectedCompetitionName: null,
      leagues: [],
    };
  }

  componentDidMount() {
    this.getLeagues();
    this.setState({ activeItemIndex: 0 });
  }

  getStanding = (selectedId, selectedCompetitionName) => {
    this.setState({ selectedId, selectedCompetitionName });
  };

  getLeagues = () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails !== null) {
      console.log(userDetails.id);
      const payload = new FormData();
      payload.append("user_id", userDetails.id);
      post("leagueOverviewLeagues", payload)
        .then((res) => {
          // if (res.data && res.data.success && res.data.error === 0) {
          //   console.log("here 1");
          //   this.setState({ leagues: res.data.leagues,selectedId:res.data.leagues[0].competition_id });
          // }
          // console.log(res.data.leagues);
          const { leagues } = res.data;
          let items = [];
          const tempWcLeague = leagues.slice(0,leagues.length-1);
          console.log(tempWcLeague);
          tempWcLeague.splice(0,0,leagues[leagues.length-1]);
          tempWcLeague.forEach((league, key) => {
            items.push(
              <a
                id={league.competition_id}
                onClick={() =>
                  this.getStanding(
                    league.competition_id,
                    league.competition_name
                  )
                }
                className="nav-link"
              >
                {/* <div className="text-l">{league.competition_name}</div> */}
                <div
                  className="logo-l"
                  style={{ maxWidth: "38px", maxHeight: "55px" }}
                >
                  <img
                    src={league.logo}
                    style={{ maxWidth: "38px", maxHeight: "55px" }}
                  />
                </div>
              </a>
            );
          });

          this.setState({
            items,
            selectedId: tempWcLeague[0].competition_id,
            selectedCompetitionName: tempWcLeague[0].competition_name,
          });




          // if (res.data.leagues && isArray(res.data.leagues)) {
          // 	let league = [];
          // 	league = res.data.leagues;
          // 	league.map((data) => {
          // 		const payload = new FormData();
          // 		payload.append('comp_id', data.competition_id);
          // 		axios.post('/stats', payload).then(res => {
          // 			if (res.data && res.data.success && res.data.success == 1) {
          // 				if (res.data.stats && isArray(res.data.stats)) {
          // 					const saveStatus = {
          // 						'comp_id': res.data.league_id,
          // 						'satus': JSON.stringify(res.data.stats)
          // 					}
          // 					let leagueStatus = JSON.parse(localStorage.getItem('status'));
          // 					if (leagueStatus) {
          // 						leagueStatus.push(saveStatus);
          // 						localStorage.setItem('status', JSON.stringify(leagueStatus));
          // 					} else {
          // 						let leagueStats = [];
          // 						leagueStats.push(saveStatus);
          // 						localStorage.setItem('status', JSON.stringify(leagueStats));
          // 					}
          // 				}
          // 			}
          // 		}).catch(err => {
          // 			console.log({ err });
          // 		});
          // 	})
          // }
        })
        .catch((err) => console.log(err));
    } else {
      post("leagueOverviewLeagues")
        .then((res) => {
          if (res.data && res.data.success && res.data.error === 0) {
            console.log("here 1");
            this.setState({ leagues: res.data.leagues,selectedId:res.data.leagues[length-1].competition_id });
          }
          //   console.log(res.data.leagues);
            const { leagues } = res.data;
            let items = [];
            const tempWcLeague = leagues.slice(0,leagues.length-1);
            console.log(tempWcLeague);
            tempWcLeague.splice(0,0,leagues[leagues.length-1]);
            const firstPart = tempWcLeague.slice(0,6);
            const priorityLeague = tempWcLeague.slice(6,11);
            const secondPart = tempWcLeague.slice(11, tempWcLeague.length);
            const newTempLeague = [ ...priorityLeague, ...firstPart, ...secondPart]
            newTempLeague.forEach((league, key) => {
              items.push(
                <a
                  id={league.competition_id}
                  onClick={() =>{
                    this.getStanding(
                      league.competition_id,
                      league.competition_name
                    )}
                  }
          className="nav-link"

                >
                  {/* <div className="text-l">{league.competition_name}</div> */}
                  <div className="logo-l" style={{maxWidth:'38px',maxHeight:'55px',minWidth:'38px',minHeight:'55px'}}>
                    <img src={league.logo} style={{maxWidth:'38px',maxHeight:'55px',minWidth:'38px',minHeight:'55px'}}/>
                  </div>
                </a>
              );
            });

            this.setState({
              items,
              selectedId: newTempLeague[0].competition_id,
              selectedCompetitionName: newTempLeague[0].competition_name,
            });

          if (res.data.leagues && isArray(res.data.leagues)) {
          	let league = [];
          	league = res.data.leagues;
          	league.map((data) => {
          		const payload = new FormData();
          		payload.append('comp_id', data.competition_id);
          		axios.post('/stats', payload).then(res => {
          			if (res.data && res.data.success && res.data.success == 1) {
          				if (res.data.stats && isArray(res.data.stats)) {
          					const saveStatus = {
          						'comp_id': res.data.league_id,
          						'satus': JSON.stringify(res.data.stats)
          					}
          					let leagueStatus = JSON.parse(localStorage.getItem('status'));
          					if (leagueStatus) {
          						leagueStatus.push(saveStatus);
          						localStorage.setItem('status', JSON.stringify(leagueStatus));
          					} else {
          						let leagueStats = [];
          						leagueStats.push(saveStatus);
          						localStorage.setItem('status', JSON.stringify(leagueStats));
          					}
          				}
          			}
          		}).catch(err => {
          			console.log({ err });
          		});
          	})
          }
        })
        .catch((err) => console.log(err));
      // const payload = new FormData();
      // payload.append('page', "home");
      // post('getleagues',payload)
      // .then(res => {
      // 	console.log(res.data.leagues);
      // 	const { leagues } = res.data;
      // 	let items = [];
      // 	leagues.forEach((league, key) => {
      // 		items.push(<a id={league.competition_id} onClick={() => this.getStanding(league.competition_id, league.competition_name)} className="nav-link"><div className="text-l">{league.competition_name}</div><div className="logo-l"><img src={league.logo} /></div></a>)
      // 	})

      // 	this.setState({
      // 		items,
      // 		selectedId: leagues[0].competition_id,
      // 		selectedCompetitionName: leagues[0].competition_name
      // 	});
      // 	if (res.data.leagues && isArray(res.data.leagues)) {
      // 		let league = [];
      // 		league = res.data.leagues;
      // 		league.map((data) => {
      // 			const payload = new FormData();
      // 			payload.append('comp_id', data.competition_id);
      // 			axios.post('/stats', payload).then(res => {
      // 				if (res.data && res.data.success && res.data.success == 1) {
      // 					if (res.data.stats && isArray(res.data.stats)) {
      // 						const saveStatus = {
      // 							'comp_id': res.data.league_id,
      // 							'satus': JSON.stringify(res.data.stats)
      // 						}
      // 						let leagueStatus = JSON.parse(localStorage.getItem('status'));
      // 						if (leagueStatus) {
      // 							leagueStatus.push(saveStatus);
      // 							localStorage.setItem('status', JSON.stringify(leagueStatus));
      // 						} else {
      // 							let leagueStats = [];
      // 							leagueStats.push(saveStatus);
      // 							localStorage.setItem('status', JSON.stringify(leagueStats));
      // 						}
      // 					}
      // 				}
      // 			}).catch(err => {
      // 				console.log({ err });
      // 			});
      // 		})
      // 	}
      // })
      // .catch(err => console.log(err));
      // }
    }
  };

  render() {
    const { items } = this.state;

    return (
      <Row>
        {/* {console.log(props)} */}
        <Col xs={12} className="mt-10 pd-0">
          <div class="wrapnya">
            <div class="tuhed">
              <div class="up" style={{ backgroundColor: "#0F7B30" }}>
                <i class="fas fa-award"></i> &nbsp;&nbsp;League Overview
              </div>
              <div class="mid">
                {/* {isEmpty(items) && <div>Subcribe First to See this Section</div>} */}
                <>
                  <React.Fragment>
                    <Row>
                      <Col xs={12}>
                        <div className="row">
                          <div className="col-6">
                            <div
                              className="mt-10 plr15"
                              style={{ backgroundColor: "#159B30" }}
                            >
                              {Boolean(items.length) && (
                                  <SwipeableTabs
                                    noFirstLeftPadding={false}
                                    noLastRightPadding={false}
                                    fitItems={false}
                                    alignCenter={false}
                                    borderWidthRatio={1}
                                    activeItemIndex={this.state.activeItemIndex}
                                    onItemClick={(item, index) => {
                                      const selectedItem =
                                        item.element.props.id;
                                      this.setState({
                                        selectedId: selectedItem,
                                      });
                                      this.setState({ activeItemIndex: index });
                                    }}
                                    items={items}
                                    borderPosition="bottom"
                                    borderThickness={5}
                                    borderColor="#FED330"
                                    activeStyle={{
                                      color: "#FED330",
                                    }}
                                    itemStyle={{
                                      padding: 3,
                                    }}
                                  /> 
                              )}
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    {/* <div className="scrollmenu">
                      {this.state.leagues.map((league,key)=>{
                        return( <a
                          id={league.competition_id}
                          onClick={() => {
                            this.getStanding(
                              league.competition_id,
                              league.competition_name
                            );
                          }}
                          className="nav-link"
                        >
                          {this.state.selectedId === league.competition_id ?
                          <div
                            className="logo-l"
                            style={{
                              maxWidth: "38px",
                              maxHeight: "55px",
                              minWidth: "38px",
                              minHeight: "55px",
                              borderBottom: "4px solid #FED330",
                              paddingBottom: "67px"
                            }}
                          >
                            
                            <img
                            src={league.logo}
                            style={{
                              maxWidth: "38px",
                              maxHeight: "55px",
                              minWidth: "38px",
                              minHeight: "55px",
                              
                            }}
                          />
                            
                            
                          </div>
                          :
                          <div
                          className="logo-l"
                          style={{
                            maxWidth: "38px",
                            maxHeight: "55px",
                            minWidth: "38px",
                            minHeight: "55px",
                          }}
                        >
                          
                          <img
                          src={league.logo}
                          style={{
                            maxWidth: "38px",
                            maxHeight: "55px",
                            minWidth: "38px",
                            minHeight: "55px",
                            
                          }}
                        />
                          
                          
                        </div>
                      }
                        </a>
                      )
                      })}
                     </div>
                   */}
                  </React.Fragment>
                </>
                {this.state.selectedId && (
                  <ListMatchesTabs id={this.state.selectedId} />
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default ListMatches;

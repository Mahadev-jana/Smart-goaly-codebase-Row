import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import SwipeableTabs from "react-swipeable-tabs";
import { withRouter } from "react-router-dom";
import MenuCategory from "../../components/menu-category";
import { post } from "../../api";
import LiveMatchDetails from "./LiveMatchDetails";
import { LiveMatchMenuSimmer } from "../../simmer-loader";
import { Helmet } from "react-helmet";
import icon from "../../assets/img/logo-goaly.png";
// import './demo1.css';
class MatchDetails extends Component {
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
    const payload = new FormData();
    payload.append("page", "live");
    post("getleagues", payload)
      .then((res) => {
        // if (res.data && res.data.success && res.data.error === 0) {
        //   console.log("here 1");
        //   this.setState({
        //     leagues: res.data.leagues,
        //     selectedId: res.data.leagues[0].competition_id,
        //     selectedCompetitionName: res.data.leagues[0].competition_name,
        //   });
        // }
        const { leagues } = res.data;
        let items = [];
        const tempWcLeague = leagues.slice(0,leagues.length-1);
        console.log(tempWcLeague);
        tempWcLeague.splice(0,0,leagues[leagues.length-1]);
        tempWcLeague.forEach((league, key) => {
            items.push(<a onClick={() => this.getStanding(league.competition_id, league.competition_name)} className="nav-link"><div className="text-l">{league.competition_name}</div><div className="logo-l"><img src={league.logo} /></div></a>)
        })

        this.setState({
            items,
            selectedId: tempWcLeague[0].competition_id,
            selectedCompetitionName: tempWcLeague[0].competition_name
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const {
      items,
      selectedId,
      selectedCompetitionName,
      competitions,
    } = this.state;
    return (
      <React.Fragment>
        {/* <Helmet>
                    <title>Goaly | Matches</title>
                    <link rel="icon" type="image/png" href={icon} sizes="20x20" />

                </Helmet> */}
        <MenuCategory />
        <Row style={{ paddingTop: "65px" }}>
          <Col xs={12}>
            <div className="row">
              <div className="col-6">
                <div className="mt-10 plr15">
                  {!Boolean(items.length) && (
                    <LiveMatchMenuSimmer />
                  )}
                  {Boolean(items.length) && (
                    <div>
                      <SwipeableTabs
                                            noFirstLeftPadding={false}
                                            noLastRightPadding={false}
                                            fitItems={false}
                                            alignCenter={false}
                                            borderWidthRatio={1}
                                            activeItemIndex={this.state.activeItemIndex}
                                            onItemClick={(item, index) => this.setState({ activeItemIndex: index })}
                                            items={items}
                                            borderPosition="bottom"
                                            borderThickness={5}
                                            borderColor="#D9004B"
                                            activeStyle={{
                                                color: '#D9004B'
                                            }}
                                            itemStyle={{
                                                padding: 0,
                                            }}
                                        />
                    </div>
                  )}
                  {/* <div
                    className="scrollmenu1"
                  >
                    {this.state.leagues.map((league, key) => {
                      return (
                        <a
                          id={league.competition_id}
                          onClick={() => {
                            this.getStanding(
                              league.competition_id,
                              league.competition_name
                            );
                          }}
                          className="nav-link"
                        >
                          {this.state.selectedId === league.competition_id ? (
                            <div
                              className="logo-l"
                              style={{
                                maxWidth: "38px",
                                maxHeight: "55px",
                                minWidth: "38px",
                                minHeight: "55px",
                                borderBottom: "4px solid rgb(217, 0, 75)",
                                paddingBottom: "67px",
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
                          ) : (
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
                          )}
                        </a>
                      );
                    })}
                  </div> */}

                  {Boolean(selectedId) && Boolean(selectedCompetitionName) && (
                    <LiveMatchDetails
                      id={selectedId}
                      title={selectedCompetitionName}
                    />
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default withRouter(MatchDetails);

import React from "react";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import { CommentarySimmer } from "../../simmer-loader";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";

class HeadToHead extends React.Component {
  

  render() {
   
    const {headToHeadLoading,lastMatchLoading,matches,homeTeam_logo,awayTeam_logo,homeWin,awayWin,draw,homeTeamScore,awayTeamScore}=this.props;

    return (
      <>
        <div className="clearfix"></div>
        {lastMatchLoading && headToHeadLoading ? (
          <CommentarySimmer />
        ) : (
          <div
            className={
              this.props.scrolled
                ? "col-xs-12 pd-0 scrolledHeightPlayers"
                : "col-xs-12 pd-0"
            }
          >
            <div
              className="lm prediction_list"
              style={{ padding: "15px", height: "auto" }}
            >
              <h4>Head to Head</h4>
              <div className="liner"></div>
              <table class="table table-striped mb-10 text-small">
                <tbody>
                  <tr>
                    <td width="" class="text-left">
                      <img src={homeTeam_logo} height="50" alt="" />
                    </td>
                    <td width="" class="text-center bdr1">
                      <span class="ctr">{homeWin}</span>
                      Wins
                    </td>
                    <td width="" class="text-center bdr1">
                      <span class="ctr">{draw}</span>
                      Draw
                    </td>
                    <td width="" class="text-center">
                      <span class="ctr">{awayWin}</span>
                      Wins
                    </td>
                    <td width="" class="text-right">
                      <img src={awayTeam_logo} height="50" alt="" />
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="widget-content">
                <div class="widget-content-wrapper">
                  <div class="widget-content-left">
                    <div class="widget-numbers fsize-3 text-win">
                      {homeTeamScore}
                    </div>
                  </div>
                  <div class="widget-content-middle">
                    <div class="widget-numbers fsize-3 text-muted">
                      GOALS SCORED
                    </div>
                  </div>
                  <div class="widget-content-right">
                    <div class="widget-numbers fsize-3 text-lose">
                      {awayTeamScore}{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div class="progress-bar-sm progress-bar-animated-alt progress">
                <div
                  class="progress-bar bg-win"
                  role="progressbar"
                  aria-valuenow="62"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{
                    width:
                      `${
                        (100 * homeTeamScore) / (homeTeamScore + awayTeamScore)
                      }` + "%",
                  }}
                ></div>
                <div
                  class="progress-bar bg-lose"
                  role="progressbar"
                  aria-valuenow="38"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{
                    width:
                      `${
                        (100 * awayTeamScore) / (homeTeamScore + awayTeamScore)
                      }` + "%",
                  }}
                ></div>
              </div>
              {/* <h5>Serie A</h5> */}
              <table class="table table-striped custab mb-10">
                <tbody>
                  {!!matches &&
                    matches.map((match, key) => (
                      <tr>
                        <td width="50" class="text-date">
                          <Moment format="ddd, DD/MM/YY">{match.date}</Moment>
                        </td>
                        <td>
                          <div
                            class="col-xs-2"
                            style={{
                              margin: 0,
                              padding: 0,
                              top: 5,
                              textAlign: "center",
                            }}
                          >
                            <p class="">{match.homeTeam}</p>
                          </div>
                          <div
                            class="col-xs-2"
                            style={{
                              margin: 0,
                              padding: 0,
                              textAlign: "center",
                            }}
                          >
                            <img
                              src={match.homeTeamLogo}
                              style={{ height: 27, padding: 2, margin: 2 }}
                            />
                          </div>
                          <div
                            class="col-xs-4"
                            style={{
                              margin: 0,
                              padding: 0,
                              top: 5,
                              textAlign: "center",
                            }}
                          >
                            <strong>
                              {match.homeTeamScore} - {match.awayTeamScore}
                            </strong>
                          </div>
                          <div
                            class="col-xs-2"
                            style={{
                              margin: 0,
                              padding: 0,
                              textAlign: "center",
                            }}
                          >
                            <img
                              src={match.awayTeamLogo}
                              style={{ height: 27, padding: 2, margin: 2 }}
                            />
                          </div>
                          <div
                            class="col-xs-2"
                            style={{
                              margin: 0,
                              padding: 0,
                              top: 5,
                              textAlign: "center",
                            }}
                          >
                            <p class="">{match.awayTeam}</p>
                          </div>
                        </td>
                        <td width="45" class="text-center">
                          &nbsp;
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(HeadToHead);

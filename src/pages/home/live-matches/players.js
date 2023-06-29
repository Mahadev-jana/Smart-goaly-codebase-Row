import React from 'react';
import home_logo from './../../../assets/icon/ac.png';
import away_logo from './../../../assets/icon/j.png';
import field from '../../../assets/img/detail-match/field.png';
const Players = React.memo(({ players, scrolled }) => {
    console.log("players");
    console.log(players);

    return (

        <div class="timeline">
            {!Boolean(Object.keys(players).length) && <tbody>
                <tr>
                    <td colspan="2"
                        style={{
                            fontSize: '25px',
                            color: 'rgb(183, 167, 167)',
                            letterSpacing: '1px',
                            fontWeight: 100,
                            padding: '50px 50px',
                            textAlign: 'center',
                            lineHeight: 1.3
                        }}
                    >
                        <img src={field} style={{ height: 100, padding: 11 }} />

                        <div><span style={{ fontWeight: 800 }}>NO DATA</span></div>
                            <div>YET FOR THIS MATCH</div>
                    </td>
                </tr>
            </tbody>}
            <div className={scrolled ? "row scrolledHeightPlayers" : "row"} style={{ color: '#000', padding: 16 }}>
                {players.final_passes && <div style={{ height: "33px", background: "#D9004B", color: "white", lineHeight: 3, padding: "0 10px" }}>
                    <div class="pull-left">
                        <strong>Passes</strong>
                    </div>
                    <div class="pull-right">
                        Successfull/Total
                    </div>
                </div>}
                {players.final_passes && <table class="table table-responsive players">
                    <tbody>
                        {players.final_passes.map((pass, index) => (
                            <tr>
                                <td class="one">
                                    <img src={pass.team_logo} alt="" style={{ height: 25, width: 25 }} />
                                </td>
                                <td class="ver-mid">
                                    {pass.players_name}
                                </td>
                                <td class="one">
                                    <img src={pass.players_logo} alt="" style={{ height: 25, width: 25 }} />
                                </td>
                                <td class="text-right">
                                    <strong>{Math.round(pass.passes_success)}</strong> / {pass.passes_total}
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>}


                {players.final_passingAccuracy && <div class="goaly" style={{ height: "33px", background: "#D9004B", color: "white", lineHeight: 3, padding: "0 10px" }}>
                    <div class="pull-left">
                        <strong>Passing Accuracy (Final Third)</strong>
                    </div>
                    <div class="pull-right">
                        &nbsp;
										</div>
                </div>}
                {players.final_passingAccuracy && <table class="table table-responsive players">
                    <tbody>
                        {players.final_passingAccuracy.map((accuray, index) => (
                            <tr>
                                <td class="one" style={{paddingLeft:'13px'}}>
                                    <img src={accuray.team_logo} alt="" style={{ height: 25, width: 25 }} />
                                </td>
                                <td class="ver-mid">
                                    {accuray.players_name}
                                </td>
                                <td class="one" style={{paddingRight:'25px'}}>
                                    <img src={accuray.players_logo} alt="" style={{ height: 25, width: 25 }} />
                                </td>
                                <td class="text-right">
                                    <strong>{accuray.passing_accuracy}%</strong>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>}

                {players.final_crosses && <div class="goaly" style={{ height: "33px", background: "#D9004B", color: "white", lineHeight: 3, padding: "0 10px" }}>
                    <div class="pull-left">
                        <strong>Crosses</strong>
                    </div>
                    <div class="pull-right">
                        Successfull/Total
										</div>
                </div>}
                {players.final_crosses && <table class="table table-responsive players">
                    <tbody>
                        {players.final_crosses.map((cross, index) => (
                            <tr>
                                <td class="one">
                                    <img src={cross.team_logo} alt="" style={{ height: 25, width: 25 }} />
                                </td>
                                <td class="ver-mid">
                                    {cross.players_name}
                                </td>
                                <td class="one" style={{paddingLeft:0,paddingRight:'16px'}}>
                                    <img src={cross.players_logo} alt="" style={{ height: 25, width: 25 }} />
                                </td>
                                <td class="text-right">
                                    <strong>{cross.crosses_accuracy}</strong> / {cross.crosses_total}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
                {players.final_shots && <div class="goaly" style={{ height: "33px", background: "#D9004B", color: "white", lineHeight: 3, padding: "0 10px" }}>
                    <div class="pull-left">
                        <strong>Shots</strong>
                    </div>
                    <div class="pull-right">
                        Goal / On Target / Total
										</div>
                </div>}
                {players.final_shots && <table class="table table-responsive players">
                    <tbody>
                        {players.final_shots.map((shorts, index) => (
                            <tr>
                                <td class="one" style={{paddingLeft:'13px'}}>
                                    <img src={shorts.team_logo} alt="" style={{ height: 25, width: 25 }} />
                                </td>
                                <td class="ver-mid" style={{paddingLeft:'35px'}}>
                                    {shorts.players_name}
                                </td>
                                <td class="one" style={{paddingLeft:'16px'}}>
                                    <img src={shorts.players_logo} alt="" style={{ height: 25, width: 25 }} />
                                </td>
                                <td></td>
                                <td class="text-right">
                                    <strong>{shorts.shots_goal}</strong> / {shorts.shots_onTarget} / {shorts.shots_total}
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>}

                {players.final_changesCreated && <div class="goaly" style={{ height: "33px", background: "#D9004B", color: "white", lineHeight: 3, padding: "0 10px" }}>
                    <div class="pull-left">
                        <strong>Chances Created</strong>
                    </div>
                    <div class="pull-right">
                        Assists / Chances
										</div>
                </div>}

                {players.final_changesCreated && <table class="table table-responsive players">
                    <tbody>
                        {players.final_changesCreated.map((assists, index) => (
                            <tr>
                                <td class="one">
                                    <img src={assists.team_logo} alt="" style={{ height: 25, width: 25 }} />
                                </td>
                                <td class="ver-mid">
                                    {assists.players_name}
                                </td>
                                <td class="one" style={{paddingLeft:'0px',paddingRight:'20px'}}>
                                    <img src={assists.players_logo} alt="" style={{ height: 25, width: 25 }} />
                                </td>
                                <td class="text-right">
                                    <strong>{assists.created_assists}</strong> / {assists.created_chances}
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>}
            </div>
        </div>
    )
});

export default Players;
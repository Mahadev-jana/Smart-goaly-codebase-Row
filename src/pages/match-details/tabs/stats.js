import React, { Component } from 'react';
import Chelsea from '../../../assets/img/Chelsea.svg';
import Manchester from '../../../assets/img/Manchester united.svg';
import field from '../../../assets/img/detail-match/field.png';
class Stats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            comment: '',
            loading: false
        }

    }


    render() {
        return (
            <div>
                {!Boolean(Object.keys(this.props.stats).length) && <tbody>
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
                {Boolean(this.props.stats.length) &&


                    <div role="tabpanel" className={this.props.scrolled ? "tab-pane scrolledHeight" : "tab-pane"} id="stats">
                        <div class="stats-header">
                            <img src={this.props.home_logo} alt="" />
                            <h4>TEAM STATS</h4>
                            <img src={this.props.away_logo} alt="" />
                        </div>
                        <div class="stats-body">
                            <div class="stats-item">
                                <div class="point-left"
                                    style={{ width: `${((this.props.stats[0].shots.total / (this.props.stats[0].shots.total + this.props.stats[1].shots.total)) * 100)}%` }}
                                >
                                    {this.props.stats[0].shots.total}
                                </div>
                                <div class="point-name">Shots</div>
                                <div class="point-right"
                                    style={{ width: `${((this.props.stats[1].shots.total / (this.props.stats[0].shots.total + this.props.stats[1].shots.total)) * 100)}%` }}
                                >
                                    {this.props.stats[1].shots.total}
                                </div>
                            </div>
                            <div class="stats-item">
                                <div class="point-left"
                                    style={{ width: `${Math.round(((this.props.stats[0].shots.ongoal / (this.props.stats[0].shots.ongoal + this.props.stats[1].shots.ongoal)) * 100))}%` }}
                                >
                                    {this.props.stats[0].shots.ongoal}</div>
                                <div class="point-name">Shot On Target</div>
                                <div class="point-right"
                                    style={{ width: `${Math.round(((this.props.stats[1].shots.ongoal / (this.props.stats[0].shots.ongoal + this.props.stats[1].shots.ongoal)) * 100))}%` }}
                                >
                                    {this.props.stats[1].shots.ongoal}</div>
                            </div>
                            <div class="stats-item">
                                <div class="point-left" style={{ width: `${((this.props.stats[0].possessiontime / (this.props.stats[0].possessiontime + this.props.stats[1].possessiontime)) * 100)}%` }}>{this.props.stats[0].possessiontime}</div>
                                <div class="point-name">Possession</div>
                                <div class="point-right" style={{ width: `${((this.props.stats[1].possessiontime / (this.props.stats[0].possessiontime + this.props.stats[1].possessiontime)) * 100)}%` }}>{this.props.stats[1].possessiontime}</div>
                            </div>
                            <div class="stats-item">
                                <div class="point-left" style={{ width: `${((this.props.stats[0].passes.total / (this.props.stats[0].passes.total + this.props.stats[1].passes.total)) * 100)}%` }}>{this.props.stats[0].passes.total}</div>
                                <div class="point-name">Passes</div>
                                <div class="point-right" style={{ width: `${((this.props.stats[1].passes.total / (this.props.stats[0].passes.total + this.props.stats[1].passes.total)) * 100)}%` }}>{this.props.stats[1].passes.total}</div>
                            </div>
                            <div class="stats-item">
                                <div class="point-left" style={{ width: `${Math.round(((this.props.stats[0].passes.accurate) / (this.props.stats[0].passes.total) * 100) / (((this.props.stats[0].passes.accurate) / (this.props.stats[0].passes.total) * 100) + ((this.props.stats[1].passes.accurate) / (this.props.stats[1].passes.total) * 100)) * 100)}%` }}>{Math.round((this.props.stats[0].passes.accurate) / (this.props.stats[0].passes.total) * 100)}</div>
                                <div class="point-name">Pass accuracy</div>
                                <div class="point-right" style={{
                                    width: `${Math.round(
                                        ((this.props.stats[1].passes.accurate) / (this.props.stats[1].passes.total) * 100) / (((this.props.stats[0].passes.accurate) / (this.props.stats[0].passes.total) * 100) + ((this.props.stats[1].passes.accurate) / (this.props.stats[1].passes.total) * 100)) * 100)}%`
                                }}>{Math.round((this.props.stats[1].passes.accurate) / (this.props.stats[1].passes.total) * 100)}</div>
                            </div>
                            <div class="stats-item">
                                <div class="point-left" style={{ width: `${((this.props.stats[0].fouls / (this.props.stats[0].fouls + this.props.stats[1].fouls)) * 100)}%` }}>{this.props.stats[0].fouls}</div>
                                <div class="point-name">Fouls</div>
                                <div class="point-right" style={{ width: `${((this.props.stats[1].fouls / (this.props.stats[0].fouls + this.props.stats[1].fouls)) * 100)}%` }}>{this.props.stats[1].fouls}</div>
                            </div>
                        </div>
                    </div>}
            </div>

        );
    }
};

export default Stats;


// <div style={{
//     maxWidth: '100vw', overflowX: 'hidden',
//     fontFamily: 'Roboto, Noto, Helvetica, Arial, sans-serif',
//     color: '#212121', lineHeight: 1.5, background: '#E9E9E9'
// }}>
//  { this.props.stats.length &&   <div class="timeline" style={{ backgroundColor: '#fff' }}>
//         <div class="row">
//             <table class="table st">
//                 <thead>
//                     <tr>
//                         <th class="small"><img style={{height: 60,width: 60}} src={this.props.home_logo} alt="" /></th>
//                         <th class="text-uppercase"><span>Team Stats</span></th>
//                         <th class="small"><img style={{height: 60,width: 60}} src={this.props.away_logo} alt="" /></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>{this.props.stats[0].shots.total}</td>
//                         <td>Shots</td>
//                         <td>{this.props.stats[1].shots.total}</td>
//                     </tr>
//                     <tr>
//                         <td>{this.props.stats[0].shots.ongoal}</td>
//                         <td>Shots on target</td>
//                         <td>{this.props.stats[1].shots.ongoal}</td>
//                     </tr>
//                     <tr>
//                         <td>{this.props.stats[0].possessiontime}%</td>
//                         <td>Possession</td>
//                         <td>{this.props.stats[1].possessiontime}%</td>
//                     </tr>
//                     <tr>
//                         <td>{this.props.stats[0].passes.total}</td>
//                         <td>Passes</td>
//                         <td>{this.props.stats[1].passes.total}</td>
//                     </tr>
//                     <tr>
//                         <td>{Math.round((this.props.stats[0].passes.accurate)/(this.props.stats[0].passes.total)*100)}%</td>
//                         <td>Pass accuracy</td>
//                         <td>{Math.round((this.props.stats[1].passes.accurate)/(this.props.stats[1].passes.total)*100)}%</td>
//                     </tr>
//                     <tr>
//                         <td>{this.props.stats[0].fouls}</td>
//                         <td>Fouls</td>
//                         <td>{this.props.stats[1].fouls}</td>
//                     </tr>
//                     <tr>
//                         <td>{this.props.stats[0].yellowcards}</td>
//                         <td>Yellow cards</td>
//                         <td>{this.props.stats[1].yellowcards}</td>
//                     </tr>
//                     <tr>
//                         <td>{this.props.stats[0].redcards}</td>
//                         <td>Red cards</td>
//                         <td>{this.props.stats[1].redcards}</td>
//                     </tr>
//                     <tr>
//                         <td>{this.props.stats[0].offsides}</td>
//                         <td>Offsides</td>
//                         <td>{this.props.stats[1].offsides}</td>
//                     </tr>
//                     <tr>
//                         <td>{this.props.stats[0].corners}</td>
//                         <td>Corners</td>
//                         <td>{this.props.stats[1].corners}</td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     </div>}

// </div>
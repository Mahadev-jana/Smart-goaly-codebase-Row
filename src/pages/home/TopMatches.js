// // import React, { useEffect, useState, Fragment } from 'react';
// // import { Tabs, Tab, Row, Col, Grid } from 'react-bootstrap';
// // import Swiper from 'react-id-swiper';
// // import Moment from 'react-moment';
// // import { isArray, isEmpty } from 'lodash';
// // import axios from '../../_config/axios';
// // import thumb from '../../assets/thumb/thumblinimage.jpg';
// // import playIcon from '../../assets/thumb/thumb-youtube-play-small.png';

// // import ResponsiveEmbed from 'react-responsive-embed';
// // import Iframe from 'react-iframe';
// // import Modal from 'react-responsive-modal';
// // import { thumblinimage } from '../../assets/thumb/thumblinimage.jpg';
// // import { Link } from 'react-router-dom';
// // import MatchSummery from './live-matches/MatchSummery';
// // import { keys } from 'lodash';
// // import loader from '../../assets/loader/loaderspinner.gif';

// // const params = {
// //     pagination: {
// //         el: '.swiper-pagination',
// //         type: 'bullets',
// //         clickable: true,
// //     },
// //     height: '30px',
// //     backgroundColor: '#fff',
// //     slidesPerView: 1,
// //     spaceBetween: 10
// // };

// // const TopMatches = () => {
// //     const [tab, setTab] = React.useState('finished');
// //     const [liveMatch, setliveMatch] = React.useState([]);
// //     const [finishedMatch, setfinishedMatch] = React.useState([]);
// //     const [nextMatch, setnextMatch] = React.useState([]);
// //     const [matches, setMatches] = React.useState([]);
// //     const [loading, setLoading] = React.useState(false);

// //     useEffect(() => {
// //         setLoading(true);
// //         axios.post('/topMatchByLeague').then(res => {
// //             if (res.data && res.data.success && res.data.success == 1) {
// //                 if (res.data.matches) {
// //                     if (res.data.matches.live) {
// //                         setliveMatch(res.data.matches.live);
// //                     }
// //                     if (res.data.matches.coming_up) {
// //                         setnextMatch(res.data.matches.coming_up);
// //                     }
// //                     if (res.data.matches.finish) {
// //                         console.log('finished');
// //                         setfinishedMatch(res.data.matches.finish);
// //                         setMatches(res.data.matches.finish);
// //                     }
// //                     setLoading(false);
// //                 }
// //             } else {
// //                 setMatches([]);
// //             }
// //         }).catch(err => {
// //             console.log({ err });
// //         })

// //     }, []);

// //     const chnageStatus = (e) => {
// //         console.log(finishedMatch);
// //         console.log(liveMatch);

// //         console.log(nextMatch);

// //         console.log(matches);

// //         // setMatches([]);
// //         setTab(e);
// //         if (e == "live") {
// //             setMatches(liveMatch);
// //         }
// //         if (e == "finished") {
// //             setMatches(finishedMatch)
// //         }
// //         if (e == "comingup") {
// //             setMatches(nextMatch);
// //         }

// //     }

// //     return (
// //         <Row>
// //             <Col xs={12} className="mt-10 pd-0">
// //                 <div class="wrapnya">
// //                     <div class="tuhed">
// //                         <div class="up" style={{ backgroundColor: '#0F7B30' }}>
// //                             <i class="fas fa-award"></i> &nbsp;&nbsp;Top Matches
// //                         </div>
// //                         <div className="batbat">
// //                             <Tabs id="list-match-tabs" className="card-header tab-card-header" style={{ display: 'flex', justifyContent: 'center' }}
// //                                 activeKey={tab} onSelect={(tab) => chnageStatus(tab)}
// //                             >
// //                                 <Tab eventKey="finished" title="Finish" tabClassName="nav-item">
// //                                 </Tab>

// //                                 <Tab eventKey="live" title="Live" tabClassName="nav-item">
// //                                 </Tab>

// //                                 <Tab eventKey="comingup" title="ComingUp" tabClassName="nav-item">
// //                                 </Tab>
// //                             </Tabs>
// //                         </div>
// //                         <div class="mid" >
// //                             <div style={{ minHeight: 300, backgroundColor: '#fff' }} >
// //                                 <div style={{ backgroundColor: '#fff', height: 'auto' }}>
// //                                     {loading && matches.length == 0 && <div style={{ position: 'absolute', top: '50%',left: '45%'}}><img src={loader} style={{ height: '40px', marginTop: '40%' }} /></div>}
// //                                     {!!matches.length && <Swiper style {...params}>
// //                                         {matches.map((match, key) => (
// //                                             <Grid fluid={true} key={key} className="batbat" style={{ height: 'auto' }}>
// //                                                 <Row class="part" style={{ marginBottom: '40px' }}>
// //                                                     <Col xs={12} className="lm mt-10">
// //                                                         {keys(match).length && <MatchSummery {...match} />}
// //                                                     </Col>
// //                                                 </Row>
// //                                             </Grid>
// //                                         ))}
// //                                     </Swiper>}
// //                                     {!loading && matches && matches.length == 0 && <Grid className="batbat" style={{ height: 300, marginTop: 0 }}>
// //                                         <Row class="part" style={{ marginBottom: '40px' }}>
// //                                             <Col xs={12} className="lm mt-10" style={{ fontWeight: '600', color: 'black', textAlign: 'center' }}>
// //                                                 <div style={{ marginTop: '50%' }}> No Match Found</div>
// //                                             </Col>
// //                                         </Row>
// //                                     </Grid>}
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </Col>
// //         </Row>
// //     )
// // }

// // export default TopMatches;

// import React, { useEffect, useState, Fragment } from 'react';
// import { Tabs, Tab, Row, Col, Grid } from 'react-bootstrap';
// import Swiper from 'react-id-swiper';
// import Moment from 'react-moment';
// import { isArray, isEmpty } from 'lodash';
// import axios from '../../_config/axios';
// import thumb from '../../assets/thumb/thumblinimage.jpg';
// import playIcon from '../../assets/thumb/thumb-youtube-play-small.png';

// import ResponsiveEmbed from 'react-responsive-embed';
// import Iframe from 'react-iframe';
// import Modal from 'react-responsive-modal';
// import { thumblinimage } from '../../assets/thumb/thumblinimage.jpg';
// import { Link } from 'react-router-dom';
// import MatchSummery from './live-matches/MatchSummery';
// import { keys } from 'lodash';
// import loader from '../../assets/loader/loaderspinner.gif';

// const params = {
//     pagination: {
//         el: '.swiper-pagination',
//         type: 'bullets',
//         clickable: true,
//     },
//     height: '30px',
//     backgroundColor: '#fff',
//     slidesPerView: 1,
//     spaceBetween: 10
// };

// const  liveData = [
//     {
//       id: "18017198",
//       date_time: "2021-05-04 19:00:00",
//       status: "NS",
//       homeTeam: {
//         id: 9,
//         name: "Manchester City",
//         score: 0,
//         founded: 1880,
//         twitter: "@ManCity",
//         venue_id: 151,
//         legacy_id: 127,
//         logo_path: "https://cdn.sportmonks.com/images//soccer/teams/9/9.png",
//         country_id: 462,
//         short_code: "MCI",
//         national_team: false,
//         is_placeholder: null,
//         current_season_id: 17420
//       },
//       awayTeam: {
//         id: 591,
//         name: "Paris Saint Germain",
//         score: 0,
//         founded: 1970,
//         twitter: "@PSG_inside",
//         venue_id: 131,
//         legacy_id: 131,
//         logo_path: "https://cdn.sportmonks.com/images//soccer/teams/15/591.png",
//         country_id: 17,
//         short_code: "PSG",
//         national_team: false,
//         is_placeholder: null,
//         current_season_id: 17160
//       },
//       venue: {
//         id: 151,
//         city: "Manchester",
//         name: "Etihad Stadium",
//         address: "Rowsley Street",
//         surface: "grass",
//         capacity: 55097,
//         image_path: "https://cdn.sportmonks.com/images/soccer/venues/23/151.png",
//         coordinates: "53.483889,-2.203889"
//       },
//       referee: {
//         id: 15767,
//         fullname: "Björn Kuipers",
//         lastname: "Kuipers",
//         firstname: "Björn",
//         common_name: "B. Kuipers"
//       },
//       goals: ""
//     },

//   ]

// const TopMatches = () => {
//     const [tab, setTab] = React.useState('finished');
//     const [liveMatch, setliveMatch] = React.useState([]);
//     const [finishedMatch, setfinishedMatch] = React.useState([]);
//     const [nextMatch, setnextMatch] = React.useState([]);
//     const [matches, setMatches] = React.useState([]);
//     const [loading, setLoading] = React.useState(false);
//     const [liveMatchLoading, setLiveMatchLoading] = React.useState(false);

//     useEffect(() => {
//         setLoading(true);
//         axios.post('/topMatchPast').then(res => {
//             // console.log(res.data.matches,'topMatchPast')
//             if (res.data && res.data.success && res.data.success == 1) {
//                 if (res.data.matches) {
//                     setfinishedMatch(res.data.matches);
//                     setMatches(res.data.matches);
//                     setLoading(false);
//                 }
//             } else {
//                 setfinishedMatch([]);
//                 setLoading(false);
//             }
//         }).catch(err => {
//             console.log({ err });
//         })
//         axios.post('/topMatchComing').then(res => {
//             if (res.data && res.data.success && res.data.success == 1) {
//                 // console.log(res.data.matches,'topMatchComing')
//                 if (res.data.matches) {
//                         setnextMatch(res.data.matches);

//                     setLoading(false);
//                 }
//             } else {
//                 setnextMatch([]);
//                 setLoading(false);
//             }
//         }).catch(err => {
//             console.log({ err });
//         })
//         axios.post('/topMatchLive').then(res => {
//             if (res.data && res.data.success && res.data.success == 1) {
//                 // console.log(res.data.matches,'topMatchLive')
//                 if (res.data.matches) {
//                         setliveMatch(res.data.matches);

//                     setLoading(false);
//                 }
//             } else {
//                 setliveMatch([]);
//                 setLoading(false);
//             }
//         }).catch(err => {
//             console.log({ err });
//         })

//         // axios.post('/topMatchByLeague').then(res => {
//         //     if (res.data && res.data.success && res.data.success == 1) {
//         //         if (res.data.matches) {
//         //             if (res.data.matches.live) {
//         //                 setliveMatch(res.data.matches.live);
//         //             }
//         //             if (res.data.matches.coming_up) {
//         //                 setnextMatch(res.data.matches.coming_up);
//         //             }
//         //             if (res.data.matches.finish) {
//         //                 console.log('finished');
//         //                 setfinishedMatch(res.data.matches.finish);
//         //                 setMatches(res.data.matches.finish);
//         //             }
//         //             setLoading(false);
//         //         }
//         //     } else {
//         //         setMatches([]);
//         //     }
//         // }).catch(err => {
//         //     console.log({ err });
//         // })

//     }, []);

//     const chnageStatus = (e) => {
//         // console.log(finishedMatch);
//         // console.log(liveMatch);

//         // console.log(nextMatch);

//         // console.log(matches);

//         // setMatches([]);
//         setTab(e);
//         if (e == "live") {
//             setliveMatch(liveMatch);
//             setLiveMatchLoading(true);
//             setMatches([]);
//             // setLoading(false);
//         }
//         if (e == "finished") {
//             setMatches(finishedMatch);
//             setLiveMatchLoading(false);
//             setliveMatch([]);

//         }
//         if (e == "comingup") {
//             setMatches(nextMatch);
//             setLiveMatchLoading(false);
//             setliveMatch([]);
//         }

//     }

//     // console.log(finishedMatch);
//     // console.log(liveMatch);
//     // console.log(nextMatch);

//     // console.log(matches);
//     console.log(tab,liveMatch,finishedMatch,nextMatch,matches,loading,liveMatchLoading)
//     return (
//         <Row>
//             <Col xs={12} className="mt-10 pd-0">
//                 <div class="wrapnya">
//                     <div class="tuhed">
//                         <div class="up" style={{ backgroundColor: '#0F7B30' }}>
//                             <i class="fas fa-award"></i> &nbsp;&nbsp;Top Matches
//                         </div>
//                         <div className="batbat">
//                             <Tabs id="list-match-tabs" className="card-header tab-card-header" style={{ display: 'flex', justifyContent: 'center' }}
//                                 activeKey={tab} onSelect={(tab) => chnageStatus(tab)}
//                             >
//                                 <Tab eventKey="finished" title="Finish" tabClassName="nav-item">
//                                 </Tab>

//                                 <Tab eventKey="live" title="Live" tabClassName="nav-item">
//                                 </Tab>

//                                 <Tab eventKey="comingup" title="ComingUp" tabClassName="nav-item">
//                                 </Tab>
//                             </Tabs>
//                         </div>
//                         <div class="mid" >
//                             <div style={{ minHeight: 300, backgroundColor: '#fff' }} >
//                                 <div style={{ backgroundColor: '#fff', height: 'auto' }}>
//                                     {!liveMatchLoading && loading && matches.length == 0 && <div style={{ position: 'absolute', top: '50%',left: '45%'}}><img src={loader} style={{ height: '40px', marginTop: '40%' }} /></div>}
//                                     {matches.length && <Swiper style {...params}>
//                                         {matches.map((match, key) => (
//                                             <Grid fluid={true} key={key} className="batbat" style={{ height: 'auto' }}>
//                                                 <Row class="part" style={{ marginBottom: '40px' }}>
//                                                     <Col xs={12} className="lm mt-10">
//                                                         {console.log(match)}
//                                                         {keys(match).length && <MatchSummery {...match} />}
//                                                     </Col>
//                                                 </Row>
//                                             </Grid>
//                                         ))}
//                                     </Swiper>}
//                                     {!loading && liveMatchLoading && liveMatch.length && <Swiper style {...params}>
//                                         {liveMatch.map((match, key) => (
//                                             <Grid fluid={true} key={key} className="batbat" style={{ height: 'auto' }}>
//                                                 <Row class="part" style={{ marginBottom: '40px' }}>
//                                                     <Col xs={12} className="lm mt-10">
//                                                         {console.log(match)}
//                                                         {keys(match).length && <MatchSummery {...match} />}
//                                                     </Col>
//                                                 </Row>
//                                             </Grid>
//                                         ))}
//                                     </Swiper>}
//                                     {!loading &&  tab!='live' && matches && matches.length == 0 && <Grid className="batbat" style={{ height: 300, marginTop: 0 }}>
//                                         <Row class="part" style={{ marginBottom: '40px' }}>
//                                             <Col xs={12} className="lm mt-10" style={{ fontWeight: '600', color: 'black', textAlign: 'center' }}>
//                                                 <div style={{ marginTop: '50%' }}> No Match Found</div>
//                                             </Col>
//                                         </Row>
//                                     </Grid>}
//                                     {!loading && tab=='live' && liveMatch && (liveMatch.length == 0) && <Grid className="batbat" style={{ height: 300, marginTop: 0 }}>
//                                         <Row class="part" style={{ marginBottom: '40px' }}>
//                                             <Col xs={12} className="lm mt-10" style={{ fontWeight: '600', color: 'black', textAlign: 'center' }}>
//                                                 <div style={{ marginTop: '50%' }}> No Match Found</div>
//                                             </Col>
//                                         </Row>
//                                     </Grid>}

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Col>
//         </Row>
//     )
// }

// export default TopMatches;

// import React, { useEffect, useState, Fragment } from 'react';
// import { Tabs, Tab, Row, Col, Grid } from 'react-bootstrap';
// import Swiper from 'react-id-swiper';
// import Moment from 'react-moment';
// import { isArray, isEmpty } from 'lodash';
// import axios from '../../_config/axios';
// import thumb from '../../assets/thumb/thumblinimage.jpg';
// import playIcon from '../../assets/thumb/thumb-youtube-play-small.png';

// import ResponsiveEmbed from 'react-responsive-embed';
// import Iframe from 'react-iframe';
// import Modal from 'react-responsive-modal';
// import { thumblinimage } from '../../assets/thumb/thumblinimage.jpg';
// import { Link } from 'react-router-dom';
// import MatchSummery from './live-matches/MatchSummery';
// import { keys } from 'lodash';
// import loader from '../../assets/loader/loaderspinner.gif';

// const params = {
//     pagination: {
//         el: '.swiper-pagination',
//         type: 'bullets',
//         clickable: true,
//     },
//     height: '30px',
//     backgroundColor: '#fff',
//     slidesPerView: 1,
//     spaceBetween: 10
// };

// const TopMatches = () => {
//     const [tab, setTab] = React.useState('finished');
//     const [liveMatch, setliveMatch] = React.useState([]);
//     const [finishedMatch, setfinishedMatch] = React.useState([]);
//     const [nextMatch, setnextMatch] = React.useState([]);
//     const [matches, setMatches] = React.useState([]);
//     const [loading, setLoading] = React.useState(false);

//     useEffect(() => {
//         setLoading(true);
//         axios.post('/topMatchByLeague').then(res => {
//             if (res.data && res.data.success && res.data.success == 1) {
//                 if (res.data.matches) {
//                     if (res.data.matches.live) {
//                         setliveMatch(res.data.matches.live);
//                     }
//                     if (res.data.matches.coming_up) {
//                         setnextMatch(res.data.matches.coming_up);
//                     }
//                     if (res.data.matches.finish) {
//                         console.log('finished');
//                         setfinishedMatch(res.data.matches.finish);
//                         setMatches(res.data.matches.finish);
//                     }
//                     setLoading(false);
//                 }
//             } else {
//                 setMatches([]);
//             }
//         }).catch(err => {
//             console.log({ err });
//         })

//     }, []);

//     const chnageStatus = (e) => {
//         console.log(finishedMatch);
//         console.log(liveMatch);

//         console.log(nextMatch);

//         console.log(matches);

//         // setMatches([]);
//         setTab(e);
//         if (e == "live") {
//             setMatches(liveMatch);
//         }
//         if (e == "finished") {
//             setMatches(finishedMatch)
//         }
//         if (e == "comingup") {
//             setMatches(nextMatch);
//         }

//     }

//     return (
//         <Row>
//             <Col xs={12} className="mt-10 pd-0">
//                 <div class="wrapnya">
//                     <div class="tuhed">
//                         <div class="up" style={{ backgroundColor: '#0F7B30' }}>
//                             <i class="fas fa-award"></i> &nbsp;&nbsp;Top Matches
//                         </div>
//                         <div className="batbat">
//                             <Tabs id="list-match-tabs" className="card-header tab-card-header" style={{ display: 'flex', justifyContent: 'center' }}
//                                 activeKey={tab} onSelect={(tab) => chnageStatus(tab)}
//                             >
//                                 <Tab eventKey="finished" title="Finish" tabClassName="nav-item">
//                                 </Tab>

//                                 <Tab eventKey="live" title="Live" tabClassName="nav-item">
//                                 </Tab>

//                                 <Tab eventKey="comingup" title="ComingUp" tabClassName="nav-item">
//                                 </Tab>
//                             </Tabs>
//                         </div>
//                         <div class="mid" >
//                             <div style={{ minHeight: 300, backgroundColor: '#fff' }} >
//                                 <div style={{ backgroundColor: '#fff', height: 'auto' }}>
//                                     {loading && matches.length == 0 && <div style={{ position: 'absolute', top: '50%',left: '45%'}}><img src={loader} style={{ height: '40px', marginTop: '40%' }} /></div>}
//                                     {!!matches.length && <Swiper style {...params}>
//                                         {matches.map((match, key) => (
//                                             <Grid fluid={true} key={key} className="batbat" style={{ height: 'auto' }}>
//                                                 <Row class="part" style={{ marginBottom: '40px' }}>
//                                                     <Col xs={12} className="lm mt-10">
//                                                         {keys(match).length && <MatchSummery {...match} />}
//                                                     </Col>
//                                                 </Row>
//                                             </Grid>
//                                         ))}
//                                     </Swiper>}
//                                     {!loading && matches && matches.length == 0 && <Grid className="batbat" style={{ height: 300, marginTop: 0 }}>
//                                         <Row class="part" style={{ marginBottom: '40px' }}>
//                                             <Col xs={12} className="lm mt-10" style={{ fontWeight: '600', color: 'black', textAlign: 'center' }}>
//                                                 <div style={{ marginTop: '50%' }}> No Match Found</div>
//                                             </Col>
//                                         </Row>
//                                     </Grid>}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Col>
//         </Row>
//     )
// }

// export default TopMatches;

import React, { useEffect, useState, Fragment } from "react";
import { Tabs, Tab, Row, Col, Grid } from "react-bootstrap";
import Swiper from "react-id-swiper";
import Moment from "react-moment";
import { isArray, isEmpty } from "lodash";
import axios from "../../_config/axios";
import thumb from "../../assets/thumb/thumblinimage.jpg";
import playIcon from "../../assets/thumb/thumb-youtube-play-small.png";

import ResponsiveEmbed from "react-responsive-embed";
import Iframe from "react-iframe";
import Modal from "react-responsive-modal";
import { thumblinimage } from "../../assets/thumb/thumblinimage.jpg";
import { Link } from "react-router-dom";
import MatchSummery from "./live-matches/MatchSummery";
import { keys } from "lodash";
import loader from "../../assets/loader/loaderspinner.gif";

const params = {
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  height: "30px",
  backgroundColor: "#fff",
  slidesPerView: 1,
  spaceBetween: 10,
};

const liveData = [
  {
    id: "18017198",
    date_time: "2021-05-04 19:00:00",
    status: "NS",
    homeTeam: {
      id: 9,
      name: "Manchester City",
      score: 0,
      founded: 1880,
      twitter: "@ManCity",
      venue_id: 151,
      legacy_id: 127,
      logo_path: "https://cdn.sportmonks.com/images//soccer/teams/9/9.png",
      country_id: 462,
      short_code: "MCI",
      national_team: false,
      is_placeholder: null,
      current_season_id: 17420,
    },
    awayTeam: {
      id: 591,
      name: "Paris Saint Germain",
      score: 0,
      founded: 1970,
      twitter: "@PSG_inside",
      venue_id: 131,
      legacy_id: 131,
      logo_path: "https://cdn.sportmonks.com/images//soccer/teams/15/591.png",
      country_id: 17,
      short_code: "PSG",
      national_team: false,
      is_placeholder: null,
      current_season_id: 17160,
    },
    venue: {
      id: 151,
      city: "Manchester",
      name: "Etihad Stadium",
      address: "Rowsley Street",
      surface: "grass",
      capacity: 55097,
      image_path: "https://cdn.sportmonks.com/images/soccer/venues/23/151.png",
      coordinates: "53.483889,-2.203889",
    },
    referee: {
      id: 15767,
      fullname: "Björn Kuipers",
      lastname: "Kuipers",
      firstname: "Björn",
      common_name: "B. Kuipers",
    },
    goals: "",
  },
];

const TopMatches = () => {
  const [tab, setTab] = React.useState("finished");
  const [liveMatch, setliveMatch] = React.useState([]);
  const [finishedMatch, setfinishedMatch] = React.useState([]);
  const [nextMatch, setnextMatch] = React.useState([]);
  const [matches, setMatches] = React.useState([]);
  // const [loading, setLoading] = React.useState(false);
  const [finishMatchLoading, setFinishMatchLoading] = React.useState(false);
  const [liveMatchLoading, setLiveMatchLoading] = React.useState(false);
  const [comingMatchLoading, setComingMatchLoading] = React.useState(false);
  const [loop, setLoop] = useState();

  useEffect(() => {
    let intervalId = null;
    setFinishMatchLoading(true);
    axios
      .post("/topMatchPast")
      .then((res) => {
        // console.log(res.data.matches,'topMatchPast')
        if (res.data && res.data.success && res.data.success == 1) {
          if (res.data.matches) {
            setfinishedMatch(res.data.matches);
            setMatches(res.data.matches);
            setFinishMatchLoading(false);
          }
        } else {
          setfinishedMatch([]);
          setFinishMatchLoading(false);
        }
      })
      .catch((err) => {
        console.log({ err });
      });
    setComingMatchLoading(true);
    axios
      .post("/topMatchComing")
      .then((res) => {
        if (res.data && res.data.success && res.data.success == 1) {
          // console.log(res.data.matches,'topMatchComing')
          if (res.data.matches) {
            setnextMatch(res.data.matches);

            setComingMatchLoading(false);
          }
        } else {
          setnextMatch([]);
          setComingMatchLoading(false);
        }
      })
      .catch((err) => {
        console.log({ err });
      });
    setLiveMatchLoading(true);
    axios
      .post("/topMatchLive")
      .then((res) => {
        console.log(' not login')
        if (res.data && res.data.success && res.data.success == 1) {
          
            setliveMatch(res.data.matches);
            setLiveMatchLoading(false);
            intervalId = setInterval(() => {
              fetchMatch();
            }, 40000);
          
        } else {
          setliveMatch([]);
          setLiveMatchLoading(false);
        }
      })
      .catch((err) => {
        console.log({ err });
      });

    // axios.post('/topMatchByLeague').then(res => {
    //     if (res.data && res.data.success && res.data.success == 1) {
    //         if (res.data.matches) {
    //             if (res.data.matches.live) {
    //                 setliveMatch(res.data.matches.live);
    //             }
    //             if (res.data.matches.coming_up) {
    //                 setnextMatch(res.data.matches.coming_up);
    //             }
    //             if (res.data.matches.finish) {
    //                 console.log('finished');
    //                 setfinishedMatch(res.data.matches.finish);
    //                 setMatches(res.data.matches.finish);
    //             }
    //             setLoading(false);
    //         }
    //     } else {
    //         setMatches([]);
    //     }
    // }).catch(err => {
    //     console.log({ err });
    // })
    return () => clearInterval(intervalId);
  }, []);

  const fetchMatch = () => {
    // setLiveMatchLoading(true);
    // topMatchLive
    axios
      .post("/topMatchLive")
      .then((res) => {
        console.log('login')
        if (res.data && res.data.success && res.data.success == 1) {
          // console.log(res.data.matches.status)
          if (res.data.matches) {
            // const timer = setInterval(() => fetchMatch(), 100);
            // return () => clearInterval(timer);
            setliveMatch(res.data.matches);
            setLiveMatchLoading(false);
          }
        } else {
          setliveMatch([]);
          setLiveMatchLoading(false);
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const chnageStatus = (e) => {
    // console.log(finishedMatch);
    // console.log(liveMatch);

    // console.log(nextMatch);

    // console.log(matches);

    // setMatches([]);
    setTab(e);
    if (e == "live") {
      setTab("live");
      // setLiveMatchLoading(true);
      //     axios.post('/topMatchLive').then(res => {
      //     if (res.data && res.data.success && res.data.success == 1) {
      //         // console.log(res.data.matches,'topMatchLive')
      //         if (res.data.matches) {
      //                 setliveMatch(res.data.matches);
      //                 setLiveMatchLoading(false);
      //         }
      //     } else {
      //         setliveMatch([]);
      //         setLiveMatchLoading(false);
      //     }
      // }).catch(err => {
      //     console.log({ err });
      // })
      // setliveMatch(liveMatch);
      // setLiveMatchLoading(true);
      // setMatches([]);
      // // setLoading(false);
    }
    if (e == "finished") {
      setTab("finished");
      // setMatches(finishedMatch);
      // setLiveMatchLoading(false);
      // setliveMatch([]);
    }
    if (e == "comingup") {
      setTab("comingup");
      // setMatches(nextMatch);
      // setLiveMatchLoading(false);
      // setliveMatch([]);
    }
  };

  // console.log(finishedMatch);
  // console.log(liveMatch);
  // console.log(nextMatch);

  // console.log(matches);
  // console.log(tab,liveMatch,finishedMatch,nextMatch,matches,loading,liveMatchLoading)
  console.log(finishedMatch, liveMatch, nextMatch, tab);
  return (
    <Row>
      <Col xs={12} className="mt-10 pd-0">
        <div class="wrapnya">
          <div class="tuhed">
            <div class="up" style={{ backgroundColor: "#0F7B30" }}>
              <i class="fas fa-award"></i> &nbsp;&nbsp;Top Matches
            </div>
            <div className="batbat">
              <Tabs
                id="list-match-tabs"
                className="card-header tab-card-header"
                style={{ display: "flex", justifyContent: "center" }}
                activeKey={tab}
                onSelect={(tab) => chnageStatus(tab)}
              >
                <Tab
                  eventKey="finished"
                  title="Finish"
                  tabClassName="nav-item"
                ></Tab>

                <Tab eventKey="live" title="Live" tabClassName="nav-item"></Tab>

                <Tab
                  eventKey="comingup"
                  title="ComingUp"
                  tabClassName="nav-item"
                ></Tab>
              </Tabs>
            </div>
            <div class="mid">
              <div style={{ minHeight: 300, backgroundColor: "#fff" }}>
                <div style={{ backgroundColor: "#fff", height: "auto" }}>
                  {finishMatchLoading && tab === "finished" && (
                    <div
                      style={{ position: "absolute", top: "50%", left: "45%" }}
                    >
                      <img
                        src={loader}
                        style={{ height: "40px", marginTop: "40%" }}
                      />
                    </div>
                  )}
                  {liveMatchLoading && tab === "live" && (
                    <div
                      style={{ position: "absolute", top: "50%", left: "45%" }}
                    >
                      <img
                        src={loader}
                        style={{ height: "40px", marginTop: "40%" }}
                      />
                    </div>
                  )}
                  {comingMatchLoading && tab === "comingup" && (
                    <div
                      style={{ position: "absolute", top: "50%", left: "45%" }}
                    >
                      <img
                        src={loader}
                        style={{ height: "40px", marginTop: "40%" }}
                      />
                    </div>
                  )}
                  {finishedMatch.length &&
                    tab === "finished" &&
                    !finishMatchLoading && (
                      <Swiper style {...params}>
                        {finishedMatch.map((match, key) => (
                          <Grid
                            fluid={true}
                            key={key}
                            className="batbat"
                            style={{ height: "auto" }}
                          >
                            <Row class="part" style={{ marginBottom: "40px" }}>
                              <Col xs={12} className="lm mt-10">
                                {console.log(match)}
                                {keys(match).length && (
                                  <MatchSummery {...match} />
                                )}
                              </Col>
                            </Row>
                          </Grid>
                        ))}
                      </Swiper>
                    )}
                  {liveMatch.length && tab === "live" && !liveMatchLoading && (
                    <Swiper style {...params}>
                      {liveMatch.map((match, key) => (
                        <Grid
                          fluid={true}
                          key={key}
                          className="batbat"
                          style={{ height: "auto" }}
                        >
                          <Row class="part" style={{ marginBottom: "40px" }}>
                            <Col xs={12} className="lm mt-10">
                              {console.log(match)}
                              {keys(match).length && (
                                <MatchSummery {...match} />
                              )}
                            </Col>
                          </Row>
                        </Grid>
                      ))}
                    </Swiper>
                  )}
                  {nextMatch.length &&
                    tab === "comingup" &&
                    !comingMatchLoading && (
                      <Swiper style {...params}>
                        {nextMatch.map((match, key) => (
                          <Grid
                            fluid={true}
                            key={key}
                            className="batbat"
                            style={{ height: "auto" }}
                          >
                            <Row class="part" style={{ marginBottom: "40px" }}>
                              <Col xs={12} className="lm mt-10">
                                {console.log(match)}
                                {keys(match).length && (
                                  <MatchSummery {...match} />
                                )}
                              </Col>
                            </Row>
                          </Grid>
                        ))}
                      </Swiper>
                    )}
                  {finishedMatch &&
                    finishedMatch.length == 0 &&
                    tab === "finished" &&
                    !finishMatchLoading && (
                      <Grid
                        className="batbat"
                        style={{ height: 300, marginTop: 0 }}
                      >
                        <Row class="part" style={{ marginBottom: "40px" }}>
                          <Col
                            xs={12}
                            className="lm mt-10"
                            style={{
                              fontWeight: "600",
                              color: "black",
                              textAlign: "center",
                            }}
                          >
                            <div style={{ marginTop: "50%" }}>
                              {" "}
                              No Finished Match Found
                            </div>
                          </Col>
                        </Row>
                      </Grid>
                    )}
                  {liveMatch &&
                    liveMatch.length == 0 &&
                    tab === "live" &&
                    !liveMatchLoading && (
                      <Grid
                        className="batbat"
                        style={{ height: 300, marginTop: 0 }}
                      >
                        <Row class="part" style={{ marginBottom: "40px" }}>
                          <Col
                            xs={12}
                            className="lm mt-10"
                            style={{
                              fontWeight: "600",
                              color: "black",
                              textAlign: "center",
                            }}
                          >
                            <div style={{ marginTop: "50%" }}>
                              {" "}
                              No Live Match Found
                            </div>
                          </Col>
                        </Row>
                      </Grid>
                    )}
                  {nextMatch &&
                    nextMatch.length == 0 &&
                    tab === "comingup" &&
                    !comingMatchLoading && (
                      <Grid
                        className="batbat"
                        style={{ height: 300, marginTop: 0 }}
                      >
                        <Row class="part" style={{ marginBottom: "40px" }}>
                          <Col
                            xs={12}
                            className="lm mt-10"
                            style={{
                              fontWeight: "600",
                              color: "black",
                              textAlign: "center",
                            }}
                          >
                            <div style={{ marginTop: "50%" }}>
                              {" "}
                              No Coming Match Found
                            </div>
                          </Col>
                        </Row>
                      </Grid>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TopMatches;

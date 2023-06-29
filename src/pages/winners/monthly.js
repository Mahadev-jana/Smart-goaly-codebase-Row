import React,{ useEffect } from 'react';
// import { Grid, Col, Row, Image } from 'react-bootstrap';
// import { hasIn, size } from 'lodash';
// import { Link } from 'react-router-dom';
// import noImage from '../../assets/img/noimage.jpg';
// import prize_two from '../../assets/img/prize/Image 2@2x.png';
// import prize_four from '../../assets/img/prize/Image 4@2x.png';
// import prize_three from '../../assets/img/prize/Image 3@2x.png';
// import prize_five from '../../assets/img/prize/Image 5@2x.png';
import { WinnerLoader } from '../../simmer-loader';
import person_logo from '../../assets/img/person.svg';
import coins from "../../assets/img/coins.svg";
import clock from "../../assets/img/clock.svg";
import '../../assets/css/winners.css';
// import Moment from 'react-moment';
// const fakeData = [
//     {
//         name: "Khmer United",
//         coins: "120",
//         prize_rank: "1",
//         prize_name: "Adidas Jersey",
//         prize_image: "http://smartcms.goaly.mobi/assets/uploads/prizeImage/ae4c77258ea1e937b95429c65dd67e5c.png",
//         start_date: "2020-10-12",
//         end_date: "2020-10-18"

//     },
//     {
//         name: "Bike Ridee",
//         coins: "90",
//         prize_rank: "2",
//         prize_name: "Adidas Soccer Cleats",
//         prize_image: "http://smartcms.goaly.mobi/assets/uploads/prizeImage/ff156033c0bec22fe515c32372c9d091.png",
//         start_date: "2020-10-12",
//         end_date: "2020-10-18"
//     },
//     {
//         name: "Sky Shooter",
//         coins: "70",
//         prize_rank: "3",
//         prize_name: "Adidas Soccer Ball",
//         prize_image: "http://smartcms.goaly.mobi/assets/uploads/prizeImage/43e2063627ef03ea9259632ef9ca54e8.png",
//         start_date: "2020-10-12",
//         end_date: "2020-10-18"
//     }
// ]
const Monthly = React.memo(({ scoreList, monthlyPrize, loading }) => {
    
    const winnerList = [
        {
            winner:87587302
        },
        {
            winner:93333933
        },
        {
            winner:15283551
        }
    ]
    console.log(monthlyPrize);
    console.log(scoreList);
    var ToDate = new Date();

    useEffect(()=>{
       
        console.log("Monthly prize length is " + monthlyPrize.length);
       },[monthlyPrize])

    scoreList.sort(function (a, b) {

        if (parseInt(a.coins) > parseInt(b.coins)) return -1;
        if (parseInt(a.coins) < parseInt(b.coins)) return 1;
        if (a.first_pred_datetime > b.first_pred_datetime) return 1;
        if (a.first_pred_datetime < b.first_pred_datetime) return -1;
        if (parseInt(a.flag) < parseInt(b.flag)) return 1;
        if (parseInt(a.flag) > parseInt(b.flag)) return -1;
    })

    const topScoreList = scoreList.slice(0, monthlyPrize.length)
    
    console.log(topScoreList)
    const mergeScorelistWithMonthlyPrize = topScoreList.map((item, i) => Object.assign({}, item, monthlyPrize[i]));
    const newWinnerList = topScoreList.map((item, i) => Object.assign({}, item, monthlyPrize[i]));
    console.log(mergeScorelistWithMonthlyPrize)
    console.log(loading)
    return (
        <div>
            {console.log(scoreList)}
            {newWinnerList && newWinnerList.length > 0 && newWinnerList.map((details, key) => {

                return <>
                    <div className="winner" key={key}>
                        <div className="cover-image">
                            <div>
                                <img
                                    src={details.prize_image} alt="" />
                            </div>
                        </div>
                        <div className="details">
                            <div className="details-container">
                                <h3 className="title" style={{ borderTop: "none", borderBottom: "none" }}>{key + 1}. {details.prize_name}</h3>
                               <div className="detail-column" style={{ 'border': 'none', margin: "0px auto" }}>
                                    <div className="icon">

                                        <img src={person_logo} alt="" className="mr-2" />

                                    </div>
                                   <span>{details.name == " " ?`${msisdnSubstring(details.user_msisdn)}XXXX` : details.name}</span>
                                </div>
                                <div className="detail-column" style={{ border: "none", margin: "0px auto" }}>
                                    <div className="icon" style={{ margin: "0 auto" }}><img src={coins} alt="" className="mr-2" /></div>
                                    <span>{details.coins} Points</span>
                                </div>
                                <div className="detail-column" style={{ 'border': 'none', margin: "0px auto" }}>
                                    <div className="icon"><img src={clock} alt="" className="mr-2" /></div>
                                    <span style={{
                                        fontSize: '14px'
                                    }}>{details.start_date} - {details.end_date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            })
            }



 
            {monthlyPrize && monthlyPrize.length == 0 && loading == false &&

                <div style={{
                    margin: 'auto',
                    width: '66%',
                    border: '1px solid green',
                    padding: '13px',
                    marginTop: '203px'
                }}>The competition not finished yet</div>
            }
            {loading &&
                <div>
                    <WinnerLoader />
                    <WinnerLoader />
                    <WinnerLoader />
                </div>


            }
        </div>


    );
});


export default Monthly;

const msisdnSubstring = (item) => {
    return item.substr(0, item.length-4)
}
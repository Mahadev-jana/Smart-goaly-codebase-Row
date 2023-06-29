import React, { useState , useEffect } from 'react';
import { hasIn, size } from 'lodash';
import { WinnerLoader } from '../../simmer-loader';
import person_logo from '../../assets/img/person.svg';
import coins from "../../assets/img/coins.svg";
import clock from "../../assets/img/clock.svg";
import '../../assets/css/winners.css';
// const fakeData = [
//     {
//         name: "Bike Ridee",
//         coins: "110",
//         prize_rank: "1",
//         prize_name: "Adidas Jersey",
//         prize_image: "http://smartcms.goaly.mobi/assets/uploads/prizeImage/ae4c77258ea1e937b95429c65dd67e5c.png",
//         start_date: "2020-10-19",
//         end_date: "2020-10-25",
//         flag:0

//     },
//     {
//         name: " Yim Darayuth ",
//         coins: "80",
//         prize_rank: "2",
//         prize_name: "Adidas Soccer Cleats",
//         prize_image: "http://smartcms.goaly.mobi/assets/uploads/prizeImage/ff156033c0bec22fe515c32372c9d091.png",
//         start_date: "2020-10-19",
//         end_date: "2020-10-25",
//         flag:0
//     },
//     {
//         name: "Sky Shooter",
//         coins: "80",
//         prize_rank: "3",
//         prize_name: "Adidas Soccer Ball",
//         prize_image: "http://smartcms.goaly.mobi/assets/uploads/prizeImage/43e2063627ef03ea9259632ef9ca54e8.png",
//         start_date: "2020-10-19",
//         end_date: "2020-10-25",
//         flag:1
//     }
// ]
// fakeData.sort(function (a, b) {

//     if (parseInt(a.coins) > parseInt(b.coins)) return -1;
//     if (parseInt(a.coins) < parseInt(b.coins)) return 1;
//     if (parseInt(a.start_date) > parseInt(b.start_date)) return 1;
//     if (parseInt(a.start_date) < parseInt(b.start_date)) return -1;
//     if (parseInt(a.flag) < parseInt(b.flag)) return 1;
//     if (parseInt(a.flag) > parseInt(b.flag)) return -1;
// })
// console.log(fakeData);
const Weekly = React.memo(({ scoreList, weeklyPrize, loading }) => {
    
    console.log(weeklyPrize);
    console.log(scoreList);
    const [ sortedScoreList , setSortedScoreList ] = useState([])
    useEffect(()=>{
        setSortedScoreList(scoreList.sort(function (a, b) {
    
            if (parseInt(a.coins) > parseInt(b.coins)) return -1;
            if (parseInt(a.coins) < parseInt(b.coins)) return 1;
            if (a.first_pred_datetime > b.first_pred_datetime) return 1;
            if (a.first_pred_datetime < b.first_pred_datetime) return -1;
            if (parseInt(a.flag) < parseInt(b.flag)) return 1;
            if (parseInt(a.flag) > parseInt(b.flag)) return -1;
        })
        )
    })

    useEffect(()=>{
        console.log(sortedScoreList)
    },[sortedScoreList])

    // for world cup only 
    const firstPrize = weeklyPrize[0] ;
    const secondPrize = weeklyPrize[0] ;
    const thirdPrize = weeklyPrize[1] ;
    const fourToThirtyPrizeList = [] ;

    for(let i=0; i<27; i++) 
    {
        fourToThirtyPrizeList.push(weeklyPrize[3])
    }

    const worldCupPrize = [ firstPrize, secondPrize, thirdPrize, ...fourToThirtyPrizeList] ;
    // ned of code for world cup

    // after world cup, change all following "worldCupPrize" with "weeklyPrize" //done
    const topScoreList = sortedScoreList.slice(0, weeklyPrize.length)
    console.log(topScoreList)
    var mergeScorelistWithweeklyPrize;
    if(topScoreList.length === 0)
    {
        mergeScorelistWithweeklyPrize = Object.assign( topScoreList, weeklyPrize)
    }
    else {
        mergeScorelistWithweeklyPrize = topScoreList.map((item, i) => Object.assign({}, item, weeklyPrize[i]))
    }
   
    // mergeScorelistWithweeklyPrize = weeklyPrize ;

    console.log("mergeScorelistWithweeklyPrize length is" + mergeScorelistWithweeklyPrize.length)
    console.log(scoreList[16]);
    console.log(topScoreList[16]);
    console.log(mergeScorelistWithweeklyPrize[16])
    console.log(loading)
    // !loading && mergeScorelistWithweeklyPrize && mergeScorelistWithweeklyPrize.length > 0 && mergeScorelistWithweeklyPrize.map((details, key) =>
    

    useEffect(()=>
    {
        console.log("loading is " + loading);
        console.log("world cup prize list is " + mergeScorelistWithweeklyPrize.length);
    },[weeklyPrize])
    
    return (
        <div>
            {console.log(scoreList)}
            {/* {!loading && scoreList.length !== 0 && mergeScorelistWithweeklyPrize && mergeScorelistWithweeklyPrize.length > 0 && mergeScorelistWithweeklyPrize.map((details, key) => {

                return <>
                    <div className="winner" key={key}>
                        <div className="cover-image">
                            <div>
                                <img src={details.prize_image} alt="" />
                            </div>
                        </div>
                        <div className="details">
                            <div className="details-container">
                                <h3 className="title" style={{ 'border': 'none' }}>{key+1}. {details.prize_name}</h3>
                                <div className="detail-column">
                                    <div className="icon">

                                        <img src={person_logo} alt="" className="mr-2" />

                                    </div>
                                    <span>{details.name}</span>
                                </div>
                                <div className="detail-column">
                                    <div className="icon"><img src={coins} alt="" className="mr-2" /></div>
                                    <span>{details.coins} Points</span>
                                </div>
                                <div className="detail-column">
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
            } */}
            {!loading && scoreList.length !== 0 && mergeScorelistWithweeklyPrize && mergeScorelistWithweeklyPrize.length == 0 &&

                <div style={{
                    margin: 'auto',
                    width: '66%',
                    border: '1px solid green',
                    padding: '13px',
                    marginTop: ' 203px'
                }}>The competition not finished yet</div>
            }
            {loading &&
                <div>
                    <WinnerLoader />
                    <WinnerLoader />
                    <WinnerLoader />
                </div>


            }
            
            {!loading && mergeScorelistWithweeklyPrize && mergeScorelistWithweeklyPrize.length !== 0 && mergeScorelistWithweeklyPrize[0] === undefined && 
                <div>
                    <WinnerLoader />
                    <WinnerLoader />
                    <WinnerLoader />
                </div>
            }

            {!loading && mergeScorelistWithweeklyPrize && mergeScorelistWithweeklyPrize.length !== 0 && mergeScorelistWithweeklyPrize[0] !== undefined && mergeScorelistWithweeklyPrize.map((details, key) => {
                return <>
                <div className="winner" key={key}>
                    <div className="cover-image">
                        <div>
                            <img src={details.prize_image} alt="" />
                        </div>
                    </div>
                    <div className="details">
                        <div className="details-container" >
                            <h3 className="title" style={{ borderTop: "none", borderBottom: "none" }}>{key+1}. {details.prize_name}</h3>
                            <div className="detail-column" style={{ 'border': 'none', margin: "0px auto" }}>
                                <div className="icon">

                                    <img src={person_logo} alt="" className="mr-2" />

                                </div>
                                <span>{details.name}</span>
                            </div>
                            <div className="detail-column" style={{ border: "none", margin: "0px auto" }}>
                                <div className="icon"><img src={coins} alt="" className="mr-2" /></div>
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
        </div>


    );
});


export default Weekly;
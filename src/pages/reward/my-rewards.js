import React, { Component } from 'react';
import { authPost } from '../../api';
// import loader from '../../../src/assets/loader/loaderspinner.gif';
import loaderimg from '../../assets/loader/loaderspinner.gif';
import {isEmpty} from 'lodash';

class MyRewards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myRewards: [],
            loader:false
        } 
    }
    componentDidMount() {
        this.setState({ loader: true });
        this.getMyReward();
    }
    getMyReward = () => {
        authPost('myreward')
            .then(res => {
                // console.log(res);
                if (res.data.success)
                    this.setState({ myRewards: res.data.myreward_details });
                    this.setState({ loader: false });
            })
            .catch(err => {
                console.log(err)
                this.setState({ loader: false });

            });
    }
    render() {
        const { myRewards,loader } = this.state;
        // console.log(myRewards)
        return (
            <div>
                { loader && 
               <div style={{textAlign:'center'}}> <img src={loaderimg} style={{height:40,marginTop: 60}}/> </div>

                }
                {!!myRewards && myRewards.map((reward, key) => (
                    <div className="row" style={{ marginTop: '2px', borderBottom: '1px solid #f3f3f3' }}>
                        <div className="col-xs-2">
                            <img src={reward.reward_image} />
                        </div>
                        <div className="col-xs-6">
                            <p style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '100%'
                            }}>{reward.title}</p>
                        </div>
                        <div className="col-xs-4">{reward.coin} coin</div>
                    </div>
                ))}

                {
                    <div className="row" style={{ marginTop: '2px', borderBottom: '1px solid #f3f3f3' }}>
                        
                    {isEmpty(myRewards) &&  !loader &&<div className="col-xs-12">
                            <p style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '100%',
                                height: 200,
                                marginTop: '30%',
                                fontWeight: 600,
                                textAlign:'center'
                            }}>No Reward Found Yet!</p>
                        </div>}
                        <div className="col-xs-4"></div>
                    </div>
                }

            </div>
        );
    }
};

export default MyRewards;
import React,{Fragment} from 'react';
import { Link } from 'react-router-dom';
import { isArray, isEmpty } from 'lodash';
import OwlCarousel from 'react-owl-carousel';
import axios from '../../../_config/axios';
import { RewardSimmer } from '../../../simmer-loader';

const RewardsSlider = () => {
    const [rewards, setRewards] = React.useState([]);

    React.useEffect(() => {
        axios.post('/getrewardslist').then(res => {
            if (res && res.data && res.data.success && res.data.success === 1) {
                if (res.data.reward_details && isArray(res.data.reward_details)) {
                    setRewards(res.data.reward_details);
                }
            }
        }).catch(err => {
            console.error(err);
        });
    }, []);

    return (
        <Fragment>
        {/* <div className="columns">
            <div className="column col-12 col-xs-12 pd-0">
                <div className="columns">
                    <div className="col-xs-7 pd-0">
                        <p><strong>Exclusive reward</strong></p>
                    </div>
                    <div className="col-xs-5 pd-0">
                        <Link to="/reward-all" className="pull-right text-small" style={{color:'#E7155D'}}>See All</Link>
                    </div>
                </div>
                {isEmpty(rewards) && <RewardSimmer />}
                {!isEmpty(rewards) && <OwlCarousel
                    className="owl-theme"
                    items={3}
                    margin={5}
                    lazyLoad={true}
                    lazyContent={true}
                    dots={false}
                >
                    {rewards.map((value, key) => (
                        <div className="item" key={key} >
                            <Link to={`/reward/${value.id}`}><img src={value.reward_image} width="80px" height="150px" /></Link>
                            <p className="title" width="50px" style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '100%'
                            }}>{value.title}</p>
                            
                        </div>
                    ))}
                </OwlCarousel>}
            </div>
        </div>
         */}
        </Fragment>
    );
}

export default RewardsSlider;
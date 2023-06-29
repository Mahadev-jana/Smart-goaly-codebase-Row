import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import { isAuthenticate } from '../../_helper/authentication';
import MyRewards from './my-rewards';
import NonCellularDataPopUup from '../../template/sidebar/sidebarNonCellularDataPopUp';
import Modal from 'react-responsive-modal';
class MyRewardComonent extends Component {
    constructor(props){
        super(props);
       
    }
    
    render() {
        // console.log(this.props.openPopup)
        return(
            <div className="columns">
                <div className="column col-12 col-xs-12 pd-0">
                    <div className="columns">
                        <div className="col-xs-12 pd-0">
                            {isAuthenticate()?
                                <MyRewards />
                            :
                            <Modal open={this.props.openPopup} onClose={this.props.onCloseModal} center>
                                <NonCellularDataPopUup onClose={this.props.onCloseModal}/>
                            </Modal>
                            
                            
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default MyRewardComonent;
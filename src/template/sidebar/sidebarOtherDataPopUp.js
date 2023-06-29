import React, { Component } from 'react';
import logo from '../../assets/img/goaly-logo.png';
import '../../assets/css/payment.css';

class otherDataPopUup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // displayList:'dropdown-menu',
            showItems: false
        }
    }
    showList = () => {
        this.setState(prevState => ({
            showItems: !prevState.showItems
        }))
    }
    render() {

        return (
            <div id="modal-payment" className="modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style={{ display: 'block', position: 'fixed' }}>
                <div className="modal-dialog modal-sm" role="document" style={{ marginTop: "50%" }}>
                    <div className="modal-content w-100" style={{ background: 'white' }}>
                        <div className="modal-header text-center p-1">
                            <img src={logo} width="80px" alt="" />
                        </div>
                        <div className="modal-body text-center">

                            <div id="direct-flow" className="slide" data-tag="direct-flow" style={{ display: 'block', padding: '15px' }}>
                                <h5><b>CHOOSE SUBSCRIBE</b></h5>
                                <div className="p-1" style={{ backgroundColor: "#e5e5e5" }}>subscribe daily to compete with others and earn prize</div>
                                <div className="dropdown mt-1">
                                    <button id="cycle-btn" class="btn btn-default btn-lg w-100 d-flex ais-center" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                        style={{ background: 'white' }} onClick={this.showList}>
                                        <span cycle>Daily Subscriptions</span>
                                        <span price style={{ paddingLeft: ' 89px' }}><b>Rp. 1500</b></span>
                                        <span className="caret"></span>
                                    </button>
                                    <ul className={this.state.showItems ? 'dropdown-menu show' : 'dropdown-menu'} aria-labelledby="cycle-btn" >
                                        <li>Daily Subscriptions <b>Rp. ....</b></li>
                                        <li>Weekly Subscriptions <b>Rp. ....</b></li>
                                        <li>Monthly Subscriptions <b>Rp. ....</b></li>
                                    </ul>
                                </div>
                                <button className="btn btn-success w-100 mt-1" style={{ backgroundColor: "#7cd327" }}><b>SUBSCRIBE</b></button>
                                <button className="btn btn-transparent w-100 mt-1" data-dismiss="modal" style={{ color: 'black' }} onClick={this.props.onClose}>CANCEL</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }

}
export default otherDataPopUup;
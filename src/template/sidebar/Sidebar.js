import React, { Component } from 'react';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { isAuthenticate } from '../../_helper/authentication';
import './sidebar.scss';
import Account from '../account';
import AccountUpdateUser from '../account/acount';
import Subscribe from '../../components/subscibe';
// import leaderboard from '../../assets/icon/icon-1.png';
// import reward from '../../assets/icon/icon-2.png';
import Modal from 'react-responsive-modal';
import OtherDataPopUup from './sidebarOtherDataPopUp';
import CellularWithMsisdnDataPopUp from './sidebarCellularMsisdnPopUp';
import NonCellularDataPopUup from './sidebarNonCellularDataPopUp';
import '../../assets/css/util.css';
import '../../assets/css/sidenav.css';
import login from '../../assets/img/sidenav/login.png';
import contest from '../../assets/img/sidenav/contest.png';
import reward from '../../assets/img/sidenav/reward.png';
import leaderboard from '../../assets/img/sidenav/leaderboard.png';
import winners from '../../assets/img/sidenav/winners.png';
import languageImg from '../../assets/img/sidenav/language.png'
import privacyImg from '../../assets/img/sidenav/privacy_icon.png';
import termImg from '../../assets/img/sidenav/term_icon.png';
import faq from '../../assets/img/sidenav/faq.png';
import axios from '../../_config/axios';


// const Sidebar = ({ open, closeSideBar }) => {
class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			info: {},
			msg1: 'true',
			msg2: 'false',
			userDetails: {},
            jwt: [],
			updateLogin:false,
		}
	}
	componentDidMount() {
		if( localStorage.getItem('msidnByUser')!==null){
            
			const  msisdnExist = (localStorage.getItem('msidnByUser'))
		  
			  // alert( msisdnExist)
					  const payload = new FormData();
					  payload.append('msisdn', msisdnExist);
					  axios.post('smartlogin', payload)
						  .then(res => {
							  console.log(res);
							  this.setState({
								//   loading:false,
								
								
								  userDetails: res.data.data.user_details,
								  jwt: res.data.data.JWT,
							  })
							  
							  localStorage.setItem('JWT', this.state.jwt);
							  localStorage.setItem('userDetails', JSON.stringify(this.state.userDetails));
							
							  this.setState({
								updateLogin:true,
							  })
							//   console.log('updatelogin')

						  }).catch(err => console.log(err));

						  
						  
				  
	   }

	}
	onOpenModal = () => {
		this.setState({ open: true });
	};

	onCloseModal = () => {
		this.setState({ open: false });
	};

	logout = () =>{
		
		localStorage.clear();
		window.location.href = "/";
		// this.setState({
		// 	updateLogin:false
		// })
		// location.reload();
	}
	render() {
		const { open, closeSideBar } = this.props;
		const language = { "en": "English", "id": "Indonesia", "ms": "Malaysia", "nl": "Deutch", 'km':'Khmer' };
		// alert(this.state.updateLogin)
		return (
			<>
				{localStorage.getItem('info') === null ?
					<Modal open={this.state.open} onClose={this.onCloseModal} center>
						<NonCellularDataPopUup 
						onClose={this.onCloseModal}
						 msg={this.state.msg1} />
					</Modal>
					:

					<Modal open={this.state.open} onClose={this.onCloseModal} center>
						<CellularWithMsisdnDataPopUp onClose={this.onCloseModal} />
					</Modal>}


				{/* <Subscribe show={show} handleClose={this.handleClose}/> */}
				{open && <div style={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: 'rgba(0,0,0,0.8)',
					zIndex: 1000
				}} onClick={closeSideBar}></div>}
				<nav className={classNames("sideNav", "bgImg2", { open: open })}>


					<div className="sidenav">
					{/* {console.log(this.state.updateLogin)} */}
					{this.state.updateLogin ===true ?
						<AccountUpdateUser onOpen={this.onOpenModal} closeSide={closeSideBar} msisdn={this.state.msisdn} msg={this.state.msg1} />
						 :
						<Account onOpen={this.onOpenModal} closeSide={closeSideBar} msisdn={this.state.msisdn} msg={this.state.msg2}/>
					 }
						<ul className="my-2">
						
							<NavLink to="/contest" onClick={closeSideBar} style={{ display: 'contents' }}>
								<li>{localStorage.getItem('userDetails')? <a ><img src={contest} alt="" /> Contest</a>
									:<a style={{paddingTop: '30px'}}><img src={contest} alt="" /> Contest</a>
								}</li><br />
							</NavLink>
							{/* <NavLink to='/reward' onClick={closeSideBar} style={{ display: 'contents' }}>
								<li><a ><img src={reward} alt="" /> Rewards</a></li><br />
							</NavLink> */}
							<NavLink to='/leaderboard' onClick={closeSideBar} style={{ display: 'contents' }}>
								<li><a ><img src={leaderboard} alt="" /> Leaderboard</a></li><br />
							</NavLink>
							<NavLink to='/winner' onClick={closeSideBar} style={{ display: 'contents' }}>
								<li><a > <img src={winners} alt="" />Winners</a></li><br />
							</NavLink>
							<NavLink to='/language' onClick={closeSideBar} style={{ display: 'contents' }}>
								<li><a ><img src={languageImg} alt="" /> Language <span id="language">
								{language[selectedLanguage()]}
								</span></a></li><br />
							</NavLink>
							<NavLink to='/faq' onClick={closeSideBar} style={{ display: 'contents' }}>
								<li><a ><img src={faq} alt="" /> FAQ</a></li><br />
							</NavLink>
							<NavLink to='/privacy' onClick={closeSideBar} style={{ display: 'contents' }}>
								<li><a ><img src={privacyImg} alt="" /> Privacy policy</a></li><br />
							</NavLink>
							<NavLink to='/service' onClick={closeSideBar} style={{ display: 'contents' }}>
								<li><a ><img src={termImg} alt="" /> Terms of Service</a></li>
							</NavLink>
							{localStorage.getItem('userDetails') &&
							<NavLink to='' onClick={closeSideBar} style={{ display: 'contents' }}>
							
								<li style={{ paddingTop: '15px' }}
								 onClick={this.logout}>
								 <a><img src={login} alt="" /> Logout</a></li>
							
								<br/>
							
							</NavLink>
						}
						</ul>
					</div>

				</nav>
			</>
		);
	}
}

export default Sidebar;

const selectedLanguage = () => {
	var name = 'googtrans';
	var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	if (match) return match[2].split('/')[2];
	return 'en';
}




{/* <div className="list-block mt-15">
							<div className="list-group">
								<nav>
									<div className="list-block">
										<ul>
											<li className="divider" style={{ marginBottom: '6px' }}>Menu Test</li>
											<li>
												{isAuthenticate() ?
													<NavLink exact to='/' className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
														<div className="item-media"><i className="fa fa-home"></i></div>
														<div className="item-inner">
															<div className="item-title">Home</div>
														</div>
													</NavLink>
													:
													<NavLink to='/login' className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
														<div className="item-media"><i className="fa fa-sign-in"></i></div>
														<div className="item-inner">
															<div className="item-title">Login </div>
														</div>
													</NavLink>
												}
											</li>
											<li>
												<NavLink to="/contest" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
													<div className="item-media"><i className="fa fa-bookmark"></i></div>
													<div className="item-inner">
														<div className="item-title">Contest</div>
													</div>
												</NavLink>
											</li>
											<li>
												<NavLink to="/reward" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
													<div className="item-media">
														{/* <i className="fa fa-trophy"></i> */}
											// 			<img src={reward} style={{ height: 15 }} />

											// 		</div>
											// 		<div className="item-inner">
											// 			<div className="item-title">Rewards </div>
											// 		</div>
											// 	</NavLink>
											// </li>
											// <li>
											// 	<NavLink to="/leaderboard" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
											// 		<div className="item-media">
											// 			<img src={leaderboard} style={{ height: 15 }} />
											// 			{/* <i className="fa fa-trophy"></i> */}
											// 		</div>
											// 		<div className="item-inner">
											// 			<div className="item-title">Leaderboard</div>
											// 		</div>
											// 	</NavLink>
											// </li>

					// 						<li>
					// 							<NavLink to="/winner" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
					// 								<div className="item-media"><i className="fa fa-trophy"></i></div>
					// 								<div className="item-inner">
					// 									<div className="item-title">Winners</div>
					// 								</div>
					// 							</NavLink>
					// 						</li>

					// 						<li>
					// 							<NavLink to="/language" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
					// 								<div className="item-media">
					// 									<i className="fa fa-globe"></i>
					// 								</div>
					// 								<div className="item-inner">
					// 									<div className="item-title">Language</div>
					// 									<div className="item-after">{language[selectedLanguage()]}</div>
					// 								</div>
					// 							</NavLink>
					// 						</li>
					// 						<li>
					// 							{isAuthenticate() &&
					// 								<Link to='/logout' className="item-link close-panel item-content" onClick={closeSideBar}>
					// 									<div className="item-media"><i className="fa fa-sign-out"></i></div>
					// 									<div className="item-inner">
					// 										<div className="item-title">Logout</div>
					// 									</div>
					// 								</Link>}
					// 						</li>
					// 						<li className="divider" style={{
					// 							marginTop: '10px',
					// 							marginBottom: '10px'
					// 						}}></li>
					// 						<li>
					// 							<NavLink to="/faq" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
					// 								<div className="item-media"><i className="fa fa-question-circle"></i></div>
					// 								<div className="item-inner">
					// 									<div className="item-title">FAQ</div>
					// 								</div>
					// 							</NavLink>
					// 						</li>
					// 						<li>
					// 							<NavLink to="/privacy" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
					// 								<div className="item-media"><i className="fa fa-question-circle"></i></div>
					// 								<div className="item-inner">
					// 									<div className="item-title">Privacy Policy</div>
					// 								</div>
					// 							</NavLink>
					// 						</li>
					// 						<li>
					// 							<NavLink to="/service" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
					// 								<div className="item-media"><i className="fa fa-question-circle"></i></div>
					// 								<div className="item-inner">
					// 									<div className="item-title">Terms of Service</div>
					// 								</div>
					// 							</NavLink>
					// 						</li>
					// 						<li className="divider" style={{
					// 							marginTop: '10px',
					// 							marginBottom: '10px'
					// 						}}></li>
					// 						<li>
					// 							<a className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={() => true}>
					// 								<div className="item-media"><i className="fa fa-question-circle"></i></div>
					// 								<div className="item-inner"
					// 									onClick={this.onOpenModal}
					// 								>
					// 									<div className="item-title">Subscribe test1</div>
					// 								</div>
					// 							</a>
					// 						</li>
					// 					</ul>
					// 				</div>
					// 			</nav>
					// 		</div>
					// 	</div>
					// </div> */}
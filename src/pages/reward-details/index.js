import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { post, authPost } from '../../api';
import { isAuthenticate } from '../../_helper/authentication';
import Swal from 'sweetalert2';
import { RewardDetailsSimmer } from '../../simmer-loader';
import Modal from 'react-responsive-modal';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';
import NonCellularDataPopUup from '../../template/sidebar/sidebarNonCellularDataPopUp';


class RewardDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rewardDetail: {},
			loading: false,
			noDataFound: false,
			openPopup: false
		}
	}
	componentDidMount() {
		this.setState({ loading: true });
		const id = this.props.match.params.id;
		console.log({ id });
		const payload = new FormData();
		payload.append('reward_id', id);
		post('getrewardbyid', payload)
			.then(res => {
				console.log(res);
				if (res.data.success)
					this.setState({
						rewardDetail: res.data.each_reward,
						loading: false
					});
				else
					this.setState({
						loading: false,
						noDataFound: true
					})
			})
			.catch(err => console.log(err));
	}
	buyReward = () => {
		console.log('buy')
		if (isAuthenticate()) {
			console.log('buy reward');
			const id = this.props.match.params.id;
			const payload = new FormData();
			payload.append('reward_id', id)
			authPost('buyreward', payload)
				.then(res => {
					console.log(res);
					if (res.data.success == 1) {
						Swal.fire({
							type: 'success',
							title: res.data.message
						})
					}
					if (res.data.success == 0) {
						Swal.fire({
							type: 'warning',
							title: res.data.message
						})
					}
				})
				.catch(err => console.log(err));
		} else {
			// this.props.history.push({pathname: '/login', state: {
			// 	path: `/reward/${this.props.match.params.id}`
			// }})
			this.setState({ openPopup: true })
		}
	}
	onCloseModal = () => {
		this.setState({ openPopup: false })
	}
	render() {
		const { rewardDetail } = this.state;
		return (
			<React.Fragment>

				{/* <Helmet>
					<title>Goaly | Reward Details</title>
					<link rel="icon" type="image/png" href={icon} sizes="20x20" />

				</Helmet> */}
				<div className="page-content mt-10">
					<Modal open={this.state.openPopup} onClose={this.onCloseModal} center>
						<NonCellularDataPopUup onClose={this.onCloseModal} />
					</Modal>
					<div className="col-xs-12 ct">
						<div className="mb-10">
							<div className="part ml15">
								<div className="series-title-black">
									<a onClick={() => this.props.history.goBack()} className="text-white">back</a>
								</div>
							</div>
							{this.state.loading && <RewardDetailsSimmer />}
							{this.state.noDataFound && <div style={{
								display: 'flex',
								height: '360px',
								alignItems: 'center',
								justifyContent: 'center'
							}}>
								<div style={{
									color: 'red',
									fontSize: '15px',
									letterSpacing: '1px'
								}}>No Reward Found!</div>
							</div>}
							{Boolean(Object.keys(rewardDetail).length) && <div className="pd-0">
								<div className="columns pt-15">
									<div style={{ width: '100%', textAlign: 'center' }}>
										<img src={rewardDetail.banner_image}
											style={{
												maxHeight: '200px',
												width: '100%',
												objectFit: 'cover',
												objectPosition: 'center'
											}} />
									</div>
								</div>
								<div className="columns">
									<div className="column col-xs-8">
										<h5 className="mt-10">{rewardDetail.title}</h5>
										<div className="info-game-rating">
											<span className="info-game-rating">
												<i className="icon icon-star fill"></i>
												<i className="icon icon-star fill"></i>
												<i className="icon icon-star fill"></i>
												<i className="icon icon-star fill"></i>
												<i className="icon icon-star"></i>
											</span>
										</div>
									</div>
									{/* <div className="column col-xs-4"> */}
										{/* <p className="price" onClick={() => this.buyReward()}>Redeem</p> */}
										{/* <p className="text-right" style={{  }}><strong>{rewardDetail.coin} Coin</strong></p> */}
									{/* </div> */}
								</div>
								<div className="liner"></div>
								<div className="columns m-5">
									{/* {rewardDetail.description} */}
									Win exclusive rewards by join in our competition 
								</div>
							</div>}
						</div>
					</div>
					<div className="ct"></div>
				</div>
			</React.Fragment>
		);
	}
};

export default withRouter(RewardDetails);
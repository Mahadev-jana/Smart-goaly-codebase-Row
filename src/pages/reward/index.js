import React from 'react';
import classnames from 'classnames';
import { Row, Col } from 'react-bootstrap';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';
import RewardBanner from './RewardBanner';
import RewardsSlider from './tabs/RewardsSlider';
import MyRewardComponent from './my-reward-component';

const Reward = () => {
	const [tab, setTab] = React.useState(0);
	const [openPopup, setOpenPopup] = React.useState(true);

	const onCloseModal = () => setOpenPopup(false);
	const setTabMethod = () => { setOpenPopup(true), setTab(1) }
	return (
		<React.Fragment>
			{/* <Helmet>
				<title> Goaly | Reward </title>
				<link rel="icon" type="image/png" href={icon} sizes="20x20" />
			</Helmet> */}
			<Row className="mt-5">
				<Col xs={12} className="ct" >
					<div className="mb-10" >
						<div className="part ml15" >
							<div className="series-title-black">Reward</div>
						</div>
						<RewardBanner />
						<div className="">
							<div className="btn-pref btn-group btn-group-justified btn-group-lg">
								<div className="btn-group" role="group">
									<button className={
										classnames(
											"btn",
											"btn-default",
											{
												"bg-3": Boolean(tab === 0)
											}
										)
									} onClick={() => setTab(0)}>Reward</button>
								</div>
								{/* <div className="btn-group">
									<button className={
										classnames(
											"btn",
											"btn-default",
											{
												"bg-3": Boolean(tab === 1)
											}
										)
									} onClick={setTabMethod}>My Reward</button>
								</div> */}
							</div>
							<div className="pd-5">
								{Boolean(tab === 0) && <RewardsSlider />}
								{Boolean(tab === 1) && <MyRewardComponent openPopup={openPopup} onCloseModal={onCloseModal} />}
							</div>
						</div>
					</div>
				</Col>
			</Row>

		</React.Fragment>
	);
}

export default Reward;



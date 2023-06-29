import React, { Component, Fragment } from 'react';
import { Redirect, withRouter, Link, NavLink } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { post, authPost } from '../../api';
import { isAuthenticate } from '../../_helper/authentication';
import MenuCategory from '../../components/menu-category';
import classnames from 'classnames';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';
import QuestionType1 from './QuestionType1';
import QuestionType2 from './QuestionType2';
import QuestionType3 from './QuestionType3';
import Moment from 'react-moment';
import { isArray, isEmpty } from 'lodash';
import Prediction  from '../match-details/tabs/predictions';
import LastMatch from './LastMatch';
import HeadToHead from './HeadToHead';

class ScorePrediction extends Component {
	constructor(props) {
		super(props);
		this.state = {
			prediction: {},
			questionIndex: 0,
			answerList: [],
			homeTeam: 0,
			awayTeam: 0,
			homeTeamLogo: '',
			awayteamLogo: '',
			tab: 0,
			matchDetails: {},
			matchId:0
		}
	}

	componentDidMount() {
		const payload = new FormData();
		payload.append('id', this.props.match.params.id);
		post('getpredictiongames', payload)
			.then(res => {
				this.setState({ matchId: res.data.prediction.match_id });
				this.setState({ prediction: res.data.prediction });
				this.setState({ homeTeam: res.data.prediction.homeTeam.id });
				this.setState({ awayTeam: res.data.prediction.awayTeam.id });
				this.setState({ homeTeamLogo: res.data.prediction.homeTeam.logo });
				this.setState({ awayteamLogo: res.data.prediction.awayTeam.logo });
				this.getPredictionList();
			})
			.catch(err => console.log(err));
	}


	getPredictionList = () => {
		console.log(this.state)
        const payload = new FormData();
        payload.append('id',this.state.matchId);
        post('getMatchDetailsByIdNew', payload)
            .then(res => {
                if (res.data.success === 1) {
                    if (res.data.match_details.length) {
                        const matchDetails = res.data.match_details[0];
                        this.setState({ matchDetails });
						console.log(res.data.match_details[0].status)
						if(res.data.match_details[0].status !== "NS") {
							Swal.fire({
								type:'error',
								title: 'The prediction time for this match has expired!',
								allowOutsideClick: false,
							}).then((result) => {
								this.props.history.push('/')
							})
						}
                    }
                }
            })
            .catch(err => console.log(err));
    }


	setTab = tab => {
		this.setState({ tab });
	}


	changeQusetion = (questionIndex, answer, homeLogo, awayLogo) => {
		const { prediction, answerList } = this.state;
		answerList.push({
			predictionId: prediction.id,
			questionId: prediction.questions[questionIndex - 1].id,
			question: prediction.questions[questionIndex - 1].text,
			answer,
			homelogo: homeLogo,
			awaylogo: awayLogo
		});
		if (questionIndex === prediction.questions.length)
			this.submitQuiz(answerList);
		this.setState({ questionIndex, answerList });
	}
	submitQuiz = answerList => {
		const userDetails = JSON.parse(localStorage.getItem('userDetails'));
		console.log(userDetails.id);
		if(userDetails.id!==null){
			delete answerList['question'];
		const payload = new FormData();
		payload.append('answers', JSON.stringify(answerList))
		payload.append('homeTeam', this.state.homeTeam);
		payload.append('awayTeam', this.state.awayTeam);
		payload.append('pred_id', this.state.prediction.id);
		payload.append('user_id', userDetails.id);
		payload.append('msisdn', userDetails.msisdn);

		authPost('setsubmitprediction', payload)
			.then(res => console.log(res))
			.catch(err => console.log(err));
		}
		
	}
	render() {
		const { prediction, questionIndex, answerList, homeTeamLogo, awayteamLogo, tab,matchDetails  } = this.state;

		return (
			<Fragment>
			{/* <Helmet>
            <title>Goaly | Score Prediction</title>
				<link rel="icon" type="image/png" href={icon} sizes="20x20" />
		
        </Helmet> */}
				<MenuCategory />

				<Row>
					{Boolean(Object.keys(prediction).length) && ((prediction.questions).length >= questionIndex + 1) && <>
						{Boolean(prediction.questions[questionIndex].type == 1) &&
							<QuestionType1
								questionNo={questionIndex + 1}
								homeTeam={prediction.homeTeam}
								awayTeam={prediction.awayTeam}
								banner={prediction.banner}
								question={prediction.questions[questionIndex]}
								startDate={prediction.start_date}
								changeQusetion={this.changeQusetion}
							/>}

						{Boolean(prediction.questions[questionIndex].type == 2 || prediction.questions[questionIndex].type == 3) && <QuestionType2
							questionNo={questionIndex + 1}
							homeTeam={prediction.homeTeam}
							awayTeam={prediction.awayTeam}
							banner={prediction.banner}
							question={prediction.questions[questionIndex]}
							startDate={prediction.start_date}
							changeQusetion={this.changeQusetion}
						/>}
						{/* {Boolean(prediction.questions[questionIndex].type == 3) && <QuestionType3
							questionNo={questionIndex + 1}
							homeTeam={prediction.homeTeam}
							awayTeam={prediction.awayTeam}
							banner={prediction.banner}
							question={prediction.questions[questionIndex]}
							startDate={prediction.start_date}
							changeQusetion={this.changeQusetion}
						/>} */}
					</>}
					{Boolean(Object.keys(prediction).length) && ((prediction.questions).length < questionIndex + 1) &&
						<PredictionQuestionsAnswer answerList={answerList} />}

					<div className="col-xs-12 main-cat lm" style={{ paddingTop: '10px', paddingBottom: '10px', marginBottom: '1px' }}>
						<ul className="btn-new">
							<li><a onClick={() => this.setTab(0)} className={classnames({ 'active': Boolean(tab === 0) })}>Head To Head</a></li>
							<li><a onClick={() => this.setTab(1)} className={classnames({ 'active': Boolean(tab === 1) })}>Prediction</a></li>
						</ul>
					</div>

					{Boolean(Object.keys(prediction).length >= questionIndex + 1) && <>
						{tab==0 && <HeadToHead homeTeam={prediction.homeTeam.id} awayTeam={prediction.awayTeam.id} />}
						{tab==0 &&<LastMatch teamName={prediction.homeTeam.name} homeTeam={prediction.homeTeam.id} awayTeam={prediction.awayTeam.id} />}
					</>}
					
				 {tab==1  && !!matchDetails && !isEmpty(matchDetails) && matchDetails.predictions && 
				 <Prediction homeTeam={this.state.homeTeam} 
				 awayTeam={this.state.awayTeam} 
				 prediction={matchDetails.predictions} />}

					
				</Row>
			</Fragment>
		)
	}
};

export default withRouter(ScorePrediction);

const PredictionQuestionsAnswer = ({ answerList }) => {

	return (
		<div className="col-xs-12 lm ct">
			<div className="col-xs-12 pd-0">
				<h2>Answer Review</h2>
			</div>
			<div className="hr"></div>
			<div className="col-xs-12 bg-grey mb-10">
				<h1 className="text-center m-0"><strong>Thank You</strong></h1>
				<p><strong>Your Answer</strong></p>
				{answerList && answerList.map((data, key) => (
					<React.Fragment key={key}>
						<p>{key + 1}. {data.question}</p>
						<h4><em style={{ marginLeft: 20 }}>
							{data.homelogo && data.awaylogo && <img src={data.homelogo} style={{ height: 25, width: 25 }} />}
							{data.homelogo && data.awaylogo == undefined && <img src={data.homelogo} style={{ height: 25, width: 25 }} />}
							{data.homelogo == undefined && data.awaylogo && <img src={data.awaylogo} style={{ height: 25, width: 25 }} />}
							<strong>{data.answer}</strong>
							{data.homelogo && data.awaylogo && <img src={data.awaylogo} style={{ height: 25, width: 25 }} />}
						</em></h4>
					</React.Fragment>
				))}
			</div>
			<div className="clearfix"></div>
			<div className="col-xs-4 pd-0">
				<Link to="/" className="btn btn-primary btn-ct black">Back Home</Link>
			</div>
			<div className="col-xs-4 pd-0">
				<Link to="/contest" className="btn btn-primary btn-ct cyan">Start Another</Link>
			</div>
			<div className="col-xs-4 pd-0">
				<a className="btn btn-primary btn-ct bg-orange">Next Question</a>
			</div>
		</div>
	)
};
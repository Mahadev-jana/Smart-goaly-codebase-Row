import React from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { isAuthenticate } from '../../_helper/authentication';
import { dateTimeFomat } from '../../_helper/date-format';
import Moment from 'react-moment';

const winPoints = {
	textAlign: 'right',
	float: 'right',
	fontSize: '16px',
};

class QuestionType2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			score: ''
		}
	}

	componentWillReceiveProps(prevState, nextState) {
		this.setState({ score: '' })
		document.getElementById("focus").focus();
	}
	onHandleChange = prop => event => {
		this.setState({ [prop]: event.target.value });
	}
	onSubmit = (questionNo, homeLogo, awayLogo) => {
		const { score } = this.state;
		if (isAuthenticate()) {
			if (score.trim() === '') {
				Swal.fire({
					type: 'warning',
					title: 'Enter your answer first!!'
				});
			} else {
				if (score == 1 || score == 2 || score == 3) {
					if (score == 1) {
						this.props.changeQusetion(questionNo, score, homeLogo);
					}
					if (score == 2) {
						this.props.changeQusetion(questionNo, score, awayLogo);
					}
					if (score == 3) {
						this.props.changeQusetion(questionNo, score);

					}
				}
				else {
					Swal.fire({
						type: 'warning',
						title: 'Please enter valid option (1 or 2 or 3)'
					});
				}
			}
		} else {
			Swal.fire({
				type: 'warning',
				title: 'Please login first to submit your prediction!!'
			});
		}
	}
	render() {
		const { questionNo, homeTeam, awayTeam, banner, question, startDate, changeQusetion } = this.props;
		return (
			<div className="col-xs-12 lm ct" style={{ paddingTop: '55px' }}>
				<h2 className="text-left" style={{ color: 'black' }}><p style={winPoints}>Points Win:{question.reward}</p></h2>
				<div className="hr"></div>
				<div style={{
					position: 'relative'
				}}>
					<div style={{
						position: 'absolute',
						top: 0,
						bottom: 0,
						left: 0,
						right: 'auto',
						width: '50%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						<img src={homeTeam.logo} alt="" style={{ height: '60%' }} onClick={() => this.props.history.push(`/my-team/${homeTeam.id}`)} />
					</div>
					<div style={{
						position: 'absolute',
						top: 0,
						bottom: 0,
						left: 'auto',
						right: 0,
						width: '50%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						<img src={awayTeam.logo} alt="" style={{ height: '60%' }} onClick={() => this.props.history.push(`/my-team/${awayTeam.id}`)} />
					</div>
					<div style={{
						position: 'absolute',
						color: '#fff',
						top: '5px',
						right: '5px',
						background: 'rgba(0, 0, 0, 0.5)',
						padding: '5px 10px',
						border: '1px solid #fff',
						borderRadius: '3px',
						fontSize: '11px'
					}}><Moment format="ddd, DD/MM">{startDate}</Moment></div>
					<img src={banner} style={{
						height: '200px',
						width: '100%',
						objectFit: 'cover',
						objectPosition: 'center'
					}} />
				</div>
				<h2 className="ct-title" style={{ color: 'black', margin: 10 }}><strong>{questionNo}. </strong> {question.text}</h2>

				<div className="hr"></div>
				<div className="clearfix"></div>
				<div className="col-xs-12 text-center mb-10" style={{ marginTop: '-10px' }}>
					<div className="col-xs-4 pd-0 mt-5">
						<div className="btn btn-default">1</div>
						<img src={homeTeam.logo} alt="" style={{ width: '25%' }} />
					</div>
					<div className="col-xs-4 pd-0 mt-5">
						<div className="btn btn-default">2</div>
						<img src={awayTeam.logo} alt="" style={{ width: '25%' }} />
					</div>
					<div className="col-xs-4 pd-0 mt-5">
						<div className="btn btn-default">3</div>Neither
				</div>
					<h4 className="tl">Your answer</h4>
					<input
						id="focus"
						type="number"
						className="ct-input-scr"
						value={this.state.score}
						autoFocus
						onChange={this.onHandleChange('score')}
					/>
				</div>
				<div className="col-xs-12" style={{ textAlign: 'center' }}>
					<button
						type="button"
						className="btn btn-primary btn-ct black"
						onClick={() => this.onSubmit(questionNo, homeTeam.logo, awayTeam.logo)}
					>Submit Answer {questionNo}</button>
				</div>
			</div>
		);
	}
}

export default withRouter(QuestionType2);
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

class QuestionType1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			score1: '',
			score2: ''
		}
	}
	onHandleChange = prop => event => {
		this.setState({ [prop]: event.target.value });
	}
	onSubmit = (questionNo,homeLogo,awayLogo) => {
		const { score1, score2 } = this.state;
		if (isAuthenticate()) {
			if (score1.trim() === '' || score2.trim() === '') {
				Swal.fire({
					type: 'warning',
					title: 'All field are required!'
				});
			} else {
				this.props.changeQusetion(questionNo, `${score1} : ${score2}`,homeLogo,awayLogo);
			}
		} else {
			Swal.fire({
				title: 'Please login first to submit your prediction!!',
				type: 'warning',
				confirmButtonText: 'OK'
			})
			// .then((result) => {
			// 	if (result.value) {
			// 		this.props.history.push('/login');
			// 	}
			// });
		}
	}
	render() {
		const { questionNo, homeTeam, awayTeam, banner, question, startDate, changeQusetion } = this.props;
		return (
			<div className="col-xs-12 lm ct" style={{paddingTop:'55px'}}>
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
				<div className="col-xs-6 scrL">
					<img src={homeTeam.logo} alt="" onClick={() => this.props.history.push(`/my-team/${homeTeam.id}`)} />
					<input
						type="number"
						className="ct-input-scr"
						onChange={this.onHandleChange('score1')}
						// autoFocus
					/>
					<span>&nbsp;</span>
					<br />
					<h4 className="tl">{homeTeam.name}</h4>
					<p className="marcatori-partita">&nbsp; </p>
				</div>
				<div className="col-xs-6 scrR">
					<span>&nbsp;</span>
					<input
						type="number"
						className="ct-input-scr"
						onChange={this.onHandleChange('score2')}
					/>
					<img src={awayTeam.logo} alt="" onClick={() => this.props.history.push(`/my-team/${awayTeam.id}`)} />
					<br />
					<h4 className="tl">{awayTeam.name}</h4>
					<p className="marcatori-partita">&nbsp; </p>
				</div>
				<div className="clearfix"></div>
				<div className="col-xs-12" style={{ textAlign: 'center' }}>
					<button
						type="button"
						className="btn btn-primary btn-ct black"
						onClick={() => this.onSubmit(questionNo,homeTeam.logo,awayTeam.logo)}
					>Submit Answer {questionNo}</button>
				</div>
			</div>
		);
	}
};

export default withRouter(QuestionType1);
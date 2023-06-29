import React, { useState } from 'react';
import logo from '../../assets/img/goaly-logo.png';
import Loader from '../../simmer-loader/SubmitLoader';
import axios from '../../_config/axios';
import Swal from 'sweetalert2';

const PutUsernamePopup = (props) => {

    const [nameErr, setNameErr] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [state, setState] = React.useState({
        firstName: "",
        lastName: ""
    })


    const handleChangeUsername = (e) => {
        const value = e.target.value;
        setNameErr('');
        setState({
            ...state,
            [e.target.name]: value
        });
    }
    const submitUsername = e => {

        const { first_name, last_name, msisdn } = props;
        console.log(state.firstName.length, state.lastName.length)
        const { firstName, lastName } = state;
        // e.preventDefault();
        if ((first_name.length === 0 && last_name.length === 0) && (firstName.length === 0 || lastName.length === 0)) {
            setNameErr('Fields must not be empty');
            // console.log(first_name, last_name )
            // console.log(firstName,lastName);
            // alert('firstname and last name both needed')
        }
        else if (first_name.length !== 0 && lastName.length === 0) {
            setNameErr('Fields must not be empty');
            // console.log(first_name, last_name );
            // console.log(firstName,lastName);
            // alert('last name needed')
        }
        else if (last_name.length !== 0 && firstName.length === 0) {

            setNameErr('Fields must not be empty');
            // console.log(first_name, last_name )
            // console.log(firstName,lastName);
            // alert('first name needed');
        }

        else {
            // alert('all name got')
            setNameErr('');
            // console.log(msisdn,'msisdn');
            setIsLoading(true);
            if (first_name.length === 0 && last_name.length === 0) {

                // console.log(firstName, lastName )
                const payload = new FormData();
                payload.append('msisdn', msisdn);
                payload.append('first_name', firstName);
                payload.append('last_name', lastName);
                axios.post('/userFirstAndLastName', payload).then(res => {

                    if (res.data && res.data.success && res.data.error == 0 && res.data.status == 200) {
                        localStorage.setItem('userDetails', JSON.stringify(res.data.user_details));
                        setIsLoading(false);
                        window.location.reload();
                        props.onClose();
                    }
                    else if (res.data && res.data.success == 0 && res.data.error == 1) {
                        Swal.fire({
                            type: 'warning',
                            title: 'User name not updated',
                            allowOutsideClick: false,
                            showCancelButton: true,
                        })
                    }

                }).catch(err => {
                    console.log({ err })
                })

            }
            if (first_name.length === 0 && last_name.length !== 0) {
                // console.log(firstName, last_name )
                const payload = new FormData();
                payload.append('msisdn', msisdn);
                payload.append('first_name', firstName);
                payload.append('last_name', last_name);
                axios.post('/userFirstAndLastName', payload).then(res => {
                    if (res.data && res.data.success && res.data.error == 0 && res.data.status == 200) {
                        localStorage.setItem('userDetails', JSON.stringify(res.data.user_details));
                        setIsLoading(false);
                        window.location.reload();
                        props.onClose();
                    }
                    else if (res.data && res.data.success == 0 && res.data.error == 1) {
                        Swal.fire({
                            type: 'warning',
                            title: 'User name not updated',
                            allowOutsideClick: false,
                            showCancelButton: true,
                        })
                    }
                }).catch(err => {
                    console.log({ err })
                })
            }
            if (first_name.length !== 0 && last_name.length === 0) {
                // console.log(first_name, lastName );
                const payload = new FormData();
                payload.append('msisdn', msisdn);
                payload.append('first_name', first_name);
                payload.append('last_name', lastName);
                axios.post('/userFirstAndLastName', payload).then(res => {
                    if (res.data && res.data.success && res.data.error == 0 && res.data.status == 200) {
                        localStorage.setItem('userDetails', JSON.stringify(res.data.user_details));
                        setIsLoading(false);
                        window.location.reload();
                        props.onClose();
                    }
                    else if (res.data && res.data.success == 0 && res.data.error == 1) {
                        Swal.fire({
                            type: 'warning',
                            title: 'User name not updated',
                            allowOutsideClick: false,
                            showCancelButton: true,
                        })
                    }
                }).catch(err => {
                    console.log({ err })
                })
            }
        }


    }
    const { first_name, last_name } = props;
    // console.log(first_name, last_name);
    return (
        <React.Fragment>
            {isLoading && <Loader />}


            <div id="modal-payment" className="modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style={{ display: 'block', position: 'fixed' }}>
                <div className="modal-dialog modal-sm" role="document" style={{ marginTop: "50%" }}>
                    <div className="modal-content w-100" style={{ background: 'white' }}>
                        <div className="modal-header text-center p-1">
                            <img src={logo} width="80px" alt="" />
                        </div>
                        <div id="otp-flow" className="slide" data-tag="otp-flow" style={{ display: 'block', padding: '15px' }}>
                            {first_name.length === 0 && last_name.length !== 0 &&
                                <div className="input-control active">
                                    <h5 className="mb-2 w-100">Please insert your First Name</h5>
                                    <div className="d-flex">
                                        <input className="form-control" name='firstName'
                                            onChange={handleChangeUsername}
                                        />



                                    </div>
                                    <div className="input-control active" >



                                        <button className="btn btn-success send-number w-100 mt-1" style={{ backgroundColor: "#0F7B30" }}
                                            onClick={(e) => submitUsername(e)}
                                        ><b>SEND</b></button>

                                        <button className="btn btn-transparent w-100 mt-1" data-dismiss="modal" style={{ color: 'black' }}
                                            onClick={props.onClose}
                                        >CANCEL</button>
                                        <div style={{ color: 'red' }}>{nameErr}</div>
                                    </div>
                                </div>
                            }

                            {first_name.length !== 0 && last_name.length === 0 &&
                                <div className="input-control active">

                                    <div className="input-control active" >
                                        <h5 className="mb-2 w-100">Please insert your Last Name</h5>
                                        <div className="d-flex">
                                            <input className="form-control" name='lastName'
                                                onChange={handleChangeUsername}
                                            />
                                        </div>

                                        <button className="btn btn-success send-number w-100 mt-1" style={{ backgroundColor: "#0F7B30" }}
                                            onClick={(e) => submitUsername(e)}
                                        ><b>SEND</b></button>

                                        <button className="btn btn-transparent w-100 mt-1" data-dismiss="modal" style={{ color: 'black' }}
                                            onClick={props.onClose}
                                        >CANCEL</button>
                                        <div style={{ color: 'red' }}>{nameErr}</div>
                                    </div>
                                </div>
                            }

                            {(first_name.length === 0 && last_name.length === 0) &&
                                <div className="input-control active">
                                    <h5 className="mb-2 w-100">Please insert your First Name</h5>
                                    <div className="d-flex">
                                        <input className="form-control" name='firstName'
                                            onChange={handleChangeUsername}
                                        />



                                    </div>
                                    <div className="input-control active" >
                                        <h5 className="mb-2 w-100">Please insert your Last Name</h5>
                                        <div className="d-flex">
                                            <input className="form-control" name='lastName'
                                                onChange={handleChangeUsername}
                                            />
                                        </div>

                                        <button className="btn btn-success send-number w-100 mt-1" style={{ backgroundColor: "#0F7B30" }}
                                            onClick={(e) => submitUsername(e)}
                                        ><b>SEND</b></button>

                                        <button className="btn btn-transparent w-100 mt-1" data-dismiss="modal" style={{ color: 'black' }}
                                            onClick={props.onClose}
                                        >CANCEL</button>
                                        <div style={{ color: 'red' }}>{nameErr}</div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>


                </div>
            </div>
        </React.Fragment>
    )
}
export default PutUsernamePopup;
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'rc-collapse/assets/index.css';
import { isArray } from 'lodash';
import Collapse, { Panel } from 'rc-collapse';
import axios from '../../../_config/axios';
import FavoriteClubModal from './FavoriteClubModal';
import DeleteFavoriteClubModal from './DeleteFavouriteClubsModal';

import { isAuthenticate } from '../../../_helper/authentication';
import { Row, Col, Image } from 'react-bootstrap';
import imgAddClub from '../../../assets/img/tm-add.png';
import Modal from 'react-responsive-modal';
import imgDeleteClub from '../../../assets/img/tm-delete.png';
import NonCellularDataPopUup from '../../../template/sidebar/sidebarNonCellularDataPopUp';
class AddFavoriteClub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDeleteModal: false,
            clubs: [],
            openDeleteModal: false,
            open: false,
            show: false,
            openPopup: false,
            isActive: false

        }
    }
    componentDidMount() {
        this.getClub();
    }
    getClub = () => {
        const payload = new FormData();
        // console.log(payload)
        const userdetails = JSON.parse(localStorage.getItem('userDetails'));
        // payload.append('user_id', (userdetails.id));
        if (userdetails) {
            payload.append('user_id', userdetails.id);
            axios({
                method: 'post',
                url: 'clubTeam',

                headers: {
                    'JWT': localStorage.getItem('JWT'),
                },
                data: payload
            }).then(res => {
                // console.log(res)
                if (res.data && res.data.success && res.data.success == 1) {
                    if (res.data.favteams && isArray(res.data.favteams)) {
                        // setClubs(res.data.favteams);
                        this.setState({
                            clubs: res.data.favteams
                        })

                    }
                }
            }).catch(err => {
                console.log({ err })
            })
        }
        else {

        }
    }
    onClick = () => {
        this.setState({
            openPopup: true
        })
    }
    expandIcon = ({isActive}) => {

        return (


            <i style={{ marginRight: '1rem', position: 'absolute', right: '0px', fontSize: '24px', color: '#0f7b30' }}>
            {isActive ? `-` : `+`}
        </i>

        );

    }
    iconChange = () => {
        this.setState(prevState => ({
            isActive: !prevState.isActive
        }))
    }
    openModal = () => {
        this.getClub();
        this.setState({
            open: true
        })
    }

    closeModal = () => {
        this.getClub();
        this.setState({
            open: false,
            openDeleteModal: false
        })

    }
    onCloseModal = () => {
        this.setState({ openPopup: false });
    };
    render() {
        const isLoggedIn = isAuthenticate();
        console.log(isLoggedIn)
        console.log(this.state.clubs);
        return (
            <div>{isLoggedIn && <React.Fragment>
                <Modal open={this.state.open} onClose={this.closeModal} center styles={{
                    modal: {
                        height: '100%',
                        width: '100%',
                        padding: 0,
                        overflow: 'auto'

                    }
                }}>
                    {<FavoriteClubModal closeModal={this.closeModal} />}
                </Modal>

                <Modal open={this.state.openDeleteModal} onClose={this.closeModal} center styles={{
                    modal: {
                        height: '100%',
                        width: '100%',
                        padding: 0,
                        overflow: 'hidden'
                    }
                }}>
                    {<DeleteFavoriteClubModal onClose={this.closeModal} clubs={this.state.clubs} />}
                </Modal>
                <Row >
                    <Col xs={12} className="pd-0 mb-10" >
                        <div onClick={this.iconChange}>
                            <Collapse  accordion={true} expandIcon={this.expandIcon}>
                                <Panel header={
                                    <><div className="col-md-8" style={{ paddingRight: 7, paddingLeft: 6 }}>MyTeam</div>
                                        <div className="col-md-4 padding-left" style={{ width: '100%' }}>
                                            {this.state.clubs.slice(0, 5).map((club, key) => (
                                                <div key={key} style={{ float: 'right', paddingRight: 5, paddingLeft: 5 }}> <Image src={club.badge} responsive style={{ height: 28, width: 28 }} /> </div>
                                            ))}

                                        </div>
                                    </>
                                } headerClass="my-header-class">
                                    <Row>
                                        {this.state.clubs.map((club, key) => (
                                            <Col key={key} xs={3}>
                                                <Link className="pd-5" to={`team/${club.id}`}>
                                                    <Image src={club.badge} responsive style={{ height: 50, width: 50 }} />
                                                </Link>
                                                <div className="clearfix" style={{ clear: 'both' }}></div>
                                            </Col>
                                        ))}
                                        <Col xs={6} >
                                            <div className="pd-5" >
                                                <Image onClick={() => this.setState({ open: true })} src={imgAddClub} responsive style={{ height: 50, width: 50 }} />
                                                <Image src={imgDeleteClub} onClick={() => this.setState({ openDeleteModal: true })} responsive style={{ height: 50, width: 50, marginLeft: '27%' }} />
                                                <div className="clearfix" style={{ clear: 'both' }}>
                                                </div>
                                            </div>
                                        </Col>
                                        <div className="clearfix" style={{ clear: 'both' }}></div>
                                    </Row>
                                </Panel>

                            </Collapse>
                        </div>
                    </Col>
                </Row>
            </React.Fragment>}
                {!isLoggedIn &&
                    <div>
                        <Modal open={this.state.openPopup} onClose={this.onCloseModal} center>
                            <NonCellularDataPopUup onClose={this.onCloseModal} />
                        </Modal>
                        <Row>
                            <Col xs={12} className="pd-0 mb-10" onClick={this.onClick}>
                                <Collapse accordion={true} expandIcon={this.expandIcon}>
                                    <Panel header="MyTeam" headerClass="my-header-class" disabled></Panel>
                                </Collapse>
                            </Col>
                        </Row>
                    </div>}</div>
        )
    }
}
export default AddFavoriteClub;

// function expandIcon({ isActive }) {
//     return (
//         <i style={{ marginRight: '1rem', position: 'absolute', right: '0px', fontSize: '24px', color: '#337ab7' }}>
//             {isActive ? `-` : `+`}
//         </i>
//     );
// }

// const AddFavoriteClub = () => {
//     const isLoggedIn = isAuthenticate();
//     if (isLoggedIn)
//         return <AddFavoriteClubWithLogin />
//     return <AddFavoriteClubWithOutLogin />
// };

// export default AddFavoriteClub;

// const AddFavoriteClubWithLogin = React.memo(withRouter(({ history }) => {
//     const [show, setShow] = React.useState(false);
//     const [clubs, setClubs] = React.useState([]);
//     const [open, setModal] = React.useState(false);
//     const [openDeleteModal, setDeleteModal] = React.useState(false);

//     React.useEffect(() => {
//         getClub();
//     }, []);

    // const getClub = () => {
    //     const payload = new FormData();
    //     // console.log(payload)
    //     const userdetails = JSON.parse(localStorage.getItem('userDetails'));
    //     // payload.append('user_id', (userdetails.id));
    //     payload.append('user_id', userdetails.id);
    //     axios({
    //         method: 'post',
    //         url: 'clubTeam',

    //         headers: {
    //             'JWT': localStorage.getItem('JWT'),
    //         },
    //         data: payload
    //     }).then(res => {
    //         // console.log(res)
    //         if (res.data && res.data.success && res.data.success == 1) {
    //             if (res.data.favteams && isArray(res.data.favteams)) {
    //                 setClubs(res.data.favteams);

    //             }
    //         }
    //     }).catch(err => {
    //         console.log({ err })
    //     })
    // }

//     // const openModal = () => {
//     //     getClub();
//     //     setModal(true);
//     // }

//     const closeModal = () => {
//         getClub();
//         setModal(false);
//         setDeleteModal(false);

//     }

//     return (

        // <React.Fragment>
        //     <Modal open={open} onClose={() => closeModal()} center styles={{
        //         modal: {
        //             height: '100%',
        //             width: '100%',
        //             padding: 0,
        //             overflow: 'auto'

        //         }
        //     }}>
        //         {<FavoriteClubModal closeModal={() => closeModal()} />}
        //     </Modal>

        //     <Modal open={openDeleteModal} onClose={() => closeModal()} center styles={{
        //         modal: {
        //             height: '100%',
        //             width: '100%',
        //             padding: 0,
        //             overflow: 'auto'
        //         }
        //     }}>
        //         {<DeleteFavoriteClubModal closeModal={() => closeModal()} />}
        //     </Modal>
        //     <Row>
        //         <Col xs={12} className="pd-0 mb-10">
        //             <Collapse accordion={true} expandIcon={expandIcon}>
        //                 <Panel header={
        //                     <><div className="col-md-8" style={{ paddingRight: 7, paddingLeft: 6 }}>MyTeam</div>
        //                         <div className="col-md-4 padding-left" style={{ width: '100%' }}>
        //                             {clubs.slice(0, 5).map((club, key) => (
        //                                 <div key={key} style={{ float: 'right', paddingRight: 5, paddingLeft: 5 }}> <Image src={club.badge} responsive style={{ height: 28, width: 28 }} /> </div>
        //                             ))}
        //                         </div>
        //                     </>
        //                 } headerClass="my-header-class">
        //                     <Row>
        //                         {clubs.map((club, key) => (
        //                             <Col key={key} xs={3} onClick={() => history.push(`team/${club.id}`)}>
        //                                 <div className="pd-5">
        //                                     <Image src={club.badge} responsive style={{ height: 50, width: 50 }} />
        //                                 </div>
        //                                 <div className="clearfix" style={{ clear: 'both' }}></div>
        //                             </Col>
        //                         ))}
        //                         <Col xs={6} >
        //                             <div className="pd-5" >
        //                                 <Image onClick={() => setModal(true)} src={imgAddClub} responsive style={{ height: 50, width: 50 }} />
        //                                 <Image src={imgDeleteClub} onClick={() => setDeleteModal(true)} responsive style={{ height: 50, width: 50, marginLeft: '27%' }} />
        //                                 <div className="clearfix" style={{ clear: 'both' }}>
        //                                 </div>
        //                             </div>
        //                         </Col>
        //                         <div className="clearfix" style={{ clear: 'both' }}></div>
        //                     </Row>
        //                 </Panel>
        //             </Collapse>
        //         </Col>
        //     </Row>
        // </React.Fragment>
//     )
// }));

// const AddFavoriteClubWithOutLogin = React.memo(withRouter(({ history }) => {
//     const onClick = () => {
//         Swal.fire({
//             type: 'error',
//             title: 'Login first to add your favorite clubs!!',
//             confirmButtonText: 'login',
//         }).then(result => {
//             if (result.value) {
//                 history.push('/login');
//             }
//         });
//     }
//     return (
//         <Row>
//             <Col xs={12} className="pd-0 mb-10" onClick={onClick}>
//                 <Collapse accordion={true} expandIcon={expandIcon}>
//                     <Panel header="MyTeam" headerClass="my-header-class" disabled></Panel>
//                 </Collapse>
//             </Col>
//         </Row>
//     )
// }));
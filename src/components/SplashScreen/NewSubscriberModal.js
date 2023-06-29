// import React from 'react';
import Swiper from 'react-id-swiper';
import FollowGif from '../../assets/img/htp/11.gif';
import LetsPlay from '../../assets/img/htp/2.gif';
import Prize from '../../assets/img/htp/3.gif';
import React, { useState, useRef } from 'react';
import axios from '../../_config/axios';
import Modal from 'react-awesome-modal';
const params = {
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,

    },
    // lazy: true,
    //     autoplay: {
    //     delay: 4000,
    //     disableOnInteraction: false
    //   },
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev'
    //   },
    height: '30px',
    backgroundColor: '#fff',
    slidesPerView: 1,
    spaceBetween: 10
};
const data = [
    {
        id: 0,
        image: FollowGif,
        smallText: 'Follow Your Favourite Club',
        largeText: 'Follow yor favourite clubs to get more news about their match schedule. you will alsi be getting indormation about your team competition result', tab: 0
    },
    {
        id: 1,
        image: LetsPlay,
        smallText: 'Join a Prediction and Win the Prize',
        largeText: 'You can join any match prediction and accumulate point to win the prize that we provide. each time you make correct prediction, you will get point that can also be exchange for prize',
        tab: 1
    },
    {
        id: 2,
        image: Prize,
        smallText: 'Reedem Your Points',
        largeText: 'Win many competition and have many points? You can exchange it eith the exclusive prize that we offer',
        tab: 2
    }
]


const newCubscriberModal = (props) => {
    const [open, setOpen] = React.useState(true);
    const [checked, setChecked] = React.useState(false);
    const [count, setCount] = React.useState(0);
    const [checkedField, setCheckedField] = React.useState(false);
    const swiperRef = useRef(null);
    const nextButton = (id) => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
            console.log(swiperRef.current.swiper)
            setCount(count + 1)
            console.log(count)

            if (id === 2 && count >= 2) {
                console.log('exit')
                setOpen(false);
                localStorage.removeItem('JWTforPopup');
                localStorage.removeItem('userDetailsforPopup');
            }
            if (id === 2 && count >= 0) {
                console.log('exit')
                setOpen(false);
                localStorage.removeItem('JWTforPopup');
                localStorage.removeItem('userDetailsforPopup');
            }
            if (id === 2 && count >= 1) {
                console.log('exit')
                setOpen(false);
                localStorage.removeItem('JWTforPopup');
                localStorage.removeItem('userDetailsforPopup');
            }

        }
    };
    



    const onCloseModal = () => {
        console.log(checkedField)
        if (checkedField == true) {
            const payload = new FormData();
            const userdetails = JSON.parse(localStorage.getItem('userDetails'));
            payload.append('msisdn', userdetails.msisdn);
            payload.append('status', 1);
            axios.post('/popupCheck', payload).then(res => {
                if (res.data.success == 1) {
                    console.log(res.data)
                }
            }).catch(err => {
                console.log({ err });
            });
            console.log('skip with checked')
            setOpen(false);
            localStorage.removeItem('JWTforPopup');
            localStorage.removeItem('userDetailsforPopup');
        }
        else {
            console.log('only skip')
            setOpen(false);
            localStorage.removeItem('JWTforPopup');
            localStorage.removeItem('userDetailsforPopup');
            
        }


    };
    const checkboxCheck = () => {
        setChecked(!checked);
        if (checked === true) {
            setCheckedField(false);


        }
        else {
            setCheckedField(true);
        };

    }
    return (
        <React.Fragment>
            {console.log(checked)}
            <Modal visible={open} onClickAway={onCloseModal} width="320" height="95%" effect="fadeInUp">
                <Swiper ref={swiperRef} {...params}>
                    {data.map(data => (
                        <div id="modal-htp" class="modal" tabindex="-1" role="dialog" style={{ display: 'block', paddingTop: '0px' }}>
                            <div className="modal-dialog modal-sm" role="document">
                                <div className="modal-content">
                                    <div className="modal-body text-center">
                                        <div id="how-to-play-slider" class="carousel slide">

                                            <div className="carousel-inner" role="listbox">

                                                <div className="item active">
                                                    <div className="banner" style={{ left: 0, position: 'inherit', top: '-30px' }}><img src={data.image} alt="" /></div>
                                                    <div className="desc">
                                                        <h4><strong>{data.smallText}</strong></h4>
                                                        <p>{data.largeText}</p>
                                                    </div>
                                                    <div>
                                                        <input type="checkbox" id="accept" checked={checked} onChange={checkboxCheck} />Don't show this message again

                                                </div>
                                                    <div className="control-slide">
                                                        <div className="d-flex j-between">

                                                            <button className="btn btn-pill btn-next btn-purple w-50 p-1" onClick={() => nextButton(data.id)} ><strong>NEXT</strong></button>
                                                            <button className="btn btn-pill btn-grey w-50 p-1" ><strong onClick={onCloseModal}>SKIP</strong></button>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex h-100 ais-center modal-vertical-center">
                                </div>
                            </div>
                        </div>

                    ))}

                </Swiper>
            </Modal>

        </React.Fragment>

    )
}




export default newCubscriberModal;
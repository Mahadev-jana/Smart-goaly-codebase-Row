import React, { useEffect, useState } from 'react';
import Swiper from 'react-id-swiper';
import ClampLines from 'react-clamp-lines';

import { randomNewsBanner } from '../../../_helper/random-image';
import { Link, withRouter } from 'react-router-dom';
import './index.css';

const params = {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        // renderBullet: (index, className) => {
        //     return '<span class="' + className + '">' + (index + 1) + '</span>';
        // },
    }
};

const LatestNewsSlider = React.memo(({ news }) => {
    const newsMore = (more, id) => {
        if (Boolean(more)) {
            const newsLinks = ["www.goal.com"];
            if (newsLinks.indexOf(more.split("/")[2]) > -1) {
                window.location.href = more;
            } else {
                this.props.history.push(`/latest/${id}`);
            }
        }
    }

    return (
        <Swiper {...params} wrapperStyle={{ marginBotton: '24px' }}>
            {news && news.map((data, key) => (
                <a key={key} href={data.url}>
                    <div className="title-img">
                        <img src={data.urlToImage === '' ? randomNewsBanner() : data.urlToImage} alt="" />
                    </div>
                    <p className="title-cat">{data.name}</p>
                    {data.title && <ClampLines
                        text={data.title}
                        id={key}
                        lines={1}
                        ellipsis="..."
                        buttons={false}
                        className="title-main"
                        innerElement="h2"
                    />}
                    <div className="hr"></div>
                    {data.description && <ClampLines
                        text={data.description}
                        id={key}
                        lines={2}
                        ellipsis="..."
                        buttons={false}
                        className="title-desc"
                        innerElement="div"
                    />}
                </a>
            ))}
        </Swiper>
    );
});

export default withRouter(LatestNewsSlider);
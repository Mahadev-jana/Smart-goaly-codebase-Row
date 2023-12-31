import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isArray, isString } from 'lodash';
import { Row, Col } from 'react-bootstrap';
import ClampLines from 'react-clamp-lines';
import moment from 'moment';
import axios from '../../../_config/axios';

const LocalNewsDashboard = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        axios.post('/getlocalnews').then(res => {
            if (res.data && res.data.success && res.data.success == 1) {
                if (res.data.news && isArray(res.data.news)) {
                    setNews(res.data.news);
                }
            }
        }).catch(err => {
            console.log({ err });
        })

    }, []);
    return (
        <Row>
            {news.slice(0,1).map((eachNews, key) => (
                <Col key={key} xs={12} className="pd-0 mt-10">
                    <div class="new-ct">
                        <div class="lf">Local News</div>
                        <div class="rg"><Link to="/news" style={{color:'#E7155D'}}>See All</Link></div>
                        <div class="liner2"></div>
                        {/* <a href={eachNews.url}> */}
                        <Link to={`/local/${eachNews.id}`}>
                            <div class="title-img">
                            {/* <img src={latest_news} width="100%" alt="" />                                 */}
                                <img src={eachNews.urlToImage} width="100%" alt="" />
                            </div>
                            <p class="title-cat">{eachNews.league_name}</p>
                            {eachNews.title && <ClampLines
                                // text='news news'
                                text={eachNews.title}
                                id={key}
                                lines={1}
                                ellipsis="..."
                                buttons={false}
                                className="title-main"
                                innerElement="h2"
                            />}
                            <div class="hr"></div>
                            {/* <Moment format="ddd, DD/MM">{utcToLocal(eachNews.publishedAt)}</Moment> */}
                            <div class="hr"></div>
                            {eachNews.description && <ClampLines
                                text={eachNews.description}
                                id={key}
                                lines={1}
                                ellipsis="..."
                                buttons={false}
                                className="title-desc"
                                innerElement="div"
                            />}
                        </Link>
                        {/* </a> */}
                        <div class="liner2"></div>
                        {/* <div >
                            <ul style={{ marginLeft: '33px', marginTop: '23px' }}>
                                {eachNews.contents && eachNews.contents.map((content, key) => (
                                    <li key={key} className="m-0">
                                        <a href={content.url}>
                                            <div style={{fontSize: '11px',fontWeight: 700,cursor:'pointer',lineHeight:1}}>
                                            {content.title && isString(content.title) && <ClampLines
                                                text={content.title}
                                                id={key}
                                                lines={1}
                                                ellipsis="..."
                                                buttons={false}
                                                className="title-desc"
                                                innerElement="div"
                                                
                                            />}
                                            </div>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div> */}

                    </div>
                </Col>
            ))}
        </Row>
    )
}

export default LocalNewsDashboard;

const utcToLocal = dateTime => {
    const stillUtc = moment.utc(dateTime).toDate();
    return moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
}
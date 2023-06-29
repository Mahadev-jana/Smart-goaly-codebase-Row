import React from 'react';
import { withRouter,Link } from 'react-router-dom';
import { randomNewsBanner } from '../../_helper/random-image';
import { dateFomat, dateTimeFomat } from '../../_helper/date-format';
import { post } from '../../api';
import Moment from 'react-moment';
import ClampLines from 'react-clamp-lines';


class NewsComponent extends React.Component {
    news = (id) => {
        // const payload = new FormData();
        // payload.append('id', id);
        // post('setpopularnews', payload)
        //     .then(res => console.log(res))
        //     .catch(res => console.log(err));
        // if (Boolean(more)) {
        //     const newsLinks = ["www.goal.com"];
        //     if (newsLinks.indexOf(more.split("/")[2]) > -1) {
        //         window.location.href = more;
        //     } else {
                this.props.history.push(`/local/${id}`);
            // }
        // }
    }
    render() {
        const { data } = this.props;
        return (
            <div className="news-row">
            <Link to={`/local/${data.id}`} className="post post-widget">
                <a className="post-img">
                    <span style={{
                        position: 'absolute',
                        background: 'rgba(77, 0, 83, 0.7)',
                        color: '#fff',
                        fontSize: '11px',
                        padding: '1px 3px'
                    }}>{(data.publishedAt)}</span>
                    <img src={data.urlToImage === '' ? randomNewsBanner() : data.urlToImage} alt=""/>
                </a>
                <div className="post-body">
                    <h3 className="post-title">
                        <div style={{fontSize: '12px', color:'red'}}>{data.league_name}</div>
                        {data.title && <ClampLines
                                // text='news news'
                                text={data.title}
                                id={data.id}
                                lines={2}
                                ellipsis="..."
                                buttons={false}
                                className="title-main"
                                innerElement="p"
                            />}
                    </h3>
                    <span style={{
                        fontSize: '9px',
                        color: '#8e8c8c',
                        fontStyle: 'italic',
                        fontWeight: '600',
                        letterSpacing: '0.8px'
                    }}><Moment format="ddd, DD/MM/YY">{data.publishedAt}</Moment>
                    {/* {dateTimeFomat(data.publishedAt)} */}
                    </span>
                </div>
            </Link>
            </div>
        );
    }
};

export default withRouter(NewsComponent);
import React from 'react';
import classnames from 'classnames';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';
import MenuCategory from '../../components/menu-category';
import PopularNews from './PopularNews';
import TransferNews from './TransferNews';
import LatestNews from './LatestNews';
import LocalNews from './LocalNews';

class Latest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 1,
        }
    }
    changeTab = tab => {
        this.setState({ tab });
    }
    render() {
        const { tab } = this.state;
        return (
            <React.Fragment>


                {/* <Helmet>
                    <title>Goaly | News</title>
                    <link rel="icon" type="image/png" href={icon} sizes="20x20" />

                </Helmet> */}
                <MenuCategory />
                <div className="clearfix"></div>
                <div className="col-xs-12 mb-10 mt-5" style={{ margin: '28px',paddingTop:'65px' }}>
                    <div className="col-xs-4 pd-0" style={{ width: 'auto' }}>
                        <a onClick={() => this.changeTab(0)}>
                            <div className={classnames("sub-news", { "active": Boolean(tab == 0) })}>
                                Hottest
                            </div>
                        </a>
                    </div>
                    <div className="col-xs-4 pd-0" style={{ width: 'auto' }}>
                        <a onClick={() => this.changeTab(1)}>
                            <div className={classnames("sub-news", { "active": Boolean(tab == 1) })}>
                                Latest
                            </div>
                        </a>
                    </div>
                    <div className="col-xs-4 pd-0" style={{ width: 'auto' }}>
                        <a onClick={() => this.changeTab(2)}>
                            <div className={classnames("sub-news", { "active": Boolean(tab == 2) })}>
                                Transfer
                            </div>
                        </a>
                    </div>
                    <div className="col-xs-4 pd-0" style={{ width: 'auto' }}>
                        <a onClick={() => this.changeTab(3)}>
                            <div className={classnames("sub-news", { "active": Boolean(tab == 3) })}>
                                Local
                            </div>
                        </a>
                    </div>
                </div>
                {Boolean(tab == 0) && <PopularNews />}
                {Boolean(tab == 1) && <LatestNews />}
                {Boolean(tab == 2) && <TransferNews />}
                {Boolean(tab == 3) && <LocalNews />}
            </React.Fragment>
        );
    }
};

export default Latest;
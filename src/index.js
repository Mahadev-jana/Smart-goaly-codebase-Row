import 'core-js';
import 'babel-polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'swiper/dist/css/swiper.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import './assets/css/main.css';
import './assets/css/style.css';
import './assets/css/lineup.css';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import ScrollToTop from 'react-router-scroll-top';
import PageRoutes from './pages';
import EmailVerification from './pages/email-verification/EmailVerification';
import * as serviceWorker from './serviceWorker';
import packageJson from '../package.json';
import { ClearCacheProvider, useClearCacheCtx } from 'react-clear-cache';
import withClearCache from "./ClearCache";

// const ClearCacheComponent = withClearCache(MainApp);

"use strict";
const Index = (props) => {
    // const { isLatestVersion, emptyCacheStorage } = useClearCacheCtx();

    // const clearCacheData = () => {
    //   if(!isLatestVersion) {
    //     emptyCacheStorage();
    //   }
    //   let version = localStorage.getItem('version');
    //   if(version!=packageJson.version)
    //   {
    //     if('caches' in window){
    //     caches.keys().then((names) => {
    //       names.forEach((name) => {
    //         caches.delete(name);
    //       },
    //       console.log("cache is cleared"));
    //     });
    //     window.location.reload(true);
    //   };
    //   localStorage.clear();
    //   localStorage.setItem('version',packageJson.version);
    // }
    // }
    

    // React.useEffect(() => {
    //     clearCacheData();
    // },[])

    // const cacheClear = (e) => {
    //     e.preventDefault();
    //     emptyCacheStorage();
    //     console.log("cache clear done");
    //   }
    
    
    return(
    <>
    <BrowserRouter >
        <ScrollToTop>
            <Switch>
                <Route path="/emailvarification/:key" component={EmailVerification} />
                <Route path="/" component={PageRoutes} />
                <Redirect to='/' />
            </Switch>
        </ScrollToTop>
    </BrowserRouter>
    </>
)
};

const wrapper = document.getElementById("index");
wrapper ? ReactDOM.render( 
  <Index />, wrapper) : false;

// function Index() {
//   return <ClearCacheComponent />;
// }

serviceWorker.register();
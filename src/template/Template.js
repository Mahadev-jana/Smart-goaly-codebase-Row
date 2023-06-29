import React,{ useRef } from 'react';
import { Grid } from 'react-bootstrap';
import { withRouter, useHistory } from 'react-router-dom';
import { isAuthenticate } from '../_helper/authentication';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import Footer from './Footer';
import packageJson from '../../package.json';
import IdleTimer from 'react-idle-timer';
import Swal from 'sweetalert2';

const Template = ({ children }) => {
    const clearCacheData = () => {
    //   if(!isLatestVersion) {
    //     emptyCacheStorage();
    //   }
      let version = localStorage.getItem('version');
      if(version!=packageJson.version)
      {
        if('caches' in window){
        caches.keys().then((names) => {
          names.forEach((name) => {
            caches.delete(name);
          },
          console.log("cache is cleared"));
        });
        window.location.reload(true);
      };
      localStorage.clear();
      localStorage.setItem('version',packageJson.version);
    }
    }
    

    React.useEffect(() => {
        clearCacheData();
    },[])
    const [show, setShow] = React.useState(false);
    const [idle, setIdle ] = React.useState(false);
    const history = useHistory();
    const idleTimerRef = useRef(null);

    const showSidebar = () => {
        setShow(true);
        document.getElementsByTagName('html')[0].style.overflowY = 'hidden';
    }
    const hideSidebar = () => {
        setShow(false);
        document.getElementsByTagName('html')[0].style.overflowY = 'scroll';
    }
    
    const onIdle = () => {
      console.log("user not logged in");
      console.log(isAuthenticate());
      if(isAuthenticate() === true)
      {
          localStorage.removeItem('userDetails');
          localStorage.removeItem('JWT');
          Swal.fire({
              type: 'info',
              title: 'You have been logged out'
      })
      history.push("/");
      }
    }
  
    const onActive = (e) => {
      setIdle(false);
      console.log("user become active", e);
    }
    return (
        <React.Fragment>
          <IdleTimer
              ref={idleTimerRef}
              element={document}
              onActive={onActive}
              onIdle={onIdle}
              timeout={1000 * 60 * 30}>
                <Header openSideBar={showSidebar} isAuthenticate={Boolean(isAuthenticate())} />
                <div className="clearfix"></div>
                <Sidebar open={show} closeSideBar={hideSidebar} />
                <Grid fluid={true} className="page-content">{children}</Grid>
            {/* <Footer /> */}
          </IdleTimer>
            
        </React.Fragment>
    );
};

export default Template;

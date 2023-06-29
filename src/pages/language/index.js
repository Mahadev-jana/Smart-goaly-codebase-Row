import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import cookie from 'react-cookies';
import LanguageListItem from './LanguageListItem';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';

const Language = () => {
    const setLanguage = lan => {
        console.log({ lan })
        // document.cookie = `googtrans=/en/${lan}`;
       
        // document.cookie = 'googtrans=; path=/; domain= .goaly.mobi; expires=' + new Date(0).toUTCString();
        // window.location.href = '/language';
        document.cookie = `googtrans=/en/${lan}`;
        document.cookie = 'googtrans=; path=/; domain=.goaly.mobi; expires=' + new Date(0).toUTCString();
        window.location.reload();
    }
    const selectedLanguage = !isEmpty(cookie.load('googtrans')) ? cookie.load('googtrans').split('/').pop().toLowerCase() : 'en';
    console.log('reflected language')
    return (
        <React.Fragment>
            {/* <Helmet>
                <title>Goaly | Language</title>
                <link rel="icon" type="image/png" href={icon} sizes="20x20" />

            </Helmet> */}
            <Row>
                <Col xs={12} className="blocklist mt-0" style={{ height: '100vh', width: '100vw', background: '#fff' }}>
                    <LanguageListItem language="English" isActive={selectedLanguage === 'en'} setLanguage={() => setLanguage('en')} />
                    <LanguageListItem language="Indonesia" isActive={selectedLanguage === 'id'} setLanguage={() => setLanguage('id')} />
                    <LanguageListItem language="Malaysia" isActive={selectedLanguage === 'ms'} setLanguage={() => setLanguage('ms')} />
                    <LanguageListItem language="Deutch" isActive={selectedLanguage === 'nl'} setLanguage={() => setLanguage('nl')} />
                    <LanguageListItem language="Khmer" isActive={selectedLanguage === 'km'} setLanguage={() => setLanguage('km')} />
                    
                </Col>
            </Row>
        </React.Fragment>

    );
}

export default Language;
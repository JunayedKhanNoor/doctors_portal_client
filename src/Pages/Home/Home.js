import React from 'react';
import Banner from './Banner';
import Info from './Info';
import Services from './Services';
import TreatmentBanner from './TreatmentBanner';

const Home = () => {
    return (
        <div className='px-3 md:px-12'>
            <Banner></Banner>
            <Info></Info>
            <Services></Services>
            <TreatmentBanner></TreatmentBanner>
        </div>
    );
};

export default Home;
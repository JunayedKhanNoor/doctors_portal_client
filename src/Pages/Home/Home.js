import React from 'react';
import Banner from './Banner';
import Contact from './Contact';
import Footer from './Footer';
import Info from './Info';
import MakeAppointment from './MakeAppointment';
import Services from './Services';
import Testimonials from './Testimonials';
import TreatmentBanner from './TreatmentBanner';

const Home = () => {
    return (
        <>
        <div className='px-3 md:px-12'>
            <Banner></Banner>
            <Info></Info>
            <Services></Services>
            <TreatmentBanner></TreatmentBanner>
        </div>
        <MakeAppointment></MakeAppointment>
        <div className='px-3 md:px-12'>
            <Testimonials></Testimonials>
        </div>
        <Contact></Contact>
        <Footer></Footer>
        </>
    );
};

export default Home;
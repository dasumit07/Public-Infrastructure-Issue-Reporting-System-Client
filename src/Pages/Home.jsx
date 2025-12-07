import React from 'react';
import Banner from './Banner';
import LatestResolveIssues from './LatestResolveIssues';
import OurFeatures from './OurFeatures';
import HowItWorks from './HowItWorks';
import OurImpactOnCity from './OurImpactOnCity';
import WhyChooseUs from './WhyChooseUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestResolveIssues></LatestResolveIssues>
            <OurFeatures></OurFeatures>
            <HowItWorks></HowItWorks>
            <OurImpactOnCity></OurImpactOnCity>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;
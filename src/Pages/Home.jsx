import React from 'react';
import Banner from './Banner';
import LatestResolveIssues from './LatestResolveIssues';
import OurFeatures from './OurFeatures';
import HowItWorks from './HowItWorks';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestResolveIssues></LatestResolveIssues>
            <OurFeatures></OurFeatures>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;
import React from 'react';
import Banner from './Banner';
import LatestResolveIssues from './LatestResolveIssues';
import OurFeatures from './OurFeatures';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestResolveIssues></LatestResolveIssues>
            <OurFeatures></OurFeatures>
        </div>
    );
};

export default Home;
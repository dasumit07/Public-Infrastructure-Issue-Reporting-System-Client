/* eslint-disable no-unused-vars */
import React from 'react';
import Banner from './Banner';
import LatestResolveIssues from './LatestResolveIssues';
import OurFeatures from './OurFeatures';
import HowItWorks from './HowItWorks';
import OurImpactOnCity from './OurImpactOnCity';
import WhyChooseUs from './WhyChooseUs';
import { motion } from 'framer-motion';
const Home = () => {
    const sectionVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };
    return (
        <div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            ><Banner></Banner>
            </motion.div>
            <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <LatestResolveIssues></LatestResolveIssues>
            </motion.div>
            <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <OurFeatures></OurFeatures>
            </motion.div>
            

            <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <HowItWorks></HowItWorks>
            </motion.div>

            <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <OurImpactOnCity></OurImpactOnCity>
            </motion.div>

            <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <WhyChooseUs></WhyChooseUs>
            </motion.div>

        </div>
    );
};

export default Home;
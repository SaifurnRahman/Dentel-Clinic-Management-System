import React from 'react';
import Hero from "../Shared/Hero";
import FeaturedDentists from '../components/FeaturedDentists';
import FeaturedServices from '../components/FeaturedServices';
import AboutSnippet from '../components/AboutSnippet';
import Testimonials from '../components/Testimonials';

const Home = () => {
    return (
      <section>
        <Hero></Hero>
        <FeaturedDentists></FeaturedDentists>
        <FeaturedServices></FeaturedServices>
        <Testimonials></Testimonials>
        <AboutSnippet></AboutSnippet>
      </section>
    );
};

export default Home;
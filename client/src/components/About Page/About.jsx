import React from "react";
import { motion } from "framer-motion";
import aboutImage from "../../assets/Images/resume.svg";

const About = () => {
  return (
    <div className="about-container">
      <div className="photo-container">
        <img src={aboutImage} />
      </div>

      <motion.div
        className="about-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.01 } }}
      >
        {" "}
        <p style={{ fontSize: "1.2rem", lineHeight: "1.1" }}>
          Join Stock World for innovative financial insights. Our application
          uses advanced algorithms to provide accurate stock forecasts,
          simplifying market complexities for investors of all levels.
        </p>
        <p style={{ fontSize: "1.2rem", lineHeight: "1.1" }}>
          Stock World goes beyond tracking market trends; we forecast the future
          of stocks. Our technology, coupled with market expertise, offers
          reliable stock performance predictions, aiding informed investment
          decisions.
        </p>
        <p style={{ fontSize: "1.2rem", lineHeight: "1.1" }}>
          Tailored for every investor, our intuitive platform provides
          personalized stock recommendations. Explore investment opportunities
          with confidence and ease using Stock World.
        </p>
        <p style={{ fontSize: "1.2rem", lineHeight: "1.1" }}>
          Embrace the future of investing with Stock World, where cutting-edge
          technology enhances your stock market experience. Start your journey
          with us and redefine your investing strategy.
        </p>
      </motion.div>
    </div>
  );
};

export default About;

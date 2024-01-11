import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.01 } }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: "Normal",
        fontSize: "5px",
        padding: "5px",
        textAlign: "center",
        maxWidth: "50%",
        margin: "0 auto",
        height: "100%",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px", color: "white" }}>
        Welcome to Stock World
      </h1>

      <p style={{ fontSize: "1.2rem", lineHeight: "1.3" }}>
        Embark on a journey of financial innovation with Stock World, a
        groundbreaking application dedicated to stock prediction. Our platform
        harnesses the power of advanced algorithms and data analytics to offer
        precise stock forecasts, helping investors like you navigate the
        complexities of the stock market with confidence.
      </p>

      <p style={{ fontSize: "1.2rem", lineHeight: "1.3" }}>
        At Stock World, we're not just about observing market trends; we're
        about predicting the future of stocks. By integrating cutting-edge
        technology with our deep understanding of market dynamics, our app
        provides reliable predictions on stock performance, empowering both
        novice and experienced investors to make well-informed decisions.
      </p>

      <p style={{ fontSize: "1.2rem", lineHeight: "1.3" }}>
        Our platform is designed with you in mind. It's intuitive,
        user-friendly, and tailored to meet the unique needs of each investor.
        Whether you're looking to explore potential investment opportunities or
        seeking guidance on when to buy or sell, Stock World delivers
        personalized stock recommendations based on your individual investment
        profile and preferences.
      </p>

      <p style={{ fontSize: "1.2rem", lineHeight: "1.3" }}>
        Become part of a community that's shaping the future of investing. With
        Stock World, you gain access to not just predictions, but a wealth of
        knowledge, insights, and tools designed to elevate your investing
        experience. We are committed to continuously enhancing our algorithms
        and features, ensuring you stay ahead in the ever-evolving world of
        stock investments.
      </p>

      <p style={{ fontSize: "1.2rem", lineHeight: "1.3" }}>
        Step into a new era of stock investment with Stock World, where advanced
        prediction technology meets user-focused design. Join us today, and
        transform how you approach stock market investing. Let Stock World be
        your guide and ally in the exciting realm of stock predictions.
      </p>
    </motion.div>
  );
};

export default About;

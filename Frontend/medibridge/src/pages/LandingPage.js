import React from 'react';
import styled from 'styled-components';
//import BackgroundImage from '../assets/images/MedicalBackground.jpg';
import heroImage from '../assets/images/hero-image.jpg';
import feature1 from '../assets/images/feature-1 (1).jpg';
import feature2 from '../assets/images/feature-2.jpg';
import feature3 from '../assets/images/feature-3.jpg';

const LandingPage = () => {
  return (
    <Container>
      <Header>
        <Logo>MediBridge App</Logo>
      </Header>
      <Hero>
        <HeroText>
          <Title>Transforming Healthcare</Title>
          <Subtitle>Bringing quality care to your fingertips</Subtitle>
          <CTAButton>Get Started</CTAButton>
        </HeroText>
        <HeroImage src={heroImage} alt='Hero Image' />
      </Hero>
      <Features>
        <Feature>
          <FeatureIcon src={feature1} alt="Feature 1" />
          <FeatureTitle>Convenient Access</FeatureTitle>
          <FeatureDescription>
            Access healthcare services anytime, anywhere, at your convenience.
          </FeatureDescription>
        </Feature>
        <Feature>
          <FeatureIcon src={feature2} alt="Feature 2" />
          <FeatureTitle>Personalized Care</FeatureTitle>
          <FeatureDescription>
            Get personalized care plans tailored to your specific needs.
          </FeatureDescription>
        </Feature>
        <Feature>
          <FeatureIcon src={feature3} alt="Feature 3" />
          <FeatureTitle>Secure Communication</FeatureTitle>
          <FeatureDescription>
            Communicate securely with your healthcare providers for consultations.
          </FeatureDescription>
        </Feature>
      </Features>
      <Footer>
        <FooterText>© 2023 Healthcare App. All rights reserved.</FooterText>
      </Footer>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const Hero = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 80px;
`;

const HeroText = styled.div`
  max-width: 500px;
`;

const Title = styled.h2`
  font-size: 36px;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  margin-bottom: 40px;
`;

const CTAButton = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const HeroImage = styled.img`
  max-width: 600px;
  height: auto;
`;

const Features = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-bottom: 80px;
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const FeatureIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 80px;
`;

const FooterText = styled.p`
  font-size: 14px;
  color: #999;
`;

export default LandingPage;

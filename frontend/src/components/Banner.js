import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import ImgSlide1 from '../assets/hp3.jpg'
import ImgSlide2 from '../assets/hp2.jpg'
import ImgSlide3 from '../assets/hp1.jpg'


const ImageSilder = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Slide = styled.div`
  width: 100%;
  height:calc(calc(100vw / 1930) * 1040);
  background-image: url(${props => props.image});
  background-size: cover;
  transition: 0.4s linear;
`;
Slide.defaultProps = {
  image: "",
}

const GroupSlide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
`;

const ImageTag = styled.div`
  position: absolute;
  width: 800px;
  height: 200px;
  margin-left: 100px;
  
  @media (max-width: 768px) {
    width: 200px;
    height: 120px;
  }
  @media (max-width: 425px) {
    width: 120px;
    height: 80px;
  }
`;

const ImageTagCollection = styled.div`
  font-size: 28px;
  color: #f1f1f1;
  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 425px) {
    font-size: 10px;
  }
`;

const ImageTagSeason = styled.div`
  font-size: 60px;
  text-transform: uppercase;
  color: #f1f1f1;
  @media (max-width: 768px) {
    font-size: 30px;
  }
  @media (max-width: 425px) {
    font-size: 16px;
  }
`;

const ImageTagButton = styled.div`
  width: 140px;
  height: 40px;
  display: inline-block;
  text-align: center;
  border: 0;
  transition: 0.4s  ease-out;
  background-color: rgb(99,113,198);
  color: #fff;
  font-size: 16px;
  border-radius: 1em;
  padding-top: 7px;
  cursor: pointer;
  outline: none;
  -webkit-box-shadow: -4px 5px 10px 1px rgba(0,0,0,0.69); 
box-shadow: -4px 5px 10px 1px rgba(0,0,0,0.69);
  &:hover{
    background-color: #000;
    transition:0.4s ease-out;
  }
  @media (max-width: 768px) {
    width: 70px;
    height: 20px;
    font-size: 10px;
    padding-top: 2px;
  }
`;
const ATag = styled.a`
  color: white !important;
  text-decoration: none !important;
  &:hover {
    text-decoration: none !important;
    color: white !important;
  }
`
// End banner

const Banner = () => {
  const [idSlide, setIdSlide] = useState(1);
  const [linkImage, setLinkImage] = useState(ImgSlide1);
  useEffect(() => {
    const interval = setInterval(() => {
      if (idSlide === 1) {
        setIdSlide(2);
        setLinkImage(ImgSlide2)
      } else if (idSlide === 2) {
        setIdSlide(3);
        setLinkImage(ImgSlide3)
      } else if (idSlide === 3) {
        setIdSlide(1);
        setLinkImage(ImgSlide1)
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [idSlide, linkImage]);
  return (
    <>
    <ImageSilder>
        <i className="fas fa-chevron-left" onClick={() => {
          if (idSlide === 1) {
            setIdSlide(3);
            setLinkImage(ImgSlide3)
          } else if (idSlide === 2) {
            setIdSlide(1);
            setLinkImage(ImgSlide1)
          } else if (idSlide === 3) {
            setIdSlide(2);
            setLinkImage(ImgSlide2)
          }
        }}
          style={{ position: 'absolute', fontSize: '5em', cursor: 'pointer', color: '#999999', opacity: '0.5', zIndex: '10' }}></i>
        <GroupSlide>
          <Slide id="slide-img-1" image={linkImage} >
          </Slide>
        </GroupSlide>
        <ImageTag>
          <ImageTagCollection>ĐI CHỢ THUÊ</ImageTagCollection>
          <ImageTagSeason>CHUNG TAY CÙNG CHỐNG DỊCH COVID-19</ImageTagSeason>
          <ImageTagButton><ATag href="#product">MUA NGAY</ATag></ImageTagButton>
        </ImageTag>
        <i className="fas fa-chevron-right" onClick={() => {

          if (idSlide === 1) {
            setIdSlide(2);
            setLinkImage(ImgSlide2)
          } else if (idSlide === 2) {
            setIdSlide(3);
            setLinkImage(ImgSlide3)
          } else if (idSlide === 3) {
            setIdSlide(1);
            setLinkImage(ImgSlide1)
          }
        }}
          style={{ position: 'absolute', fontSize: '5em', cursor: 'pointer', color: '#999999', opacity: '0.5', right: '0' }}></i>
      </ImageSilder>
    </>
  )
}

export default Banner;

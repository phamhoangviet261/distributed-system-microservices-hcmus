import React from 'react'
import styled from "styled-components";
import Cate1 from '../assets/h1.png'
import Cate2 from '../assets/h2.png'
import Cate3 from '../assets/h3.png'
import Cate4 from '../assets/h4.png'



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

const CateButton = styled.div`
  position: absolute;
  width: fit-content;
  height: 20px;
  font-size: 1em;
  border-bottom: 2px solid #fff;
  bottom: 40px;
  left: 28px;
  line-height: 20px;
  text-transform: uppercase;
  display: none;
  & > a {
    color: white !important;
  }
  & > a:hover {
    text-decoration: none !important;
    color: white !important;
  }
  & > a:focus, & > a:hover, & > a:visited, & > a:link, & > a:active {
    text-decoration: none;
    color: #fff;
  }
`;

const CateContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  justify-content: center;
  width: 90%;
  height: auto;
  margin-top: 30px;
  @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
        grid-template-columns: repeat(1, 500px);
  }
`;

const CateItem = styled.div`
  height: 250px;
  border: 1px solid #cdcdcd;
  border-radius: 4px;
  margin: 20px;
  background-image: url(${props => props.image});
  background-size: cover;
  position: relative;
`;
CateItem.defaultProps = {
  image: "",
}
const CateWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: 0.3s ease-out;
  &:hover {
    opacity: 0.7;
    color: #fff;
		background-color: rgb(99,113,198);
	}
  &:hover ${CateButton}{
    animation: fadeIn 0.8s;
    display: block;
    @keyframes fadeIn {
      0% {
        opacity:0;
        transform: translateY(20px);
      }
      100% {
        opacity:1;
        transform: translateY(0px);
      }
    }
  }
`;
const CateTitle = styled.div`
  font-weight: 700;
  font-size: 2em;
  margin-left: 30px;
  margin-top: 30px;
`;
const CateTag = styled.div`
  font-weight: 300;
  font-size: 0.8em;
  margin-left: 30px;
`;

// End Cate

const CategorySection = () => {
  return (
    <>
      <CateContainer>
        <CateItem image={Cate1}>
          <CateWrapper onClick={() => window.location = "/category/nsp001"}>
            <CateTitle>Thực phẩm tươi sống</CateTitle>
            <CateTag></CateTag>
            <CateButton>MUA NGAY</CateButton>
          </CateWrapper>
        </CateItem>
        <CateItem onClick={() => window.location = "/category/nsp002"} image={Cate2}>
          <CateWrapper>
            <CateTitle>Công nghệ phẩm</CateTitle>
            <CateTag></CateTag>
            <CateButton>MUA NGAY</CateButton>
          </CateWrapper>
        </CateItem>
        <CateItem onClick={() => window.location = "/category/nsp003"} image={Cate3}>
          <CateWrapper>
            <CateTitle>Lương thực</CateTitle>
            <CateTag></CateTag>
            <CateButton>MUA NGAY</CateButton>
          </CateWrapper>
        </CateItem>
        <CateItem onClick={() => window.location = "/category/nsp004"} image={Cate4}>
          <CateWrapper>
            <CateTitle>Nhu yếu phẩm cần thiết</CateTitle>
            <CateTag></CateTag>
            <CateButton>MUA NGAY</CateButton>
          </CateWrapper>
        </CateItem>
      </CateContainer>
    </>
  )
}

export default CategorySection;

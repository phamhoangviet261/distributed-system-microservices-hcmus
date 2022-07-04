import React, { useEffect } from 'react'
import styled from "styled-components";

import Product from '../components/Products';
import Banner from '../components/Banner';
import CategorySection from '../components/CategorySection';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  overflow: hidden;
`;


const WrapProduct = styled.div`
  width: 1200px;
`

const Homepage = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    let header = document.getElementById('header')
    let center = document.getElementById('center')
    let brandNameRight = document.getElementById('brandNameRight')
    let shoppingIcon = document.getElementById('shopping-icon')
    let menuItem = document.querySelectorAll('.menu-item')
    const handleScroll = () =>{
      const y = window.scrollY;
      if (y > 100) {

        header.classList.add('changeHeaderColor');
        center.classList.add('changeColor');
        brandNameRight.classList.add('changeColorToBlack');
        shoppingIcon.classList.add('changeColorToBlack');
        menuItem.forEach(function(item) {
          item.classList.add('changeColorToBlack')
        })
      }
      else {
        header.classList.remove('changeHeaderColor');
        center.classList.remove('changeColor');
        brandNameRight.classList.remove('changeColorToBlack');
        shoppingIcon.classList.remove('changeColorToBlack');
        menuItem.forEach(function(item) {
          item.classList.remove('changeColorToBlack')
        })

      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll',handleScroll)
      
    }
  }, []);

  return (
    <Container>
      <Banner/>
      <CategorySection/>
      <WrapProduct id="product">
        {/* <Product  typeQuery='all'>
        </Product> */}
      </WrapProduct>      
    </Container>
  )
}

export default Homepage;
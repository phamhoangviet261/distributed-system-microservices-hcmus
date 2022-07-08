import styled from 'styled-components';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import Product from '../components/Products';
import StoreTable from '../components/stores/StoreTable';
import NewProduct from '../components/stores/NewProduct';

const Container = styled.div`
    display: flex;
    background-color: #f5f5f5;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 90px;
    width: 100%;
`;

const AddContainer = styled.div`
    margin: 20px auto;
    width: 1200px;
    padding: 20px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 3px;
    animation: show 2s;
`

const AddNew = styled.div`
    min-width: 1200px;
    background-color: #333;
    height: 60px;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    font-weight: bold;
    color: white;
    font-size: 20px;
    text-align: center;
    line-height: 57px;
    cursor: pointer;
    &:hover{
        opacity: 0.9;
        transition: 0.3;
    }
`

const Content = styled.div`
    padding: 30px;
    background-color: #fff;
    border-radius: 3px;
    min-width: 1200px;
    margin: 20px auto;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-bottom: 50px;
`

const Store = () => {

    const [showAdd, setShowAdd] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.getElementById('header').classList.add('changeHeaderColor');
        document.getElementById('center').classList.add('changeColor');
        document.getElementById('brandNameRight').classList.add('changeColorToBlack');
        document.getElementById('shopping-icon').classList.add('changeColorToBlack');
        let menuItem = document.querySelectorAll('.menu-item');
        menuItem.forEach(function (item) {
            item.classList.add('changeColorToBlack');
        });
    }, []);
    return <Container>
        <AddNew onClick={()=>{setShowAdd(!showAdd)}}>Thêm Sản Phẩm Mới</AddNew>
            {showAdd?<AddContainer><NewProduct /></AddContainer>:null}
        <Content>
            <StoreTable />
        </Content>
    </Container>;
};
export default Store;

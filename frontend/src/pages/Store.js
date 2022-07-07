import styled from 'styled-components';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import Product from '../components/Products';
import StoreRegister from '../components/store/register';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 90px;
    width: 100%;
`;

const Store = () => {

    return <StoreRegister>
        
    </StoreRegister>;
};
export default Store;

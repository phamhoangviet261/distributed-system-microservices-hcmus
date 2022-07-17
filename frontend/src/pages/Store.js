import styled from 'styled-components';
import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import ManageProduct from '../components/stores/ManageProduct';
import ManageInvoice from '../components/stores/ManageInvoice';
import ManageInfo from '../components/stores/ManageInfo';

const Container = styled.div`
    display: flex;
    background-color: #f5f5f5;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 90px;
    width: 100%;
`;

const Store = () => {

    

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
        <Switch>
            <Route path="/store/products" exact component={ManageProduct} />
            <Route path="/store/invoices" exact component={ManageInvoice} />
            <Route path="/store/info" exact component={ManageInfo} />
        </Switch>
    </Container>;
};
export default Store;

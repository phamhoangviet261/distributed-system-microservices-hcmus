import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import styled from 'styled-components';

import CategorySection from '../components/CategorySection';
import {productType} from '../mocks/category';
import Products from '../components/Products';
const Container = styled.div`
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    overflow: hidden;
    font-family: sans-serif;
`;

// End banner
const Wrap = styled.div`
    width: 90%;
    display: grid;
    grid-template-columns: 1fr 4fr;
`;

const SubCategory = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    & > h5 {
        font-weight: 600;
    }
`;

const CateItem = styled.li`
    margin-left: 28px;
    padding: 4px 2px;
    cursor: pointer;
    transition: 0.3s all linear;
    font-size: 16px;
    &:hover {
        opacity: 0.7;
        color: blue;
        transform: translateX(2px);
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #000;
    border-bottom: 2px solid transparent;
    &:hover {
        /* border: 2px solid rgb(99,113,198); */
    }
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
        color: #000;
    }
`;

const Category = (props) => {
    const location = useLocation();
    const [cateID, setCateID] = useState(location.pathname.split('/').pop());
    const [subCate, setSubCate] = useState();
    const [categories, setCategories] = useState([]);
    console.log('re-render', subCate);

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

    useEffect(() => {
        let lsp = '';
        switch (cateID) {
            case 'nsp001':
                lsp = 'lsp001';
                break;
            case 'nsp002':
                lsp = 'lsp006';
                break;
            case 'nsp003':
                lsp = 'lsp011';
                break;
            case 'nsp004':
                lsp = 'lsp014';
                break;
            default:
        }
        setSubCate(lsp);
    }, [cateID]);

    useEffect(() => {
        let listSubCate = [];
        listSubCate = productType.filter((item) => item.idProductGroup === cateID);
        console.log('listttttt: ', listSubCate);
        setCategories(listSubCate);
    }, [cateID]);

    useEffect(() => {
        console.log('subCate: ', subCate);
    }, [subCate]);

    return (
        <Container>
            <CategorySection />
            <Wrap>
                <SubCategory>
                    <h5>Danh mục phụ</h5>
                    <ul>
                        {categories.map((item) => {
                            if (item.id === subCate)
                                return (
                                    <CateItem style={{color: 'blue'}} onClick={() => setSubCate(item.id)} key={item.id}>
                                        {item.name}
                                    </CateItem>
                                );
                            else
                                return (
                                    <CateItem onClick={() => setSubCate(item.id)} key={item.id}>
                                        {item.name}
                                    </CateItem>
                                );
                        })}
                    </ul>
                </SubCategory>
                <Products key={subCate} query={subCate} typeQuery="many"></Products>
            </Wrap>
        </Container>
    );
};

export default Category;

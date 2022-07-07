import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import Product from '../components/Products';
import axios from 'axios';
import CategorySection from '../components/CategorySection';
import {productType} from '../mocks/category';

const Container = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    overflow: hidden;
`;

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
        font-weight: bold;
    }
`;

const CateItem = styled.li`
    margin-left: 28px;
    padding: 4px 2px;
    cursor: pointer;
    transition: 0.3s all linear;
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

const Collection = (props) => {
    const location = useLocation();
    let cateID = location.pathname.split('/').pop();
    console.log(cateID);
    const [subCate, setSubCate] = useState();
    const [categories, setCategories] = useState([]);
    console.log('re-render', subCate);

    useEffect(() => {
        let lsp = '';
        switch (cateID) {
            case '1':
                lsp = 'lsp001';
                break;
            case '2':
                lsp = 'lsp006';
                break;
            case '3':
                lsp = 'lsp011';
                break;
            case '4':
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
    }, [cateID]);

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

    // let API_URL = `https://localhost:44352/api/subcategory/many/nsp00${cateID}`;
    // useEffect(() => {
    //     let endpoint = ''
    //     let method = 'GET'
    //     let d = axios({
    //     method,
    //     url: `${API_URL}/${endpoint}`,
    //     data: null
    //     }).catch(err => {
    //     console.log(err);
    //     }).then(res => {
    //         setCategories(res.data)
    //     });
    // }, [])

    return (
        <Container>
            <CategorySection />
            <Wrap>
                <SubCategory>
                    <h5>Danh mục phụ</h5>
                    <ul>
                        {categories.map((item, index) => {
                            if (item.maLoaiSP === subCate)
                                return (
                                    <CateItem style={{color: 'blue'}} onClick={() => setSubCate(item.maLoaiSP)} key={item.maLoaiSP}>
                                        {item.tenLoaiSP}
                                    </CateItem>
                                );
                            else
                                return (
                                    <CateItem onClick={() => setSubCate(item.maLoaiSP)} key={item.maLoaiSP}>
                                        {item.tenLoaiSP}
                                    </CateItem>
                                );
                        })}
                    </ul>
                </SubCategory>
                {/* <Product key={subCate} query={subCate} typeQuery="many"></Product> */}
            </Wrap>
        </Container>
    );
};

export default Collection;

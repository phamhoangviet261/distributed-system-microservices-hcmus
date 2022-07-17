import styled from 'styled-components';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Product from '../components/Products';
import Location from '../components/store/location.json';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 90px;
    width: 100%;
`;

const StoreInfor = styled.div`
    width: 70%;
    background-color: #b2e5e5;
    color: black;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px 50px;
    padding: 50px;
    padding-left: 130px;
    margin-bottom: 30px;
    border-radius: 1em;
    -webkit-box-shadow: -8px 8px 13px -1px rgba(0, 0, 0, 0.54);
    box-shadow: -8px 8px 13px -1px rgba(0, 0, 0, 0.54);
    & > img {
        width: 20%;
        border-radius: 50%;
    }
`;
const StoreInforItem = styled.div`
    & > label,
    span {
        font-size: 18px;
    }
    & > label {
        font-weight: bold;
    }
    & > span {
        padding-left: 12px;
    }
`;
const StoreInfor1 = styled.div`
    width: 80%;
    background-color: #ffd1dc;
    display: flex;
    padding: 20px 100px;
    margin-bottom: 30px;
    border-radius: 1em;
    & > img {
        width: 20%;
        border-radius: 50%;
    }
`;

const StoreImage = styled.img``;

const ListProduct = styled.div`
    width: 60%;
`;

function getAddress(detail, Did, Wid) {
    console.log(detail, Did, Wid);
    let result = '';
    Location.data.forEach((item) => {
        if (item.code == Did) {
            item.wards.forEach((item2) => {
                if (item2.code == Wid) {
                    console.log(detail + ', ' + item2.name + ', ' + item.name);
                    result = `${detail}, ${item2.name}, ${item.name}`;
                }
            });
        }
    });
    console.log('Dia chi: ', result);
    return result;
}

const StoreView = () => {
    let phoneNumber = JSON.parse(localStorage.getItem('UDPTuser')).phoneNumber;
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

    const location = useLocation();
    let storeID = location.pathname.split('/').pop();
    console.log(location.pathname);
    const [data, setData] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [address, setAddress] = useState('');
    useEffect(() => {
        let API_URL = `http://localhost:5000/products/stores/${storeID}`;
        let method = 'GET';
        axios({
            method,
            url: API_URL,
            data: null
        })
            .catch((err) => {
                console.log(err);
            })
            .then((res) => {
                if (res) {
                    let rs = res.data.data;
                    console.log('data ne:', res.data.data);
                    setData(rs);
                    setListProduct(rs.productsDetail);
                    setAddress(getAddress(rs.address.detail, rs.address.districtId, rs.address.wardId));
                }
            });
    }, []);

    return (
        <Container>
            <h2 style={{marginBottom: '30px', marginTop: '20px'}}>
                Thông tin cửa hàng <strong>{data.TenCH}</strong>
            </h2>
            <StoreInfor>
                <StoreInforItem>
                    <label>Mã cửa hàng:</label>
                    <span>{data.id}</span>
                </StoreInforItem>
                <StoreInforItem>
                    <label>Số điện thoại:</label>
                    <span>{phoneNumber}</span>
                </StoreInforItem>
                <StoreInforItem>
                    <label>Tên cửa hàng:</label>
                    <span>{data.name}</span>
                </StoreInforItem>
                <StoreInforItem>
                    <label>E-mail:</label>
                    <span>{data?.email}</span>
                </StoreInforItem>
                <StoreInforItem>
                    <label>Địa chỉ:</label>
                    <span>{address}</span>
                </StoreInforItem>
                <StoreInforItem>
                    <label>Ngày tham gia:</label>
                    <span>{data.createdAt && data.createdAt.slice(0, 10)}</span>
                </StoreInforItem>
            </StoreInfor>

            <h2 style={{marginBottom: '-20px', marginTop: '20px'}}>Danh sách sản phẩm</h2>
            {listProduct && listProduct.length > 0 && (
                <ListProduct>
                    <Product key={listProduct} data={listProduct} typeQuery="store"></Product>
                </ListProduct>
            )}
        </Container>
    );
};
export default StoreView;

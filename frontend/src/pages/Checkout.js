import React, {Component, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {IncreaseQuantity, DecreaseQuantity, DeleteCart} from '../components/actions';
import styled from 'styled-components';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import Location from '../components/store/location.json';

const Container = styled.div`
    display: flex;
    width: 100vw;
    padding: 100px;
`;

const CartSide = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
`;

const ItemInCart = styled.div``;

const ButtonInCart = styled.div`
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 4px;
    border: 1px solid #717fe0;
    text-align: center;
    line-height: 30px;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
        background-color: #717fe0;
    }
`;

const CheckoutSide = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    margin-left: 50px;
    padding-right: 20px;
`;

const CheckoutTitle = styled.h3`
    margin-left: 20px;
    margin-top: 10px;
    font-size: 30px;
    line-height: 1.3;
`;

const Subtotal = styled.div`
    display: flex;
    font-size: 15px;
    line-height: 1.466667;
    border-bottom: 1px solid #e6e6e6;
    padding-top: 10px;
    padding-bottom: 20px;
    & > span {
        width: 40%;
        margin-left: 20px;
    }
`;

const Shipping = styled.div`
    display: flex;
    font-size: 15px;
    line-height: 1.466667;
    border-bottom: 1px solid #e6e6e6;
    padding-top: 10px;
    padding-bottom: 20px;
    & > span {
        width: 40%;
        margin-left: 20px;
    }
`;

const ButtonTotal = styled.div`
    width: 150px;
    height: 40px;
    border: 1px solid #717fe0;
    text-align: center;
    line-height: 40px;
    text-transform: uppercase;
    border-radius: 2em;
    cursor: pointer;
    margin-top: 20px;
    margin-bottom: 10px;
    &:hover {
        background-color: #717fe0;
        color: #fff;
    }
`;

const Total = styled.div`
    display: flex;
    padding-top: 10px;
    padding-bottom: 20px;
    & > span {
        width: 40%;
        margin-left: 20px;
    }
`;

const ButtonCheckout = styled.div`
    width: 150px;
    height: 40px;
    border: 1px solid #717fe0;
    text-align: center;
    line-height: 40px;
    text-transform: uppercase;
    border-radius: 2em;
    cursor: pointer;
    align-self: flex-end;
    margin-bottom: 2px;
    margin-left: 80px;
    margin-top: 18px;
    &:hover {
        background-color: #717fe0;
        color: #fff;
    }
`;
const TableData = styled.td`
    vertical-align: middle !important;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #000;
    background-color: white;
    padding: 4px 10px;
    border-radius: 4px;
    border-bottom: none;
    border: 1px solid #ccc;
    &:hover {
        opacity: 0.6;
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

const Wrapper = styled.div`
    margin-left: 20px;
    margin-bottom: 20px;
    border: 1px solid #e6e6e6;
    padding: 20px;
    border-radius: 4px;
    background-color: #b2e5e5;
`;
const WrapperGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;
const FormGroup = styled.div`
    padding-left: 20px !important;
    padding: 10px 0;
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
const Heading = styled.h3`
    padding-left: 20px;
    margin-bottom: 20px;
`;

function getAddress(detail, Did, Wid) {
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
    return result;
}

function Checkout({items, IncreaseQuantity, DecreaseQuantity, DeleteCart}) {
    //  console.log(items)
    let userID = JSON.parse(localStorage.getItem('UDPTuser')).phoneNumber;
    let userInfo = JSON.parse(localStorage.getItem('UDPTuser'));

    const [address, setAddress] = useState({});
    const [addressFull, setAddressFull] = useState('');
    const [data, setData] = useState();

    const [wardID, setWardID] = useState('');
    let ListCart = [];
    let TotalCart = 0;
    let orderArray = [];
    let totalCount = 0;
    let numbOfStore = new Set();

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
        let API_URL = `http://localhost:5000/accounts/accounts/${userID}`;
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
                    console.log('data: ', res.data.data);
                    let adr = getAddress(res.data.data.address.detail, res.data.data.address.districtId, res.data.data.address.wardId);
                    console.log(adr);
                    setAddressFull(adr);
                    setAddress(res.data.data.address);
                    setData(res.data.data);
                }
            });
    }, []);

    Object.keys(items.Carts).forEach(function (item) {
        TotalCart += items.Carts[item].quantity * items.Carts[item].price;
        ListCart.push(items.Carts[item]);
        // console.log("listcart ne:",ListCart);
        numbOfStore.add(items.Carts[item].storeID);
    });

    (function () {
        console.log('numbOfStore', numbOfStore);
        if (numbOfStore.size > 1) {
            numbOfStore.forEach((item, index) => {
                orderArray.push({
                    storeId: item,
                    user: {
                        id: userInfo.userId,
                        name: userInfo.fullname
                    },
                    phoneNumber: userInfo.phoneNumber,
                    address: userInfo.address,
                    products: [],
                    total: 0
                });
            });

            if (orderArray.length > 0) {
                orderArray.forEach((item, index) => {
                    ListCart.forEach((item2, index2) => {
                        if (item2.storeID === item.storeId) {
                            item.products = [...item.products, item2];
                            item.total += (item2.price - 0) * (item2.quantity - 0);
                        }
                    });
                });
            }
            totalCount = (numbOfStore.size - 0) * 20000;
        } else {
            orderArray.push({
                storeId: [...numbOfStore][0],
                products: [],
                total: 0
            });
            if (orderArray.length > 0) {
                orderArray.forEach((item, index) => {
                    ListCart.forEach((item2, index2) => {
                        if (item2.storeID === item.storeId) {
                            item.products = [...item.products, item2];
                            item.total += (item2.price - 0) * (item2.quantity - 0);
                        }
                    });
                });
            }
            totalCount = (numbOfStore.size - 0) * 20000;
        }
        console.log('hehe:', orderArray);
    })();

    function callAPI(value) {
        console.log(JSON.stringify(value));
        axios({
            method: 'POST',
            url: 'http://localhost:5000/invoices/invoices/add',
            data: value
        })
            .then(function (res) {
                console.log('res.data: ', res.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    async function handleOrder(values) {
        console.log('orderArray: ', orderArray.length);
        for (let i = 0; i < orderArray.length; i++) {
            let item = orderArray[i];
            console.log('item: ', item);
            let value = {
                ...item,
                products: []
            };
            for (let i2 = 0; i2 < item.products.length; i2++) {
                let item2 = item.products[i2];
                value.products.push({
                    productId: item2.id,
                    quantity: `${item2.quantity}`
                });
            }
            console.log('value ne : ', value);

            let x = await callAPI(value);
        }
        localStorage.removeItem('UserCart');
        window.location.href = '/';
        window.location.reload();

        // orderArray.forEach(async (item,index)=>{

        // })
    }

    function TotalPrice(price, tonggia) {
        return Number(price * tonggia).toLocaleString('en-US');
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [ListCart]);
    if (ListCart.length !== 0)
        return (
            <Container>
                <CartSide className="row">
                    <Heading>Thông tin khách hàng</Heading>
                    <Wrapper>
                        <WrapperGrid>
                            <FormGroup>
                                <label>Tên khách hàng:</label>
                                <span>{data?.name}</span>
                            </FormGroup>
                            <FormGroup>
                                <label>Số điện thoại:</label>
                                <span>{data?.phoneNumber}</span>
                            </FormGroup>
                        </WrapperGrid>
                        <FormGroup>
                            <label>Địa chỉ:</label>
                            <span>{addressFull}</span>
                            <StyledLink style={{marginLeft: '30px'}} to={'/aboutme/' + userID}>
                                Thay đổi
                            </StyledLink>
                        </FormGroup>
                        <FormGroup>
                            <label>Hình thức thanh toán:</label>
                            <span>Thanh toán khi nhận hàng</span>
                        </FormGroup>
                    </Wrapper>
                    <Heading>Danh sách đơn hàng</Heading>
                    <Wrapper>
                        {orderArray.length > 0 && (
                            <table style={{width: '95%', marginLeft: '20px', borderBottom: 'solid 2px #ccc'}}>
                                <thead>
                                    <tr style={{height: '36px', borderBottom: 'solid 1px #ccc'}}>
                                        <th scope="col">STT</th>
                                        <th scope="col">Mã cửa hàng</th>
                                        <th scope="col">Số tiền</th>
                                        <th scope="col">Phí ship</th>
                                        <th style={{textAlign: 'right'}} scope="col">
                                            Tổng giá
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderArray.map((item, index) => {
                                        return (
                                            <tr style={{height: '60px', borderBottom: 'solid 1px #d7d7d7'}} key={index}>
                                                <th style={{minWidth: '100px'}} scope="row">
                                                    {index + 1}
                                                </th>
                                                <td>{item.storeId}</td>
                                                <td>{item.total} VNĐ</td>
                                                <td>20000 VNĐ</td>
                                                <td style={{textAlign: 'right'}}>{item.totalOrder + 20000} VNĐ</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </Wrapper>
                </CartSide>
                <CheckoutSide>
                    <Heading>Tổng Đơn Hàng</Heading>
                    <Wrapper style={{padding: '30px 20px'}}>
                        <Subtotal>
                            <span style={{fontWeight: 'bold'}}>Tạm tính:</span>
                            <span>{Number(TotalCart).toLocaleString('en-US')} VNĐ</span>
                        </Subtotal>
                        <Shipping>
                            <span style={{fontWeight: 'bold'}}>Shipping: </span>
                            <span>{Number(totalCount).toLocaleString('en-US')} VNĐ</span>
                        </Shipping>

                        <Total>
                            <span style={{fontWeight: 'bold'}}>Tổng:</span>
                            <span>{Number(TotalCart + totalCount).toLocaleString('en-US')} VNĐ</span>
                        </Total>

                        <ButtonCheckout onClick={handleOrder}>Đặt hàng</ButtonCheckout>
                    </Wrapper>
                </CheckoutSide>
            </Container>
        );
    else
        return (
            <div
                style={{
                    width: '100%',
                    height: '490px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <i>Giỏ hàng trống</i>
            </div>
        );
}
const mapStateToProps = (state) => {
    //  console.log(state)
    return {
        items: state._todoProduct
    };
};
export default connect(mapStateToProps, {
    IncreaseQuantity,
    DecreaseQuantity,
    DeleteCart
})(Checkout);

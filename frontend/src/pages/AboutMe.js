import styled from 'styled-components';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import Order from '../components/Order';
import Information from '../components/Information';
import Address from '../components/Address';
import AddressRegister from '../components/store/AddressRegister';
const Container = styled.div`
    display: flex;
    width: 100%;
    padding: 90px 100px 60px 100px;
`;
const WrapLeft = styled.div`
    width: 300px;
    background-color: #b2e5e5;
    border-radius: 4px;
`;
const WrapRight = styled.div`
    flex: 1;
    margin-left: 50px;
`;
const WrapRightChild = styled.div`
    width: 90%;
    background-color: #b2e5e5;
    border-radius: 4px;
    padding-bottom: 50px;
`;

const WrapItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;
const UlTag = styled.ul`
    margin-top: 10px;
    list-style: none;
`;
const Heading = styled.h3`
    padding-left: 10px;
    margin-bottom: 20px;
    padding-top: 20px;
    font-size: 24px;
`;
const LiTag = styled.li`
    padding: 6px 0 6px 10px;
    cursor: pointer;
    border-radius: 6px 0 0 6px;
    font-size: 18px;
    margin-bottom: 6px;
    transition: all 0.2s linear;
    &:hover {
        opacity: 0.6;
    }
`;

const FormGroup = styled.div`
    font-size: 16px;
    margin-top: 12px;
    input {
        margin-left: 16px;
        border-radius: 6px;
        outline: none;
        border: 1px solid #fff;
        padding: 5px 12px;
        width: 500px;
    }
`;

const BtnOK = styled.div`
    color: #000;
    padding: 10px 40px;
    margin: 30px auto 0;
    transform: translateX(-50%);
    cursor: pointer;
    border-radius: 6px;

    text-align: center;
    border: 1px solid #1f1f1f;
    font-size: 1.2em;
    outline: none;
    margin-bottom: 50px;
    margin-top: 20px;
    &:hover {
        background-color: #4c4c4b;
        color: white;
    }
    &:hover {
        opacity: 0.7;
    }
`;

const AboutMe = () => {
    const location = useLocation();
    // let userID = location.pathname.split("/").pop();
    let userID = JSON.parse(localStorage.getItem('UDPTuser')).phoneNumber;
    let userInfo = JSON.parse(localStorage.getItem('UDPTuser'));
    let typeToShow = location.pathname.split('/')[1];
    const [districtID, setDistrictID] = useState(0);
    const [wardID, setWardID] = useState(0);
    const [addressDetail, setAddressDetail] = useState('');

    const [typeInfo, setTypeInfo] = useState(1);

    const updateDistrictID = (ID) => {
        setDistrictID(ID);
    };

    const updateWardID = (ID) => {
        setWardID(ID);
    };

    const handleSubmitAddress = () => {
        let value = {
            id: userInfo.userId,
            address: {
                detail: addressDetail,
                districtId: districtID,
                wardId: wardID
            }
        };
        axios({
            method: 'post',
            url: 'http://localhost:5000/accounts/accounts/update',
            data: value
        })
            .then(function (res) {
                if (res.data) {
                    console.log('res.data: ', res.data);
                    setTypeInfo(1);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
        console.log(value);
    };

    useEffect(() => {
        setAddressDetail('');
    }, [typeInfo]);

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

    return (
        <>
            <Container>
                <WrapLeft>
                    <Heading style={{textAlign: 'center'}}>{userInfo.fullname}</Heading>
                    <UlTag>
                        {typeInfo == 1 ? (
                            <>
                                <LiTag style={{backgroundColor: '#4c4c4b', color: 'white'}}>Thông tin của tôi</LiTag>
                                <LiTag
                                    onClick={() => {
                                        console.log(2);
                                        setTypeInfo(2);
                                    }}
                                >
                                    Đơn hàng của tôi
                                </LiTag>
                                <LiTag
                                    onClick={() => {
                                        console.log(3);
                                        setTypeInfo(3);
                                    }}
                                >
                                    Địa chỉ của tôi
                                </LiTag>
                            </>
                        ) : typeInfo == 2 ? (
                            <>
                                <LiTag
                                    onClick={() => {
                                        console.log(1);
                                        setTypeInfo(1);
                                    }}
                                >
                                    Thông tin của tôi
                                </LiTag>
                                <LiTag style={{backgroundColor: '#4c4c4b', color: 'white'}}>Đơn hàng của tôi</LiTag>
                                <LiTag
                                    onClick={() => {
                                        console.log(3);
                                        setTypeInfo(3);
                                    }}
                                >
                                    Địa chỉ của tôi
                                </LiTag>
                            </>
                        ) : typeInfo == 3 ? (
                            <>
                                <LiTag
                                    onClick={() => {
                                        console.log(1);
                                        setTypeInfo(1);
                                    }}
                                >
                                    Thông tin của tôi
                                </LiTag>
                                <LiTag
                                    onClick={() => {
                                        console.log(2);
                                        setTypeInfo(2);
                                    }}
                                >
                                    Đơn hàng của tôi
                                </LiTag>
                                <LiTag style={{backgroundColor: '#4c4c4b', color: 'white'}}>Địa chỉ của tôi</LiTag>
                            </>
                        ) : (
                            <></>
                        )}
                    </UlTag>
                </WrapLeft>

                <WrapRight>
                    <WrapRightChild>
                        {typeInfo == 1 && (
                            <WrapItem>
                                <Information userID={userID}></Information>
                            </WrapItem>
                        )}
                        {typeInfo == 2 && (
                            <WrapItem>
                                <Order userID={userID}></Order>
                            </WrapItem>
                        )}

                        {typeInfo == 3 && (
                            <WrapItem style={{marginLeft: '40px'}}>
                                <Address userID={userID}></Address>
                                <AddressRegister wardID={wardID} setWardID={updateWardID} districtID={districtID} setDistrictID={updateDistrictID} />
                                <FormGroup>
                                    <label htmlFor="address-detail">Địa chỉ chi tiết:</label>
                                    <input type="text" name="address-detail" value={addressDetail} onChange={(e) => setAddressDetail(e.target.value)} />
                                </FormGroup>
                                <BtnOK onClick={handleSubmitAddress}>Thay đổi</BtnOK>
                            </WrapItem>
                        )}
                    </WrapRightChild>
                </WrapRight>
            </Container>
        </>
    );
};

export default AboutMe;

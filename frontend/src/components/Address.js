import React, {useEffect, useState, useRef} from 'react';
import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Location from './store/location.json';

const Wrap = styled.div`
    width: 100%;
`;
const Heading = styled.h3`
    padding-left: 10px;
    margin-bottom: 20px;
    padding-top: 20px;
    font-size: 26px;
`;

const FormGroup = styled.div`
    margin-bottom: 10px;
    margin-right: 125px;
    border-radius: 5px;
    & > label,
    span {
        font-size: 18px;
    }
    & > label {
        font-weight: bold;
    }
    & > span {
        padding-left: 16px;
    }
    background-color: #fff;
    line-height: 38px;
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

const Address = ({userID}) => {
    const [address, setAddress] = useState('');

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
                    setAddress(adr);
                }
            });
    }, [userID]);

    return (
        <>
            <Wrap>
                <Heading style={{marginLeft: '16px'}}>Địa chỉ hiện tại:</Heading>
                <FormGroup>
                    <span>{address}</span>
                </FormGroup>
                <Heading style={{marginLeft: '16px'}}>Thay đổi địa chỉ</Heading>
            </Wrap>
        </>
    );
};

export default Address;

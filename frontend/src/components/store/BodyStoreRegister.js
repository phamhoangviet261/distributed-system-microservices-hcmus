import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import AddressRegister from './AddressRegister'
import myUrl from '../../domain'

const Container = styled.div`
    width: 700px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
`

const Name = styled.div`

`

const Address = styled.div`

`

const Email = styled.div`

`

const Phone = styled.div`

`

const Label = styled.label`
    width: 115px;
    margin-right: 10px;
    text-align: right;
`

const Input = styled.input`
    outline: none;
    border-radius: 3px;
    border: 1px solid #ccc;
    padding: 3px 7px;
    width: calc(100% - 125px);
    &[disabled]{
        cursor: not-allowed;
        color: #bbb;
    }
`

const AddressDetail = styled.div`

`

const Describe = styled.div`

`

function BodyStoreRegister({click}) {

    const [name, setName] = useState("");
    const [describe, setDescribe] = useState("");
    const [districtID, setDistrictID] = useState(0);
    const [wardID, setWardID] = useState(0);
    const [detail, setDetail] = useState("");

    const [user, setUser] = useState([]);

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem("UDPTuser")));
    }, [])

    const updateDistrictID = (ID) => {
        setDistrictID(ID);
    }

    const updateWardID = (ID) => {
        setWardID(ID);
    }

    useEffect(()=>{
        if (click){
            HandleSubmit();
        }
    }, [click])

    const HandleSubmit = () => {
        let value = {
            name,
            description: describe,
            ownerId: user.userId,
            address: {
                districtId: districtID,
                wardId: wardID,
                detail
            },
            products: [],
            invoices: [],
            status: "active"
        }

        axios({
            method: 'post',
            url: `${myUrl}/products/stores/add`,
            data: value
        })
            .then(function (res) {
                setUser({
                    ...user,
                    storeId: res.data.data.id,
                    storeName: res.data.data.name,
                })
                window.localStorage.setItem('UDPTuser', user);
                window.location = "/store/products"
            })
            .catch(function (err) {
                console.log(err);
            });
        
        
    }


  return (
    <Container>
        <Name>
            <Label htmlFor='name'>Tên Shop</Label>
            <Input type="text" id='name' placeholder='Nhập vào' value={name} onChange={(e)=>{setName(e.target.value)}}/>
        </Name>
        <Describe>
            <Label htmlFor='describe'>Mô tả</Label>
            <Input type="text" id='describe' placeholder='Nhập vào' value={describe} onChange={(e)=>{setDescribe(e.target.value)}}/>
        </Describe>
        <Address>
            <Label>Địa chỉ lấy hàng</Label>
            <AddressRegister wardID={wardID} setWardID={updateWardID} districtID={districtID} setDistrictID={updateDistrictID} />
        </Address>
        <AddressDetail>
            <Label htmlFor='detail'>Địa chỉ chi tiết</Label>
            <Input type="text" id='detail' placeholder='Nhập vào' value={detail} onChange={(e)=>{setDetail(e.target.value)}}/>
        </AddressDetail>
        <Email>
            <Label>Email</Label>
            <Input value="email@gmail.com" disabled/>
        </Email>
        <Phone>
            <Label>Số điện thoại</Label>
            <Input value={user.phoneNumber} disabled/>
        </Phone>
    </Container>
  )
}

export default BodyStoreRegister
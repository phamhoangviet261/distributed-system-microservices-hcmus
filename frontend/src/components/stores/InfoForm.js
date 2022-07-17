import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import AddressRegister from '../store/AddressRegister'
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

function InfoForm() {
    const [name, setName] = useState("");
    const [describe, setDescribe] = useState("");
    const [districtID, setDistrictID] = useState(0);
    const [wardID, setWardID] = useState(0);
    const [detail, setDetail] = useState("");

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("UDPTuser")));


    useEffect(()=>{
        axios({
          method: "GET",
          url: `${myUrl}/products/stores/${user.storeId}`,
      })
          .catch((err) => {
              console.log(err);
          })
          .then((res) => {
            console.log(res)
            if (res){
                setName(res.data.data.name);
                setDescribe(res.data.data.description)
                setDetail(res.data.data.address.detail)
                setDistrictID(res.data.data.address.districtId)
                setWardID(res.data.data.address.wardId)
            }
        });
      },[])

    const updateDistrictID = (ID) => {
        setDistrictID(ID);
    }

    const updateWardID = (ID) => {
        setWardID(ID);
    }

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
            {districtID != 0 ? <AddressRegister wardID={wardID} setWardID={updateWardID} districtID={districtID} setDistrictID={updateDistrictID} /> : <div></div>}
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

export default InfoForm
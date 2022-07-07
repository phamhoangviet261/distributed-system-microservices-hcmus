import React from 'react'
import styled from 'styled-components'
import AddressRegister from './AddressRegister'

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

function BodyStoreRegister() {
  return (
    <Container>
        <Name>
            <Label htmlFor='name'>Tên Shop</Label>
            <Input type="text" id='name' placeholder='Nhập vào'/>
        </Name>
        <Address>
            <Label>Địa chỉ lấy hàng</Label>
            <AddressRegister />
        </Address>
        <Email>
            <Label>Email</Label>
            <Input value="tranquocthinh.t2.15cla@gmail.com" disabled/>
        </Email>
        <Phone>
            <Label>Số điện thoại</Label>
            <Input value="0845644566" disabled/>
        </Phone>
    </Container>
  )
}

export default BodyStoreRegister
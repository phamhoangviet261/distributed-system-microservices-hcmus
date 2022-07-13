import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Container = styled.div`
  position: fixed;
  top: 100px;
  left: 30px;
  background: #000;
  border-radius: 3px;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  padding: 5px 20px;
  &:hover{
    opacity: 0.7;
    transition: 0.3s;
  }
`

function Sidebar(props) {
  return (
    <Container>
      {props.invoices?<Link to="/store/invoices">Quản Lý Đơn Hàng</Link>:<Link to="/store/products">Quản Lý Sản Phẩm</Link>}
    </Container>
  )
}

export default Sidebar
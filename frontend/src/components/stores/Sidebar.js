import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import AssignmentIcon from '@mui/icons-material/Assignment';
import CategoryIcon from '@mui/icons-material/Category';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const Container = styled.div`
  position: fixed;
  top: 100px;
  left: 30px;
  border-radius: 3px;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  
`

const Row = styled.div`
  margin: 30px auto;
  background: #000;
  border-radius: 50px;
  padding: 10px 10px;
  width: 50px;
  height: 50px;
  text-align: center;
  &:hover{
    opacity: 0.7;
    transition: 0.3s;
  }
`


function Sidebar(props) {
  return (
    <Container>
      <Row><Link to="/store/products"><CategoryIcon /></Link></Row>
      
      <Row><Link to="/store/invoices"><AssignmentIcon /></Link></Row>

      {/* <Row><Link to="/store/info"><PermIdentityIcon /></Link></Row> */}
    </Container>
  )
}

export default Sidebar
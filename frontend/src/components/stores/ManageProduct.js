import React from 'react'
import {useState} from 'react';
import NewProduct from './NewProduct';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import StoreTable from './StoreTable';

const AddContainer = styled.div`
    margin: 20px auto;
    width: 1200px;
    padding: 20px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 3px;
    animation: show 2s ease;
`

const AddNew = styled.div`
    min-width: 1200px;
    background-color: #333;
    height: 60px;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    font-weight: bold;
    color: white;
    font-size: 20px;
    text-align: center;
    line-height: 57px;
    cursor: pointer;
    &:hover{
        opacity: 0.9;
        transition: 0.3;
    }
`

const Content = styled.div`
    padding: 30px;
    background-color: #fff;
    border-radius: 3px;
    min-width: 1200px;
    margin: 20px auto;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-bottom: 50px;
`

function ManageProduct() {

    const [showAdd, setShowAdd] = useState(0);
  return (
    <div>
          <Sidebar invoices/>
          <AddNew onClick={() => { setShowAdd(!showAdd) }}>Thêm Sản Phẩm Mới</AddNew>
          {showAdd ? <AddContainer><NewProduct /></AddContainer> : null}
          <Content>
              <StoreTable />
          </Content>
    </div>
  )
}

export default ManageProduct
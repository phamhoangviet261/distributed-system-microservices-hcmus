import { ImportExport } from '@material-ui/icons'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import {productType, productGroup} from '../../mocks/category'

const Container = styled.div`
    padding: 40px;
`

const Head = styled.div`

`

const Title = styled.div`
    font-size: 22px;
`

const SubTitle = styled.div`
    font-size: 12px;
    color: #999;
`

const ProductName = styled.div`
    display: flex;
`

const Label = styled.label`
    font-size: 14px;
    margin-right: 15px;
    align-self: center;
`

const Input = styled.input`
    flex: 1;
    padding: 7px 10px;
    outline: none;
    border: solid 1px #ccc;
    border-radius: 3px;
`

const Category = styled.div`
    background: #fafafa;
    padding: 24px;
    display: flex;
    justify-content: center;
    margin: 30px 0;
`

const CategoryGroup = styled.div`
    background: #fff;
    width: 300px;
    height: 320px;
    overflow-y: scroll;
`

const CategoryItem = styled.div`
    margin: 10px 0;
    padding: 0 20px;
    cursor: pointer;
    width: 100%;
    line-height: 30px;
    &:hover{
        background: #f6f6f6;
    }
    &.active{
        font-weight: bold;
    }
`

const Selected = styled.div`
    & span:nth-child(2){
        font-weight: bold;
    }
`


function BodyStoreRegister3({click}) {

    const [group, setGroup] = useState(productGroup[0]);
    const [type, setType] = useState({});

    console.log(productGroup);
    console.log(productType);
  return (
    <Container>
        <Head>
            <Title>Thêm 1 sản phẩm mới</Title>
            <SubTitle>Vui lòng chọn ngành hàng phù hợp cho sản phẩm của bạn.</SubTitle>
        </Head>
        <hr />
        <ProductName>
            <Label>Tên sản phẩm:</Label>
            <Input placeholder='Nhập vào'/>
        </ProductName>
        <Category>
            <CategoryGroup>
                {productGroup.map((item, index)=>(
                    <CategoryItem className={item.id == group.id?"active":""} key={index} onClick={()=>{setGroup(item); setType({})}}>{item.name}</CategoryItem>
                ))}
            </CategoryGroup>
            <hr />
            <CategoryGroup>
                {productType.map((item, index)=>{
                    if (item.idProductGroup == group.id){
                        return <CategoryItem className={item.id == type.id?"active":""} key={index} onClick={()=>{setType(item)}}>{item.name}</CategoryItem>
                    }
                })}
            </CategoryGroup>
        </Category>
        <Selected>
            <span>Đã chọn: </span>
            <span>{group.name} / {type.name}</span>
        </Selected>
    </Container>
  )
}

export default BodyStoreRegister3
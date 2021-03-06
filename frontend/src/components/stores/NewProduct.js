import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import {productType, productGroup} from '../../mocks/category'
import myUrl from '../../domain'

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

const ProductDescribe = styled.div`
    display: flex;
    margin-top: 20px;
`

const ProductPrice = styled.div`
    display: flex;
    margin-top: 20px;
`

const ProductRest = styled.div`
    display: flex;
    margin-top: 20px;
`

const ProductImg = styled.div`
    display: flex;
    margin-top: 20px;
`

const Label = styled.label`
    font-size: 14px;
    margin-right: 15px;
    align-self: center;
    min-width: 100px;
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

const Confirm = styled.div`
    padding: 8px 13px;
    border-radius: 3px;
    background-color: #000;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    float: right;
    &:hover{
        opacity: 0.8;
        transition: 0.3;
    }
    width: fit-content;
`

function NewProduct() {

    const [group, setGroup] = useState(productGroup[0]);
    const [type, setType] = useState({});
    const user = JSON.parse(localStorage.getItem("UDPTuser"))

    const [name, setName] = useState();
    const [describe, setDescribe] = useState();
    const [price, setPrice] = useState();
    const [rest, setRest] = useState();
    const [img, setImg] = useState();

    const HandleSubmit = () => {


        let data = {
            name,
            description: describe,
            linkImg: img,
            price: price,
            sold: 0,
            rest: rest,
            discount: 10,
            NSX: "2022-7-7",
            HSD: "2023-12-1",
            rating: 0,
            reviews: 0,
            storeId: user.storeId,
            storeName: user.storeName,
            lsp: type.id
        }

        console.log(data);
        axios({
            method: 'post',
            url: `${myUrl}/products/products/add`,
            data
        })
            .then(function (res) {
                console.log(res);
            })
            .catch(function (err) {
                console.log(err);
            });

    }

  return (
    <Container>
        <Head>
            <Title>Th??m 1 s???n ph???m m???i</Title>
            <SubTitle>Vui l??ng ch???n ng??nh h??ng ph?? h???p cho s???n ph???m c???a b???n.</SubTitle>
        </Head>
        <hr />
        <ProductName>
            <Label htmlFor='name'>T??n s???n ph???m:</Label>
            <Input id='name' placeholder='Nh???p v??o' value={name} onChange={(e)=>{setName(e.currentTarget.value)}}/>
        </ProductName>
        <ProductDescribe>
            <Label htmlFor='describe'>M?? t???:</Label>
            <Input id='describe' placeholder='Nh???p v??o' value={describe} onChange={(e)=>{setDescribe(e.currentTarget.value)}}/>
        </ProductDescribe>
        <ProductPrice>
            <Label htmlFor='price'>Gi?? s???n ph???m:</Label>
            <Input id='price' placeholder='Nh???p v??o' type={"number"} value={price} onChange={(e)=>{setPrice(e.currentTarget.value)}}/>
        </ProductPrice>
        <ProductRest>
            <Label htmlFor='rest'>T???n kho:</Label>
            <Input id='rest' placeholder='Nh???p v??o' type={"number"} value={rest} onChange={(e)=>{setRest(e.currentTarget.value)}}/>
        </ProductRest>
        <ProductImg>
            <Label htmlFor='img'>H??nh ???nh:</Label>
            <Input id='img' placeholder='Nh???p v??o' type={"text"} value={img} onChange={(e)=>{setImg(e.currentTarget.value)}}/>
        </ProductImg>
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
            <span>???? ch???n: </span>
            <span>{group.name} / {type.name}</span>
        </Selected>
        <Confirm onClick={HandleSubmit}>X??c Nh???n</Confirm>
    </Container>
  )
}

export default NewProduct
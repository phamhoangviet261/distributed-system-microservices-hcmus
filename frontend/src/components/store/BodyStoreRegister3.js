import React from 'react'
import styled from 'styled-components'

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
`

const Selected = styled.div`

`


function BodyStoreRegister3() {
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
                <CategoryItem>Category</CategoryItem>
                <CategoryItem>Category</CategoryItem>
                <CategoryItem>Category</CategoryItem>
                <CategoryItem>Category</CategoryItem>
                <CategoryItem>Category</CategoryItem>
                <CategoryItem>Category</CategoryItem>
            </CategoryGroup>
            <hr />
            <CategoryGroup>
                <CategoryItem>Category 2</CategoryItem>
                <CategoryItem>Category 2</CategoryItem>
                <CategoryItem>Category 2</CategoryItem>
                <CategoryItem>Category 2</CategoryItem>
                <CategoryItem>Category 2</CategoryItem>
                <CategoryItem>Category 2</CategoryItem>
            </CategoryGroup>
        </Category>
        <Selected>
            <span>Đã chọn: </span>
            <span>ABCDE</span>
        </Selected>
    </Container>
  )
}

export default BodyStoreRegister3
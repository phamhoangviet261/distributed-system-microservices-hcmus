import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import BodyStoreRegister from "./BodyStoreRegister";
import BodyStoreRegister3 from "./BodyStoreRegister3";

const Container = styled.div`
    padding-top: 90px;
    background-color: #f6f6f6;
    width: 100%;
`

const Content = styled.div`
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 12%);
    width: 70%;
    min-width: 1200px;
    border-radius: 3px;
    margin: 30px auto 100px;
    padding: 30px 20px;
`

const HeaderStoreRegister = styled.div`
    display: flex;
    justify-content: space-around;
`

const Step = styled.div`
    color: #b7b7b7;
    &.active {
        color: black;
        font-weight: bold;
    }
`

const Dot = styled.div`
    font-size: 42px;
    text-align: center;
    margin-bottom: -15px;
`

const StepText = styled.div`
    font-size: 16px;
`

const FooterStoreRegister = styled.div`
    display: flex;  
    justify-content: flex-end;
    gap: 10px;
`

const Cancel = styled.div`
    border-radius: 3px;
    padding: 10px 12px;
    cursor: pointer;
    border: solid 1px #ccc;
    font-weight: bold;
    &:hover{
        background-color: rgba(0,0,0,.04);
    }
`

const Continue = styled.div`
    padding: 10px 12px;
    border-radius: 3px;
    font-weight: bold;
    cursor: pointer;
    color: white;
    background-color: black;
    &:hover{
        opacity: 0.7;
    }
`



const StoreRegister = () => {


    useEffect(() => {
        window.scrollTo(0, 0);
        document.getElementById('header').classList.add('changeHeaderColor');
        document.getElementById('center').classList.add('changeColor');
        document.getElementById('brandNameRight').classList.add('changeColorToBlack');
        document.getElementById('shopping-icon').classList.add('changeColorToBlack');
        let menuItem = document.querySelectorAll('.menu-item');
        menuItem.forEach(function (item) {
            item.classList.add('changeColorToBlack');
        });
    }, []);

    const [step, setStep] = useState(1);
    const [click, setClick] = useState(0);

    return <Container>
        <Content>
            <HeaderStoreRegister>
                <Step className={step === 1?"active":""}>
                    <Dot>•</Dot>
                    <StepText>Cài đặt thông tin cửa hàng</StepText>
                </Step>
            </HeaderStoreRegister>
            <hr />
            <BodyStoreRegister click={click}/>
            <hr />
            <FooterStoreRegister>
                <Cancel>Huỷ bỏ</Cancel>
                <Continue onClick={()=>{setClick(click+1); setTimeout(()=>{setStep(3)}, 100)}}>Tiếp theo</Continue>
            </FooterStoreRegister>
        </Content>
    </Container>;
};

export default StoreRegister;

import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import Location from './location.json'

const Container = styled.div`
    position: relative;
    width: calc(100% - 125px);
    display: inline-block;
`

const AddressInput = styled.div`
    position: relative;
    width: 100%;
    border: solid 1px #ccc;
    padding: 3px 7px;
    border-radius: 3px;
    cursor: pointer;
    &::after{
        content: ">";
        font-size: 24px;
        transform: rotate(90deg);
        position: absolute;
        right: 10px;
        top: -3px;
    }
`

const AddressSelector = styled.div`
    position: absolute;
    background-color: white;
    padding: 15px;
    margin-top: 4px;
    box-shadow: 0 0 4px 0 rgb(0 0 0 / 5%), 0 8px 8px 0 rgb(0 0 0 / 9%);
    width: 100%;
`

const SelectorHeader = styled.div`
    display: flex;
    background-color: #f6f6f6;
    border-radius: 3px;
`

const SelectorLabel = styled.div`
    border: none;
    outline: none;
    color: #aaa;
    width: 33.33%;
    text-align: center;
    padding: 3px 0; 
    cursor: pointer;
    &.active{
        background-color: #edf9f7;
        color: #00bfa5;
    }

    &.disabled{
        pointer-events: none;
    }
`

const SelectorBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    max-height: 300px;
    overflow-y: scroll;
`

const SelectorItem = styled.div`
    padding: 3px 10px;
    margin: 5px 0;
    cursor: pointer;
    border-radius: 3px;
    &:hover{
        background-color: #edf9f7;
        color: #00bfa5;
    }
    &.active{
        background-color: #00bfa5;
        color: #fff;
    }
`

function AddressRegister() {

    const [active, setActive] = useState(1);
    const [show, setShow] = useState(0);
    const [listProvince, setListProvince] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listWard, setListWard] = useState([]);

    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setWard] = useState("");

    useEffect(()=>{
        let temp = [];
        for (let item of Location.data){
                temp.push(item.name);
        }
        setListProvince([...temp]);
    },[])

    useEffect(()=>{
        Location.data.forEach(item => {
            if (item.name == province) {
                setListDistrict(item.districts);
            }
            
        })
    }, [province])

    useEffect(()=>{
        listDistrict.forEach(item => {
            if (item.name == district) {
                setListWard(item.wards);
            }
        })
    }, [district])


    const HandleShow = ()=>{
        setShow(!show);
    }

  return (
    <Container>
        <AddressInput onClick={HandleShow}>{province ==""?"Nhấp chọn địa chỉ":`${province} / ${district} / ${ward}`}</AddressInput>
        {show?<AddressSelector>
            <SelectorHeader>
                <SelectorLabel onClick={()=>{setActive(1)}} className={active === 1?"active":""} style={{borderTopLeftRadius: "3px", borderBottomLeftRadius: "3px"}}>Tỉnh/Thành phố</SelectorLabel>
                <SelectorLabel onClick={()=>{setActive(2)}} className={`${active === 2?"active":""} ${province==""?"disabled":""}`}>Quận/Huyện</SelectorLabel>
                <SelectorLabel onClick={()=>{setActive(3)}} className={`${active === 3?"active":""} ${district==""?"disabled":""}`} style={{borderTopRightRadius: "3px", borderBottomRightRadius: "3px"}}>Phường/Xã</SelectorLabel>
            </SelectorHeader>
            {active === 1?<SelectorBody>
                {listProvince.length > 0 && listProvince.map((item, index)=>(
                    <SelectorItem className={item==province?"active":""} key={index} onClick={()=>{setProvince(item); setDistrict(""); setWard("")}}>{item}</SelectorItem>
                ))}
            </SelectorBody>:null}
            {active === 2?<SelectorBody>
                {listDistrict.length > 0 && listDistrict.map((item, index)=>(
                    <SelectorItem className={item.name==district?"active":""} key={index} onClick={()=>{setDistrict(item.name); setWard("")}}>{item.name}</SelectorItem>
                ))}
            </SelectorBody>:null}
            {active === 3?<SelectorBody>
                {listWard.length > 0 && listWard.map((item, index)=>(
                    <SelectorItem className={item.name==ward?"active":""} key={index} onClick={()=>{setWard(item.name)}}>{item.name}</SelectorItem>
                ))}
            </SelectorBody>:null}
        </AddressSelector>:null}
    </Container>
  )
}

export default AddressRegister
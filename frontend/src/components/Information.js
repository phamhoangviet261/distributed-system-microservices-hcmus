import React, {useEffect, useState, useRef} from 'react';
import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';
import axios from 'axios';
const Container = styled.div`
    width: 100%;
`;
const Heading = styled.h3`
    padding-left: 10px;
    margin-bottom: 20px;
    padding-top: 20px;
`;

const FormGroup = styled.div`
    display: flex;
    padding: 10px 10px 10px 60px;
`;
const Submit = styled.div`
    display: inline-block;
    text-align: center;
    border: 1px solid #1f1f1f;
    /* background-color: ; */
    color: #000;
    font-size: 1.2em;
    border-radius: 6px;
    padding: 8px;
    width: 200px;
    cursor: pointer;
    outline: none;
    margin-bottom: 50px;
    margin-left: 260px;
    margin-top: 20px;
    &:hover {
        background-color: #4c4c4b;
        color: white;
    }
`;

const Label = styled.label`
    width: 200px;
    font-weight: bold;
    display: inline-block;
    height: 34px;
    line-height: 34px;
`;
const Input = styled.input`
    width: 500px;
    padding: 4px 0;
    padding-left: 10px;
    outline: none;
    border-radius: 4px;
    border: solid 1px #ccc;
    &:hover {
        border: solid 1px #277ce5;
    }
    &:focus {
        outline: solid 1px #277ce5;
    }
`;

const SelectTag = styled.select`
    min-width: 100px;
    width: 200px;
    text-align: left;
    padding: 0 10px;
    border-radius: 4px;
    height: 42px;
    &:hover {
        border: solid 1px #277ce5;
    }
    &:focus {
        outline: solid 1px #277ce5;
    }
`;

const ResultForm = styled.div`
    position: absolute;
    z-index: 9;
    width: 400px;
    top: 300px;
    left: 50%;
    transform: translateX(-50%);
    padding: 100px 50px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    & > h2 {
        font-size: 20px;
        margin-bottom: 20px;
    }
    & > .btn-result {
        background-color: green;
        color: white;
        padding: 10px 20px;
        cursor: pointer;
        border-radius: 4px;
    }
`;

const Information = ({userID}) => {
    const [status, setStatus] = useState(false);
    const [data, setData] = useState({});

    const [wardID, setWardID] = useState('');
    const [ward, setWard] = useState({});
    const [listWard, setListWard] = useState([]);
    const [listWardCurrent, setListWardCurrent] = useState([]);

    const [districtID, setDistrictID] = useState('');
    const [district, setDistrict] = useState({});
    const [listDistrict, setListDistrict] = useState([]);
    const [listDistrictCurrent, setListDistrictCurrent] = useState([]);

    const [cityID, setCityID] = useState('');
    const [city, setCity] = useState({});
    const [listCity, setListCity] = useState([]);
    const [listCityCurrent, setListCityCurrent] = useState([]);

    const [submit, setSubmit] = useState(false);

    // call API get Thông tin user
    useEffect(() => {
        let API_URL = `http://localhost:5000/accounts/accounts/${userID}`;
        let method = 'GET';
        axios({
            method,
            url: API_URL,
            data: null
        })
            .catch((err) => {
                console.log(err);
            })
            .then((res) => {
                if (res) {
                    console.log('res.data ne: ', res.data);
                    setData(res.data.data);
                }
                // setAddress(res.data.diaChi.diaChiChiTiet.diaChiChiTiet);
                // setBirthday(res.data.ngaySinh.split(" ")[0]);
                // setData(res.data);
                // console.log(res.data);
                // setWardID(res.data.diaChi.diaChiChiTiet.maPhuongXa);
            });
    }, []);

    // // call API get all mã tỉnh
    // useEffect(() => {
    //     let API_URL = "https://localhost:44352/api/province/all";
    //     // props.actFetchProductsRequest();
    //     let method = "GET";
    //     let d = axios({
    //         method,
    //         url: API_URL,
    //     })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    //         .then((res) => {
    //             setListCity(res.data);
    //         });
    // }, []);

    // // call API get all huyện của tỉnh
    // useEffect(() => {
    //     let API_URL = "https://localhost:44352/api/district/all";
    //     // props.actFetchProductsRequest();
    //     let method = "GET";
    //     let d = axios({
    //         method,
    //         url: API_URL,
    //     })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    //         .then((res) => {
    //             setListDistrict(res.data);
    //         });
    // }, []);

    // // call API get all phường xã của huyện
    // useEffect(() => {
    //     let API_URL = "https://localhost:44352/api/ward/all";
    //     // props.actFetchProductsRequest();
    //     let method = "GET";
    //     let d = axios({
    //         method,
    //         url: API_URL,
    //     })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    //         .then((res) => {
    //             setListWard(res.data);
    //         });
    // }, []);

    // // useEffect to get Ward when WardID has changed
    // useEffect(() => {
    //     if (listWard.length > 0) {
    //         // console.log("list Ward:", listWard)
    //         let wardObj = listWard.filter(
    //             (item, index) => item.maPhuongXa == wardID
    //         );
    //         setWard(wardObj[0]);
    //         // console.log(wardID)
    //         // console.log(wardObj)
    //     }
    // }, [wardID, listWard]);

    // // useEffect to get District when Ward has changed
    // useEffect(() => {
    //     if (listDistrict.length > 0 && ward) {
    //         let districtObj = listDistrict.filter(
    //             (item, index) => item.maQuanHuyen == ward.maQuanHuyen
    //         );
    //         setDistrict(districtObj[0]);
    //         // console.log(districtObj)
    //     }
    // }, [ward, listDistrict]);

    // // useEffect to get City when District has changed
    // useEffect(() => {
    //     if (listCity.length > 0 && district) {
    //         let cityObj = listCity.filter(
    //             (item, index) => item.maTinhTP == district.maTinhTP
    //         );
    //         setCity(cityObj[0]);
    //         // console.log(cityObj[0])
    //     }
    // }, [district, listCity]);

    // // useEffect to get wardID when ward has changed
    // useEffect(() => {
    //     if (ward) {
    //         setWardID(ward.maPhuongXa);
    //     }
    // }, [ward]);

    // // useEffect to get districtID when district has changed
    // useEffect(() => {
    //     if (district) {
    //         setDistrictID(district.maQuanHuyen);
    //     }
    // }, [district]);

    // // useEffect to get cityID when city has changed
    // useEffect(() => {
    //     if (city) {
    //         setCityID(city.maTinhTP);
    //     }
    // }, [city]);

    // // useEffect to get listDistrictCurrent when cityID has changed
    // useEffect(() => {
    //     let lsDistrict = listDistrict.filter(
    //         (item, index) => item.maTinhTP == cityID
    //     );
    //     setListDistrictCurrent(lsDistrict);
    // }, [cityID]);

    // // useEffect to get listDistrictCurrent when cityID has changed
    // useEffect(() => {
    //     let lsWard = listWard.filter(
    //         (item, index) => item.maQuanHuyen == districtID
    //     );
    //     setListWardCurrent(lsWard);
    // }, [districtID]);

    let submitFunc = () => {
        console.log('value:', data);
        axios({
            method: 'post',
            url: 'http://localhost:5000/accounts/accounts/update',
            data: data
        })
            .then(function (res) {
                if (res.data) {
                    console.log('res.data: ', res.data);
                    setStatus(true);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    };
    return (
        <>
            <Heading style={{marginLeft: '76px'}}>Thông tin của bạn</Heading>
            <FormGroup>
                <Label htmlFor="name">Họ và tên:</Label>
                <Input
                    type="text"
                    value={data.name}
                    name="name"
                    onChange={(e) => {
                        setData({...data, name: e.target.value});
                    }}
                ></Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="phone">Số điện thoại:</Label>
                <Input
                    type="text"
                    value={data.phoneNumber}
                    name="phone"
                    onChange={(e) => {
                        setData({...data, phoneNumber: e.target.value});
                    }}
                    disabled
                ></Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="gender">Giới tính:</Label>
                <SelectTag
                    id="gender"
                    name="gender"
                    onChange={(e) => {
                        setData({...data, gender: e.target.value});
                    }}
                >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                </SelectTag>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="birthday">Ngày sinh:</Label>
                <Input
                    type="date"
                    value={data.dob ? data?.dob.slice(0, 10) : ''}
                    name="birthday"
                    onChange={(e) => {
                        setData({...data, dob: e.target.value});
                    }}
                ></Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="personID">CMND/CCCD:</Label>
                <Input
                    type="text"
                    value={data.ccid}
                    name="personID"
                    onChange={(e) => {
                        setData({...data, ccid: e.target.value});
                    }}
                ></Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="address">Địa chỉ:</Label>
                <Input type="text" value={data?.addressDetail?.detail + ', ' + data?.addressDetail?.ward + ', ' + data?.addressDetail?.district} name="address" disabled></Input>
            </FormGroup>

            <Submit onClick={() => submitFunc()}>Cập nhật</Submit>
            {status && (
                <ResultForm>
                    <h2>Cập nhật thành công !!!</h2>
                    <div className="btn-result" onClick={() => setStatus(false)}>
                        OK
                    </div>
                </ResultForm>
            )}
        </>
    );
};

export default Information;

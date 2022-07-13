import styled from 'styled-components';
import axios from 'axios';
import React, {useEffect, useState, useContext} from 'react';
import {LoginContext} from '../LoginContext';
import myUrl from '../domain';
const LoginContainter = styled.div`
    width: 100%;
    background: rgb(0, 212, 255);
    background: linear-gradient(180deg, rgba(0, 212, 255, 0.9696472338935574) 41%, rgba(0, 255, 239, 1) 76%);
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 160px 400px;
    padding: 80px 50px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
    -webkit-box-shadow: -7px 8px 15px 2px rgba(0, 0, 0, 0.68);
    box-shadow: -7px 8px 15px 2px rgba(0, 0, 0, 0.68);
    & > h2 {
        margin-bottom: 30px;
        color: #02ade6d9;
    }
    /* width: 100%; */
`;

const Button = styled.button`
    margin: 20px 0;
    font-size: 18px;
    padding: 16px 40px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background: rgb(0, 212, 255);
    background: linear-gradient(90deg, rgba(0, 212, 255, 0.9696472338935574) 9%, rgba(0, 255, 239, 1) 76%);
`;

const Row = styled.div`
    font-size: 18px;
    & > div > label {
        display: block;
        margin-bottom: 2px;
    }
    & > div > input {
        margin-bottom: 16px;
        padding: 6px 0;
        padding-left: 12px;
        border-radius: 2px;
        border: 1px solid #ccc;
        width: 300px;
    }
`;

const Login = () => {
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

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginContext = useContext(LoginContext);

    const handleSubmit = () => {
        setUsername('');
        setPassword('');

        axios({
            method: 'post',
            url: `${myUrl}/authorization/login`,
            data: {
                phone: username,
                password: password
            }
        })
            .then(function (res) {
                console.log('res.data: ', res.data);
                if (res.data === '') {
                    return;
                } else {
                    let userInfo = {
                        phoneNumber: res.data.phoneNumber,
                        userId: res.data.user.id,
                        fullname: res.data.user.name,
                        typeAccount: res.data.user.typeAccount || 'Customer',
                        storeId: res.data.user.storeId,
                        storeName: res.data.store.data.name,
                    };
                    console.log('hello: ', res.data);
                    loginContext.updateLogin(loginContext.isLogin);
                    loginContext.updateUser(JSON.stringify(userInfo));
                    window.location = '/';
                }
            })
            .catch(function (err) {
                console.log(err);
            });
        
        
    };

    return (
        <LoginContainter>
            <Container>
                <h2>Đăng nhập</h2>
                <div>
                    <Row>
                        <div>
                            <label htmlFor="username">Tên đăng nhập:</label>
                            <input onChange={(e) => setUsername(e.target.value)} id="username"></input>
                        </div>
                    </Row>

                    <Row>
                        <div>
                            <label htmlFor="password">Mật khẩu:</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password"></input>
                        </div>
                    </Row>
                    <Button onClick={handleSubmit}>Đăng nhập</Button>
                </div>
            </Container>
        </LoginContainter>
    );
};

export default Login;

import React, {useState, useContext, useEffect} from 'react';
import {Form, Input, Button, Radio, Select, Cascader, DatePicker, InputNumber, TreeSelect, Switch, Checkbox, notification} from 'antd';
import axios from 'axios';
import styled from 'styled-components';

import {LoginContext} from '../LoginContext';

const RegisterContainer = styled.div`
    padding: 40px;
    width: 100%;
    margin-top: 100px;
`;

const RegisterTitle = styled.h2`
    text-transform: uppercase;
    text-align: center;
`;

const RegisterTag = styled.div`
    font-size: 16px;
    font-weight: 500;
    position: relative;
    border-left: 8px solid #ff6651;
    padding-left: 10px;
    margin-bottom: 10px;
    margin-top: 50px;
`;

const Register = () => {
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

    const [componentSize, setComponentSize] = useState('default');
    const context = useContext(LoginContext);

    const close = () => {};

    const openNotification = () => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" onClick={() => notification.close(key)}>
                Confirm
            </Button>
        );
        notification.open({
            message: 'Thông báo',
            description: 'Đăng ký tài khoản thành công.',
            btn,
            key,
            onClose: close
        });
    };

    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        // context.updateLogin(context.isLogin)
        // call api
        let data = {
            name: values.fullname,
            ccid: `${values.cccd}`,
            dob: new Date(values.birthday['_d']).getFullYear() + '-' + (parseInt(new Date(values.birthday['_d']).getMonth()) + 1) + '-' + new Date(values.birthday['_d']).getDate(),
            gender: values.gender,
            phone: `${values.pNumber}`,
            email: values.email,
            password: values.password,
            type: 'Customer',
            status: 'active'
        };
        console.log('data: ', data);
        axios.post('http://localhost:5000/authorization/register', data).then((res) => {
            console.log('Result from register API: ', res);
            // context.updateUser(JSON.stringify(res.data))
            // context.updateLogin(context.isLogin);
            openNotification();
            window.location.href = '/signin';
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <RegisterContainer>
            <Form
                labelCol={{
                    span: 4
                }}
                wrapperCol={{
                    span: 14
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
                style={{marginLeft: '100px'}}
            >
                <RegisterTitle>ĐĂNG KÝ</RegisterTitle>
                <RegisterTag>Thông tin cá nhân:</RegisterTag>
                <Form.Item
                    label="Họ và tên"
                    name="fullname"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập họ và tên',
                            min: 4
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Số CCCD/CMND"
                    name="cccd"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập CCCD/CMND!'
                        },
                        {type: 'number'}
                    ]}
                    value="0123456789"
                >
                    <InputNumber style={{width: '100%'}} />
                </Form.Item>
                <Form.Item
                    label="Giới tính"
                    name="gender"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy chọn giới tính!'
                        }
                    ]}
                >
                    <Select>
                        <Select.Option value="Nam">Nam</Select.Option>
                        <Select.Option value="Nữ">Nữ</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Ngày tháng năm sinh"
                    name="birthday"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập ngày sinh!'
                        }
                    ]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: 'email'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="pNumber"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập số điện thoại',
                            min: 4
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <RegisterTag>Thông tin tài khoản:</RegisterTag>
                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập mật khẩu!'
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Mật khẩu lần nữa"
                    name="repassword"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập mật khẩu lần nữa!'
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Bạn phải chọn trường này')))
                        }
                    ]}
                >
                    <Checkbox>
                        Bạn sẽ dùng số điện thoại để{' '}
                        <a style={{color: 'blue'}} href="/">
                            đăng nhập
                        </a>
                    </Checkbox>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Đăng Ký
                    </Button>
                </Form.Item>
            </Form>
            <p style={{textAlign: 'center'}}>
                Hoặc <a href="/">Đăng Nhập</a>{' '}
            </p>
        </RegisterContainer>
    );
};

export default Register;

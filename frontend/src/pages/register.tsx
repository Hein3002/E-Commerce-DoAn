import React, { useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Empty, Form, Input, notification } from 'antd';
import UserType from '../model/user.model';
import { apiRegister } from '../services/authenticate.services';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTER } from '../utils/urls';
import loginIcons from "../assets/images/signin.gif";



const Register: React.FC = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    type NotificationType = 'success' | 'info' | 'warning' | 'error';

    const openNotificationWithIcon = (type: NotificationType, content: string) => {
        api[type]({
            message: 'Notification',
            description: content,
        });
    };

    //Call APi
    const fetchData = async (value: any) => {
        setLoading(true);
        try {
            // await apiCsrf(); //Create session in cookie
            let results = await apiRegister(value);
            if (results.success) {
                openNotificationWithIcon('success', 'Register success!')
                navigate('/login');
            }
            else {
                openNotificationWithIcon('error', 'Register failed!')
            }

        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                openNotificationWithIcon('error', error.response.data.error);
            }
        }
        setLoading(false);
    };

    const onFinish: FormProps<UserType>['onFinish'] = async (value) => {
        fetchData(value);
    };

    const onFinishFailed: FormProps<UserType>['onFinishFailed'] = () => {
        openNotificationWithIcon('error', 'Register failed!');
    };

    return (
        <div
            style={{
                marginLeft: "25%",
                marginTop: "10%",
                border: "1px solid #666699",
                borderRadius: "10px",
                width: "700px",
                padding: "20px",
            }}
        >
            {contextHolder}
            <h4 style={{ textAlign: "center", fontWeight: '500'}}>Register</h4>
                      {/* <img src={loginIcons} alt='login' style={{ width: '200px', height: '200px' }} /> */}

            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item<UserType>
                    label="Name"
                    name="name"
                    rules={[
                        { required: true, message: 'Please input your name!' },
                    ]}
                >
                    <Input placeholder='name' type="text" />
                </Form.Item>

                <Form.Item<UserType>
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                    ]}
                >
                    <Input placeholder='email' type="email" />
                </Form.Item>

                <Form.Item<UserType>
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                    ]}
                >
                    <Input.Password placeholder='password' />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                    <Link to={'/login'} type="primary" className=' ml-12'>
                        Login
                    </Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;

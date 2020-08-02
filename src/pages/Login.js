import React from 'react';
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { loginApi } from '@service/auth'
import { setToken, getFormdata, setFormdata } from '@utils/auth';
import '@css/Login.scss';
import { setUsername } from '../utils/auth';

import FormattedMessage from '@components/FormattedMessage';

import ImperativeFormatMessage from '@utils/ImperativeFormatMessage'

const Login = () => {
    const history = useHistory();

    const onFinish = values => {
        message.loading({ content: ImperativeFormatMessage('Submitting'), key: 'loading', duration: 0 })
        if (values.remember) {
            setFormdata(values)
        }
        loginApi(values)
            .then((res) => {
                if (res.access_token !== undefined) {
                    setToken(res.access_token)
                    setUsername(values.username)
                    message.success({ content: ImperativeFormatMessage('Login successful'), key: 'loading', duration: 2 });
                    setTimeout(() => {
                        history.push('/user');
                    }, 1000)
                    return;
                }
                if (res.msg !== undefined) {
                    message.error({ content: res.msg, key: 'loading', duration: 2 });
                } else {
                    message.error({ content: ImperativeFormatMessage('Login failed'), key: 'loading', duration: 2 });
                }
            })
    };


    return (
        <div className="site-card-border-less-wrapper">
            <Card className="card" title={<FormattedMessage
                id='Login'
                defaultMessage='Login'
            />}>

                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={getFormdata()}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: (<FormattedMessage
                                    id='Please input your Username!'
                                    defaultMessage='Please input your Username!'
                                />),
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: (<FormattedMessage
                                    id='Please input your Password!'
                                    defaultMessage='Please input your Password!'
                                />),
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>
                                <FormattedMessage
                                    id='Remember me'
                                    defaultMessage='Remember me'
                                />
                            </Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            <FormattedMessage
                                id='Log in'
                                defaultMessage='Log in'
                            />
                        </Button>
                    </Form.Item>
                </Form>

            </Card>
        </div>
    );
};

export default Login;
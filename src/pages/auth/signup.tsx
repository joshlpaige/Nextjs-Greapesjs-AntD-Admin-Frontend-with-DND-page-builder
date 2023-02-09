import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import Router from 'next/router';
import { accountApi } from '@client/api';
import { getSession } from 'next-auth/react';

const onFinish = async (values: any) => {
    const res = await accountApi.signUp(values);
    if (res?.error) {
        message.error('Email is in use!');
    } else {
        Router.push('/auth/login');
    }
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const App: React.FC = () => (
    <div style={{ width: '100%', minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item label="Full Name" name="firstName" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Sign up
                </Button>
            </Form.Item>
            <p style={{ textAlign: 'center' }}>
                Already have account?
                <Button type="link" href="/auth/login">
                    Log in
                </Button>
            </p>
        </Form>
    </div>
);

export default App;

export const getServerSideProps = async (ctx: any) => {
    const session = await getSession(ctx);

    if (session?.user) {
        return {
            props: { session },
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
};

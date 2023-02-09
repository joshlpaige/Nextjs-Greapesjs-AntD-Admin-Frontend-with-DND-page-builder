import React from 'react';
import { Button, Checkbox, Form, Input, Space, message } from 'antd';
import { signIn, getSession } from 'next-auth/react';
import Router from 'next/router';

const onFinish = async (values: any) => {
    const res: any = await signIn('credentials', { username: values.email, password: values.password, redirect: false });
    if (res?.error) {
        message.error('Email or Password is incorrect');
    } else {
        Router.push('/');
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
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space>
                    <Button href="/auth/signup">Register</Button>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Space>
            </Form.Item>
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

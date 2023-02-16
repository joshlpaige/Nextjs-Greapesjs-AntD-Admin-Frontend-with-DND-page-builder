import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import Router from 'next/router';
import { accountApi } from '@client/api';
import { getSession } from 'next-auth/react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

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
    <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: 'transparent', textAlign: 'center' }}>
            <img src={'/logo-trans.gif'} alt="Linesandtimes" />
        </Header>
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
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
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

        <Footer style={{ textAlign: 'center' }}>@2023 Linesandtimes.com All Rights Reserved.</Footer>
    </Layout>
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


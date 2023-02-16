import React, { useState } from 'react';
import { ScanOutlined, LogoutOutlined, TeamOutlined, EditOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { signOut } from 'next-auth/react';
import Router from 'next/router';
import Link from 'next/link';
import { FlexContainer } from '../Layout';
import { Display } from '@shared/utils';

interface PageWrapperProps {
    children: React.ReactNode;
    title?: string;
}

const { Header, Sider, Content, Footer } = Layout;

const PageWrapper: React.FC<PageWrapperProps> = ({ children, title }: PageWrapperProps) => {
    const isMobile = Display.IsMobile();
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = (menu: any) => {
        if (menu.key === 'logout') signOut();
        setSelectedKeys([menu.key]);
        const url = `/admin/${menu.key}`;
        Router.push(url);
    };

    React.useEffect(() => {
        const url = Router.asPath;
        if (url === '/admin/lines') setSelectedKeys(['lines']);
        else if (url === '/admin/teams') setSelectedKeys(['teams']);
    }, []);

    return (
        <Layout hasSider style={{ minHeight: '100vh' }}>
            <Sider breakpoint="lg" collapsible>
                <Link href="/admin/lines">
                    <FlexContainer align="center" justify="center" style={{ height: '100px' }}>
                        <h1 style={{ color: '#fff' }}> {isMobile ? 'Admin' : 'Admin Dashboard'}</h1>
                    </FlexContainer>
                </Link>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={selectedKeys}
                    onClick={navigate}
                    defaultSelectedKeys={['videos']}
                    items={[
                        {
                            key: 'lines',
                            icon: <ScanOutlined />,
                            label: 'Lines',
                        },
                        {
                            key: 'teams',
                            icon: <TeamOutlined />,
                            label: 'Teams',
                        },
                        {
                            key: 'bulk',
                            icon: <EditOutlined />,
                            label: 'Edit Lines by Sport',
                        },
                        {
                            key: 'logout',
                            icon: <LogoutOutlined />,
                            label: 'Logout',
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 20, height: 100, background: colorBgContainer }}>
                    <img src="/logo-trans.gif" />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>@2023 Linesandtimes.com All Rights Reserved.</Footer>
            </Layout>
        </Layout>
    );
};

export default PageWrapper;

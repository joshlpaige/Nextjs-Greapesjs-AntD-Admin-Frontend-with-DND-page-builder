import React, { useState } from 'react';
import { ScanOutlined, LogoutOutlined, TeamOutlined, DownOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Divider, Layout, Menu, theme, Dropdown, Space, Button } from 'antd';
import { signOut } from 'next-auth/react';
import Router from 'next/router';
import Link from 'next/link';
import { FlexContainer } from '../Layout';
import { Display } from '@shared/utils';
import { UserOutlined } from '@ant-design/icons';

interface PageWrapperProps {
    children: React.ReactNode;
    title?: string;
}

const { Header, Sider, Content, Footer } = Layout;

const FrontPageWrapper: React.FC<PageWrapperProps> = ({ children, title }: PageWrapperProps) => {
    const isMobile = Display.IsMobile();
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = (menu: any) => {
        if (menu.key === 'home') Router.push('/');
        else Router.push(`/${menu.key}`);
    };

    React.useEffect(() => {
        const url = Router.asPath;
        if (url === '/lines') setSelectedKeys(['lines']);
        else if (url === '/rules') setSelectedKeys(['rules']);
        else if (url === '/special') setSelectedKeys(['special']);
    }, []);

    const MenuCSS: React.CSSProperties = {
        borderBottom: 'none',
        fontSize: '16px',
        fontWeight: '600',
        minWidth: 0,
        flex: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    };
    const items = [
        {
            key: 'home',
            label: 'Home',
        },
        {
            key: 'lines',
            label: 'Lines',
        },

        {
            key: 'rules',
            label: 'Rules',
        },
        {
            key: 'special',
            label: 'Special Events',
        },
    ];

    return (
        <Layout className="layout" style={{ minHeight: '100vh', maxWidth: '85%', margin: '0 auto' }}>
            <Header
                style={{
                    padding: '24px 0',
                    height: 'auto',
                    background: colorBgContainer,
                }}
            >
                <FlexContainer fullwidth justify="space-between">
                    <img src="/logo-trans.gif" />
                    <Menu
                        onClick={navigate}
                        mode="horizontal"
                        style={MenuCSS}
                        defaultSelectedKeys={selectedKeys}
                        items={items}
                    />
                    <div>
                        <Button icon={<LogoutOutlined />} type="link" onClick={() => signOut()}>
                            Log out
                        </Button>
                        {/* <Dropdown menu={{ items: [{ key: 1, label: 'Logout' }] }} trigger={['click']}>
                            <Button type="link" onClick={(e) => e.preventDefault()}>
                                <Avatar icon={<UserOutlined />} />
                            </Button>
                        </Dropdown> */}
                    </div>
                </FlexContainer>
            </Header>
            <Divider style={{ margin: 0 }} />
            <Content style={{ padding: '30px 10px', background: colorBgContainer }}>{children}</Content>
            <Footer style={{ background: colorBgContainer }}>
                <Divider />
                <FlexContainer justify="space-between">
                    <span>©{new Date().getFullYear()} Linesandtimes.com All Rights Reserved. </span>
                    <Breadcrumb separator="|">
                        {items.map((u) => (
                            <Breadcrumb.Item key={u.key}>
                                <Link href={`/${u.key === 'home' ? '' : u.key}`}>{u.label}</Link>
                            </Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                </FlexContainer>
            </Footer>
        </Layout>
    );
};

export default FrontPageWrapper;

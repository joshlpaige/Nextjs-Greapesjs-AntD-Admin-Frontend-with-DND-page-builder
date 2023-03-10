import React, { useState } from 'react';
import { BarsOutlined, LogoutOutlined, TeamOutlined, DownOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Divider, Layout, Menu, theme, Dropdown, Space, Button } from 'antd';
import { signOut } from 'next-auth/react';
import Router from 'next/router';
import Link from 'next/link';
import { FlexContainer } from '../Layout';
import { Display } from '@shared/utils';
import { UserOutlined } from '@ant-design/icons';
import { pageApi } from '@client/api';

interface PageWrapperProps {
    children: React.ReactNode;
    title?: string;
}

const { Header, Content, Footer } = Layout;

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

const FrontPageWrapper: React.FC<PageWrapperProps> = ({ children, title }: PageWrapperProps) => {
    const isMobile = Display.IsMobile();

    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [menuItems, setMenuItems] = useState<{ key: string; label: string }[]>([]);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = (menu: any) => {
        if (menu.key === 'home') Router.push('/');
        else if (menu.key === 'lines') Router.push('/lines');
        else if (menu.key === 'rules') Router.push('/rules');
        else if (menu.key === 'special') Router.push('/special');
        else Router.push(`/pages/${menu.key}`);
    };

    const loadMenu = async () => {
        const temp = await pageApi.getPages('published');
        const menuItems = temp.map((item) => ({ key: item.uid, label: item.title }));
        setMenuItems([...items, ...menuItems]);
    };
    React.useEffect(() => {
        const url = Router.asPath;
        if (url.includes('/lines')) setSelectedKeys(['lines']);
        else if (url.includes('/rules')) setSelectedKeys(['rules']);
        else if (url.includes('/special')) setSelectedKeys(['special']);
        else setSelectedKeys(['home']);
        loadMenu();
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

    return (
        <Layout className="layout" style={{ minHeight: '100vh', maxWidth: isMobile ? '90%' : '80%', margin: '0 auto' }}>
            <Header
                style={{
                    padding: '24px 0',
                    height: 'auto',
                    background: colorBgContainer,
                }}
            >
                <FlexContainer fullwidth justify="space-between">
                    <Link href={'/'} style={{ height: 0 }}>
                        <img src="/logo-trans.gif" />
                    </Link>
                    <Menu
                        onClick={navigate}
                        mode="horizontal"
                        style={MenuCSS}
                        selectedKeys={selectedKeys}
                        items={menuItems}
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
                {isMobile && (
                    <Menu onClick={navigate} mode="horizontal" style={MenuCSS} selectedKeys={selectedKeys} items={items} />
                )}
            </Header>
            <Divider style={{ margin: 0 }} />
            <Content style={{ padding: '30px 10px', background: colorBgContainer }}>{children}</Content>
            <Footer style={{ background: colorBgContainer, padding: isMobile ? '24px 0' : '24px 0' }}>
                <Divider />
                <FlexContainer justify="space-between">
                    <span>??{new Date().getFullYear()} Linesandtimes.com All Rights Reserved. </span>
                    {!isMobile && (
                        <Breadcrumb separator="|">
                            {items.map((u) => (
                                <Breadcrumb.Item key={u.key}>
                                    <Link href={`/${u.key === 'home' ? '' : u.key}`}>{u.label}</Link>
                                </Breadcrumb.Item>
                            ))}
                        </Breadcrumb>
                    )}
                </FlexContainer>
            </Footer>
        </Layout>
    );
};

export default FrontPageWrapper;

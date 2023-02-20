import React, { useEffect, useState } from 'react';

import { AccountType, Team } from '@shared/types';
import {
    Button,
    Input,
    Modal,
    Space,
    Table,
    message,
    notification,
    Avatar,
    Divider,
    List,
    Typography,
    Row,
    Col,
} from 'antd';
import PageWrapper, { FrontPageWrapper } from '@client/componenets/PageWrapper';
import { Session } from 'next-auth';
interface Props {
    session: Session;
}
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { getSession } from 'next-auth/react';

import { FlexContainer } from '@client/componenets/Layout';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Display } from '@shared/utils';

const { Header, Content, Footer } = Layout;

export default function Home({ session }: Props) {
    const isMobile = Display.IsMobile();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [data, setData] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const load = async () => {
        setIsLoading(true);

        setIsLoading(false);
    };

    const icons = [
        {
            title: 'Baseball',
            url: '/mlb.png',
        },
        {
            title: 'Basketball',
            url: '/nba.png',
        },
        {
            title: 'Football',
            url: '/nfl.png',
        },
        {
            title: 'PGA',
            url: '/pga.png',
        },
        {
            title: 'UFC',
            url: '/ufc.png',
        },
        {
            title: 'Nascar',
            url: '/nascar.png',
        },
    ];

    useEffect(() => {
        load();
    }, []);

    return (
        <FrontPageWrapper>
            <Row gutter={[20, 10]}>
                <Col xs={24} xl={18}>
                    <img src="/intro.gif" alt="" style={{ width: '100%' }} />
                </Col>
                <Col xs={24} xl={6}>
                    <div>
                        <Typography.Title level={4}>News Matter</Typography.Title>
                        <p>
                            <b>U.S. Citizens Please Note:</b> The information contained at this website is for news and
                            entertainment purposes only.
                        </p>
                        <Divider />
                        Any use of this information in violation of federal, state, provincial or local laws is strictly
                        prohibited.<p></p>
                    </div>
                </Col>
            </Row>
            <div style={{ textAlign: 'center', margin: '25px 0 50px' }}>
                <Typography.Title level={3}>
                    Welcome to Linesandtimes.com please make your way to the menu to review the rules and view lines.
                </Typography.Title>
            </div>
            <List
                grid={{ gutter: 16, column: isMobile ? 2 : 3 }}
                split
                dataSource={icons}
                renderItem={(item) => (
                    <List.Item key={item.title}>
                        <Space>
                            <img src={item.url} alt={item.title} />
                            <Typography.Title level={isMobile ? 5 : 3}>{item.title}</Typography.Title>
                        </Space>
                    </List.Item>
                )}
            />
        </FrontPageWrapper>
    );
}

export const getServerSideProps = async (ctx: any) => {
    const session = await getSession(ctx);

    if (!session?.user) {
        return {
            props: { session },
            redirect: {
                destination: '/auth/login',
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


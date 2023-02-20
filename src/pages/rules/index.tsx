import React, { useEffect, useState } from 'react';

import { Button, Divider, Space, Typography, List, Row, Col, Card } from 'antd';
import { FrontPageWrapper } from '@client/componenets/PageWrapper';
import { Session } from 'next-auth';

import { getSession } from 'next-auth/react';

import { Display } from '@shared/utils';
import Rules from '@client/containers';

interface Props {
    session: Session;
}

export default function Home({ session }: Props) {
    const isMobile = Display.IsMobile();

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
    ];

    const urls = [
        {
            title: 'Rules',
            url: '/rules',
        },
        {
            title: 'Baseball Rules',
            url: '/rules/baseball',
        },
        {
            title: 'Basketball Rules',
            url: '/basketball',
        },
        {
            title: 'Football Rules',
            url: '/football',
        },
    ];

    return (
        <FrontPageWrapper>
            <Rules.Breadcrumb />
            <div style={{ margin: '20px 0' }}>
                <img src="/rules_banner.gif" alt="" style={{ width: '100%' }} />
            </div>
            <Divider />
            <Row>
                <Col span={18}>
                    <div style={{ marginBottom: '50px' }}>
                        <Typography.Title level={5}>
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
                </Col>
                <Col span={6}>
                    <Rules.Sidebar />
                </Col>
            </Row>
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

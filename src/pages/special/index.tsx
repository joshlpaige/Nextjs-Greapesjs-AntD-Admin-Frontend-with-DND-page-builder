import React from 'react';

import { Button, Divider, Space, Typography, Collapse, Row, Col, Card, List } from 'antd';
import { FrontPageWrapper } from '@client/componenets/PageWrapper';
import { Session } from 'next-auth';
import { FilePdfOutlined } from '@ant-design/icons';
import { getSession } from 'next-auth/react';

import { Display } from '@shared/utils';

import Rules from '@client/containers';

interface Props {
    session: Session;
}

const { Panel } = Collapse;

export default function Home({ session }: Props) {
    const isMobile = Display.IsMobile();

    const items = [
        { title: '2023 MLB Futures', url: '' },
        { title: '2022 NFL Futures', url: '/special/NFL-Futures-2022.pdf' },
    ];

    return (
        <FrontPageWrapper>
            <div style={{ marginTop: '25px' }}>
                <Typography.Title level={2}>Special Events Lines</Typography.Title>
            </div>
            <List
                grid={{ column: 1 }}
                split
                bordered
                style={{ paddingTop: '15px' }}
                dataSource={items}
                renderItem={(item) => (
                    <List.Item key={item.title}>
                        <List.Item.Meta
                            avatar={<FilePdfOutlined />}
                            title={
                                item.url ? (
                                    <a href={item.url} target="_blank" rel="noreferrer">
                                        {item.title}
                                    </a>
                                ) : (
                                    item.title
                                )
                            }
                            description={
                                item.url === '' ? (
                                    'COMING SOON'
                                ) : (
                                    <a href={item.url} style={{ textDecoration: 'underline' }} download>
                                        Download
                                    </a>
                                )
                            }
                        />
                        {/* <Typography.Title level={5}></Typography.Title> */}
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

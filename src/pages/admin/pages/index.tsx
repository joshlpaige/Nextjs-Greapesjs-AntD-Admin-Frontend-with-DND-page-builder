import React, { useState } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import { useEffect, useRef } from 'react';
import preset from 'grapesjs-preset-webpage';
import plugin from 'grapesjs-blocks-basic';
import 'grapesjs-preset-newsletter';
import customCodePlugin from 'grapesjs-custom-code';
import { GrapesjsReact } from 'grapesjs-react';
import grapesjs from 'grapesjs';
import { pageApi } from '@client/api';
import { uniqueId } from '@shared/utils';
import { getSession } from 'next-auth/react';
import { AccountType, Page } from '@shared/types';
import { Button, List, Typography } from 'antd';
import PageWrapper from '@client/componenets/PageWrapper';
import Link from 'next/link';
import { BarsOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { FlexContainer } from '@client/componenets/Layout';

const PageBuilder = () => {
    const editorRef = useRef(null);
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [pages, setPages] = useState<Page[]>([]);

    const load = async () => {
        const pages = await pageApi.getPages();
        setPages(pages);
    };

    useEffect(() => {
        setIsLoading(true);
        load();
    }, []);

    return (
        <PageWrapper>
            <FlexContainer justify="space-between">
                <Typography.Title level={3}>All Pages</Typography.Title>
                <Button type="primary" href="/admin/pages/new" target="_blank">
                    Add New
                </Button>
            </FlexContainer>

            <List
                bordered
                split
                itemLayout="horizontal"
                dataSource={pages}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button
                                type="link"
                                onClick={async () => {
                                    await pageApi.updatePage({
                                        uid: item.uid,
                                        status: item.status === 'published' ? 'draft' : 'published',
                                    });
                                    load();
                                }}
                            >
                                {item.status === 'published' ? 'Move to Draft' : 'Publish'}
                            </Button>,
                            <Link key={'action-edit'} href={`/admin/pages/${item.uid}`} target="_blank">
                                edit
                            </Link>,
                            <Link key={'action-view'} href={`/pages/${item.uid}`} target="_blank">
                                view
                            </Link>,
                            <Button
                                danger
                                type="link"
                                onClick={async () => {
                                    await pageApi.deletePage(item.uid);
                                    load();
                                }}
                            >
                                delete
                            </Button>,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<BarsOutlined />}
                            title={
                                <Link target="_blank" href={`/admin/pages/${item.uid}`}>
                                    {item.title}
                                </Link>
                            }
                            description={dayjs(item.createdAt).format('YYYY-MM-DD-HH:MM:ss')}
                        />
                    </List.Item>
                )}
            />
        </PageWrapper>
    );
};

export default PageBuilder;

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
    if (session.user.accountType !== AccountType.Admin) {
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

import React, { useEffect, useState, useContext } from 'react';

import { AccountType, Line, Team } from '@shared/types';
import { Button, DatePicker, Modal, Select, Space, Table } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
import type { Dayjs } from 'dayjs';
import { FrontPageWrapper } from '@client/componenets/PageWrapper';
import { Session } from 'next-auth';

import { getSession } from 'next-auth/react';

import { lineApi, pageApi } from '@client/api';

import { Sports } from '@shared/types/sport';
import dayjs from 'dayjs';
import { FlexContainer } from '@client/componenets/Layout';
import { Display } from '@shared/utils';

import Head from 'next/head';

interface Props {
    session: Session;
}

type RangeValue = [Dayjs | null, Dayjs | null] | null;
export default function Home({ session }: Props) {
    const isMobile = Display.IsMobile();
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        pageApi.getPage('leg9eqxhdbrjyy0i6k6').then((res) => {
            setHtml(res.html);
            setCss(res.css);
            setIsLoading(false);
        });
    }, []);

    return (
        <FrontPageWrapper>
            {!isLoading && (
                <>
                    <style jsx>{css}</style>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </>
            )}
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
            query: ctx.query.uid,
        },
    };
};

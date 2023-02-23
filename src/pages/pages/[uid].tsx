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

import { useRouter } from 'next/router';

interface Props {
    session: Session;
}

type RangeValue = [Dayjs | null, Dayjs | null] | null;
export default function Home({ session }: Props) {
    const isMobile = Display.IsMobile();
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { uid } = router.query;

    useEffect(() => {
        if (!!uid) {
            setIsLoading(true);
            pageApi.getPage(uid as string).then((res) => {
                setHtml(res.html);
                setCss(res.css);
                setIsLoading(false);
            });
        }
    }, [uid]);

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

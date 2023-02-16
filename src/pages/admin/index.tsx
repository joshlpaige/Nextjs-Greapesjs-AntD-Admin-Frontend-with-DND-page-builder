import React, { useEffect, useState } from 'react';

import { AccountType, Team } from '@shared/types';
import { Button, Input, Modal, Space, Table, message, notification } from 'antd';
import PageWrapper from '@client/componenets/PageWrapper';
import { Session } from 'next-auth';
interface Props {
    session: Session;
}

import dayjs from 'dayjs';

import { getSession } from 'next-auth/react';

export default function Home({ session }: Props) {
    const [data, setData] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const load = async () => {
        setIsLoading(true);

        setIsLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    return <PageWrapper>Home</PageWrapper>;
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


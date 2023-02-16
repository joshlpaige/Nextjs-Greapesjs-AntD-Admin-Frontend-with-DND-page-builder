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
import { signOut } from 'next-auth/react';
import { FlexContainer } from '@client/componenets/Layout';

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

    return (
        <FlexContainer style={{ minHeight: '500px' }} justify="center" align="center">
            <Button onClick={() => signOut()}>Log out</Button>
        </FlexContainer>
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


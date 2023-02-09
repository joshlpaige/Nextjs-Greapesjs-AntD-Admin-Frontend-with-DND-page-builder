import React, { useEffect, useState } from 'react';

import { Team } from '@shared/types';
import { teamApi } from '@client/api';

import dayjs from 'dayjs';

import { getSession } from 'next-auth/react';

const App: React.FC = () => {
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
        <>
            Home
        </>
    );
};

export default App;

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


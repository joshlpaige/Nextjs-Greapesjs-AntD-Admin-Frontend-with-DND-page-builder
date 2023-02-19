import React, { useEffect, useState, useContext } from 'react';

import { AccountType, Line, Team } from '@shared/types';
import {
    Button,
    Checkbox,
    DatePicker,
    Divider,
    Input,
    InputNumber,
    InputRef,
    Modal,
    Select,
    Space,
    Table,
    TimePicker,
    Typography,
    message,
    notification,
} from 'antd';
const { RangePicker } = DatePicker;
import type { Dayjs } from 'dayjs';
import { FrontPageWrapper } from '@client/componenets/PageWrapper';
import { Session } from 'next-auth';
import { SearchOutlined, FileAddOutlined } from '@ant-design/icons';

import { getSession } from 'next-auth/react';

import { lineApi, teamApi } from '@client/api';
import { Popconfirm } from 'antd';

import { Form } from 'antd';
import { Sports, Broadcast, Sport } from '@shared/types/sport';
import { ColumnType } from 'antd/es/table';
import { FilterDropdownProps } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { FlexContainer } from '@client/componenets/Layout';
import { Display, uniqueId } from '@shared/utils';

interface Props {
    session: Session;
}

type RangeValue = [Dayjs | null, Dayjs | null] | null;
export default function Home({ session }: Props) {
    const isMobile = Display.IsMobile();
    const [data, setData] = useState<Line[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [dates, setDates] = useState<RangeValue>(null);
    const [value, setValue] = useState<RangeValue>(null);
    const [selectedSport, setSelectedSport] = useState<string>('nba');

    const load = async () => {
        setIsLoading(true);
        let lines = await lineApi.getLines(selectedSport);
        if (dates && dates[0] && dates[1]) {
            lines = lines.filter((line) => dayjs(line.date) >= dayjs(dates[0]) && dayjs(line.date) <= dayjs(dates[1]));
        }
        setData(lines);
        setIsLoading(false);
    };

    useEffect(() => {
        load();
    }, [dates, value, selectedSport]);

    const defaultColumns = [
        {
            title: 'Team One',
            dataIndex: 'team1',
            key: 'team1',
            render: (_: string, record: Line) => (
                <Space direction="vertical">
                    <span> {record.number1} </span>
                    <span>{record.number2}</span>
                </Space>
            ),
        },
        {
            title: 'Team Two',
            dataIndex: 'team2',
            key: 'team2',
            render: (_: string, record: Line) => (
                <Space direction="vertical">
                    <span> {record.team1} </span>
                    <span>{record.team2}</span>
                </Space>
            ),
        },
        {
            title: 'Odds',
            dataIndex: 'odds1',
            key: 'odds1',
            render: (_: string, record: Line) => (
                <Space direction="vertical">
                    <span> {record.odds1} </span>
                    <span>{record.odds2}</span>
                </Space>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },

        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            render: (time: string, record: Line) => <div>{time ? dayjs(time).format('hh:mm A') : ''}</div>,
        },
    ];

    return (
        <FrontPageWrapper>
            <FlexContainer fullwidth justify="space-between" style={{ marginBottom: '25px' }}>
                <Select style={{ width: '120px' }} options={Sports} value={selectedSport} onChange={setSelectedSport} />
                <RangePicker
                    value={dates || value}
                    onCalendarChange={(val) => setDates(val)}
                    onChange={(val) => setValue(val)}
                />
            </FlexContainer>
            <Table
                showHeader={false}
                bordered
                rowClassName={() => 'editable-row'}
                rowKey={'uid'}
                columns={defaultColumns}
                dataSource={data || []}
                loading={isLoading}
                scroll={{ x: 240 }}
                pagination={{
                    simple: isMobile,
                }}
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

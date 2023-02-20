import React, { useEffect, useState, useContext } from 'react';

import { AccountType, Line, Team } from '@shared/types';
import { Button, DatePicker, Modal, Select, Space, Table } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
import type { Dayjs } from 'dayjs';
import { FrontPageWrapper } from '@client/componenets/PageWrapper';
import { Session } from 'next-auth';

import { getSession } from 'next-auth/react';

import { lineApi } from '@client/api';

import { Sports } from '@shared/types/sport';
import dayjs from 'dayjs';
import { FlexContainer } from '@client/componenets/Layout';
import { Display } from '@shared/utils';
import { useReactToPrint } from 'react-to-print';

interface Props {
    session: Session;
}

type RangeValue = [Dayjs | null, Dayjs | null] | null;
export default function Home({ session }: Props) {
    const isMobile = Display.IsMobile();
    const [data, setData] = useState<Line[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [printing, setIsprinting] = useState<boolean>(false);
    const [dates, setDates] = useState<RangeValue>(null);
    const [value, setValue] = useState<RangeValue>(null);
    const [selectedSport, setSelectedSport] = useState<string>('nba');
    const componentRef = React.useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

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
                <Space direction={isMobile ? 'vertical' : 'horizontal'}>
                    <Select style={{ width: '120px' }} options={Sports} value={selectedSport} onChange={setSelectedSport} />
                    <RangePicker
                        value={dates || value}
                        onCalendarChange={(val) => setDates(val)}
                        onChange={(val) => setValue(val)}
                    />
                </Space>
                <Button
                    onClick={() => {
                        setIsprinting(true);
                        setTimeout(() => {
                            handlePrint();
                            setIsprinting(false);
                        }, 1000);
                    }}
                    icon={<FilePdfOutlined />}
                    loading={printing}
                    type="primary"
                    shape={'round'}
                >
                    Print
                </Button>
            </FlexContainer>

            <Table
                id="lines-table"
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
            <div ref={componentRef} className="print-div" style={{ display: printing ? 'block' : 'none' }}>
                <div style={{ textAlign: 'center', margin: '25px 0' }}>
                    <img src="/logo-trans.gif" />
                </div>
                <Space style={{ fontSize: '20px', marginBottom: '10px' }}>
                    <span>{Sports.find((s) => s.value == selectedSport)?.label || ''} Lines</span>
                    {dates && (
                        <span>
                            {dayjs(dates ? dates[0] : '').format('YYYY-MM-DD')} -{' '}
                            {dayjs(dates ? dates[1] : '').format('YYYY-MM-DD')}
                        </span>
                    )}
                </Space>
                <Table
                    showHeader={false}
                    bordered
                    rowClassName={() => 'editable-row'}
                    rowKey={'uid'}
                    columns={defaultColumns}
                    dataSource={data || []}
                    loading={isLoading}
                    pagination={false}
                />
            </div>
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

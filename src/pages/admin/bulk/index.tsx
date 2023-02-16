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
import PageWrapper from '@client/componenets/PageWrapper';
import { Session } from 'next-auth';
import { SearchOutlined, FileAddOutlined } from '@ant-design/icons';

import { getSession } from 'next-auth/react';

import { lineApi, teamApi } from '@client/api';
import { Popconfirm } from 'antd';

import { Form } from 'antd';
import { Sports, Broadcast } from '@shared/types/sport';
import { ColumnType } from 'antd/es/table';
import { FilterDropdownProps } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { FlexContainer } from '@client/componenets/Layout';
import { Display, uniqueId } from '@shared/utils';

interface Props {
    session: Session;
}
type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export default function Home({ session }: Props) {
    const isMobile = Display.IsMobile();
    const [form] = Form.useForm();
    const [data, setData] = useState<Line[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [sport, setSport] = useState<string>('nba');

    const load = async () => {
        setIsLoading(true);
        const lines = await lineApi.getLines(sport);
        setData(lines);
        const teams = await teamApi.getTeams();
        setTeams(teams);
        setIsLoading(false);
    };

    useEffect(() => {
        load();
    }, [sport]);

    const defaultColumns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            width: '20%',
            render: (v: any, record: Line) => (
                <Form.Item name={`time-${record.uid}`} noStyle initialValue={v !== undefined ? dayjs(v) : undefined}>
                    <TimePicker format={'hh:mm A'} />
                </Form.Item>
            ),
        },
        {
            title: 'Broadcast',
            dataIndex: 'broadcast',
            key: 'Broadcast',
            render: (v: any, record: Line) => (
                <Form.Item name={`broadcast-${record.uid}`} noStyle initialValue={v}>
                    <Select style={{ width: '100px' }} options={Broadcast.map((b) => ({ label: b, value: b }))} />
                </Form.Item>
            ),
        },
        {
            title: 'Team Number',
            dataIndex: 'number1',
            key: 'number1',
        },
        {
            title: 'Team One',
            dataIndex: 'team1',
            key: 'team1',
            render: (v: any, record: Line) => (
                <Form.Item name={`team1-${record.uid}`} noStyle initialValue={v}>
                    <Select style={{ width: '100px' }} options={teams.map((t) => ({ label: t.name, value: t.name }))} />
                </Form.Item>
            ),
        },
        {
            title: '(Over/Under)',
            dataIndex: 'odds1',
            key: 'odds1',
            render: (v: any, record: Line) => (
                <Form.Item name={`odds1-${record.uid}`} noStyle initialValue={v}>
                    <Input style={{ width: '100px' }} />
                </Form.Item>
            ),
        },
        {
            title: 'Team Number',
            dataIndex: 'number2',
            key: 'number2',
        },
        {
            title: 'Team One',
            dataIndex: 'team2',
            key: 'team2',
            render: (v: any, record: Line) => (
                <Form.Item name={`team2-${record.uid}`} noStyle initialValue={v}>
                    <Select style={{ width: '100px' }} options={teams.map((t) => ({ label: t.name, value: t.name }))} />
                </Form.Item>
            ),
        },
        {
            title: '(Over/Under)',
            dataIndex: 'odds2',
            key: 'odds2',
            render: (v: any, record: Line) => (
                <Form.Item name={`odds2-${record.uid}`} noStyle initialValue={v}>
                    <Input />
                </Form.Item>
            ),
        },
    ];
    const onFinish = async (values: any) => {
        // const uid = activeLine?.uid ? activeLine.uid : uniqueId();
        let modifyedRows: Partial<Line>[] = [];

        for (const k in values) {
            const [key, uid] = k.split('-');
            const index = modifyedRows.findIndex((row) => row.uid === uid);
            if (index > -1) {
                continue;
            } else {
                let lineRow: Partial<Line> = {};
                lineRow.uid = uid;
                lineRow.broadcast = values[`broadcast-${uid}`];
                lineRow.team1 = values[`team1-${uid}`];
                lineRow.odds1 = values[`odds1-${uid}`];
                lineRow.team2 = values[`team2-${uid}`];
                lineRow.odds2 = values[`odds2-${uid}`];
                lineRow.time = values[`time-${uid}`];

                modifyedRows = [...modifyedRows, lineRow];
            }
        }

        await lineApi.updateLines(modifyedRows);
        message.success('Successfully updated lines');
    };

    const handleChange = async (v: string) => {
        setSport(v);
    };
    return (
        <PageWrapper>
            <Form form={form} onFinish={onFinish}>
                <FlexContainer justify="space-between">
                    <Select style={{ width: '150px' }} options={Sports} value={sport} onChange={handleChange} />
                    <Button htmlType="submit" type="primary" style={{ marginBottom: '10px' }}>
                        Save
                    </Button>
                </FlexContainer>

                <Table
                    rowClassName={() => 'editable-row'}
                    rowKey={'uid'}
                    columns={defaultColumns as ColumnTypes}
                    dataSource={data || []}
                    loading={isLoading}
                    scroll={{ x: 240 }}
                    pagination={{
                        simple: isMobile,
                    }}
                />
            </Form>
        </PageWrapper>
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

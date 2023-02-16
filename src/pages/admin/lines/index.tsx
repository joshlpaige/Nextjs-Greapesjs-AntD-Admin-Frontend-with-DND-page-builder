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
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [activeLine, setActiveLine] = useState<Line | undefined>(undefined);
    const searchInput = React.useRef<InputRef>(null);

    const load = async () => {
        setIsLoading(true);
        const lines = await lineApi.getLines();
        setData(lines);
        const teams = await teamApi.getTeams();
        setTeams(teams);
        setIsLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const defaultColumns = [
        {
            title: 'Team One',
            dataIndex: 'team1',
            key: 'team1',
            editable: true,
            render: (_: string, record: Line) => `${record.team1} (${record.number1})`,
            filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }: FilterDropdownProps) => (
                <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                    <Input
                        ref={searchInput}
                        placeholder={`Search by Name`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => confirm()}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>

                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                close();
                            }}
                        >
                            close
                        </Button>
                    </Space>
                </div>
            ),
            onFilter: (value: string, record: Line) => record.team1.toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownOpenChange: (visible: boolean) => {
                if (visible) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        {
            title: 'Team Two',
            dataIndex: 'team2',
            key: 'team2',
            editable: true,
            render: (_: string, record: Line) => `${record.team2} (${record.number2})`,
            filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }: FilterDropdownProps) => (
                <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                    <Input
                        ref={searchInput}
                        placeholder={`Search by Name`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => confirm()}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>

                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                close();
                            }}
                        >
                            close
                        </Button>
                    </Space>
                </div>
            ),
            onFilter: (value: string, record: Line) => record.team2.toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownOpenChange: (visible: boolean) => {
                if (visible) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            editable: true,
            filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }: FilterDropdownProps) => (
                <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                    <DatePicker
                        onChange={(e) => setSelectedKeys(e ? [dayjs(e).format('MM/DD/YYYY')] : [])}
                        style={{ marginBottom: 8, display: 'block' }}
                    />

                    <Space>
                        <Button
                            type="primary"
                            onClick={() => confirm()}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>

                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                close();
                            }}
                        >
                            close
                        </Button>
                    </Space>
                </div>
            ),
            onFilter: (value: string, record: Line) => record.date.toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownOpenChange: (visible: boolean) => {
                if (visible) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },

        {
            title: 'Sport',
            dataIndex: 'sport',
            key: 'sport',
            editable: true,
            render: (_: string, record: any) => Sports.find((s) => s.value === record.sport)?.label || record.sport,
            filters: Sports.map((s) => ({ text: s.label, value: s.value })),
            onFilter: (value: string, record: any) => record.sport.includes(value),
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            render: (_: any, record: Line) => {
                return (
                    <Space direction={isMobile ? 'vertical' : 'horizontal'}>
                        <Typography.Link
                            onClick={() => {
                                setActiveLine(record);
                                setModalOpen(true);
                            }}
                        >
                            Edit
                        </Typography.Link>
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={async () => {
                                await lineApi.deleteLine(record.uid);
                                const newData = data.filter((item) => item.uid !== record.uid);
                                setData(newData);
                            }}
                        >
                            <a>Delete</a>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];
    const onFinish = async (values: any) => {
        const uid = activeLine?.uid ? activeLine.uid : uniqueId();
        const valToSubmit: Line = {
            ...values,
            time: values.time ? dayjs(values.time).format('HH:mm') : '',
            date: dayjs(values.date).format('MM/DD/YYYY'),
            uid: uid,
        };

        if (activeLine?.uid) await lineApi.updateLine(valToSubmit);
        else await lineApi.createLine(valToSubmit);
        const newData = [...data];
        const index = newData.findIndex((item) => uid === item.uid);
        if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
                ...item,
                ...valToSubmit,
            });
            setData(newData);
        } else {
            setData((data) => [valToSubmit, ...data]);
        }

        console.log('valToSubmit', valToSubmit);
        setModalOpen(false);
    };
    const handleAdd = async () => {
        setActiveLine(undefined);
        setModalOpen(true);
    };

    return (
        <PageWrapper>
            <FlexContainer fullwidth justify="space-between">
                <Typography.Title level={isMobile ? 4 : 3}>Manage Lines</Typography.Title>
                <Button type="primary" icon={<FileAddOutlined />} onClick={() => handleAdd()}>
                    Add New
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

            <Modal
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                footer={null}
                title={activeLine ? 'Update Line' : 'Add Line'}
                destroyOnClose
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    initialValues={{
                        date: dayjs(activeLine?.date),
                        time: activeLine?.time ? dayjs(activeLine?.time) : '',
                        sport: activeLine?.sport || '',
                        team1: activeLine?.team1 || '',
                        number1: activeLine?.number1 || '',
                        odds1: activeLine?.odds1 || '',
                        team2: activeLine?.team2 || '',
                        number2: activeLine?.number2 || '',
                        odds2: activeLine?.odds2 || '',
                        broadcast: activeLine?.broadcast || '',
                    }}
                    autoComplete="off"
                >
                    <Divider />
                    <div style={{ marginTop: '30px' }}>
                        <Form.Item label="Select Date" name="date">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item label="Select Time" name="time">
                            <TimePicker showSecond={false} hideDisabledOptions use12Hours format="hh:mm A" />
                        </Form.Item>
                        <Form.Item label="Select Sport" name="sport" wrapperCol={{ span: 8 }}>
                            <Select options={[{ label: '-- Select --', value: '' }, ...Sports]} />
                        </Form.Item>
                        <Divider />
                        <Space style={{ width: '100%', justifyContent: 'center' }} split={'VS'} size={'small'}>
                            <Space direction="vertical" style={{}} size={'small'}>
                                <Form.Item name="team1" wrapperCol={{ span: 24 }}>
                                    <Select
                                        options={[
                                            { label: 'Select Team', value: '' },
                                            ...teams.map((t) => ({ label: t.name, value: t.name })),
                                        ]}
                                    />
                                </Form.Item>
                                <Space>
                                    <Form.Item name="number1" wrapperCol={{ span: 24 }}>
                                        <InputNumber placeholder="500" />
                                    </Form.Item>
                                    <Form.Item name="odds1" wrapperCol={{ span: 24 }}>
                                        <Input placeholder="1" />
                                    </Form.Item>
                                </Space>
                            </Space>

                            <Space direction="vertical" style={{ textAlign: 'center' }} size={'small'}>
                                <Form.Item name="team2" wrapperCol={{ span: 24 }}>
                                    <Select
                                        options={[
                                            { label: 'Select Team', value: '' },
                                            ...teams.map((t) => ({ label: t.name, value: t.name })),
                                        ]}
                                    />
                                </Form.Item>
                                <Space>
                                    <Form.Item name="number2" wrapperCol={{ span: 24 }}>
                                        <InputNumber placeholder="500" />
                                    </Form.Item>
                                    <Form.Item name="odds2" wrapperCol={{ span: 24 }}>
                                        <Input placeholder="1" />
                                    </Form.Item>
                                </Space>
                            </Space>
                        </Space>
                        <Divider />
                        <Form.Item label="Broadcast" name="broadcast">
                            <Select
                                options={[
                                    { label: 'Select Broadcast', value: '' },
                                    ...Broadcast.map((b) => ({ label: b, value: b })),
                                ]}
                            />
                        </Form.Item>
                        {/* <Form.Item label="Set as edited?" name="edited">
                            <Checkbox />
                        </Form.Item> */}
                        <Form.Item wrapperCol={{ offset: isMobile ? 8 : 16, span: 8 }}>
                            <Space>
                                <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Space>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
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

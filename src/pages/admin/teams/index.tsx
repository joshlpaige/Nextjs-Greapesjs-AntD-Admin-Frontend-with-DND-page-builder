import React, { useEffect, useState, useContext } from 'react';

import { AccountType, Team } from '@shared/types';
import {
    Button,
    Divider,
    Input,
    InputNumber,
    InputRef,
    Modal,
    Select,
    Space,
    Table,
    Typography,
    message,
    notification,
} from 'antd';
import PageWrapper from '@client/componenets/PageWrapper';
import { Session } from 'next-auth';
import { SearchOutlined, FileAddOutlined } from '@ant-design/icons';

import { getSession } from 'next-auth/react';

import { teamApi } from '@client/api';
import { Popconfirm } from 'antd';

import { Form } from 'antd';
import { Sports } from '@shared/types/sport';
import { ColumnType } from 'antd/es/table';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { FlexContainer } from '@client/componenets/Layout';
import { Display, uniqueId } from '@shared/utils';

interface Item {
    uid: string;
    name: string;
    sport: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: keyof Item;
    title: any;
    inputType: 'dropdown' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'text' ? <Input /> : <Select options={Sports} />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

interface Props {
    session: Session;
}
type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export default function Home({ session }: Props) {
    const isMobile = Display.IsMobile();
    const [form] = Form.useForm();
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [editingKey, setEditingKey] = useState('');
    const searchInput = React.useRef<InputRef>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const load = async () => {
        setIsLoading(true);
        const teams = await teamApi.getTeams();
        setData(teams);

        setIsLoading(false);
    };

    useEffect(() => {
        load();
    }, []);
    const components = {
        body: {
            cell: EditableCell,
        },
    };
    const isEditing = (record: Item) => record.uid === editingKey;

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: '', sport: '', ...record });
        setEditingKey(record.uid || '');
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: string) => {
        try {
            const formRow = (await form.validateFields()) as Item;
            console.log('key', key);
            const row = { uid: key, name: formRow.name, sport: formRow.sport };
            await teamApi.updateTeam(row);
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.uid);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const defaultColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            editable: true,
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
            onFilter: (value: string, record: Item) => record.name.toString().toLowerCase().includes(value.toLowerCase()),
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
            render: (_: any, record: any) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.uid)} style={{ marginRight: 8 }}>
                            Save
                        </Typography.Link>
                        <Typography.Link onClick={() => cancel()}>Cancel</Typography.Link>
                    </span>
                ) : (
                    <Space direction={isMobile ? 'vertical' : 'horizontal'}>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </Typography.Link>
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={async () => {
                                await teamApi.deleteTeam(record.uid);
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
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'name' ? 'text' : 'dropdown',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const onFinish = async (values: any) => {
        const newTeam = { ...values, uid: uniqueId() };
        await teamApi.createTeam(newTeam);
        setData((data) => [newTeam, ...data]);
        setModalOpen(false);
    };
    return (
        <PageWrapper>
            <FlexContainer fullwidth justify="space-between">
                <Typography.Title level={isMobile ? 4 : 3}>Manage Teams</Typography.Title>
                <Button type="primary" icon={<FileAddOutlined />} onClick={() => setModalOpen(true)}>
                    Add New
                </Button>
            </FlexContainer>
            <Form form={form} component={false}>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    rowKey={'uid'}
                    columns={columns as ColumnTypes}
                    dataSource={data}
                    loading={isLoading}
                    scroll={{ x: 240 }}
                    pagination={{
                        simple: isMobile,
                    }}
                />
            </Form>
            <Modal open={modalOpen} onCancel={() => setModalOpen(false)} footer={null} title={'Add New Team'} destroyOnClose>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Divider />
                    <div style={{ marginTop: '30px' }}>
                        <Form.Item label="Team Name" name="name" wrapperCol={{ span: 12 }}>
                            <Input placeholder="team name" />
                        </Form.Item>
                        <Form.Item label="Select Sport" name="sport" wrapperCol={{ span: 12 }}>
                            <Select options={[{ label: '-- Select --', value: '' }, ...Sports]} />
                        </Form.Item>
                        <Divider />

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

import { teamApi } from '@client/api';
import { Popconfirm, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    key: string;
    name: string;
    sport: number;
}

export const TEAMSTABLE_COLUMNS: ColumnsType<DataType> = [
    {
        title: 'No',
        dataIndex: 'no',
        key: 'no',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Sport',
        dataIndex: 'sport',
        key: 'sport',
    },
];

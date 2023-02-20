import { Card, Divider, Space, Typography } from 'antd';
import Link from 'next/link';

interface Props {
    rule?: 'Baseball' | 'Basketball' | 'Football';
    url?: string;
}

const Sidebar = ({ rule, url }: Props) => {
    return (
        <Space direction="vertical">
            <Card title="Rules">
                <Space direction="vertical">
                    <Typography.Title level={5}>
                        <Link href="/rules/baseball">Baseball Rules</Link>
                    </Typography.Title>
                    <div>Purpose for money line wagering and run line wagering.</div>
                </Space>
                <Divider />
                <Space direction="vertical">
                    <Typography.Title level={5}>
                        <Link href="/rules/baseball">Basketball Rules</Link>
                    </Typography.Title>
                    <div>Basketball parleys and basketball doyles.</div>
                </Space>
                <Divider />
                <Space direction="vertical">
                    <Typography.Title level={5}>
                        <Link href="/rules/baseball">Football Rules</Link>
                    </Typography.Title>
                    <div>Football parleys and football doyles.</div>
                </Space>
            </Card>
            {rule && (
                <Card>
                    <Typography.Title level={2}>PDF Available</Typography.Title>
                    <a href={url} target="_blank" rel="noreferrer" download>
                        <span>Click here to download a .PDF of the {rule} Rules.</span>
                    </a>
                </Card>
            )}
        </Space>
    );
};

export default Sidebar;

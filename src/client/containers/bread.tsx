import React from 'react';
import { Button, Card, Space, Breadcrumb } from 'antd';
import Router from 'next/router';
import { Display } from '@shared/utils';

const BreadcrumbComp = () => {
    const [url, setCurrentUrl] = React.useState<string>('/rules');
    const isMobile = Display.IsMobile();
    React.useEffect(() => {
        const url = Router.asPath;
        setCurrentUrl(url);
        console.log(url);
    }, []);
    const urls = [
        {
            title: 'Rules',
            url: '/rules',
        },
        {
            title: 'Baseball Rules',
            url: '/rules/baseball',
        },
        {
            title: 'Basketball Rules',
            url: '/rules/basketball',
        },
        {
            title: 'Football Rules',
            url: '/rules/football',
        },
    ];

    return (
        <>
            <Card size="small" style={{ display: isMobile ? 'none' : 'block' }}>
                <Space split="/" size={'small'}>
                    {urls.map((icon) =>
                        url === icon.url ? (
                            <span>{icon.title}</span>
                        ) : (
                            <Button key={icon.title} type="link" href={icon.url}>
                                {icon.title}
                            </Button>
                        ),
                    )}
                </Space>
            </Card>
            <Breadcrumb style={{ display: isMobile ? 'inherit' : 'none' }}>
                {urls.map((icon) => (
                    <Breadcrumb.Item key={icon.title}>
                        {url === icon.url ? icon.title : <a href={icon.url}>{icon.title}</a>}
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
        </>
    );
};

export default BreadcrumbComp;

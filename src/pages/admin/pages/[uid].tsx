import React, { useState } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import { useEffect, useRef } from 'react';
import preset from 'grapesjs-preset-webpage';
import plugin from 'grapesjs-blocks-basic';
import 'grapesjs-preset-newsletter';
import customCodePlugin from 'grapesjs-custom-code';
import { GrapesjsReact } from 'grapesjs-react';
import grapesjs from 'grapesjs';
import { pageApi } from '@client/api';
import { uniqueId } from '@shared/utils';

import { useRouter } from 'next/router';
import { Button, Input, Space, Typography } from 'antd';
import { Page } from '@shared/types';

const PageBuilder = () => {
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { uid } = router.query;
    const [pageTitle, setPageTitle] = useState('');

    const savePage = async (editor: grapesjs.Editor) => {
        const f = editor.getHtml();
        const css = editor.getCss();
        await pageApi.updatePage({ uid: uid as string, title: pageTitle, html: f, css: css as string });
    };

    useEffect(() => {
        if (!!uid) {
            setIsLoading(true);
            pageApi.getPage(uid as string).then((res) => {
                console.log('res', uid);
                setHtml(res.html);
                setCss(res.css);
                setPageTitle(res.title);
                setIsLoading(false);
            });
        }
    }, [uid]);

    return (
        <>
            {!isLoading && (
                <>
                    <Space split={':'} style={{ padding: '15px', background: '#463a3c', width: '100%' }}>
                        <Input
                            style={{ fontSize: '14px' }}
                            value={pageTitle}
                            onChange={(e) => setPageTitle(e.target.value)}
                        />
                        <Button
                            type="primary"
                            size="small"
                            onClick={async () => {
                                await pageApi.updatePage({ uid: uid as string, title: pageTitle });
                            }}
                        >
                            Update Title
                        </Button>
                    </Space>
                    <GrapesjsReact
                        id="grapesjs-react"
                        plugins={[plugin, customCodePlugin, preset]}
                        storageManager={{
                            type: 'html',
                            autosave: false,
                            autoload: true,
                            stepsBeforeSave: 0,
                            id: 'gjs-',

                            onLoad: (data) => {
                                console.log('data', data);
                            },
                        }}
                        onInit={(editor) => {
                            if (editor) {
                                // @ts-ignore
                                window.editor = editor;
                                // @ts-ignore
                                editor.Panels.addButton('options', {
                                    id: 'save-page',
                                    className: 'fa fa-save',
                                    command: savePage,
                                    attributes: { title: 'Save Page' },
                                });
                                editor.setComponents(html, {});
                                editor.setStyle(css);
                            }
                        }}
                    />
                </>
            )}
        </>
    );
};

export default PageBuilder;

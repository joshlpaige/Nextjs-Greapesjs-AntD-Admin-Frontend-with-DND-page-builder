import React from 'react';
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

const PageBuilder = () => {
    const editorRef = useRef(null);
    const savePage = async (editor: grapesjs.Editor) => {
        const f = editor.getHtml();
        const css = editor.getCss();
        await pageApi.savePage({ uid: uniqueId(), title: 'test', status: 'published', html: f, css: css as string });
    };
    useEffect(() => {
        // const editor = editorRef.current;
        // const saveButton = editor.Panels.addButton('options', {
        //     id: 'save-page',
        //     className: 'fa fa-save',
        //     command: savePage,
        //     attributes: { title: 'Save Page' },
        // });
    }, []);

    return (
        <>
            <GrapesjsReact
                id="grapesjs-react"
                plugins={[plugin, customCodePlugin, preset]}
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
                    }
                }}
            />
        </>
    );
};

export default PageBuilder;

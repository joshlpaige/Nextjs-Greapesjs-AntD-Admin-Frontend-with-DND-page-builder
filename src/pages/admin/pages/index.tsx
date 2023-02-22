import React from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import { useEffect, useRef } from 'react';
import preset from 'grapesjs-preset-webpage';
import plugin from 'grapesjs-blocks-basic';
import 'grapesjs-preset-newsletter';
import customCodePlugin from 'grapesjs-custom-code';
import { GrapesjsReact } from 'grapesjs-react';

const PageBuilder = () => {
    const editorRef = useRef(null);
    const savePage = (editor: any) => {
        const f = editor.getHtml();
        console.log(f);
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

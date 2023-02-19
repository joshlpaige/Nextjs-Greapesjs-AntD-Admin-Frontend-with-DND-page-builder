import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';

import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <StyleProvider hashPriority="high">
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#00b96b',
                            colorLinkActive: '#56BFF8',
                        },
                    }}
                >
                    <Component {...pageProps} />
                </ConfigProvider>
            </StyleProvider>
        </SessionProvider>
    );
}


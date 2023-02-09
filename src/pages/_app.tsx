import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { StyleProvider } from '@ant-design/cssinjs';
import { Button, ConfigProvider, Layout } from 'antd';
import { Space, Typography } from 'antd';
import { Display } from '@shared/utils';
const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }: AppProps) {
    const isMobile = Display.IsMobile();
    return (
        <SessionProvider session={pageProps.session}>
            <StyleProvider hashPriority="high">
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#00b96b',
                        },
                    }}
                >
                    <Layout>
                        <Header >Header</Header>

                        <Content style={{ padding: isMobile ? '25px 5px' : '50px', minHeight: '90vh' }}>
                            <Component {...pageProps} />
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                             Footer
                        </Footer>
                    </Layout>
                </ConfigProvider>
            </StyleProvider>
        </SessionProvider>
    );
}


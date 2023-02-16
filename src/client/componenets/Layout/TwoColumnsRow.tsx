import { Row, Col, Divider } from 'antd';
import React from 'react';

interface Props {
    children1: React.ReactNode;
    children2: React.ReactNode;
    divider?: boolean;
    responsive?: boolean;
    c1Width?: number;
    c2Width?: number;
    style?: React.CSSProperties;
    dividerStyle?: React.CSSProperties;
    align?: 'center' | 'flex-start' | 'flex-end';
    gutter?: number | [number, number];
}

const TwoColumnsRow = ({
    children1,
    children2,
    divider = false,
    responsive = true,
    c1Width,
    c2Width,
    style,
    dividerStyle,
    align = 'center',
    gutter = 10,
}: Props) => {
    return (
        <>
            <Row style={{ marginBottom: '0.5rem', alignItems: align, ...style }} gutter={gutter}>
                <Col xs={responsive ? 24 : 12} xl={c1Width ? c1Width : 6}>
                    {children1}
                </Col>
                <Col xs={responsive ? 24 : 12} xl={c2Width ? c2Width : 12}>
                    {children2}
                </Col>
            </Row>
            {divider && <Divider style={{ marginTop: '0.2rem', ...dividerStyle }} />}
        </>
    );
};

export default TwoColumnsRow;

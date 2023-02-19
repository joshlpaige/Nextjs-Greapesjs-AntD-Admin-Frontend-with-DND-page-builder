import React from 'react';

import { Button, Divider, Space, Typography, Collapse, Row, Col, Card } from 'antd';
import { FrontPageWrapper } from '@client/componenets/PageWrapper';
import { Session } from 'next-auth';

import { getSession } from 'next-auth/react';

import { Display } from '@shared/utils';

import Rules from '@client/containers';

interface Props {
    session: Session;
}

const { Panel } = Collapse;

export default function Home({ session }: Props) {
    const isMobile = Display.IsMobile();

    const contents = [
        {
            header: 'BASEBALL RULES',
            items: (
                <ul>
                    <li>
                        IF A GAME IS CANCELLED OR SUSPENDED, THE WINNER IS DETERMINED BY THE SCORE AFTER THE LAST FULL INNING
                        (UNLESS THE HOME TEAM SCORES TO TIE, OR TAKES THE LEAD IN THE BOTTOM HALF OF THE INNING, IN WHICH
                        CASE THE WINNER IS DETERMINED BY THE SCORE AT THE TIME GAME IS CALLED).
                    </li>
                    <li>GAMES DO NOT CARRY OVER TO THE FOLLOWING DAY.</li>
                    <li>
                        {' '}
                        FOR RUN LINES AND GAME TOTALS (OVER/UNDER), A BASEBALL GAME BECOMES OFFICIAL AFTER 8 ½ INNINGS IF
                        HOME TEAM IS WINNING, OR 9 INNINGS IF VISITING TEAM IS WINNING
                    </li>
                    <li>TIE ON OVER &amp; UNDER IS A PUSH</li>
                    <li>OVER AND UNDERS ARE -110 EITHER WAY.</li>
                    <li>GAMES THAT ARE A PICK ARE -110 FOR BOTH TEAMS.</li>
                </ul>
            ),
        },
        {
            header: 'PURPOSE FOR MONEY LINE WAGERING',
            items: (
                <ul>
                    <li>1.ATLANTA BRAVES +150</li>
                    <li>2. PHILADELPHIA PHILLIES -160</li>
                    <li>FOR EVERY 100 YOU BET ON ATLANTA AND THEY WIN, YOU WIN 150.</li>
                    <li>IF ATLANTA LOSES, YOU LOSE AMOUNT WAGERED</li>
                    <li>FOR EVERY 100 YOU BET ON PHILADELPHIA AND THEY WIN, YOU WIN 100.</li>
                    <li>IF PHILADELPHIA LOSES, YOU LOSE 160 FOR EVERY 100 WAGERED.</li>
                </ul>
            ),
        },
        {
            header: 'PURPOSE FOR RUN LINE WAGERING',
            items: (
                <>
                    <ul>
                        <li>1.ATLANTA BRAVES +1 ½ +140</li>
                        <li>2. PHILADELPHIA -1 ½ -160</li>
                        <li>IF YOU BET 100 ON THE BRAVES AND THE PHILLIES WIN BY 2 OR MORE RUNS, YOU LOSE 100</li>
                        <li>IF THE PHILLIES WIN BY 1 RUN OR LOSE THE GAME, YOU WIN 140</li>
                        <li>IF YOU BET 100 ON THE PHILLIES AND THEY WIN BY 2 OR MORE RUNS, YOU WIN 100.</li>
                        <li>IF THE PHILLIES WIN BY 1 RUN OR LOSE THE GAME, YOU LOSE 160</li>
                    </ul>
                    <ul style={{ margin: '15px 0' }}>
                        <li>
                            <em>
                                YOU MAY ALWAYS ASK FOR THE MONEY LINE ON ANY GAME AND IT PAYS OUT AS FOLLOWS BASEBALL PAYOUTS
                                ON UNDERDOGS
                            </em>
                        </li>
                    </ul>
                    <ul>
                        <li>PICK UP TO -180 10%</li>
                        <li>185-200 20%</li>
                        <li>185-200 20%</li>
                        <li>205-220 30%</li>
                        <li>225-240 40%</li>
                        <li>245-260 50%</li>
                        <li>265-280 60%</li>
                        <li>285-300 70%</li>
                        <li>ANYTHING ELSE HIGHTER, CALL</li>
                    </ul>
                </>
            ),
        },
    ];

    return (
        <FrontPageWrapper>
            <Rules.Breadcrumb />
            <div style={{ marginTop: '25px' }}>
                <Typography.Title level={2}>Baseball Rules</Typography.Title>
            </div>
            <Divider />
            <Row gutter={[10, 10]}>
                <Col xs={24} xl={18}>
                    <Collapse defaultActiveKey={['0', '1', '2', '3']} ghost>
                        {contents.map((c, i) => (
                            <Panel
                                header={
                                    <Typography.Text style={{ fontWeight: '600' }} italic>
                                        {c.header}
                                    </Typography.Text>
                                }
                                key={`${i}`}
                            >
                                <div style={{ paddingLeft: '20px', fontSize: '12.5px' }}> {c.items}</div>
                            </Panel>
                        ))}
                    </Collapse>
                </Col>
                <Col xs={24} xl={6}>
                    <Rules.Sidebar rule="Baseball" url="/pdf_rules/Baseball_Rules_Linesandtimes_com.pdf" />
                </Col>
            </Row>
        </FrontPageWrapper>
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

    return {
        props: {
            session,
        },
    };
};

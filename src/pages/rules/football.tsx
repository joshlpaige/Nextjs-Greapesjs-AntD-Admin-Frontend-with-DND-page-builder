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
            header: 'FOOTBALL RULES',
            items: (
                <ul>
                    <li>
                        FOR WAGERING PRUPOSES, A FOOTBALL GAME (PRO OR COLLEGE) BECOMES OFFICIAL AFTER FIFTY FIVE (55)
                        MINUTES OF PLAY.
                    </li>
                    <li>GAMES LASTING UNDER 55 MINUTES CONSTITUTE “NO ACTION”, AND ALL BETS ARE CANCELED.</li>
                    <li>WAGERING ON THE GAME POINT SPREAD, MONEY LINE, OR TOTAL, INCLUDES OVERTIME SCORING.</li>
                    <li>SECOND HALF WAGERING INCLUDES ANDY OVERTIME SCORES TIE ON OVER &amp; UNDER IS A PUSH</li>
                    <li>10% JUICE ON LOSERS</li>
                </ul>
            ),
        },
        {
            header: 'FOOTBALL PARLEYS',
            items: (
                <ul>
                    <li>PARLEYS DO NOT GET CHARGED 10%</li>
                    <li>ONE TIE AND ONE WINNER ON 2 TEAM PARLEY IS NO BET.</li>
                    <li>2 TIES ON MULTIPLE TEAM PARLEYS IS A LOSER</li>
                </ul>
            ),
        },
        {
            header: 'FOOTBALL DOYLES (6 POINTS)',
            items: (
                <ul>
                    <li>10% IS CHARGED ON 2 TEAM LOSERS.</li>
                    <li>ONE TIE AND ONE WINNER ON 2 TEAM DOYLE IS NO BET</li>
                    <li>2 TIES ON MULTIPLE TEAM DOYLE IS A LOSER.</li>
                </ul>
            ),
        },
        {
            header: 'Football / Basketball Odds',
            items: (
                <>
                    <ul style={{ marginBottom: '15px' }}>
                        <b>PARLAYS | DOYLES</b>
                        <li>2 Team – 12-5 | 2 Team – Even</li>
                        <li>3 Team – 5-1 | 3 Team – 8-5</li>
                        <li>4 Team – 10-1 | 4 Team – 3-1</li>
                        <li>5 Team – 20-1 | 5 Team – 5-1</li>
                        <li>6 Team – 40-1 | 6 Team – 8-1</li>
                        <li>7 Team – 80-1</li>
                        <li>8 Team – 100-1</li>
                    </ul>
                    <ul>
                        <li>Add 10% on Losing Straight Bets.</li>
                        <li>Add 10% on Losing Two Team Doyles.</li>
                        <li>Tie on Over &amp; Under – (No Bet)</li>
                        <li>Tie on Straight Bet – (No Bet)</li>
                        <li>One Tie and one Winner on 2 Team Parley – (No Bet)</li>
                        <li>Two Ties on Multiple Doyles &amp; Parleys is Loser.</li>
                    </ul>
                </>
            ),
        },
    ];

    return (
        <FrontPageWrapper>
            <Rules.Breadcrumb />
            <div style={{ marginTop: '25px' }}>
                <Typography.Title level={2}>Pro & College Football Rules</Typography.Title>
            </div>
            <Divider />
            <Row gutter={[10, 10]}>
                <Col xs={24} xl={18}>
                    <Collapse defaultActiveKey={['0', '1', '2', '3', '4']} ghost>
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
                    <Rules.Sidebar rule="Football" url="/pdf_rules/Football_Rules_Linesandtimes_com.pdf" />
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

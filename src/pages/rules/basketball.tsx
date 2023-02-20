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
            header: 'BASKETBALL RULES',
            items: (
                <ul>
                    <li>
                        FOR WAGERING PURPOSES, A BASKETBALL GAME BECOMES OFFICIAL AFTER FORTY-THREE (43) MINUTES OF PLAY FOR
                        PROS, AND THIRTY-FIVE (35) MINUTES OF PLAY FOR COLLEGE.
                    </li>
                    <li>GAMES LASTING UNDER OFFICIAL TIME CONSTITUE “NO ACTION” OR “PUSH/CANCEL” AND ALL REFUNDED.</li>
                    <li>WAGERING ON THE GAME PERIOD SPREAD, MONEYLINE, OR TOTAL (OVER/UNDER) INCLUDE OVERTIME SCORING</li>
                    <li>HALF-TIME (2ND HALF) WAGERING INCLUDES ANY OVERTIME SCORES.</li>
                    <li>LAS VEGAS RULES APPLY FOR ANY RULES NO MENTIONED HERE.</li>
                </ul>
            ),
        },
        {
            header: 'BASKETBALL PARLEYS (PARLEY ODDS ARE SAME AS FOOTBALL)',
            items: (
                <ul>
                    <li>PARLEYS DO NOT GET CHARGED 10%</li>
                    <li>ONE TIE AND ONE WINNER ON 2 TEAM PARLEY IS NO BET.</li>
                    <li>2 TIES ON MULTIPLE TEAM PARLEYS IS A LOSER</li>
                </ul>
            ),
        },
        {
            header: 'BASKETBALL DOYLES (4 POINTS)',
            items: (
                <ul>
                    <li>10% IS CHARGED ON 2 TEAM LOSERS.</li>
                    <li>ONE TIE AND ONE WINNER ON 2 TEAM DOYLE IS NO BET</li>
                    <li>2 TIES ON MULTIPLE TEAM DOYLE IS A LOSER.</li>
                </ul>
            ),
        },
        {
            header: 'BASKETBALL DOUBLE DOYLES (Not accepting)',
            items: (
                <ul>
                    <li>ALL DOUBLE DOYLES THAT LOSE ARE CHARGED 10%</li>
                    <li>ONE TIE IS A NO BET</li>
                    <li>2 TIES IS A LOSS.</li>
                    <br />
                    <li>OVER/UNDER MAY BE USED IN 5 TEAM DOUBLE DOYLES.</li>
                    <li>ALL DOUBLE DOYLES PAY EVEN MONEY.</li>
                    <li>3 TEAMERS (6 POINTS)</li>
                    <li>4 TEAMERS (8 POINTS)</li>
                    <li>5 TEAMERS (10 POINTS)</li>
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
                <Typography.Title level={2}>Basketball Rules</Typography.Title>
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
                    <Rules.Sidebar rule="Basketball" url="/pdf_rules/Basketball_Rules_Linesandtimes_com.pdf" />
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

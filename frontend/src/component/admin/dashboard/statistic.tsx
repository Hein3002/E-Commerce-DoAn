import React from 'react';
import { SkinOutlined, SolutionOutlined, TeamOutlined, WarningOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

interface Statistics {
    user: any,
    outOfStock: any,
    salleBill: any,
    product: any,
}

interface Props {
    data: Statistics
}

const Statistics: React.FC<Props> = ({data}) => (
    <Row gutter={16}>
        <Col span={6}>
            <Card bordered={false}
                style={{ backgroundColor: "aliceblue" }}>
                <Statistic
                    title="User"
                    value={data?.user}
                    precision={1}
                    valueStyle={{ color: '#73a4cf' }}
                    prefix={<TeamOutlined />}
                    suffix=""
                />
            </Card>
        </Col>
        <Col span={6}>
            <Card bordered={false}
                style={{ backgroundColor: "#fff2f4" }}>
                <Statistic
                    title="Out of Stock"
                    value={data?.outOfStock}
                    precision={1}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<WarningOutlined />}
                    suffix=""
                />
            </Card>
        </Col>
        <Col span={6}>
            <Card bordered={false}
                style={{ backgroundColor: "#d9ffd9" }}>
                <Statistic
                    title="Sale Bill"
                    value={data?.salleBill}
                    precision={1}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<SolutionOutlined />}
                    suffix=""
                />
            </Card>
        </Col>
        <Col span={6}>
            <Card bordered={false}
                style={{ backgroundColor: "blanchedalmond" }}>
                <Statistic
                    title="Product"
                    value={data?.product}
                    precision={1}
                    valueStyle={{ color: '#f59300' }}
                    prefix={<SkinOutlined />}
                    suffix=""
                />
            </Card>
        </Col>
    </Row>
);

export default Statistics;
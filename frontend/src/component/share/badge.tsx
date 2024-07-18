import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Space } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

interface Props{
    CountCart: any
}

const BadgeCart: React.FC<Props> = ({ CountCart }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(CountCart)
    },[CountCart])

    return (
        <Space direction="vertical">
            <Space size="large">
                <Badge count={count}>
                <ShoppingCartOutlined style={{ fontSize: '25px' }} />
                </Badge>
            </Space>
        </Space>
    );
};

export default BadgeCart;
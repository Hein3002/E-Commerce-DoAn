import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Flex, Image, Table, notification } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { TableParams } from "../../model/config.model";
import moment from "moment";

import { apiGetAll, apiUpdate } from "../../services/admin/sallebill.services";
import Update from "../../component/modal/sallebill/update";
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, HighlightOutlined, PrinterOutlined } from "@ant-design/icons";

interface OrderType {
    id: string,
    userid: string,
    fullname: string,
    address: string,
    email: string,
    phone: string,
    quantity: string,
    province: string,
    district: string,
    ward: string,
    street: string,
    zip: string,
    moneytotal: number,
    pay: string,
    status: number,
    created_at: string,
    updated_at: string,
}

const SalleBill: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [id, setID] = useState("");
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
    const [data, setData] = useState<OrderType[]>();

    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1, //Value default
            pageSize: 5, //Value default
            pageSizeOptions: ["5", "10", "20", "50"], // Add pagesize
            showSizeChanger: true, // Show pageszie
        },
    });

    type NotificationType = 'success' | 'info' | 'warning' | 'error';
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType, content: string) => {
        api[type]({
            message: 'Notification',
            description: content,
        });
    };


    //Call APi
    const fetchData = async () => {
        try {
            setLoading(true);
            let results = await apiGetAll({});
            setData(results.data);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    // total: results.totalItems,
                },
            });
        } catch (error: any) {
            console.error(error.message);
        } finally {
            setTimeout(() => {
                setSelectedRowKeys([]);
                setLoading(false);
            }, 1000);
        }
    };

    const handleUpdate = async (action: any) => {
        if (selectedRowKeys.length > 0) {
            await apiUpdate({ data: selectedRowKeys, action: action });
            fetchData();
            openNotificationWithIcon('success', "Success!");
        } else {
            openNotificationWithIcon('warning', "Not enough information!");
        }
    }


    //Custom antd
    const columns: ColumnsType<OrderType> = [
        {
            title: "FullName",
            width: "115px",
            dataIndex: 'fullname',
        },
        {
            title: "Address",
            width: "220px",
            render: (_, record) => (
                <div>{record.address} - {record.district} - {record.province}</div>
            ),
        },
        {
            title: "Total",
            width: "150px",
            render: (_, record) => (
                <div>${record.moneytotal}</div>
            ),
            sorter: (a, b) => a.moneytotal - b.moneytotal,
        },
        {
            title: "Status",
            width: '200px',
            render: (_, record) => {
                switch (record.status) {
                    case 1:
                        return <div style={{ backgroundColor: '#b6bef5 ', color: '#0f2094', width: '100px', padding: '5px', textAlign: 'center', borderRadius: '5px' }}>Wait</div>
                    case 2:
                        return <div style={{ backgroundColor: '#f2f98a', color: '#8b9400', width: '100px', padding: '5px', textAlign: 'center', borderRadius: '5px' }}>Transport</div>
                    case 3:
                        return <div style={{ backgroundColor: '#bfefc4', color: '#02790c', width: '100px', padding: '5px', textAlign: 'center', borderRadius: '5px' }}>Finish</div>
                    case 4:
                        return <div style={{ backgroundColor: '#f9c9cd', color: '#a90312', width: '100px', padding: '5px', textAlign: 'center', borderRadius: '5px' }}>Cancel</div>
                    default:
                        break;
                }
            },
            sorter: (a, b) => a.status - b.status,
        },
        {
            title: "Created at",
            width: "150px",
            render: (_, record) => (
                <span>{moment(record.created_at).format("DD-MM-YYYY")}</span>
            ),
            sorter: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix(),
        },
        {
            title: "Action",
            width: "120px",
            render: (_, record) => (
                <Flex justify="center" >
                    <Button
                        onClick={() => {
                            setID(record?.id);
                            setIsOpenUpdateModal(true);
                        }}

                        icon={<HighlightOutlined />}
>
                        Edit
                    </Button>
                </Flex>
            ),
        },
    ];

    //Render page
    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]); //Change data => render

    //Custom antd
    const handleTableChange: TableProps["onChange"] = (
        pagination,
        filters,
        sorter
    ) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    //hidden modal
    const handleCancelUpdateModal = () => {
        setIsOpenUpdateModal(false);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <>
            {contextHolder}
            <Flex justify="space-between" align="center">
                <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    <Breadcrumb.Item>Salle</Breadcrumb.Item>
                </Breadcrumb>
                <Flex gap={20}>                   
                    <Button icon={<CheckCircleOutlined />} type="primary" onClick={() => {
                        handleUpdate('confirm');
                    }}>
                        
                        Confirm
                    </Button>
                    <Button icon={<CloseCircleOutlined />} danger onClick={() => {
                        handleUpdate('cancel');
                    }}>
                        Cancel
                    </Button>
                    <Button icon={<DeleteOutlined />} type="primary" danger onClick={() => {
                        handleUpdate('delete');
                    }}>
                        Delete
                    </Button>
                </Flex>
            </Flex>
            <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} bills` : ''}
            </span>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
            />
            <Update isOpenUpdateModal={isOpenUpdateModal} fetchData={fetchData} handleCancelUpdateModal={handleCancelUpdateModal} id={id} />
        </>
    );
};
export default SalleBill;
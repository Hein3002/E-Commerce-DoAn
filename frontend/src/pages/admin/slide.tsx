import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Flex, Image, Table } from "antd";
import SlideType from "../../model/slide.model";
import { ColumnsType, TableProps } from "antd/es/table";
import { TableParams } from "../../model/config.model";
import moment from "moment";
import Delete from "../../component/modal/slide/delete";
import Insert_Update from "../../component/modal/slide/insert_update";
import { apiGetAll } from "../../services/admin/slide.services";

const Slide: React.FC = () => {
    const [id, setID] = useState("");
    const [isOpenIUModal, setIsOpenIUModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [data, setData] = useState<SlideType[]>();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1, //Value default
            pageSize: 5, //Value default
            pageSizeOptions: ["5", "10", "20", "50"], // Add pagesize
            showSizeChanger: true, // Show pageszie
        },
    });


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
            setLoading(false);
        }
    };

    //Custom antd
    const columns: ColumnsType<SlideType> = [
        {
            title: "Image",
            width: "115px",
            render: (_, record) => {
                return <Image src={('images/slide/' + record.image)} />
            }
        },
        {
            title: "Name",
            dataIndex: "name",
            width: "200px",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Date created",
            width: "200px",
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
                    <Button danger
                        onClick={() => {
                            setID(record.id);
                            setIsOpenIUModal(true);
                        }}
                    >
                        Edit
                    </Button>
                    <Button style={{ marginLeft: '5px' }} type="primary" danger
                        onClick={() => {
                            setID(record.id);
                            setIsOpenDeleteModal(true);
                        }}
                    >
                        Delete
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
    const handleCancelIUModal = () => {
        setIsOpenIUModal(false);
    };

    const handleCancelDeleteModal = () => {
        setIsOpenDeleteModal(false);
    };

    return (
        <>
            <Flex justify="space-between" align="center">
                <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Generel</Breadcrumb.Item>
                    <Breadcrumb.Item>Slide</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={() => {
                    setID("");
                    setIsOpenIUModal(true);
                }}>
                    Add
                </Button>
            </Flex>

            <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
            // scroll={{ y: 400 }}
            />
            <Insert_Update isOpenIUModal={isOpenIUModal} fetchData={fetchData} handleCancelIUModal={handleCancelIUModal} id={id} />
            <Delete isOpenDeleteModal={isOpenDeleteModal} fetchData={fetchData} handleCancelDeleteModal={handleCancelDeleteModal} id={id} />
        </>
    );
};

export default Slide;
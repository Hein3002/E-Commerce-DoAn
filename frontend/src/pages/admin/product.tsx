import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Flex, Image, Table } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { TableParams } from "../../model/config.model";
import moment from "moment";
import Delete from "../../component/modal/product/delete";
import Insert from "../../component/modal/product/insert";

import ProductType from "../../model/product.model";
import BrandType from "../../model/brand.model";
import CategoryType from "../../model/category.model";
import { apiGetAll as apiGetAllBrand } from "../../services/admin/brand.services";
import { apiGetAll as apiGetAllCategory } from "../../services/admin/category.services";
import Update from "../../component/modal/product/update";
import { apiGetAll } from "../../services/admin/product.services";

const Product: React.FC = () => {
    const [id, setID] = useState("");
    const [isOpenIUModal, setIsOpenIUModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
    const [data, setData] = useState<ProductType[]>();

    const [brand, setBrand] = useState<BrandType[]>();
    const [category, setCategory] = useState<CategoryType>();

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
            let brand = await apiGetAllBrand({});
            let category = await apiGetAllCategory({});
            setData(results.data);
            setBrand(brand.data);
            setCategory(category.data);
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
    const columns: ColumnsType<ProductType> = [
        {
            title: "Image",
            width: "115px",
            render: (_, record) => {
                // return <Image src={('images/Product/' + record.first_image.image)} />
                return record.first_image ? (
                    <Image src={'images/Product/' + record.first_image.image} />
                ) : (
                    <div style={{ color: 'red' }}>No image</div>
                );
            }
        },
        {
            title: "Name",
            dataIndex: "name",
            width: "220px",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Discount",
            width: "150px",
            render: (_, record) => (
                <div>${record.discount}</div>
            ),
            sorter: (a, b) => a.discount - b.discount,
        },
        {
            title: "Description",
            dataIndex: "description",
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
                    <Button danger
                        onClick={() => {
                            setID(record.id);
                            setIsOpenUpdateModal(true);
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

    const handleCancelUpdateModal = () => {
        setIsOpenUpdateModal(false);
    };

    return (
        <>
            <Flex justify="space-between" align="center">
                <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Generel</Breadcrumb.Item>
                    <Breadcrumb.Item>Product</Breadcrumb.Item>
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
            <Insert isOpenIUModal={isOpenIUModal} fetchData={fetchData} handleCancelIUModal={handleCancelIUModal} brand={brand} category={category} />
            <Delete isOpenDeleteModal={isOpenDeleteModal} fetchData={fetchData} handleCancelDeleteModal={handleCancelDeleteModal} id={id} />
            <Update isOpenUpdateModal={isOpenUpdateModal} fetchData={fetchData} handleCancelUpdateModal={handleCancelUpdateModal} id={id} brand={brand} category={category} />
        </>
    );
};

export default Product;
import { Button, Flex, Form, Input, InputNumber, Modal, Select, Space, Table, notification } from "antd";
import { useEffect, useState } from "react";
import { apiGetByID, apiUpdateByID } from "../../../services/admin/sallebill.services";
import OrderDetailType from "../../../model/orderDetails.models";
import { ColumnsType, TableProps } from "antd/es/table";
import { TableParams } from "../../../model/config.model";

const { Option } = Select;
type NotificationType = 'success' | 'info' | 'warning' | 'error';
const formItemLayout = {
    labelCol: {
        xs: { span: 5 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};


const Update = (props: any) => {
    const [form] = Form.useForm();
    const [data, setData] = useState<OrderDetailType[]>();
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType, content: string) => {
        api[type]({
            message: 'Notification',
            description: content,
        });
    };

    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1, //Value default
            pageSize: 5, //Value default
        },
    });

    const handleOk = () => {
        form
            .validateFields()
            .then(async (values: any) => {
                try {
                    props.handleCancelUpdateModal();
                    await apiUpdateByID(props.id, {
                        'status': values.status,
                        '_method': 'PUT'
                    });
                    props.fetchData();
                    openNotificationWithIcon('success', "Update successful!");
                } catch (error: any) {
                    throw (error.message);
                }
            })
            .catch((error: any) => {
                openNotificationWithIcon('warning', error);
            });
    };

    const handleCancel = () => {
        props.handleCancelUpdateModal();
    };

    const fetchData = async (id: any) => {
        let results = await apiGetByID(id);
        form.setFieldsValue(results.data.salleBill);
        setData(results.data.salleBillDetail)
    };

    useEffect(() => {
        if (props.id !== "") {
            fetchData(props.id);
        }
    }, [props.id]);

    //Custom antd
    const columns: ColumnsType<OrderDetailType> = [
        {
            title: "Name Product",
            width: "115px",
            dataIndex: 'name_product'
        },
        {
            title: "Size",
            width: "115px",
            dataIndex: 'size'
        },
        {
            title: "Color",
            width: "115px",
            dataIndex: 'color'
        },
        {
            title: "Quantity",
            width: "115px",
            dataIndex: 'quantity'
        },
    ];

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
    };

    return (
        <>
            {contextHolder}
            <Modal
                title="Salle Bill Information"
                open={props.isOpenUpdateModal}
                cancelText={"Cancel"}
                okText={"Save"}
                width={"60vw"}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(child) => {
                    return (
                        <>
                            <hr
                                style={{
                                    color: "#F8F3F3",
                                    marginTop: "5px",
                                    marginBottom: "5px",
                                }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
                                {child}
                            </div>
                        </>
                    );
                }}
            >
                <Form
                    {...formItemLayout}
                    form={form}
                    initialValues={{
                        residence: ["zhejiang", "hangzhou", "xihu"],
                        prefix: "86",
                    }}
                    style={{ maxWidth: "100%" }}
                >
                    <Form.Item
                        style={{ visibility: "hidden" }}
                        name="id"
                        label="ID"
                    >
                        <Input readOnly />
                    </Form.Item>

                    <Form>
                        <Table 
                         columns={columns}
                         dataSource={data}
                         onChange={handleTableChange}
                         pagination={tableParams.pagination}
                        />
                    </Form>

                    <Form.Item
                        name="fullname"
                        label="FullName"
                    >
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                    >
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone"
                    >
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item
                        name="moneytotal"
                        label="Total($)"
                    >
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item
                        name="pay"
label="Pay"
                    >
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item
                        name="province"
                        label="Province"
                    >
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item
                        name="district"
                        label="District"
                    >
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Address"
                    >
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Status"
                    >
                        <Select placeholder="Choose status">
                            <Option value={1}>Wait</Option>
                            <Option value={2}>Transport</Option>
                            <Option value={3}>Finish</Option>
                            <Option value={4}>Cancel</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default Update;
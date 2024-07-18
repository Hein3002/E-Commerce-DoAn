import { Button, Form, Input, InputNumber, Modal, Select, Space, Upload, UploadFile, notification } from "antd";
import { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { apiGetByID, apiUpdate } from "../../../services/admin/product.services";

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
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType, content: string) => {
        api[type]({
            message: 'Notification',
            description: content,
        });
    };

    const [image, setImage] = useState<UploadFile[]>([]); // State to hold the image file
    const [imageRemove, setImageRemove] = useState<number[]>([]);
    // const [refreshKey, setRefreshKey] = useState(0);

    const handleOk = () => {
        form
            .validateFields()
            .then(async (values: any) => {
                const formData = new FormData();
                Object.keys(values).forEach(key => {
                    formData.append(key, values[key]);
                    if (values[key] && Array.isArray(values[key])) {
                        values[key].forEach((item: any) => {
                            if (item.color) formData.append('color[]', item.color);
                            if (item.size) formData.append('size[]', item.size);
                            if (item.quantity) formData.append('quantity[]', item.quantity);
                        });
                    }
                });

                if (image) {
                    image.forEach((file: any) => {
                        if (file.originFileObj) {
                            formData.append('image[]', file.originFileObj);
                        }
                    });
                }

                if (imageRemove) {
                    imageRemove.forEach((id: any) => {
                        formData.append('imageRemove[]', id);
                    });
                }

                try {
                    formData.append('_method', 'PUT');
                    props.handleCancelUpdateModal();
                    await apiUpdate(props.id, formData);
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

    const handleKeyPress = (event: any) => {
        const charCode = event.which ? event.which : event.keyCode;
        // Allow backspace, delete, tab, escape, enter and arrow keys
        if (
            charCode === 8 ||
            charCode === 46 ||
            charCode === 9 ||
            charCode === 27 ||
            charCode === 13 ||
            (charCode >= 37 && charCode <= 40)
        ) {
            return;
        }
        // Prevent input if it is not a number
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    };

    const fetchData = async (id: any) => {
        let results = await apiGetByID(id);
        form.setFieldsValue(results.data[0]);

        if (results.data[0].images) {
            const imageFiles = results.data[0].images.map((image: any, index: any) => ({
                uid: index, // unique identifier
                name: image.image, // file name
                status: 'done', // status for the file
                url: 'http://localhost:3000/images/Product/' + image.image, // image URL
                id: image.id,
            }));
            setImage(imageFiles);
        }
    };

    useEffect(() => {
        if (props.id !== "") {
            fetchData(props.id);
            setImage([]);
            setImageRemove([]);
        }
    }, [props.id]);

    return (
        <>
            {contextHolder}
            <Modal
                title="Product Information"
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
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: "Name cannot be blank!",
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="brandid"
                        label="Brand"
                        rules={[
                            { required: true, message: "Brand cannot be left blank!" },
                        ]}
                    >
                        <Select placeholder="Choose brand">
                            {props?.brand?.map((item: any, index: any) => (
                                <Option key={item + index} value={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="catid"
                        label="Category"
                        rules={[
                            { required: true, message: "Category cannot be left blank!" },
                        ]}
                    >
                        <Select placeholder="Choose category">
                            {props?.category?.map((item: any, index: any) => (
                                <Option key={item + index} value={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[
                            { required: true, message: "Price cannot be left blank!" },
                        ]}
                    >
                        <InputNumber<number>
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                            style={{ width: '100%' }}
                            onKeyPress={handleKeyPress}
                        />
                    </Form.Item>

                    <Form.Item
                        name="discount"
                        label="Discount"
                        rules={[
                            { required: true, message: "Discount cannot be left blank!" },
                        ]}
                    >
                        <InputNumber<number>
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                            style={{ width: '100%' }}
                            onKeyPress={handleKeyPress}
                        />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            {
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input.TextArea showCount maxLength={100} />
                    </Form.Item>

                    <Form.Item label="Upload">
                        <Upload
                            // key={refreshKey}
                            listType="picture-card"
                            fileList={image}
                            showUploadList={{ showPreviewIcon: false }}
                            onChange={({ fileList: newFileList }) => setImage(newFileList)}
                            beforeUpload={(file) => {
                                setImage(prevImages => [...prevImages, {
                                    uid: file.uid,
                                    name: file.name,
                                    status: 'done',
                                    url: URL.createObjectURL(file)
                                }]);
                                return false; // Prevent default upload behavior
                            }}
                            onRemove={(file: any) => {
                                if (file?.id) {
                                    setImageRemove(prevIds => [...prevIds, file.id]); // Add the removed file id to imageRemove
                                }
                            }}

                        >
                            {image.length >= 10 ? null : (
                                <button style={{ border: 0, background: 'none' }} type="button">
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </button>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.List name="product_detail">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8, marginLeft: 180 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'color']}
                                            rules={[{ required: true, message: 'Color cannot be left blank!' }]}
                                            style={{ width: '180px' }}
                                        >
                                            <Input placeholder="Color" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'size']}
                                            rules={[{ required: true, message: 'Size cannot be left blank!' }]}
                                            style={{ width: '180px' }}
                                        >
                                            <Input placeholder="Size" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'quantity']}
                                            rules={[{ required: true, message: 'Quantity cannot be left blank!' }]}
                                            style={{ width: '180px' }}
                                        >
                                            <Input type="number" placeholder="Quantity" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ marginLeft: 180 }}>
                                        Add details
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                </Form>
            </Modal>
        </>
    );
};
export default Update;

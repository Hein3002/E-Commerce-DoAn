import { Button, Form, Image, Input, Modal, Upload, notification } from "antd";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { apiCreate, apiGetByID, apiUpdate } from "../../../services/admin/brand.services";

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

const Insert_Update = (props: any) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: NotificationType, content: string) => {
    api[type]({
      message: 'Notification',
      description: content,
    });
  };

  const [image, setImage] = useState<File | string | null>(null); 

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values: any) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          formData.append(key, values[key]);
        });

        if (image && typeof image !== 'string') {
          formData.append('image', image); // Append the image file to the formData
        }

        if (props.id) {
          try {
            formData.append('_method', 'PUT'); // Add _method for PUT request
            props.handleCancelIUModal();
            await apiUpdate(props.id, formData);
            props.fetchData();
            openNotificationWithIcon('success', "Update successful!");
          } catch (error: any) {
            throw (error.message);
          }
        } else {
          try {
            props.handleCancelIUModal();
            await apiCreate(formData);
            props.fetchData();
            openNotificationWithIcon('success', "Add successful!");
            form.resetFields();
            setImage(null);
          } catch (error: any) {
            throw (error.message);
          }
        }
      })
      .catch(() => {
        openNotificationWithIcon('warning', "Not enough information!");
      });
  };

  const handleCancel = () => {
    props.handleCancelIUModal();
  };

  const fetchData = async (id: any) => {
    let results = await apiGetByID(id);
    form.setFieldsValue(results.data);
    setImage(results.data.image); // Reset the image state when fetching data
  };

  useEffect(() => {
    form.resetFields();
    if (props.id !== "") {
      fetchData(props.id);
    } else {
      setImage(null);
    }
  }, [props.id]);

  return (
    <>
      {contextHolder}
      <Modal
        title="Brand Information"
        open={props.isOpenIUModal}
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
          scrollToFirstError
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

          <Form.Item label="Image" name="image">
            <Upload
              beforeUpload={(file) => {
                setImage(file); // Set the image file to the state
                return false; // Prevent default upload behavior
              }}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
      
          </Form.Item>

          <Form.Item style={{ marginLeft: '180px'}}>

          {image && (
              typeof image === 'string' ? (
                <Image style={{ height: '200px', marginTop: '10px' }} src={`images/brand/${image}`} />
              ) : (
                <Image style={{ height: '200px', marginTop: '10px' }} src={URL.createObjectURL(image)} />
              )
            )}
          </Form.Item>
          
        </Form>
      </Modal>
    </>
  );
};
export default Insert_Update;

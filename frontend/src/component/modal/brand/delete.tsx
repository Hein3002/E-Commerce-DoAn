import { Flex, Modal, notification } from "antd";
import { apiDelete } from "../../../services/admin/slide.services";
type NotificationType = 'success' | 'info' | 'warning' | 'error';
const Delete = (props: any) => {
  const [api, contextHolder] = notification.useNotification();
  const handleOk = async () => {
    props.handleCancelDeleteModal();
    await apiDelete(props.id);
    props.fetchData();
    openNotificationWithIcon('success');
  };

  const handleCancel = () => {
    props.handleCancelDeleteModal();
  };

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: 'Notification',
      description: 'Delete successful!',
    });
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Delete Slide"
        open={props.isOpenDeleteModal}
        cancelText={"Cancel"}
        okText={"Delete"}
        width={"40vw"}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{marginTop: '150px'}}
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
              <Flex justify={"flex-end"} align="center" gap={8}>
                {child}
              </Flex>
            </>
          );
        }}
      >
        <div>Do you want to delete this slide?</div>
      </Modal>
    </>
  );
};
export default Delete;

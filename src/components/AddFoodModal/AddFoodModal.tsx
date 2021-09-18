import React, { FC, useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form, Input, message } from "antd";
import { get } from "lodash";
import styled from "styled-components";
import { useAddFood } from "hooks/useMyLunch";

interface AddFoodModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setRefresh: (refresh: boolean) => void;
}

const AddFoodModal: FC<AddFoodModalProps> = (props) => {
  const { visible, setVisible, setRefresh } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const { addFood, status, addFoodMessage } = useAddFood();
  const [form] = Form.useForm();

  const handleCloseModal = () => {
    form.resetFields();
    setVisible(false);
    setLoading(false);
  };

  useEffect(() => {
    if (status === "SUCCESS") {
      setRefresh(true);
      handleCloseModal();
      message.success({ content: "Add Success!", key: "updatable" });
    }
    if (status === "ERROR") {
      message.error({ content: "This food was added", key: "updatable" });
    }
  }, [status, addFoodMessage]); //eslint-disable-line

  const onFinish = (formValue: Object) => {
    const foodName = get(formValue, "foodName", "");
    setLoading(true);
    addFood(foodName);
  };

  return (
    <Modal
      title="Add Food"
      visible={visible}
      footer={false}
      onCancel={handleCloseModal}
    >
      <AddFoodModalStyle>
        <Form
          form={form}
          layout={"vertical"}
          onFinish={onFinish}
          autoComplete="on"
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Food Name"
            name="foodName"
            rules={[
              { required: true, message: "Please input your food name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Row gutter={[20, 0]} className="button-container">
            <Col span="12">
              <Button
                htmlType="submit"
                className="button add"
                loading={loading}
              >
                ADD
              </Button>
            </Col>
            <Col span="12">
              <Button
                onClick={handleCloseModal}
                className="button cancel"
                loading={loading}
              >
                CANCEL
              </Button>
            </Col>
          </Row>
        </Form>
      </AddFoodModalStyle>
    </Modal>
  );
};

const AddFoodModalStyle = styled.div`
  .ant-input {
    height: 48px;
  }

  .ant-form-item-required {
    font-size: 20px;
    font-weight: bold;
  }

  .button-container {
    margin-top: 40px;
  }
  .button {
    width: 100%;
    height: 48px;
  }
`;

export default AddFoodModal;

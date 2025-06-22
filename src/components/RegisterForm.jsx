import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import api from "../services/api";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{10,}$/;

export default function RegisterForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    setApiError(null);
    try {
      await api.post("/register", {
        email: values.email,
        password: values.password,
      });
      onSuccess?.();
      form.resetFields();
    } catch (err) {
      setApiError(
        err.response?.data?.error ||
          err.response?.data?.detail ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
      style={{ maxWidth: 400, margin: "0 auto" }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Enter your email" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          {
            pattern: passwordRegex,
            message:
              "At least 10 characters, letters, numbers, and one special character",
          },
        ]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Create a password" />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match!"));
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Repeat your password" />
      </Form.Item>
      <div className="mb-4 p-3 bg-gray-50 rounded-md text-sm text-gray-600">
        <p className="font-medium mb-2">Password must contain:</p>
        <ul className="space-y-1">
          <li>At least 10 characters</li>
          <li>Letters and numbers</li>
          <li>At least one special character</li>
        </ul>
      </div>
      {apiError && <Alert type="error" message={apiError} showIcon />}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          className="bg-indigo-600 hover:bg-indigo-700 border-none cursor-pointer !rounded-button whitespace-nowrap"
          loading={loading}
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}
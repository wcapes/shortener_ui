import React, { useState } from "react";
import { Form, Input, Button, Alert, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setApiError(null);
    try {
      await login(values.email, values.password);
      navigate("/dashboard");
    } catch (err) {
      setApiError(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <Typography.Title level={2} className="text-center mb-6">Log In</Typography.Title>
        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          {apiError && <Alert type="error" message={apiError} showIcon />}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="bg-indigo-600 hover:bg-indigo-700 border-none !rounded-button whitespace-nowrap"
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          <a href="/register" className="text-indigo-600 hover:text-indigo-800">Don't have an account? Register</a>
        </div>
      </div>
    </div>
  );
}
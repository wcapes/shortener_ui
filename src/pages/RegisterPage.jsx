import React, { useState } from "react";
import { Form, Input, Button, Alert, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{10,}$/;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setApiError(null);
    try {
      await api.post("/register", {
        email: values.email,
        password: values.password,
      });
      setSuccess(true);
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

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full text-center">
          <Typography.Title level={3}>
            Registration Successful!
          </Typography.Title>
          <Typography.Paragraph>
            Please check your email and verify your account before logging in.
          </Typography.Paragraph>
          <Button type="primary" onClick={() => navigate("/login")}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <Typography.Title level={2} className="text-center mb-6">Register</Typography.Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
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
              className="bg-indigo-600 hover:bg-indigo-700 border-none !rounded-button whitespace-nowrap"
              loading={loading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          <a href="/login" className="text-indigo-600 hover:text-indigo-800">Already have an account? Log In</a>
        </div>
      </div>
    </div>
  );
}
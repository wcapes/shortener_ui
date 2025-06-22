import React, { useState } from "react";
import { Form, Input, Button, Alert, Typography } from "antd";
import api from "../services/api";
import { useSearchParams, useNavigate } from "react-router-dom";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{10,}$/;

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setApiError(null);
    try {
      await api.post("/reset-password", {
        token,
        password: values.password,
      });
      setSuccess(true);
      form.resetFields();
    } catch (err) {
      setApiError(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Password reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full text-center">
          <Typography.Title level={3}>Password Reset!</Typography.Title>
          <Typography.Paragraph>
            You can now log in with your new password.
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
        <Typography.Title level={2} className="text-center mb-6">Reset Password</Typography.Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            label="New Password"
            name="password"
            rules={[
              { required: true, message: "Please input your new password!" },
              {
                pattern: passwordRegex,
                message:
                  "At least 10 characters, letters, numbers, and one special character",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Enter new password" />
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
            <Input.Password placeholder="Repeat new password" />
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
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
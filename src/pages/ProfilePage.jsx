import React, { useState } from "react";
import { Form, Input, Button, Alert, Typography } from "antd";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{10,}$/;

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onFinish = async (values) => {
    setLoading(true);
    setApiError(null);
    setSuccess(null);
    try {
      if (values.new_password) {
        await api.post("/change-password", {
          old_password: values.old_password,
          new_password: values.new_password,
        });
      }
      if (values.email && values.email !== user.email) {
        await api.post("/change-email", { email: values.email });
        setUser({ ...user, email: values.email });
      }
      setSuccess("Profile updated!");
    } catch (err) {
      setApiError(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Profile update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <Typography.Title level={2} className="text-center mb-6">My Profile</Typography.Title>
        <Form
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          initialValues={{ email: user.email }}
        >
          <Form.Item label="Email" name="email" rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}>
            <Input />
          </Form.Item>
          <Form.Item label="Old Password" name="old_password">
            <Input.Password placeholder="Enter current password to change password"/>
          </Form.Item>
          <Form.Item
            label="New Password"
            name="new_password"
            rules={[
              {
                pattern: /^$|^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{10,}$/,
                message:
                  "At least 10 characters, letters, numbers, and one special character",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            name="confirm"
            dependencies={["new_password"]}
            hasFeedback
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
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
          {success && <Alert type="success" message={success} showIcon />}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="bg-indigo-600 hover:bg-indigo-700 border-none !rounded-button whitespace-nowrap"
            >
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
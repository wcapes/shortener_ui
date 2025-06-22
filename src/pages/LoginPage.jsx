import React, { useState } from "react";
import { Card, Button, Form, Input, Typography, message } from "antd";
import { Link } from "react-router-dom";
import api from "../services/api";

const { Title, Paragraph } = Typography;

export default function LoginPage() {
  const [form] = Form.useForm();
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Quick shorten handler
  const handleShorten = async (values) => {
    setLoading(true);
    setShortUrl("");
    try {
      // Adjust API call as needed for your backend
      const res = await api.post("/shorten", { url: values.url });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      message.error("Failed to shorten URL. Please try again.");
    }
    setLoading(false);
  };

  // Login handler (pseudo-code, fill in with your logic)
  const handleLogin = async (values) => {
    // Your login logic here
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <Card className="w-full max-w-xl mt-16 shadow-lg">
        <div className="text-center mb-6">
          <Title level={2}>Welcome to Snipzo!</Title>
          <Paragraph>
            <b>Instantly shorten links for free.</b> No account needed to try. 
            <br />
            <span className="text-emerald-600 font-medium">Sign up</span> for even more features!
          </Paragraph>
        </div>

        {/* Try it now quick-Snipzo */}
        <Card className="mb-8 bg-blue-50 border-none" title="Try it now! Shorten a link instantly">
          <Form layout="inline" onFinish={handleShorten}>
            <Form.Item
              name="url"
              rules={[
                { required: true, message: "Paste a URL to shorten" },
                { type: "url", message: "Must be a valid URL" },
              ]}
            >
              <Input placeholder="Paste your long URL here" style={{ width: 280 }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Shorten
              </Button>
            </Form.Item>
          </Form>
          {shortUrl && (
            <div className="mt-2 text-green-600">
              Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="underline">{shortUrl}</a>
            </div>
          )}
        </Card>

        {/* Login Form */}
        <div className="text-center mb-4">
          <Title level={4}>Login to manage your links</Title>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleLogin}
          className="mb-2"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log In
            </Button>
          </Form.Item>
        </Form>
        <div className="flex justify-between">
          <Link to="/forgot" className="text-blue-500">Forgot password?</Link>
          <span>
            New to Snipzo?{" "}
            <Link to="/register" className="text-emerald-600 font-bold">
              Register for free!
            </Link>
          </span>
        </div>
      </Card>
    </div>
  );
}
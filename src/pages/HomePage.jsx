import React, { useState, useEffect } from "react";
import PricingCard from "../components/PricingCard";
import { PRICING_TIERS } from "../constants/pricingTiers";
import {
  Button,
  Input,
  Form,
  Modal,
  Tabs,
  Divider,
  Card,
  Statistic,
  List,
  Typography,
  Badge,
} from "antd";
import {
  LinkOutlined,
  UserOutlined,
  LockOutlined,
  CheckCircleOutlined,
  BarChartOutlined,
  QrcodeOutlined,
  SettingOutlined,
  GlobalOutlined,
  TeamOutlined,
  SecurityScanOutlined,
  ApiOutlined,
  RocketOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

echarts.use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  CanvasRenderer,
]);

export default function HomePage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("register");
  const [shortenedUrl, setShortenedUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const showModal = (tab) => {
    setActiveTab(tab);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleShortenUrl = async () => {
    console.log("Starting");
    if (!url) return;
    setIsLoading(true);
    console.log(apiBaseUrl);

    try {
      // Prepare payload
      const payload = {
        source_url: url,
      };

      // Only include custom_short_code if user is allowed and has entered it
      console.log(userIsLoggedIn);

      if (userIsLoggedIn && userTier !== "Free" && customShortCode) {
        console.log("Logged in -> Adding Custom Short Code");
        payload.custom_short_code = customShortCode;
      }

      // Call your backend API for shortening
      console.log(url);
      console.log(`${apiBaseUrl}/shorten`);
      console.log(payload);

      const res = await fetch(`${apiBaseUrl}/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // If using JWT for auth, include the token
          ...(userIsLoggedIn && {
            Authorization: `Bearer ${userToken}`,
          }),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setShortenedUrl(data.shortUrl || data.short_url || "Shortened!");
      } else {
        // Handle error response
        setShortenedUrl(null);
        // Optionally, show error message to user
      }
    } catch (e) {
      console.log("*** Error");
      console.log(e);
      setShortenedUrl(null);
    }

    setIsLoading(false);
  };





  const handleCopy = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl);
    }
  };

  useEffect(() => {
    // Initialize charts
    const chartDom = document.getElementById("analytics-chart");
    if (chartDom && echarts) {
      const myChart = echarts.init(chartDom);
      const option = {
        animation: false,
        tooltip: { trigger: "axis" },
        legend: { data: ["Clicks", "Unique Visitors"] },
        grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: { type: "value" },
        series: [
          {
            name: "Clicks",
            type: "line",
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true,
            lineStyle: { width: 3, color: "#4F46E5" },
          },
          {
            name: "Unique Visitors",
            type: "line",
            data: [82, 93, 90, 93, 76, 130, 140],
            smooth: true,
            lineStyle: { width: 3, color: "#10B981" },
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", () => myChart.resize());
    }
  }, []);

  const swiperModules = [Pagination, Autoplay];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
          <div className="flex items-center">
            <LinkOutlined className="text-indigo-600 text-3xl mr-2" />
            <span className="text-2xl font-bold text-gray-800">Snipzo</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-indigo-600 font-medium cursor-pointer">Features</a>
            <a href="#enterprise" className="text-gray-600 hover:text-indigo-600 font-medium cursor-pointer">Enterprise</a>
            <a href="#pricing" className="text-gray-600 hover:text-indigo-600 font-medium cursor-pointer">Pricing</a>
            <a href="#about" className="text-gray-600 hover:text-indigo-600 font-medium cursor-pointer">About</a>
          </nav>
          <div className="flex space-x-4">
            <Button type="text" onClick={() => showModal("login")}
              className="font-medium text-gray-600 hover:text-indigo-600 cursor-pointer !rounded-button whitespace-nowrap">Log In</Button>
            <Button type="primary" onClick={() => showModal("register")}
              className="bg-indigo-600 hover:bg-indigo-700 border-none cursor-pointer !rounded-button whitespace-nowrap">Sign Up</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative min-h-[340px] md:min-h-[400px] flex items-center"
        style={{
          background: "linear-gradient(120deg, #4722b6 0%, #6f6df4 60%, #50cfff 100%)",
          overflow: "hidden",
        }}
      >
        {/* Overlayed SVG or img for "network" style as in the reference image */}
        <img
          src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?fit=crop&w=1000&q=80"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none select-none"
          style={{ zIndex: 1 }}
        />
        {/* Optional: You can use a custom SVG for the network effect. For demo, using a placeholder. */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
          {/* Example SVG from your image, replace as needed */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1100 340"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7f5afd" />
                <stop offset="100%" stopColor="#50cfff" />
              </linearGradient>
            </defs>
            <polyline
              points="0,320 150,200 300,260 450,160 600,220 750,120 900,200 1100,120"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              opacity="0.3"
            />
            {/* Dots */}
            {[0, 150, 300, 450, 600, 750, 900, 1100].map((x, idx) => (
              <circle
                key={x}
                cx={x}
                cy={[320, 200, 260, 160, 220, 120, 200, 120][idx]}
                r="8"
                fill="#fff"
                opacity="0.6"
              />
            ))}
          </svg>
        </div>
        <div className="relative z-10 flex-1 flex items-center">
          <div className="mx-6 md:ml-16 py-8">
            <Title
              level={1}
              className="!text-white !font-bold !mb-2 !leading-tight text-2xl md:text-4xl lg:text-5xl drop-shadow"
              style={{ textShadow: "0 2px 12px rgba(30,0,60,0.4)" }}
            >
              Transform Long URLs into <br /> Short, Powerful Links
            </Title>
            <Paragraph className="!text-white !mb-6 !text-base md:!text-lg" style={{ opacity: 0.95 }}>
              Snipzo helps you create concise, trackable links that work perfectly across all platforms. Get started for free.
            </Paragraph>
            <div className="bg-white rounded-lg flex p-2 shadow-lg max-w-xl">
              <Input
                size="large"
                placeholder="Paste your long URL here"
                prefix={<LinkOutlined className="text-gray-400" />}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-grow"
                style={{ border: "none", boxShadow: "none" }}
                onPressEnter={handleShortenUrl}
                data-testid="url-input"
              />
              <Button
                type="primary"
                size="large"
                onClick={handleShortenUrl}
                loading={isLoading}
                className="ml-2 px-6 bg-indigo-700 hover:bg-indigo-800 border-none font-semibold"
                data-testid="shorten-btn"
              >
                Shorten URL
              </Button>
            </div>
            {shortenedUrl && (
              <div className="mt-4 p-2 bg-white rounded text-indigo-700 font-bold inline-flex items-center gap-2 shadow">
              <span>{shortenedUrl}</span>
              <Button
                type="primary"
                size="small"
                onClick={handleCopy}
                loading={isLoading}
                className="ml-2 px-6 bg-indigo-700 hover:bg-indigo-800 border-none font-semibold"
                data-testid="shorten-btn"
              >
                Copy
              </Button>
            </div>
            )}
            
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Everyone
            </h2>
            <p className="text-xl text-gray-600 max-w-5xl mx-auto">
              Our free plan includes everything you need to create and manage shortened URLs effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Advanced Analytics */}
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                  <BarChartOutlined className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Advanced Analytics
                </h3>
                <p className="text-gray-600">
                  Track clicks, geographic data, referrers, and devices for all your shortened links.
                </p>
              </div>
              <div className="h-48 bg-gray-50 rounded-lg overflow-hidden" id="analytics-chart"></div>
            </Card>

            {/* QR Code Generation */}
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                  <QrcodeOutlined className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  QR Code Generation
                </h3>
                <p className="text-gray-600">
                  Create custom QR codes for your shortened links to bridge offline and online experiences.
                </p>
              </div>
              <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
                <img
                  src="https://readdy.ai/api/search-image?query=A%20professional%20looking%20QR%20code%20on%20a%20clean%20minimal%20background%2C%20high%20resolution%2C%20showing%20a%20sample%20code%20that%20would%20represent%20a%20shortened%20URL%2C%20with%20subtle%20branding%20elements%20in%20indigo%20blue%20color%20scheme&width=200&height=200&seq=qrcode1&orientation=squarish"
                  alt="QR Code Example"
                  className="h-40 w-40 object-contain"
                />
              </div>
            </Card>

            {/* Custom Links */}
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                  <SettingOutlined className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Custom Links
                </h3>
                <p className="text-gray-600">
                  Create branded and memorable links with custom back-halves for better recognition.
                </p>
              </div>
              <div className="h-48 bg-gray-50 rounded-lg p-4">
                <div className="bg-white p-3 rounded border border-gray-200 mb-3 flex items-center">
                  <span className="text-gray-500 mr-2">Snipzo/</span>
                  <span className="text-indigo-600 font-medium">summer-sale</span>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 mb-3 flex items-center">
                  <span className="text-gray-500 mr-2">Snipzo/</span>
                  <span className="text-indigo-600 font-medium">product-launch</span>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 flex items-center">
                  <span className="text-gray-500 mr-2">Snipzo/</span>
                  <span className="text-indigo-600 font-medium">my-portfolio</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your needs, from personal use to enterprise-grade link management.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {PRICING_TIERS.map((tier, i) => (
              <PricingCard key={tier.name} {...tier} />
            ))}
          </div>
          <p className="mt-8 text-sm text-gray-500 text-center">
            * Click heatmaps require source page integration. Contact us for more details.
          </p>
        </div>
      </section>

      {/* Auth Modal */}
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={400}
        className="auth-modal"
      >
        <div className="py-4">
          <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
            <TabPane tab="Login" key="login">
              <Form layout="vertical" className="mt-4">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="text-gray-400" />}
                    placeholder="Enter your email"
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Enter your password"
                  />
                </Form.Item>
                <Form.Item>
                  <div className="flex justify-between items-center">
                    <Link to="/forgot" className="text-indigo-600 hover:text-indigo-800 cursor-pointer">
                      Forgot password?
                    </Link>
                  </div>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    className="bg-indigo-600 hover:bg-indigo-700 border-none cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    Log In
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Register" key="register">
              <Form layout="vertical" className="mt-4">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="text-gray-400" />}
                    placeholder="Enter your email"
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                    {
                      min: 8,
                      message: "Password must be at least 8 characters!",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Create a password"
                  />
                </Form.Item>
                <div className="mb-4 p-3 bg-gray-50 rounded-md text-sm text-gray-600">
                  <p className="font-medium mb-2">Password must contain:</p>
                  <ul className="space-y-1">
                    <li className="flex items-center">
                      <CheckCircleOutlined className="text-green-500 mr-2" />
                      At least 8 characters
                    </li>
                    <li className="flex items-center">
                      <CheckCircleOutlined className="text-green-500 mr-2" />
                      At least one uppercase letter
                    </li>
                    <li className="flex items-center">
                      <CheckCircleOutlined className="text-green-500 mr-2" />
                      At least one number
                    </li>
                  </ul>
                </div>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    className="bg-indigo-600 hover:bg-indigo-700 border-none cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    Create Account
                  </Button>
                </Form.Item>
                <div className="text-center text-sm text-gray-600">
                  By signing up, you agree to our{" "}
                  <a href="#" className="text-indigo-600 hover:text-indigo-800 cursor-pointer">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-indigo-600 hover:text-indigo-800 cursor-pointer">
                    Privacy Policy
                  </a>
                  .
                </div>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </Modal>

      {/* Enterprise-Grade Link Management Section (matches ![image2](image2)) */}
<section
  className="w-full py-20 px-2"
  style={{
    background: "#2E298F",
    color: "#fff",
    position: "relative",
    zIndex: 10,
  }}
>
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center justify-between">
    {/* Left: Text & Features */}
    <div className="flex-1 min-w-[320px]">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
        Enterprise-Grade Link Management
      </h2>
      <p className="mb-6 text-lg text-white/90">
        Scale your link management with advanced security, custom domains, and dedicated support for your organization.
      </p>
      <ul className="mb-8 space-y-4 text-base">
        <li className="flex items-start gap-3">
          <span className="mt-1 text-green-400">
            <svg width="22" height="22" fill="none"><circle cx="11" cy="11" r="11" fill="#22c55e" opacity="0.12"/><path d="M7.5 11L10 13.5L14.5 9" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          <span>
            <span className="font-semibold text-white">Single Sign-On (SSO) Integration</span>
            <br />
            <span className="text-white/80 text-sm">Seamlessly integrate with your existing identity provider.</span>
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 text-green-400">
            <svg width="22" height="22" fill="none"><circle cx="11" cy="11" r="11" fill="#22c55e" opacity="0.12"/><path d="M7.5 11L10 13.5L14.5 9" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          <span>
            <span className="font-semibold text-white">Custom Branded Domains</span>
            <br />
            <span className="text-white/80 text-sm">Use your own domain for all shortened links.</span>
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 text-green-400">
            <svg width="22" height="22" fill="none"><circle cx="11" cy="11" r="11" fill="#22c55e" opacity="0.12"/><path d="M7.5 11L10 13.5L14.5 9" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          <span>
            <span className="font-semibold text-white">Advanced Security Controls</span>
            <br />
            <span className="text-white/80 text-sm">Set permissions, access controls, and link expiration policies.</span>
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 text-green-400">
            <svg width="22" height="22" fill="none"><circle cx="11" cy="11" r="11" fill="#22c55e" opacity="0.12"/><path d="M7.5 11L10 13.5L14.5 9" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          <span>
            <span className="font-semibold text-white">Dedicated Account Manager</span>
            <br />
            <span className="text-white/80 text-sm">Get personalized support and strategic guidance.</span>
          </span>
        </li>
      </ul>
      <button
        className="bg-white text-[#312e81] rounded px-6 py-2 font-semibold shadow hover:bg-gray-100 transition"
        style={{ fontSize: "1rem" }}
      >
        Request Enterprise Demo
      </button>
    </div>
    {/* Right: Dashboard Card */}
    <div className="flex-1 max-w-xl min-w-[320px]">
      <div
        className="rounded-2xl p-7"
        style={{
          background: "#4037c2",
          boxShadow: "0 4px 32px 0 #2e298f44",
        }}
      >
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-flex items-center justify-center rounded-full bg-[#4c46d4] w-8 h-8">
            <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="10" fill="#fff" fillOpacity="0.16"/><path d="M7 10l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          <span>
            <span className="font-semibold text-white">Enterprise Dashboard</span>
            <br />
            <span className="text-white/60 text-xs">Centralized management for all your links</span>
          </span>
        </div>
        <div className="rounded-lg overflow-hidden bg-[#18164d] mb-6">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=600&q=80"
            alt="Enterprise dashboard"
            className="w-full h-44 object-cover"
            style={{ minHeight: "176px" }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-[#554ee4] rounded-xl p-4 flex flex-col items-start">
            <span className="text-white/70 text-xs mb-1">Team Members</span>
            <span className="text-xl font-bold flex items-center gap-2">
              <svg width="18" height="18" fill="none"><path d="M9 10.5c2.485 0 4.5-2.015 4.5-4.5S11.485 1.5 9 1.5 4.5 3.515 4.5 6s2.015 4.5 4.5 4.5zM2.25 16.5v-1.5A3.75 3.75 0 016 11.25h6a3.75 3.75 0 013.75 3.75v1.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              25
            </span>
          </div>
          <div className="bg-[#554ee4] rounded-xl p-4 flex flex-col items-start">
            <span className="text-white/70 text-xs mb-1">Active Links</span>
            <span className="text-xl font-bold flex items-center gap-2">
              <svg width="18" height="18" fill="none"><path d="M14.828 3.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.414-1.414" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.172 14.828a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656L11.758 6.586" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              1,243
            </span>
          </div>
          <div className="bg-[#554ee4] rounded-xl p-4 flex flex-col items-start">
            <span className="text-white/70 text-xs mb-1">Monthly Clicks</span>
            <span className="text-xl font-bold flex items-center gap-2">
              <svg width="18" height="18" fill="none"><path d="M3 15V3.75A.75.75 0 013.75 3h10.5a.75.75 0 01.75.75V15M5.25 15V8.25M8.25 15V12M11.25 15V10.5M14.25 15v-3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              152,879
            </span>
          </div>
          <div className="bg-[#554ee4] rounded-xl p-4 flex flex-col items-start">
            <span className="text-white/70 text-xs mb-1">Custom Domains</span>
            <span className="text-xl font-bold flex items-center gap-2">
              <svg width="18" height="18" fill="none"><circle cx="9" cy="9" r="7.25" stroke="#fff" strokeWidth="1.5"/><path d="M2.5 9h13M9 2.5v13" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
              5
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center text-xs px-1">
          <span className="flex items-center gap-2 text-green-300">
            <svg width="16" height="16" fill="none"><path d="M8 3.25A4.75 4.75 0 118 12.75 4.75 4.75 0 018 3.25zm0 8.5A3.75 3.75 0 108 4.25a3.75 3.75 0 000 7.5z" fill="#34d399"/><path d="M8 6.5v2.5l2 1" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Enterprise-grade security
          </span>
          <span className="flex items-center gap-2 text-green-300">
            <svg width="16" height="16" fill="none"><path d="M7 10.5h2a1 1 0 001-1v-1a1 1 0 00-1-1H8a1 1 0 01-1-1V7a1 1 0 011-1h2" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8" cy="8" r="7" stroke="#34d399" strokeWidth="1.2"/></svg>
            API access included
          </span>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
}
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from "react";
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
  Row,
  Col,
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
import * as echarts from "echarts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("register");
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");

  const showModal = (tab: string) => {
    setActiveTab(tab);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleShortenUrl = () => {
    if (!url) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setShortenedUrl(
        `https://short.ly/${Math.random().toString(36).substring(2, 8)}`,
      );
      setIsLoading(false);
    }, 1000);
  };

  const handleCopy = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl);
    }
  };

  React.useEffect(() => {
    // Initialize charts
    const chartDom = document.getElementById("analytics-chart");
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      const option = {
        animation: false,
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Clicks", "Unique Visitors"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Clicks",
            type: "line",
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true,
            lineStyle: {
              width: 3,
              color: "#4F46E5",
            },
          },
          {
            name: "Unique Visitors",
            type: "line",
            data: [82, 93, 90, 93, 76, 130, 140],
            smooth: true,
            lineStyle: {
              width: 3,
              color: "#10B981",
            },
          },
        ],
      };
      myChart.setOption(option);

      window.addEventListener("resize", () => {
        myChart.resize();
      });
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
            <span className="text-2xl font-bold text-gray-800">Short.ly</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-indigo-600 font-medium cursor-pointer"
            >
              Features
            </a>
            <a
              href="#enterprise"
              className="text-gray-600 hover:text-indigo-600 font-medium cursor-pointer"
            >
              Enterprise
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-indigo-600 font-medium cursor-pointer"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="text-gray-600 hover:text-indigo-600 font-medium cursor-pointer"
            >
              About
            </a>
          </nav>
          <div className="flex space-x-4">
            <Button
              type="text"
              onClick={() => showModal("login")}
              className="font-medium text-gray-600 hover:text-indigo-600 cursor-pointer !rounded-button whitespace-nowrap"
            >
              Log In
            </Button>
            <Button
              type="primary"
              onClick={() => showModal("register")}
              className="bg-indigo-600 hover:bg-indigo-700 border-none cursor-pointer !rounded-button whitespace-nowrap"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('https://readdy.ai/api/search-image?query=A%20modern%20abstract%20digital%20background%20with%20flowing%20gradient%20colors%20in%20purple%20and%20blue%2C%20with%20subtle%20network%20connection%20lines%20and%20nodes%20representing%20a%20global%20URL%20shortening%20service%2C%20professional%20clean%20design%20with%20ample%20space%20for%20text%20on%20the%20left%20side&width=1440&height=600&seq=hero1&orientation=landscape')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="container mx-auto px-4 py-20 relative z-10 max-w-7xl">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Transform Long URLs into Short, Powerful Links
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Short.ly helps you create concise, trackable links that work
              perfectly across all platforms. Get started for free.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  size="large"
                  placeholder="Paste your long URL here"
                  prefix={<LinkOutlined className="text-gray-400" />}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-grow"
                />
                <Button
                  type="primary"
                  size="large"
                  onClick={handleShortenUrl}
                  loading={isLoading}
                  className="bg-indigo-600 hover:bg-indigo-700 border-none cursor-pointer !rounded-button whitespace-nowrap"
                >
                  Shorten URL
                </Button>
              </div>

              {shortenedUrl && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md flex justify-between items-center">
                  <div className="overflow-hidden">
                    <Text className="text-indigo-600 font-medium">
                      {shortenedUrl}
                    </Text>
                  </div>
                  <Button
                    onClick={handleCopy}
                    className="ml-2 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    Copy
                  </Button>
                </div>
              )}
            </div>
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our free plan includes everything you need to create and manage
              shortened URLs effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                  <BarChartOutlined className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Advanced Analytics
                </h3>
                <p className="text-gray-600">
                  Track clicks, geographic data, referrers, and devices for all
                  your shortened links.
                </p>
              </div>
              <div
                className="h-48 bg-gray-50 rounded-lg overflow-hidden"
                id="analytics-chart"
              ></div>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                  <QrcodeOutlined className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  QR Code Generation
                </h3>
                <p className="text-gray-600">
                  Create custom QR codes for your shortened links to bridge
                  offline and online experiences.
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

            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                  <SettingOutlined className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Custom Links
                </h3>
                <p className="text-gray-600">
                  Create branded and memorable links with custom back-halves for
                  better recognition.
                </p>
              </div>
              <div className="h-48 bg-gray-50 rounded-lg p-4">
                <div className="bg-white p-3 rounded border border-gray-200 mb-3">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">short.ly/</span>
                    <span className="text-indigo-600 font-medium">
                      summer-sale
                    </span>
                  </div>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 mb-3">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">short.ly/</span>
                    <span className="text-indigo-600 font-medium">
                      product-launch
                    </span>
                  </div>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">short.ly/</span>
                    <span className="text-indigo-600 font-medium">
                      my-portfolio
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Advertisement Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-4">
            <Badge.Ribbon text="Advertisement" color="blue">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Swiper
                  modules={swiperModules}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 5000 }}
                  className="w-full"
                >
                  <SwiperSlide>
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2 p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          Boost Your Marketing with Short.ly Pro
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Get advanced analytics, unlimited custom links, and
                          priority support for just $9.99/month.
                        </p>
                        <Button
                          type="primary"
                          size="large"
                          className="bg-blue-600 hover:bg-blue-700 border-none cursor-pointer !rounded-button whitespace-nowrap"
                        >
                          Try Pro Free for 14 Days
                        </Button>
                      </div>
                      <div className="md:w-1/2">
                        <img
                          src="https://readdy.ai/api/search-image?query=A%20professional%20marketing%20dashboard%20showing%20analytics%20and%20URL%20shortening%20statistics%20with%20charts%20and%20graphs%2C%20in%20a%20clean%20modern%20interface%20with%20blue%20accent%20colors%2C%20on%20a%20simple%20white%20background&width=600&height=400&seq=ad1&orientation=landscape"
                          alt="Short.ly Pro Dashboard"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2">
                        <img
                          src="https://readdy.ai/api/search-image?query=A%20professional%20showing%20a%20mobile%20phone%20with%20a%20QR%20code%20scanner%20app%20scanning%20a%20QR%20code%2C%20in%20a%20modern%20office%20setting%20with%20blue%20accent%20lighting%2C%20clean%20minimal%20background&width=600&height=400&seq=ad2&orientation=landscape"
                          alt="QR Code Scanning"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-1/2 p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          Connect Physical and Digital with QR Codes
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Drive traffic from print materials to your digital
                          presence with custom branded QR codes.
                        </p>
                        <Button
                          type="primary"
                          size="large"
                          className="bg-blue-600 hover:bg-blue-700 border-none cursor-pointer !rounded-button whitespace-nowrap"
                        >
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </Badge.Ribbon>
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section id="enterprise" className="py-20 bg-indigo-900 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Enterprise-Grade Link Management
              </h2>
              <p className="text-xl text-indigo-100 mb-8">
                Scale your link management with advanced security, custom
                domains, and dedicated support for your organization.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircleOutlined className="text-green-400 text-xl mt-1 mr-3" />
                  <div>
                    <h4 className="text-lg font-semibold">
                      Single Sign-On (SSO) Integration
                    </h4>
                    <p className="text-indigo-200">
                      Seamlessly integrate with your existing identity provider.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircleOutlined className="text-green-400 text-xl mt-1 mr-3" />
                  <div>
                    <h4 className="text-lg font-semibold">
                      Custom Branded Domains
                    </h4>
                    <p className="text-indigo-200">
                      Use your own domain for all shortened links.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircleOutlined className="text-green-400 text-xl mt-1 mr-3" />
                  <div>
                    <h4 className="text-lg font-semibold">
                      Advanced Security Controls
                    </h4>
                    <p className="text-indigo-200">
                      Set permissions, access controls, and link expiration
                      policies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircleOutlined className="text-green-400 text-xl mt-1 mr-3" />
                  <div>
                    <h4 className="text-lg font-semibold">
                      Dedicated Account Manager
                    </h4>
                    <p className="text-indigo-200">
                      Get personalized support and strategic guidance.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                type="primary"
                size="large"
                className="bg-white text-indigo-700 hover:bg-gray-100 border-none cursor-pointer !rounded-button whitespace-nowrap"
              >
                Request Enterprise Demo
              </Button>
            </div>

            <div className="md:w-1/2">
              <div className="bg-indigo-800 rounded-lg p-8 shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center mr-4">
                    <GlobalOutlined className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Enterprise Dashboard</h3>
                    <p className="text-indigo-200">
                      Centralized management for all your links
                    </p>
                  </div>
                </div>

                <img
                  src="https://readdy.ai/api/search-image?query=A%20professional%20enterprise%20dashboard%20interface%20showing%20URL%20analytics%20and%20management%20tools%20with%20dark%20indigo%20theme%2C%20showing%20multiple%20team%20members%20activity%2C%20permissions%20management%2C%20and%20detailed%20analytics%20charts%2C%20clean%20minimal%20design&width=600&height=400&seq=enterprise1&orientation=landscape"
                  alt="Enterprise Dashboard"
                  className="w-full rounded-lg shadow-lg mb-6"
                />

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-indigo-700 p-4 rounded-lg">
                    <Statistic
                      title={
                        <span className="text-indigo-200">Team Members</span>
                      }
                      value={25}
                      prefix={<TeamOutlined />}
                      valueStyle={{ color: "white" }}
                    />
                  </div>
                  <div className="bg-indigo-700 p-4 rounded-lg">
                    <Statistic
                      title={
                        <span className="text-indigo-200">Active Links</span>
                      }
                      value={1243}
                      prefix={<LinkOutlined />}
                      valueStyle={{ color: "white" }}
                    />
                  </div>
                  <div className="bg-indigo-700 p-4 rounded-lg">
                    <Statistic
                      title={
                        <span className="text-indigo-200">Monthly Clicks</span>
                      }
                      value={152879}
                      prefix={<BarChartOutlined />}
                      valueStyle={{ color: "white" }}
                    />
                  </div>
                  <div className="bg-indigo-700 p-4 rounded-lg">
                    <Statistic
                      title={
                        <span className="text-indigo-200">Custom Domains</span>
                      }
                      value={5}
                      prefix={<GlobalOutlined />}
                      valueStyle={{ color: "white" }}
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center">
                    <SecurityScanOutlined className="text-green-400 mr-2" />
                    <span className="text-green-400">
                      Enterprise-grade security
                    </span>
                  </div>
                  <div className="flex items-center">
                    <ApiOutlined className="text-green-400 mr-2" />
                    <span className="text-green-400">API access included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands of Companies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See why businesses of all sizes choose Short.ly for their link
              management needs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <i className="fab fa-google text-4xl text-gray-700 mb-2"></i>
                <p className="font-semibold text-gray-800">Google</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <i className="fab fa-microsoft text-4xl text-gray-700 mb-2"></i>
                <p className="font-semibold text-gray-800">Microsoft</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <i className="fab fa-amazon text-4xl text-gray-700 mb-2"></i>
                <p className="font-semibold text-gray-800">Amazon</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <i className="fab fa-spotify text-4xl text-gray-700 mb-2"></i>
                <p className="font-semibold text-gray-800">Spotify</p>
              </div>
            </div>
          </div>

          <Swiper
            modules={swiperModules}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="testimonial-swiper"
          >
            <SwiperSlide>
              <Card className="h-full shadow-md">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="text-gray-600 mb-6 flex-grow">
                    "Short.ly has transformed how we manage our marketing
                    campaigns. The analytics are incredibly detailed and help us
                    optimize our strategy."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold">JD</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Jane Doe</h4>
                      <p className="text-gray-500">
                        Marketing Director, TechCorp
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </SwiperSlide>

            <SwiperSlide>
              <Card className="h-full shadow-md">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="text-gray-600 mb-6 flex-grow">
                    "The enterprise features are worth every penny. SSO
                    integration was seamless, and the custom domains maintain
                    our brand integrity across all channels."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold">MS</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Michael Smith
                      </h4>
                      <p className="text-gray-500">CTO, Enterprise Solutions</p>
                    </div>
                  </div>
                </div>
              </Card>
            </SwiperSlide>

            <SwiperSlide>
              <Card className="h-full shadow-md">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="text-gray-600 mb-6 flex-grow">
                    "As a small business owner, the free tier gives me
                    everything I need to track my social media campaigns. The QR
                    code feature has been a game-changer for our print
                    materials."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold">AJ</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Alex Johnson
                      </h4>
                      <p className="text-gray-500">Owner, Craft Coffee Co.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </SwiperSlide>

            <SwiperSlide>
              <Card className="h-full shadow-md">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="text-gray-600 mb-6 flex-grow">
                    "The API integration allowed us to build Short.ly directly
                    into our content management system. Our team loves the
                    seamless workflow."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold">SL</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Sarah Lee</h4>
                      <p className="text-gray-500">
                        Product Manager, WebSolutions
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </SwiperSlide>
          </Swiper>
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
              Choose the plan that fits your needs, from individual users to
              large enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-center p-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="text-4xl font-bold text-gray-900 mb-4">
                  $0
                  <span className="text-lg text-gray-500 font-normal">
                    /month
                  </span>
                </div>
                <p className="text-gray-600 mb-6">
                  Perfect for personal use and small projects.
                </p>

                <Divider />

                <List
                  itemLayout="horizontal"
                  dataSource={[
                    "Up to 50 links per month",
                    "Basic analytics",
                    "QR code generation",
                    "Custom back-halves",
                    "API access (100 requests/day)",
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <div className="flex items-center">
                        <CheckCircleOutlined className="text-green-500 mr-2" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    </List.Item>
                  )}
                  className="mb-6"
                />

                <Button
                  type="primary"
                  size="large"
                  block
                  className="bg-indigo-600 hover:bg-indigo-700 border-none cursor-pointer !rounded-button whitespace-nowrap"
                >
                  Sign Up Free
                </Button>
              </div>
            </Card>

            <Card className="shadow-xl relative border-2 border-indigo-500">
              <div className="absolute top-0 right-0 bg-indigo-500 text-white px-4 py-1 rounded-bl-lg font-medium">
                Popular
              </div>
              <div className="text-center p-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                <div className="text-4xl font-bold text-gray-900 mb-4">
                  $19
                  <span className="text-lg text-gray-500 font-normal">
                    /month
                  </span>
                </div>
                <p className="text-gray-600 mb-6">
                  Ideal for professionals and growing businesses.
                </p>

                <Divider />

                <List
                  itemLayout="horizontal"
                  dataSource={[
                    "Unlimited links",
                    "Advanced analytics",
                    "Custom branded QR codes",
                    "UTM builder",
                    "API access (unlimited)",
                    "Priority support",
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <div className="flex items-center">
                        <CheckCircleOutlined className="text-green-500 mr-2" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    </List.Item>
                  )}
                  className="mb-6"
                />

                <Button
                  type="primary"
                  size="large"
                  block
                  className="bg-indigo-600 hover:bg-indigo-700 border-none cursor-pointer !rounded-button whitespace-nowrap"
                >
                  Start Pro Trial
                </Button>
              </div>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-center p-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Enterprise
                </h3>
                <div className="text-4xl font-bold text-gray-900 mb-4">
                  Custom
                  <span className="text-lg text-gray-500 font-normal">
                    {" "}
                    pricing
                  </span>
                </div>
                <p className="text-gray-600 mb-6">
                  For organizations requiring advanced features and control.
                </p>

                <Divider />

                <List
                  itemLayout="horizontal"
                  dataSource={[
                    "Everything in Pro",
                    "SSO integration",
                    "Custom branded domains",
                    "User roles and permissions",
                    "Dedicated account manager",
                    "SLA guarantees",
                    "Custom integration support",
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <div className="flex items-center">
                        <CheckCircleOutlined className="text-green-500 mr-2" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    </List.Item>
                  )}
                  className="mb-6"
                />

                <Button
                  size="large"
                  block
                  className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 cursor-pointer !rounded-button whitespace-nowrap"
                >
                  Contact Sales
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Supercharge Your Links?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join thousands of marketers, content creators, and businesses who
            trust Short.ly for their link management needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              type="primary"
              size="large"
              onClick={() => showModal("register")}
              className="bg-white text-indigo-600 hover:bg-gray-100 border-none cursor-pointer !rounded-button whitespace-nowrap"
              icon={<RocketOutlined />}
            >
              Get Started for Free
            </Button>
            <Button
              size="large"
              className="border-white text-white hover:bg-indigo-500 cursor-pointer !rounded-button whitespace-nowrap"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-4">
                <LinkOutlined className="text-indigo-400 text-2xl mr-2" />
                <span className="text-xl font-bold text-white">Short.ly</span>
              </div>
              <p className="mb-4">
                Powerful URL shortening with advanced analytics and
                customization options for individuals and enterprises.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <i className="fab fa-instagram text-xl"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Enterprise
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-lg font-semibold mb-4">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Support Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Status
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p>&copy; 2025 Short.ly. All rights reserved.</p>
              </div>
              <div className="flex space-x-4">
                <i className="fab fa-cc-visa text-2xl"></i>
                <i className="fab fa-cc-mastercard text-2xl"></i>
                <i className="fab fa-cc-amex text-2xl"></i>
                <i className="fab fa-cc-paypal text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <Modal
        visible={isModalVisible}
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
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                    >
                      Forgot password?
                    </a>
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
                  <a
                    href="#"
                    className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    Privacy Policy
                  </a>
                  .
                </div>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </Modal>
    </div>
  );
};

export default App;

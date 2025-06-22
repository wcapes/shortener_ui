import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space, Modal, Tag, Tooltip, Spin, message } from "antd";
import { CopyOutlined, BarChartOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsModal, setStatsModal] = useState(null);
  const [filter, setFilter] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 25, total: 0 });

  const fetchUrls = async (params = {}) => {
    setLoading(true);
    try {
      const resp = await api.get("/history", {
        params: {
          page: params.current || pagination.current,
          size: params.pageSize || pagination.pageSize,
          filter,
        },
      });
      setUrls(resp.data.urls);
      setPagination({
        ...pagination,
        current: resp.data.page,
        total: resp.data.total,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
    // eslint-disable-next-line
  }, [filter]);

  const handleTableChange = (pag) => {
    setPagination(pag);
    fetchUrls(pag);
  };

  const copyUrl = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    message.success("Short URL copied!");
  };

  const deleteUrl = async (id) => {
    await api.delete(`/urls/${id}`);
    message.success("Deleted");
    fetchUrls();
  };

  const showStats = async (id) => {
    setStatsModal({ loading: true });
    const { data } = await api.get(`/urls/${id}/stats`);
    setStatsModal(data);
  };

  const columns = [
    { title: "Date", dataIndex: "created_at", key: "created_at", render: (v) => new Date(v).toLocaleString() },
    { title: "Source URL", dataIndex: "source_url", key: "source_url", ellipsis: true },
    { title: "Short URL", dataIndex: "short_url", key: "short_url", render: (v) => (
      <Space>
        <a href={v} target="_blank" rel="noopener noreferrer">{v}</a>
        <Tooltip title="Copy">
          <Button icon={<CopyOutlined />} size="small" onClick={() => copyUrl(v)} />
        </Tooltip>
      </Space>
    ) },
    { title: "Clicks", dataIndex: "clicks", key: "clicks", render: (c, r) => (
      <Button size="small" icon={<BarChartOutlined />} onClick={() => showStats(r.id)}>{c}</Button>
    ) },
    {
      title: "Actions", key: "actions", render: (_, r) => (
        <Space>
          <Tooltip title="Edit"><Button size="small" icon={<EditOutlined />} disabled /></Tooltip>
          <Tooltip title="Delete"><Button size="small" danger icon={<DeleteOutlined />} onClick={() => deleteUrl(r.id)} /></Tooltip>
        </Space>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-8 mt-12 bg-white rounded shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">My URLs</h2>
            <div className="text-gray-500">Level: <Tag color="blue">{user?.mode?.toUpperCase()}</Tag></div>
          </div>
          <Input.Search
            placeholder="Filter by source or short URL"
            allowClear
            onSearch={setFilter}
            style={{ maxWidth: 300 }}
          />
        </div>
        <Table
          size="middle"
          columns={columns}
          dataSource={urls}
          loading={loading}
          rowKey="id"
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
      <Modal
        open={!!statsModal}
        onCancel={() => setStatsModal(null)}
        footer={null}
        title="URL Analytics"
        width={600}
      >
        {statsModal && statsModal.loading && <Spin />}
        {statsModal && !statsModal.loading &&
          <div>
            <div><b>Total Clicks:</b> {statsModal.clicks}</div>
            <div><b>Unique Visitors:</b> {statsModal.unique_visitors}</div>
            <div><b>Last Click:</b> {statsModal.last_click ? new Date(statsModal.last_click).toLocaleString() : "Never"}</div>
            {/* Add more stats as per API */}
          </div>
        }
      </Modal>
    </div>
  );
}
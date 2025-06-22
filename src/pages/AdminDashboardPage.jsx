import React, { useEffect, useState } from "react";
import { Table, Button, Tag, Space, Modal, Input, message } from "antd";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    const { data } = await api.get("/admin/users", { params: { search }});
    setUsers(data.users);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, [search]);

  const setActive = async (id, active) => {
    await api.post(`/admin/users/${id}/set-active`, { active });
    message.success("Updated user status");
    fetchUsers();
  };

  const columns = [
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Level", dataIndex: "mode", key: "mode", render: (v) => <Tag>{v}</Tag> },
    { title: "Registered", dataIndex: "registered", key: "registered", render: (v) => new Date(v).toLocaleString() },
    { title: "Active", dataIndex: "active", key: "active", render: (v) => v ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag> },
    { title: "Actions", key: "actions", render: (_, r) => (
      <Space>
        <Button onClick={() => setActive(r.id, !r.active)}>{r.active ? "Disable" : "Enable"}</Button>
        <Button onClick={() => setSelected(r)} type="link">Details</Button>
      </Space>
    )},
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-8 mt-12 bg-white rounded shadow">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold mb-1">Admin: Users</h2>
          <Input.Search
            placeholder="Search email"
            allowClear
            onSearch={setSearch}
            style={{ maxWidth: 300 }}
          />
        </div>
        <Table
          size="middle"
          columns={columns}
          dataSource={users}
          loading={loading}
          rowKey="id"
        />
      </div>
      <Modal
        open={!!selected}
        onCancel={() => setSelected(null)}
        footer={null}
        title={selected ? `User: ${selected.email}` : ""}
        width={700}
      >
        {selected &&
          <UserDetails user={selected} />
        }
      </Modal>
    </div>
  );
}

function UserDetails({ user }) {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/admin/users/${user.id}/urls`).then(({ data }) => {
      setUrls(data.urls);
      setLoading(false);
    });
  }, [user.id]);

  return (
    <div>
      <h4 className="mb-2">User URLs</h4>
      <Table
        size="small"
        columns={[
          { title: "Source", dataIndex: "source_url", key: "source_url" },
          { title: "Short", dataIndex: "short_url", key: "short_url" },
          { title: "Clicks", dataIndex: "clicks", key: "clicks" }
        ]}
        dataSource={urls}
        loading={loading}
        pagination={false}
        rowKey="id"
      />
      {/* Add payment info, actions as needed */}
    </div>
  );
}
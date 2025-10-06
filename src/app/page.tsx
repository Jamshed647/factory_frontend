"use client";

export default function Home() {
  return (
    <div>
      <p>factory</p>
    </div>
  );
}

// "use client";

// import { Layout, } from "antd";

// // import { Layout } from "antd";

// const { Header, Footer, Sider, Content } = Layout;

// export default function AdminDashboard() {
//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       {/* Header */}
//       <Header className="bg-white shadow flex justify-between items-center px-6">
//         <div className="text-xl font-bold">Jangosoft</div>
//         <div className="flex gap-4 items-center">
//           <span className="cursor-pointer">🔔</span>
//           <span className="cursor-pointer">👤</span>
//         </div>
//       </Header>

//       <Layout>
//         {/* Left Sidebar */}
//         <Sider theme="light" width={220} className="border-r">
//           <h1>Home</h1>
//           {/* <Menu mode="inline" defaultSelectedKeys={["1"]}>
//             <Menu.Item key="1" icon={<HomeOutlined />}>
//               Dashboard
//             </Menu.Item>
//             <Menu.Item key="2" icon={<UserOutlined />}>
//               Super Admins
//             </Menu.Item>
//             <Menu.Item key="3" icon={<ShopOutlined />}>
//               Factories Overview
//             </Menu.Item>
//             <Menu.Item key="4" icon={<SettingOutlined />}>
//               System Settings
//             </Menu.Item>
//             <Menu.Item key="5" icon={<QuestionCircleOutlined />}>
//               Support
//             </Menu.Item>
//           </Menu> */}
//         </Sider>

//         {/* Main Content */}
//         <Content className="p-6 bg-gray-50">
//           <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-3 gap-4 mb-6">
//             <div className="bg-white p-4 rounded-xl shadow">
//               <p className="text-gray-500">Total Super Admins</p>
//               <h2 className="text-2xl font-bold">4</h2>
//             </div>
//             <div className="bg-white p-4 rounded-xl shadow">
//               <p className="text-gray-500">Total Factories</p>
//               <h2 className="text-2xl font-bold">5</h2>
//             </div>
//             <div className="bg-white p-4 rounded-xl shadow">
//               <p className="text-gray-500">Active Managers</p>
//               <h2 className="text-2xl font-bold">8</h2>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="bg-white p-4 rounded-xl shadow">
//             <div className="flex justify-between items-center mb-4">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="border rounded px-3 py-2 w-1/3"
//               />
//               <button className="bg-blue-600 text-white px-4 py-2 rounded">
//                 Create New Super Admin
//               </button>
//             </div>

//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-100 text-left">
//                   <th className="p-3">Name</th>
//                   <th className="p-3">Email</th>
//                   <th className="p-3">Factories Count</th>
//                   <th className="p-3">Status</th>
//                   <th className="p-3">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b">
//                   <td className="p-3">John Doe</td>
//                   <td className="p-3">john.doe@example.com</td>
//                   <td className="p-3">2</td>
//                   <td className="p-3 text-green-600">Active</td>
//                   <td className="p-3">✏️ 🗑️ ⏳</td>
//                 </tr>
//                 <tr className="border-b">
//                   <td className="p-3">Jane Smith</td>
//                   <td className="p-3">jane.smith@example.com</td>
//                   <td className="p-3">2</td>
//                   <td className="p-3 text-green-600">Active</td>
//                   <td className="p-3">✏️ 🗑️ ⏳</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </Content>

//         {/* Optional Right Sidebar */}
//         <Sider theme="light" width={200} className="border-l hidden xl:block">
//           <div className="p-4">Right Sidebar (widgets, filters, etc.)</div>
//         </Sider>
//       </Layout>
//     </Layout>
//   );
// }

import React , {useState} from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import Side_nav from "./components/Side_nav";


const App: React.FC = () =>  {

  return (
    <Layout style={{ minHeight: '100vh' }}>
    <Side_nav/>
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0 }} >
        sss
      </Header>
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          Bill is a cat.
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>HRMS ©2020 Created by Ahmad Sermani</Footer>
    </Layout>
  </Layout>
    )
}


export default App;

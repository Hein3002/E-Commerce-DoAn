import React, { useEffect, useState } from 'react';
import {
  DesktopOutlined,
  LogoutOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Image, Button } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ROUTER } from '../utils/urls';
import { apiLogout } from '../services/authenticate.services';
import { CheckValid } from '../helper/checklogin';

const AdminLayout: React.FC = () => {

  // CheckValid();
  const handleLogOut = async () => {
    let results = await apiLogout({});
    if(results.success){
      navigate('/login');
      window.localStorage.removeItem("ACCESS_TOKEN")
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!window.localStorage.getItem("ACCESS_TOKEN")) {
      navigate(ROUTER.ADMIN.LOGIN);
    }
  }, []);

  const location = useLocation()

  const { Header, Content, Footer, Sider } = Layout;

  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    className?: string
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      className
    } as MenuItem;
  }

  const items: MenuItem[] = [
  
    getItem(<Link to={ROUTER.ADMIN.DASHBOARD}>Dashboard</Link>, '1', <PieChartOutlined />),
    getItem('General', 'sub1', <DesktopOutlined />, [
      getItem(<Link to={ROUTER.ADMIN.CATEGORY}>Category</Link>, '2'),
      getItem(<Link to={ROUTER.ADMIN.BRAND}>Brand</Link>, '3',undefined, undefined, location.pathname==='brand' ?'ant-menu-item-selected':''),
      // getItem(<Link to={ROUTER.ADMIN.BRAND}>Brand</Link>, '3'),
      getItem(<Link to={ROUTER.ADMIN.PRODUCT}>Product</Link>, '4'),
    ]),
    getItem('System', 'sub2', <TeamOutlined />, [
      getItem(<Link to={ROUTER.ADMIN.SLIDE}>Slide</Link>, '5'),
      // getItem(<Link to={ROUTER.ADMIN.BLOG}>Blog</Link>, '6'),
    ]),
    getItem('Bill', 'sub3', <TeamOutlined />, [
      getItem(<Link to={ROUTER.ADMIN.SALE}>Sale</Link>, '7'),
      // getItem(<Link to={ROUTER.ADMIN.IMPORT}>Import</Link>, '8'),
    ]),
    getItem(<Link to={ROUTER.ADMIN.USER}>User</Link>, '9', <UserOutlined />),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ textAlign: "center", lineHeight: '50px', backgroundColor: '#fff3', margin: '16px', borderRadius: '6px'}}>
          <span style={{ color: '#fff9', fontWeight: '500', fontSize: '10px' }}>ADMIN</span>
          {/* <Image
            style={{
              width: collapsed ? "50px" : "100px",
              height: collapsed ? "50px" : "100px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
            title='Logo'
            alt={'Logo'}
            src={Logo}
            preview={false}
          ></Image> */}
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{ height: '100%', display: 'flex', justifyContent: 'end', alignItems: 'center', marginRight: '20px'}}>
            <Button
              type="primary"
              danger
              onClick={handleLogOut}
              icon={<LogoutOutlined />}
            >
              Logout!
            </Button>
          </div>
        </Header>
        <Content style={{ margin: '16px 16px' }}>

          <div
            style={{
              padding: 24,
              minHeight: 620,
              height: 620,
              overflowY: 'auto',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', color: '#dad6d6' }}>
          @Admin
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
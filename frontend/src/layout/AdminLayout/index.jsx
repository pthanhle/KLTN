import { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sider from './Sider';
import { useTheme } from '../../contexts/ThemeContext';

const { Content } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { isDarkMode } = useTheme();

    return (
        <Layout style={{ minHeight: '100vh' }} hasSider className={isDarkMode ? 'dark' : ''}>
            <Sider collapsed={collapsed} />
            <Layout className={`transition-all w-full overflow-x-hidden duration-300 ${isDarkMode ? 'bg-[#0a0a0b]' : 'bg-[#f4f7fa]'}`}>
                <Header collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
                <Content className="p-4 md:p-8 xl:p-10 min-h-[280px]">
                    <div className="max-w-[1600px] mx-auto w-full">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;

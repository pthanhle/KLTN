import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sider from './Sider';
import { useTheme } from '../../contexts/ThemeContext';

const { Content } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { isDarkMode } = useTheme();
    const location = useLocation();

    const isBuilderMode = location.pathname.includes('/admin/cars/edit') || location.pathname.includes('/admin/cars/create');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <Layout key={location.key} style={{ minHeight: '100vh' }} hasSider={!isBuilderMode} className={isDarkMode ? 'dark' : ''}>
            {!isBuilderMode && <Sider collapsed={collapsed} />}
            <Layout className={`transition-all w-full overflow-x-hidden duration-300 ${isDarkMode ? 'bg-[#0a0a0b]' : 'bg-[#f4f7fa]'}`}>
                <Header collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} hideToggle={isBuilderMode} />
                <Content className={`transition-all duration-300 ${isBuilderMode ? 'p-0' : 'p-4 md:p-8 xl:p-10'} min-h-[280px]`}>
                    <div className={`${isBuilderMode ? 'w-full h-full' : 'max-w-[1600px] mx-auto w-full'}`}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;

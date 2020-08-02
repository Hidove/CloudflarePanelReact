import React, { useState, useContext } from 'react';
import { Layout, Menu, Dropdown, Space } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    AntCloudOutlined,
    LinkOutlined,
    DownOutlined,
} from '@ant-design/icons';
import { clearToken, clearUsername, getUsername } from '@utils/auth'
import { FormattedDisplayName } from 'react-intl'
import '@css/Frame.scss';

import FormattedMessage from '@components/FormattedMessage';
import { langs, LangContext } from '@/Lang'

const { Header, Sider, Content } = Layout;

const { SubMenu } = Menu;

const menu = [
    {
        icon: <HomeOutlined />,
        title: <FormattedMessage id='Console' />,
        link: '/user/dashboard',
    }, {
        icon: <AntCloudOutlined />,
        title: <FormattedMessage id='Domain management' />,
        data: [
            {
                title: <FormattedMessage id='Domain list' />,
                link: '/user/zones',
            },
            {
                title: <FormattedMessage id='Add domain' />,
                link: '/user/zone/create',
            }
        ]
    }

    , {
        icon: <LinkOutlined />,
        title: <FormattedMessage id='Visit Author' />,
        link: 'https://www.hidove.cn',
        isUrl: true,
    }, {
        icon: <LinkOutlined />,
        title: <FormattedMessage id='Visit Cloudflare' />,
        link: 'https://www.cloudflare.com',
        isUrl: true,
    }
]
const Frame = (props) => {

    const history = useHistory()
    const [collapsed, setCollapsed] = useState(false);

    const toggle = () => {
        setCollapsed(!collapsed)
    }
    const logOut = () => {
        clearToken()
        clearUsername()
        history.push('/login')
    }
    const { currentLanguage, setCurrentLanguage } = useContext(LangContext)
    return (
        <Layout className="frame-container">
            <Sider
                className="frame-nav"
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="md"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    if (broken) {
                        setCollapsed(true)
                    }
                }}
            >
                <div className="logo" ><Link to="/">Hidove</Link></div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    {menu.map((v, k) => {
                        if (Array.isArray(v.data) && v.data.length !== 0) {

                            return (<SubMenu key={k} icon={v.icon} title={v.title}>
                                {
                                    v.data.map((vo, ke) => {
                                        if (vo.isUrl === true) {
                                            return <Menu.Item key={vo.link}>
                                                <a target='_blank' href={vo.link} rel="noopener noreferrer">{vo.title}</a>
                                            </Menu.Item>;
                                        }
                                        return <Menu.Item key={vo.link}>
                                            <Link to={vo.link}>{vo.title}</Link>
                                        </Menu.Item>;
                                    })
                                }
                            </SubMenu>)
                        }
                        if (v.isUrl === true) {
                            return <Menu.Item key={k} icon={v.icon}>
                                <a target='_blank' href={v.link} rel="noopener noreferrer">{v.title}</a>
                            </Menu.Item>;
                        }
                        return (<Menu.Item key={k} icon={v.icon}>
                            <Link to={v.link}>{v.title}</Link>
                        </Menu.Item>)
                    })}
                </Menu>
            </Sider>
            <Layout className="frame-layout">
                <Header className="frame-layout-header" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'frame-layout-header-trigger',
                        onClick: toggle,
                    })}
                    <div className="frame-layout-header-user-dropdown" >
                        <Space size='large'>
                            <Dropdown overlay={
                                <Menu>
                                    {
                                        Object.keys(langs).map((v) => {

                                            return <Menu.Item onClick={() => setCurrentLanguage(v)} key={v}>
                                                <FormattedDisplayName type="language" value={v} />
                                            </Menu.Item>
                                        })
                                    }
                                </Menu>}>
                                <span>
                                    <FormattedDisplayName type="language" value={currentLanguage} />
                                    <DownOutlined />
                                </span>
                            </Dropdown>

                            <Dropdown overlay={
                                <Menu>
                                    <Menu.Item onClick={logOut}><FormattedMessage id='Sign out' /></Menu.Item>
                                </Menu>}>
                                <span>{getUsername()} <DownOutlined /></span>
                            </Dropdown>
                        </Space>
                    </div>
                </Header>
                <Content
                    className="frame-layout-content"
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    );

}

export default Frame;
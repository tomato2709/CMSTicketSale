import React from "react";
import './Sidebar.css'
import { HomeOutlined, ContainerOutlined, CreditCardOutlined, SettingOutlined, MoreOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    key: React.Key,
    label: React.ReactNode,
    icon?: React.ReactNode,
    expandIcon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        expandIcon,
    } as MenuItem;
}

const Sidebar : React.FC = () => {
    const location = useLocation();

    let keys = location.pathname.split("/");
    let key ;
    if (keys[1] == "setting") {
        key = keys.slice(0, 3).join("/");
    } else {
        key = keys.slice(0, 2).join("/");
    }

    const items: MenuItem[] = [
        getItem(
            "/home",
            <Link to="/home">Trang chủ</Link>,
            <HomeOutlined />
        ),
        getItem(
            "/manage-ticket",
            <Link to="/manage-ticket">Quản lý vé</Link>,
            <CreditCardOutlined />
        ),
        getItem(
            "/ticket-control",
            <Link to="/ticket-control">Đối soát vé</Link>,
            <ContainerOutlined />
        ),
        getItem(
            "settings",
            "Cài đặt",
            <SettingOutlined />,
            <MoreOutlined className="expand-icon" />,
            [
                getItem(
                    "/settings/service-pack",
                    <Link to="/settings/service-pack">Gói dịch vụ</Link>
                ),
            ]
        ),
    ];

    return (
        <div className="sidebar">
            <div>
                <div className="logo">
                    <img src={Logo} alt="CMS Ticket Sale" />
                </div>
                <div className="menu">
                    <Menu selectedKeys={[key]} items={items} mode={'inline'}/>
                </div>
                <div className="copyright" style={{ position: "absolute", fontSize: "12px", opacity: "50%", bottom: "17px", left: "17px" }}>
                    Copyright © 2020 Alta Software
                </div>
            </div>
        </div>
    );
};

export default Sidebar

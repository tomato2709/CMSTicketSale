import React from "react";
import './Header.css'
import { ReactComponent as searchIcon } from "../../assets/search.svg";
import AvatarIcon from "../../assets/avatar.png"
import { Avatar, Input } from "antd";
import { BellOutlined, MailOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons";

const Menu : React.FC = () => {
    return (
        <div className="header">
            <Input
                type="text"
                style={{ height: "48px", width: "437px", fontSize: "16px" }}
                suffix={
                    <Icon component={searchIcon} style={{ fontSize: "20px" }} />
                }
                className="input"
                placeholder={"Search"}
            />
            <div className="profile-area">
                <MailOutlined className="notification-icon" />
                <BellOutlined className="notification-icon" />
                <Avatar src={AvatarIcon} className="avatar" />
            </div>
        </div>
    );
};

export default Menu

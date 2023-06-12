import { Layout as LayoutAntd } from "antd";
import Sidebar from "../Sidebar/Sidebar";
import Menu from "../Header/Header";
import { Outlet } from "react-router-dom";

const { Sider, Content, Header } = LayoutAntd;

const Layout : React.FC = () => {
    return (
        <div>
            <LayoutAntd style={{ height: "100%" }}>
                <Sider
                    width={250}
                    style={{
                        position: "fixed",
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }}
                >
                    <Sidebar />
                </Sider>
                <LayoutAntd
                    style={{
                        marginLeft: 250,
                        height: "100vh",
                        backgroundColor: "#F9F6F4",
                    }}
                >
                    <Header
                        style={{
                            height: "88px",
                            padding: "0",
                            backgroundColor: "transparent",
                        }}
                    >
                        <Menu />
                    </Header>
                    <Content>
                        <Outlet />
                    </Content>
                </LayoutAntd>
            </LayoutAntd>
        </div>
    );
};

export default Layout;

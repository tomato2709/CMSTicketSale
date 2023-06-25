import React, { useEffect, useState } from "react";
import './ServicePackage.css'
import { ReactComponent as searchSvg } from "../../../assets/search.svg";
import StatusTag from "../../../components/StatusTag/StatusTag";
import ModalPackage from "../../../components/Modal/ModalPackage";
import { Button, Col, Input, Row, Select, Space, Table, Typography } from "antd";
import Icon, { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useAppSelector, useAppDispatch } from "../../../redux/store";
import { ticketPackageType, ticketPackageSelector, getAll} from "../../../redux/slice/packageSlice";

const { Option } = Select;

const columns = [
    {
        align: "center" as "center",
        title: "STT",
        dataIndex: "stt",
        key: "stt",
    },
    {
        align: "center" as "center",
        title: "Mã gói",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Tên gói vé",
        dataIndex: "name",
        key: "name",
        align: "center" as "center",
    },
    {
        title: "Ngày áp dụng",
        dataIndex: "applyDate",
        key: "applyDate",
        align: "right" as "right",
    },
    {
        title: "Ngày hết hạn",
        dataIndex: "expiryDate",
        key: "expiryDate",
        align: "right" as "right",
    },
    {
        title: "Giá (VND/Vé)",
        dataIndex: "price",
        key: "price",
        align: "right" as "right",
    },
    {
        title: "Giá Combo (VND/Combo)",
        dataIndex: "priceCombo",
        key: "priceCombo",
    },
    {
        title: "Tình trạng",
        dataIndex: "status",
        key: "status",
    },
    {
        title: "",
        dataIndex: "edit",
        key: "edit",
    },
];

const ServicePackage = () => {
    const dispatch = useAppDispatch();
    const { loading, ticketPackages } = useAppSelector(ticketPackageSelector);
    const [ data, setData ] = useState<ticketPackageType | null>(null);
    const [ showModal, setShowModal ] = useState({show: false, edit: false});

    useEffect(() => {
        dispatch(getAll());
    }, []);

    return (
        <div className="servicePackage">
            <Typography.Title className="title">Danh sách gói vé</Typography.Title>
            <Row justify="space-between">
                <Col>
                    <Typography.Text>
                        {" "}
                        <Input
                            type="text"
                            style={{ height: "48px", width: "437px", fontSize: "16px"}}
                            suffix={<Icon component={searchSvg} style={{ fontSize: "20px" }} />}
                            className="input"
                            placeholder={"Tìm bằng số vé"}
                        />
                    </Typography.Text>
                </Col>
                <Col>
                    <Space>
                        <Button ghost className="btn">Xuất file (.csv)</Button>
                        <Button type="primary" className="btn" onClick={() => {
                                setShowModal({
                                    show: true,
                                    edit: false,
                                });
                                setData(null);
                            }}
                        >Thêm gói vé</Button>
                    </Space>
                </Col>
            </Row>
            <Table
                className="table"
                columns={columns}
                dataSource={ticketPackages.map((ticketPackage, index) => {
                    return {
                        key: index++,
                        stt: index++,
                        id: ticketPackage.code,
                        name: ticketPackage.name,
                        applyDate: moment(ticketPackage.applyDate.toDate()).format("DD/MM/YYYY HH:mm:ss"),
                        expiryDate: moment(ticketPackage.expiryDate.toDate()).format("DD/MM/YYYY HH:mm:ss"),
                        price: ticketPackage.price + "VNĐ",
                        priceCombo: ticketPackage.comboPrice
                            ? ticketPackage.comboPrice +
                              "VNĐ/" +
                              ticketPackage.quantity +
                              "Vé"
                            : "",
                        status: (
                            <StatusTag
                                type={ticketPackage.status}
                                text={
                                    ticketPackage.status == 1
                                        ? "Đang áp dụng"
                                        : "Tắt"
                                }
                            />
                        ),
                        edit: (
                            <div className="edit" onClick={() => {
                                    setShowModal({
                                        show: true,
                                        edit: true,
                                    });
                                    setData(ticketPackage);
                                }}
                            >
                                <EditOutlined style={{ marginRight: "8px" }} />{" "}
                                Cập nhật
                            </div>
                        ),
                    };
                })}
                loading={loading}
                size="middle"
                pagination={{
                    defaultPageSize: 8,
                    position: ["bottomCenter"],
                    showLessItems: true,
                    showSizeChanger: false,
                }}
            />
            <ModalPackage
                showModal={showModal}
                setShowModal={setShowModal}
                data={data}
            />
        </div>
    );
};

export default ServicePackage;

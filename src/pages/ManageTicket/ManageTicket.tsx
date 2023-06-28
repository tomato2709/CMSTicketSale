import React, { useEffect, useState } from "react";
import './ManageTicket.css'
import { ReactComponent as searchSvg } from "../../assets/search.svg";
import ModalFilter from "../../components/Modal/ModalFilter";
import ModalModify from "../../components/Modal/ModalModify";
import StatusTag from "../../components/StatusTag/StatusTag";
import { Button, Col, Input, Popover, Row, Space, Table, Typography } from "antd";
import Icon, { MoreOutlined } from "@ant-design/icons";
import { FiFilter } from "react-icons/fi";
import moment, { Moment } from "moment";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { ticketSelector, getAll, ticketType } from "../../redux/slice/ticketSlice";
import { useSearch } from "../../hooks/useSearch";

const { Search } = Input;

const columns = [
    {
        align: "center" as "center",
        title: "STT",
        dataIndex: "stt",
        key: "stt",
    },
    {
        align: "center" as "center",
        title: "Booking code",
        dataIndex: "code",
        key: "code",
    },
    {
        title: "Số vé",
        dataIndex: "number",
        key: "number",
    },
    {
        title: "Tình trạng",
        dataIndex: "status",
        key: "status",
    },
    {
        title: "Ngày sử dụng",
        dataIndex: "date",
        key: "date",
        align: "right" as "right",
    },
    {
        title: "Ngày xuất vé",
        dataIndex: "dateRelease",
        key: "dateRelease",
        align: "right" as "right",
    },
    {
        title: "Cổng check-in",
        dataIndex: "gate",
        key: "gate",
        align: "center" as "center",
    },
    {
        title: "",
        dataIndex: "edit",
        key: "edit",
    },
];

interface IData {
    number: string;
    nameEvent: string;
    dateUse: Moment;
}

const ManageTicket = () => {
    const [ title ] = useState("CMS Ticket Sale | Quản lý vé");
    const dispatch = useAppDispatch();
    const { loading, tickets } = useAppSelector(ticketSelector);
    const [ showModalFilter, setShowModalFilter ] = useState<boolean>(false);
    const [ showModalModify, setShowModalModify ] = useState<boolean>(false);
    const [ data, setData ] = useState<ticketType | null>(null);
    const ticketStore = useAppSelector(state => state.ticketReducer.tickets)
    const [ ticket, setTicket ] = useState(ticketStore)
    const [ search, setSearch ] = useSearch(ticketStore, 'bookingCode')

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        setTicket(search)
    }, [search])

    useEffect(() => {
        dispatch(getAll());
    }, []);

    const handleSearch = (e: any) => {
        const value = e.value;
        setSearch(value);
    }

    return (
        <div className="manageTicket">
            <Typography.Title className="title">
                Danh sách vé
            </Typography.Title>
            <Row justify="space-between">
                <Col>
                    <Typography.Text>
                        {" "}
                        <Input
                            type="text"
                            style={{
                                height: "48px",
                                width: "437px",
                                fontSize: "16px",
                            }}
                            suffix={
                                <Icon
                                    component={searchSvg}
                                    style={{ fontSize: "20px" }}
                                />
                            }
                            className="input"
                            placeholder={"Tìm bằng số vé"}
                        />
                    </Typography.Text>
                </Col>
                <Col>
                    <Space>
                        <Button
                            ghost
                            className="btn"
                            icon={<FiFilter />}
                            onClick={() => setShowModalFilter(true)}
                        >
                            Lọc vé
                        </Button>
                        <Button ghost className="btn">
                            Xuất file (.csv)
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Table
                className="table"
                columns={columns}
                dataSource={tickets.map((ticket, index) => {
                    return {
                        key: index++,
                        stt: index++,
                        code: ticket.bookingCode,
                        number: ticket.number,
                        status: (
                            <StatusTag
                                type={ticket.status}
                                text={
                                    ticket.status == 0
                                        ? "Đã sử dụng"
                                        : ticket.status == 1
                                        ? "Chưa sử dụng"
                                        : "Hết hạn"
                                }
                            />
                        ),
                        date: moment(ticket.dateUse.toDate()).format(
                            "DD/MM/YYYY"
                        ),
                        dateRelease: moment(ticket.dateRelease.toDate()).format(
                            "DD/MM/YYYY"
                        ),
                        gate:
                            ticket.status == 0 ? "Cổng " + ticket.checkIn : "-",
                        edit:
                            ticket.status == 1 ? (
                                <Popover
                                    placement="left"
                                    content={
                                        <Space
                                            direction="vertical"
                                            className="popOverContainer"
                                        >
                                            <Typography.Text
                                                className="popOverText"
                                            >
                                                Sử dụng vé
                                            </Typography.Text>
                                            <Typography.Text
                                                className="popOverText"
                                                onClick={() => {
                                                    setShowModalModify(true);
                                                    setData(ticket);
                                                }}
                                            >
                                                Đổi ngày sử dụng
                                            </Typography.Text>
                                        </Space>
                                    }
                                    trigger="click"
                                >
                                    <MoreOutlined />
                                </Popover>
                            ) : (
                                ""
                            ),
                    };
                })}
                size="middle"
                loading={loading}
                pagination={{
                    defaultPageSize: 8,
                    position: ["bottomCenter"],
                    showLessItems: true,
                    showSizeChanger: false,
                }}
            />
            <ModalFilter
                showModal={showModalFilter}
                setShowModal={setShowModalFilter}
            />
            <ModalModify
                showModal={showModalModify}
                setShowModal={setShowModalModify}
                data={data}
            />
        </div>
    );
};

export default ManageTicket;

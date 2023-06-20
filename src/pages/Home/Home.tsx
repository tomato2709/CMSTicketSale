import React from "react";
import './Home.css'
import CustomChart from "../../components/Chart/Chart";
import { Col, DatePicker, Row, Space, Typography } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import Chart from "react-apexcharts";

const Home : React.FC = () => {
    const options: ApexCharts.ApexOptions = {
        chart: {
            width: 100,
            toolbar: {show: false},
            zoom: {enabled: false},
            events: {
                mounted: (chart) => {
                    chart.windowResizeHandler();
                },
            },
        },
        colors: ["#FF993C"],
        dataLabels: {enabled: false},
        xaxis: {
            categories: [
                "Thứ 2",
                "Thứ 3",
                "Thứ 4",
                "Thứ 5",
                "Thứ 6",
                "Thứ 7",
                "CN",
            ],
        },
        yaxis: {
            labels: {
                formatter: (value) => {
                    const valueString = value.toString();
                    if (valueString.length > 6) {
                        return (
                            valueString.slice(0, valueString.length - 6) + "tr"
                        );
                    }
                    return valueString;
                },
            },
        },
        responsive: [{breakpoint: 1000}],
    };
    return (
        <div className="home">
            <Typography.Title className="title">
                Thống kê
            </Typography.Title>
            <Row justify="space-between">
                <Col>
                    <Typography.Text className="subtitle">
                        Doanh thu
                    </Typography.Text>
                </Col>
                <Col>
                    {" "}
                    <DatePicker
                        picker="date"
                        placeholder="Chọn ngày"
                        size="large"
                        className="datePicker"
                        format={"[Tháng] M, YYYY"}
                        suffixIcon={
                            <CalendarOutlined style={{ color: "#FF993C", fontSize: "20px" }} />
                        }
                    />
                </Col>
            </Row>
            <Chart
                height={300}
                width="100%"
                options={options}
                type="area"
                series={[
                    {
                        name: "Doanh Thu",
                        data: [
                            140000000, 260000000, 200000000, 150000000,
                            210000000, 180000000, 150000000,
                        ],
                    },
                ]}
            />
            <Space direction="vertical" className="total-container">
                <Typography.Text className="text">
                    Tổng doanh thu theo tuần
                </Typography.Text>
                <Typography.Text className="text">
                    <span>525.145.000</span> đồng
                </Typography.Text>
            </Space>
            <div className="chartPieContainer">
                <Row>
                    <Col span="6">
                        {" "}
                        <DatePicker
                            picker="month"
                            placeholder="Chọn tháng"
                            size="large"
                            className="datePicker"
                            format={"[Tháng] M, YYYY"}
                            suffixIcon={
                                <CalendarOutlined
                                    style={{ color: "#FF993C", fontSize: "20px" }}
                                />
                            }
                        />
                    </Col>
                    <Col span="6">
                        <Typography.Text className="secondary-text">
                            Gói gia đình
                        </Typography.Text>
                    </Col>
                    <Col span="6">
                        <Typography.Text className="secondary-text">
                            Gói Sự kiện
                        </Typography.Text>
                    </Col>
                    <Col span="6"></Col>
                </Row>
                <Row>
                    <Col span="6" offset="6">
                        <CustomChart
                            data={[
                                {
                                    name: "Vé đã sử dụng",
                                    value: 56024,
                                    fill: "#4F75FF",
                                },
                                {
                                    name: "Vé chưa sử dụng",
                                    value: 13568,
                                    fill: "#FF8A48",
                                },
                            ]}
                        />
                    </Col>
                    <Col span="6">
                        <CustomChart
                            data={[
                                { name: "Vé đã sử dụng", value: 30256 },
                                { name: "Vé chưa sử dụng", value: 28302 },
                            ]}
                            legend={false}
                        />
                    </Col>
                    <Col span="6">
                        <Space direction="vertical">
                            <Space className="note-container" size={8}>
                                <span
                                    className="note-container"
                                    style={{ backgroundColor: "#4F75FF" }}
                                ></span>
                                <span className="text">
                                    Vé đã sử dụng
                                </span>
                            </Space>
                            <Space className="note-container" size={8}>
                                <span
                                    className="note-container"
                                    style={{ backgroundColor: "#FF8A48" }}
                                ></span>
                                <span className="text">
                                    Vé chưa sử dụng
                                </span>
                            </Space>
                        </Space>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Home
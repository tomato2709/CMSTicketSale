import React, { useEffect, useState } from "react";
import './Modal.css'
import CustomDatePicker from "../DatePicker/DatePicker";
import { DayRange } from "@hassanmojab/react-modern-calendar-datepicker";
import { Button, Col, Form, Modal, Row, Typography } from "antd";
import { Timestamp } from "firebase/firestore";
import moment, { Moment } from "moment";
import { useAppDispatch } from "../../redux/store";
import { ticketType, update, getAll } from "../../redux/slice/ticketSlice";

interface IModal {
    data: ticketType | null;
    showModal: boolean;
    setShowModal: (boolean: boolean) => void;
}

const ModalModify = ({ showModal, setShowModal, data }: IModal) => {
    let date = data?.dateUse.toDate();
    const dispatch = useAppDispatch();
    const [dayRange, setDayRange] = useState<DayRange>({
        from: null,
        to: null,
    });
    console.log(dayRange);
    const onFinish = () => {
        const id = data?.id as string;
        dispatch(
            update({
                id,
                dateUse: Timestamp.fromDate(
                    moment({
                        ...dayRange.from,
                        month: dayRange.from ? dayRange.from.month - 1 : 0,
                    }).toDate()
                ),
            })
        ).then(() => {
            setShowModal(false);
            dispatch(getAll());
        });
    };

    useEffect(() => {
        if (data !== null) {
            date = data.dateUse.toDate();
            setDayRange({
                from: date
                ? {
                      day: date.getDate(),
                      month: date.getMonth() + 1,
                      year: date.getFullYear(),
                  }
                : null,
            to: null,
            })
        }
    }, [data])

    return (
        <Modal
            centered
            closable={false}
            wrapClassName="modal"
            bodyStyle={{ borderRadius: "10px" }}
            width={634}
            title={<Typography.Title className="title">Đổi ngày sử dụng vé</Typography.Title>}
            visible={showModal}
            onCancel={() => setShowModal(false)}
            footer={null}
            maskClosable={false}
        >
            <Form
                name="filter"
                layout="vertical"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                onFinish={onFinish}
            >
                <Row>
                    <Col span="24">
                        <Form.Item label={<Typography.Text className="label">Số vé</Typography.Text>}>
                            <Typography.Text className="text">{data?.number}</Typography.Text>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Form.Item label={<Typography.Text className="label">Số vé</Typography.Text>}>
                            <Typography.Text className="text">Vé cổng - gói sự kiện</Typography.Text>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Form.Item label={<Typography.Text className="label">Tên sự kiện</Typography.Text>}>
                            <Typography.Text className="text">{data?.nameEvent}</Typography.Text>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Form.Item name="dateUse" label={<Typography.Text className="label">Hạn sử dụng</Typography.Text>}>
                            <CustomDatePicker
                                type="from"
                                hasOption={false}
                                dayRange={dayRange}
                                setDayRange={setDayRange}
                                inputClassName={`$datePickerInput $datePickerInputFirst`}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <div className="buttonContainer">
                            <Button ghost className="btn" onClick={() => setShowModal(false)}>Huỷ</Button>
                            <Button type="primary" htmlType="submit" className="btn">Lưu</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default ModalModify;

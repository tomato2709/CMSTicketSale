import { useEffect, useState } from "react";
import './Modal.css'
import CustomDatePicker from "../DatePicker/DatePicker";
import { Button, Checkbox, Col, Form, Modal, Radio, Row, Space, Typography } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import moment, { Moment } from "moment";
import { DayRange } from "@hassanmojab/react-modern-calendar-datepicker";
import { useAppDispatch } from "../../redux/store";
import { getAll } from "../../redux/slice/ticketSlice";

interface IModal {
    showModal: boolean;
    setShowModal: (boolean: boolean) => void;
}

interface formValue {
    checkIn: [number];
    dateStart: Moment;
    dateEnd: Moment;
    status: number;
}

const ModalFilter = ({ showModal, setShowModal }: IModal) => {
    const dispatch = useAppDispatch();
    const [checkIn, setCheckIn] = useState<CheckboxValueType[]>([]);
    const [checkAll, setCheckAll] = useState(false);
    const [dayRange, setDayRange] = useState<DayRange>({
        from: null,
        to: null,
    });

    useEffect(() => {
        if (checkIn.length === 0) {
            setCheckAll(true);
        }
        if (checkIn.length > 0) {
            setCheckAll(false);
        }
    }, [checkIn]);

    const checkInOnchange = (e: CheckboxValueType[]) => {
        setCheckIn(e);
    };

    const selectAllOnChange = (e: CheckboxChangeEvent) => {
        setCheckAll(e.target.checked);
        if (e.target.checked) {
            setCheckIn([]);
        }
    };

    const onFinish = (value: formValue) => {
        dispatch(
            getAll({
                ...value,
                checkIn,
                dateStart: dayRange.from ? moment({
                    ...dayRange.from,
                    month: dayRange.from ? dayRange.from.month - 1 : 0,
                }) : null,
                dateEnd: dayRange.to ? moment({
                    ...dayRange.to,
                    month: dayRange.to ? dayRange.to.month - 1 : 0,
                }) :  null,
            })
        ).then(() => {setShowModal(false)});
    };

    return (
        <Modal
            centered
            closable={false}
            wrapClassName="modal"
            bodyStyle={{ borderRadius: "10px" }}
            width={634}
            title={
                <Typography.Title className="title">
                    Lọc vé
                </Typography.Title>
            }
            visible={showModal}
            onCancel={() => setShowModal(false)}
            footer={null}
        >
            <Form name="filter" layout="vertical" onFinish={onFinish}>
                <Row>
                    <Col span="12">
                        <Form.Item
                            name="dateStart"
                            labelCol={{ span: 24 }}
                            label={
                                <Typography.Text className="label">
                                    Từ ngày
                                </Typography.Text>
                            }
                        >
                            <CustomDatePicker
                                type="from"
                                dayRange={dayRange}
                                setDayRange={setDayRange}
                                inputClassName={`$datePickerInput $datePickerInputFirst`}
                            />
                        </Form.Item>
                    </Col>
                    <Col span="12">
                        <Form.Item
                            name="dateEnd"
                            labelCol={{ span: 24 }}
                            label={
                                <Typography.Text className="label">
                                    Đến ngày
                                </Typography.Text>
                            }
                        >
                            <CustomDatePicker
                                type="to"
                                dayRange={dayRange}
                                setDayRange={setDayRange}
                                inputClassName={`$datePickerInput $datePickerInputFirst`}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Form.Item
                            name="status"
                            label={
                                <Typography.Text className="label">
                                    Tình trạng đối soát
                                </Typography.Text>
                            }
                        >
                            <Radio.Group defaultValue={null}>
                                <Space>
                                    <Radio value={null}>
                                        <span className="checkItem">
                                            Tất cả
                                        </span>
                                    </Radio>
                                    <Radio value={0}>
                                        <span className="checkItem">
                                            Đã sử dụng
                                        </span>
                                    </Radio>
                                    <Radio value={1}>
                                        <span className="checkItem">
                                            Chưa sử dụng
                                        </span>
                                    </Radio>
                                    <Radio value={2}>
                                        <span className="checkItem">
                                            Hết hạn
                                        </span>
                                    </Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Form.Item
                            name="checkIn"
                            label={
                                <Typography.Text className="label">
                                    Cổng check-in
                                </Typography.Text>
                            }
                        >
                            <Checkbox
                                className="checkAll"
                                checked={checkAll}
                                onChange={selectAllOnChange}
                            >
                                <span className="checkItem">Tất cả</span>
                            </Checkbox>
                            <Checkbox.Group
                                value={checkIn}
                                onChange={checkInOnchange}
                            >
                                <Row>
                                    <Col span={8}></Col>
                                    <Col span="8">
                                        <Checkbox value={1}>
                                            <span className="checkItem">
                                                Cổng 1
                                            </span>
                                        </Checkbox>
                                    </Col>
                                    <Col span="8">
                                        <Checkbox value={2}>
                                            <span className="checkItem">
                                                Cổng 2
                                            </span>
                                        </Checkbox>
                                    </Col>
                                    <Col span="8">
                                        <Checkbox value={3}>
                                            <span className="checkItem">
                                                Cổng 3
                                            </span>
                                        </Checkbox>
                                    </Col>
                                    <Col span="8">
                                        <Checkbox value={4}>
                                            <span className="checkItem">
                                                Cổng 4
                                            </span>
                                        </Checkbox>
                                    </Col>
                                    <Col span="8">
                                        <Checkbox value={5}>
                                            <span className="checkItem">
                                                Cổng 5
                                            </span>
                                        </Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <div className="buttonContainer">
                            <Button
                                ghost
                                htmlType="submit"
                                className="btn"
                            >
                                Lọc
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default ModalFilter;

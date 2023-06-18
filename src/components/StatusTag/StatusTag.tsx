import { Badge, Tag } from "antd";
import './StatusTag.css'

interface IStatus {
    text: string;
    type: number;
}

const themes = [
    {
        type: 'default',
        color: '#919DBA'
    },
    {
        type: 'success',
        color: '#03AC00'
    },
    {
        type: 'error',
        color: '#FD5959'
    }
]

const StatusTag = ({ type, text }: IStatus) => {
    return (
        <Tag color={themes[type].type} className="status">
            {" "}
            <Badge 
                color={themes[type].color} 
                text={<span className="text" style={{color: themes[type].color}}>{text}</span>}
            />
        </Tag>
    );
};

export default StatusTag;

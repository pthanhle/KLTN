import React from 'react';
import { Switch } from 'antd';

const StatusToggle = ({ isActive, onChange }) => {
    return (
        <Switch 
            checked={isActive} 
            onChange={onChange}
            className={`!w-11 [&.ant-switch-checked]:!bg-yellow-500 hover:[&.ant-switch-checked]:!bg-yellow-600`}
        />
    );
};

export default StatusToggle;

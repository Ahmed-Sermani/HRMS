import React from 'react'
import { notification } from 'antd';

interface Props {
    type: 'success' | 'info' | 'warning' | 'error',
    title: string | React.FC,
    description: string | React.FC
}

export const openNotificationWithIcon = (props: Props) => {
    notification[props.type]({
      message: props.title,
      description: props.description,
    });
  };
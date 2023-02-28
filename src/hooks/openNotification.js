
import { notification } from 'antd';

const openNotification = (icon, msg, des) => {
            notification.open({
                message: msg,
                description: des,
                icon : icon
            });
}

export default openNotification



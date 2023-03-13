import { ArrowDownOutlined, DownCircleFilled, EditOutlined, EllipsisOutlined, EyeFilled, FireFilled, FireTwoTone, PicCenterOutlined, SettingOutlined } from '@ant-design/icons';
import { Card, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import docServices from '../../../services/docServices';


const NewContent = (filesFilter) => {
  const [items, setItems] = useState([]);
  useEffect(() => { getMenuItems() }, [filesFilter.filesFilter]);

  const getMenuItems = async () => {
    console.log('filesFilter', filesFilter)
    setItems(filesFilter.filesFilter);
  };
  const getIcon = (menu) => {
    let icon = '';
    switch (menu.code) {
        case 'TNTV':
            icon = `./assets/TNTV.png`
            break;
        case 'TNTT':
            icon = `./assets/TNTT.jpeg`
            break;
        case 'VOL':
            icon = `./assets/VIOL.jpeg`
            break;
        case 'VOE':
            icon = `./assets/VIOE.jpeg`
            break;
        default:
            icon = `https://d1csarkz8obe9u.cloudfront.net/posterpreviews/document-app-icon-or-logo-icon-design-template-7b6cac8de4b9abdd949f7643fe00924e_screen.jpg?ts=1576967977`
            break;
    }
    console.log('menu', menu)
    return icon
}
  return (
    <div style={{ padding: 24, background: '#e5f7ff', minHeight: 600, minWidth: 'calc(100% - 288px)' }}>
      <Row gutter={[16, 32]}>
        {items.map((item) => (
          <Col key={item._id} xs={24} sm={12} md={8} lg={12} xl={4}>
            <Link to="/files/details" state={{ data: item.code, item: item }}
                                    onClick={() => docServices.countSeen(item._id)}
            >
            <Card
              cover={<img alt={item.name} src={getIcon(item)} />}
              hoverable
              onClick={() => docServices.countSeen(item._id)}
              actions={[
                <div style={{display: 'flex', flexDirection : 'row', gap : 5, justifyContent : 'center', alignItems : 'center'}}>
                  <EyeFilled/> <span> {item.seenCount}</span> {item?.isHot && <FireTwoTone twoToneColor={'red'}/>}</div> ,
                <div style={{display: 'flex', flexDirection : 'row', gap : 5, justifyContent : 'center', alignItems : 'center'}}>
                <ArrowDownOutlined/> <span> {item.dowloadCount}</span> {item?.isMostDown && <FireTwoTone twoToneColor={'orange'}/>}</div>,
              ]}
            >
              <Card.Meta title={item.name} description={item.note} />
            </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default NewContent;

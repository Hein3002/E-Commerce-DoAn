import React from 'react';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Space } from 'antd';
import {  useNavigate } from 'react-router-dom';

const colors1 = ['#6253E1', '#04BEFE'];
const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());


  interface Props {
    dataPath: any;
}

const ButtonCustom: React.FC<Props> = ({dataPath=null}) =>{
    const navigate =useNavigate()
    const handleOnClick=()=>{
        navigate(`${dataPath}`)
    }
    return(
        <Space  style={{ display:'flex',justifyContent:'flex-end', margin:'10px' }}> 
        <ConfigProvider    
          theme={{
            components: {
              Button: {
                colorPrimary: `linear-gradient(90deg,  ${colors2.join(', ')})`,
                colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colors2).join(', ')})`,
                colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colors2).join(', ')})`,
                lineWidth: 0,
              },
            },
          }}
        >
          <Button onClick={handleOnClick} type="primary" size="middle">
            Check Cart
          </Button>
        </ConfigProvider>
      </Space>
    )

}


export default ButtonCustom;
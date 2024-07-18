import { Line } from '@ant-design/plots';
import { title } from 'process';

interface LineChart{
  month: any,
  total: any,
}

interface Props{
  data: LineChart[]
}

const LineChart: React.FC<Props> = ({data}) => {
  const config = {
    data,
    title:'Revenue statistics',
    xField: 'month',
    yField: 'total',
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
  return <Line {...config} />;
};

export default LineChart
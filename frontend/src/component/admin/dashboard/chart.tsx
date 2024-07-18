import { Column } from '@ant-design/plots';
import { title } from 'process';
import { text } from 'stream/consumers';

interface ColumnChart {
  name: any,
  quantity: any
}

interface Props {
  data: ColumnChart[]
}

const Chart: React.FC<Props> = ({ data }) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const config = {
    data,
    title:'Top product statistics',
    xField: 'name',
    yField: 'quantity',
    label: {
      textBaseline: 'bottom',
      },
    axis: {
      x: {
        formatter: (a: any) => truncateText(a,10)
      }
    },
    style: {
      radiusTopLeft: 10,
      radiusTopRight: 10,
    },
  };
  return <Column {...config} />;
};

export default Chart
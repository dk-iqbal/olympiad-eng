import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';


const PieActiveArc = (props: any) => {
  const { data } = props;

  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={200}
    />
  );
}

export default PieActiveArc

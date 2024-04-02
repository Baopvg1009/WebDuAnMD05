import React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const size = {
  width: 400,
  height: 200,
};

export default function PieArcLabel({ data }) {
  console.log("data", data);
  const labeledData = data.map(item => ({
    label: item.hoten, 
    value: item.tongtien 
  }));

  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.label} (${item.value})`,
          arcLabelMinAngle: 45,
          data: labeledData,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
      {...size}
    />
  );
}

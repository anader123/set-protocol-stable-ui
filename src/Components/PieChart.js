import React from 'react';
import * as d3 from "d3";
import styled from 'styled-components';

const Path = styled.path`
  fill: ${props => props.arcData.data.color};
  stroke: #9FA4AE;
`

const Arc = ({ arcData }) => {
  const arc = d3.arc()
  .innerRadius(0)
  .outerRadius(75);

  return (
    <Path d={arc(arcData)} arcData={arcData}  index={arcData.index} />
  )
}

const PieChart = ({ data, x, y }) => {
  const pie = d3.pie().value(d => d.amount);
  return (
    <g transform={`translate(${x}, ${y})`}>
      {pie(data).map((d, index) =>{
        return(
        <Arc key={`id-${index}`} arcData={d}/>
        )
      })}
    </g>
  )
}

export default PieChart;
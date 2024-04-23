import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import axios from "axios";
import {Box} from "@mui/material";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [logData, setLogData] = useState([]);

  useEffect(() => {
    const fetchLogData = async () => {
      try {
        const response = await axios.get('/countLogsByDay');
        const data = response.data;
        const formattedData = data.map(entry => ({
          day: `${entry._id.day}`,
          count: entry.count,
          color: colors.blueAccent[600]
        }));
        setLogData(formattedData.reverse());
      } catch (error) {
        console.error('Error fetching log data:', error);
      }
    };

    fetchLogData();
  }, []);

  return (
    <Box sx={{ height: '150px' }}>
      <ResponsiveBar
        data={logData}
        keys={['count']}
        indexBy="day"
        margin={{ top: 20, right: 60, bottom: 20, left: 40 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ datum: 'data.color' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Day',
          legendPosition: 'middle',
          legendOffset: 32,
          format: value => `${Math.round(value)}`
        }}
        axisLeft={null}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </Box>
  );
};

export default BarChart;

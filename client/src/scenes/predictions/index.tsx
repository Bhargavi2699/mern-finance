import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery } from '@/state/api'
import { Box, Button, Typography, useTheme } from '@mui/material'
import React, { useMemo, useState } from 'react'
import FlexBetween from "@/components/FlexBetween";
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import regression, { DataPoint } from "regression";

const Predictions = () => {
    const { palette } = useTheme()
    const [isPredictions, setIsPredictions] = useState(false) //will help w/ next year preds
    const { data: kpiData } = useGetKpisQuery()

    const formattedData = useMemo(() => {
        if (!kpiData) return []
        const monthData = kpiData[0].monthlyData
        const formatted: Array<DataPoint> = monthData.map(
            ({ revenue }, i: number) => {
                return [i, revenue]
            }
        )
        const regressionLine = regression.linear(formatted)

        return monthData.map(({ month, revenue }, i: number) => {
            return {
                name: month,
                "Actual Revenue": revenue,
                "Regression Line": regressionLine.points[i][1], //2nd value of the index: revenue
                "Predicted Revenue": regressionLine.predict(i + 12)[1] //rep next year's revenue 
            }
        })
    }, [kpiData])

    return (
        <DashboardBox
            width="100%"
            height="100%"
            padding="1rem"
            overflow="hidden">
            <FlexBetween
                m="1rem 2.5rem"
                gap="1rem"
            >
                {/* keep everything coupled */}
                <Box>
                    <Typography variant='h3'>Revenue and Predictions</Typography>
                    {/* change font size based on priority */}
                    <Typography variant='h6'>
                        charted revenue and predicted revenue based on a simple linear
                        regression model
                    </Typography>
                </Box>
                <Button
                    onClick={() => setIsPredictions(!isPredictions)}
                    sx={{
                        color: palette.grey[900],
                        backgroundColor: palette.grey[700],
                        boxShadowColor: "0.1rem 0.1rem 0.1rem 0.1remrgba(0, 0, 0, .4)"
                    }}
                >
                    Show Predicted Revenue for Next Year
                </Button>
            </FlexBetween>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    // no width or height since it's a responsive container
                    data={formattedData}
                    margin={{
                        top: 20,
                        right: 75,
                        left: 20,
                        bottom: 80,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
                    <XAxis
                        dataKey="name"
                        tickLine={false}
                        style={{ fontSize: "10px" }}
                    >
                        <Label value="Month" offset={-5} position='insideBottom' />
                    </XAxis>
                    <YAxis
                        domain={[12000, 26000]}
                        axisLine={{ strokeWidth: '0' }}
                        style={{ fontSize: "10px" }}
                        // change to rupee symbol
                        tickFormatter={(v) => `$${v}`}
                    >
                        {/* change to INR, and the value is not horizontal letters on vertical, hence angle = -90 */}
                        <Label value="Revenue in USD" angle={-90} offset={-5} position='insideLeft' />
                    </YAxis>
                    <Tooltip />
                    <Legend verticalAlign='top' />
                    <Line
                        type="monotone"
                        dataKey="Actual Revenue"
                        stroke={palette.primary.main}
                        strokeWidth={0}
                        dot={{ strokeWidth: 5 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="Regression Line"
                        stroke="#8884d8"
                        dot={false}
                    />
                    {isPredictions && (
                        <Line
                            strokeDasharray="5 5"
                            dataKey="Predicted Revenue"
                            stroke={palette.secondary[500]}
                        />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </DashboardBox>
    )
}

export default Predictions
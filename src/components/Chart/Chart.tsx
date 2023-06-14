import React from "react";
import Chart from "react-apexcharts";

type CustomChartType = {
    data: {
        name: string;
        value: number;
        fill?: string;
    }[];
    legend?: boolean;
};

const CustomChart: React.FC<CustomChartType> = (props) => {
    const name = props.data.map((value) => value.name);
    const value = props.data.map((value) => value.value);

    const state: any = {
        series: value,

        options: {
            chart: {
                type: "donut",
            },

            plotOptions: {
                pie: {
                    size: 250,
                    donut: {
                        size: 47,
                    },
                },
            },

            colors: ["#FF8A48", "#4F75FF"],
            labels: name,

            dataLabels: {
                formatter: function (
                    val: any,
                    { seriesIndex, dataPointIndex, w }: any
                ) {
                    return w.config.series[seriesIndex];
                },

                textAnchor: "end",

                style: {
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                },

                background: {
                    enabled: true,
                    foreColor: "#fff",
                    padding: 20,
                    opacity: 1,
                    border: 20,

                    dropShadow: {
                        enabled: true,
                        top: 0,
                        left: 0,
                        blur: 15,
                        color: "#000",
                        opacity: 0.2,
                    },
                },

                dropShadow: {
                    enabled: false,
                },
            },

            legend: {
                show: props.legend,
                width: 400,

                markers: {
                    width: 44,
                    height: 20,
                    radius: 4,
                },

                onItemClick: {
                    toggleDataSeries: false,
                },
                onItemHover: {
                    highlightDataSeries: false,
                },
            },
        },
    };

    return (
        <>
            <Chart
                width={props.legend ? 700 : 300}
                height={props.legend ? 230 : 255}
                options={state.options}
                series={state.series}
                type="donut"
            />
        </>
    );
};

export default CustomChart;

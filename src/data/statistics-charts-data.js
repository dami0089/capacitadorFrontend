import { chartsConfig } from "@/configs";

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Views",
      data: [50, 20, 10, 22, 50],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#fff",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["Lu", "Ma", "Mi", "Ju", "Vi"],
    },
  },
};

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#fff"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ],
    },
  },
};

const completedTasksChart = {
  ...dailySalesChart,
  series: [
    {
      name: "Tasks",
      data: [10, 20, 25, 30, 40, 300, 220, 500, 250, 400, 230, 500],
    },
  ],
};

const semanal = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Views",
      data: [50, 20, 40, 45],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#fff",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
    },
  },
};

export const statisticsChartsData = [
  {
    color: "blue",
    title: "Registros Procesados",
    description: "Ultimos 7 dias",
    footer: "",
    chart: websiteViewsChart,
  },
  {
    color: "green",
    title: "Registros Ingresados",
    description: "Ultimos 30 dias",
    footer: "",
    chart: semanal,
  },
  {
    color: "pink",
    title: "Registros Procesados",
    description: "Vista anual",
    footer: "",
    chart: completedTasksChart,
  },
];

export default statisticsChartsData;

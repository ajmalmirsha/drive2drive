import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { adminApi } from "../../../../utils/Apis";
import { useErrorHandler } from "../../../../user/ErrorHandlers/ErrorHandler";
import Spinner from "../../../../common/spinners/Spinner";

export default function MainGraph() {
  const { adminAuthenticationHandler } = useErrorHandler();
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [days, setDays] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    adminApi
      .get("/get/all/sales/data")
      .then(({ data: { days, revenue } }) => {
        setLoading(false);
        setRevenue(revenue);
        setDays(days);
      })
      .catch((err) => {
        adminAuthenticationHandler(err);
      });
  }, []);

  useEffect(() => {
    const data = {
      labels: days,
      datasets: [
        {
          label: "Sales",
          data: revenue,
          backgroundColor: [
            "rgba(255, 159, 64, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgb(255, 159, 64)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
          ],
          borderWidth: 1,
        },
      ],
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [days, revenue]);
  return (
    <div className="main-graph m-5 p-5" style={{ height: "500px" }}>
      <div className="card">{loading ? <Spinner /> : <Chart type="bar" data={chartData} options={chartOptions} />}</div>
    </div>
  );
}

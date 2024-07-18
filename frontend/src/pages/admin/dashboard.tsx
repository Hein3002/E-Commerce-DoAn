import { useEffect, useState } from "react";
import Chart from "../../component/admin/dashboard/chart";
import LineChart from "../../component/admin/dashboard/linechart";
import Statistics from "../../component/admin/dashboard/statistic";
import { apiGetData } from "../../services/admin/dashboard.services";

const Dashboard = () => {
    const [statistic, setStatistic] = useState({ user: 0, outOfStock: 0, salleBill: 0, product: 0 });
    const [lineChart,setLineChart] = useState([{ month: 0, total: 0}]);
    const [columChart,setColumChart] = useState([{ name: '', quantity: 0}]);

    const fectData = async() => {
        let results = await apiGetData({});
        setStatistic(results.statistic);
        setLineChart(results.chart.lineChart);
        setColumChart(results.chart.columChart)
    }

    useEffect(()=>{
        fectData();
    },[])

    console.log(lineChart);

    return (
        <>
            < Statistics data={statistic}/>
            <div style={{display: 'flex', gap: '50px'}}>
                < LineChart data={lineChart}/>
                < Chart data={columChart}/>
            </div>
            {/* < Water />
            < DropWater /> */}
        </>
    )
}

export default Dashboard;
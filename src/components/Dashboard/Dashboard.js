import "./Dashboard.css";

import { Chart } from "primereact/chart";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

import React, { useState, useEffect } from "react";

import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { DashboardService } from "../../services/DashboardService";

function Dashboard() {
  const BATTERY_TESTKIND = 1;
  const LAMP_TESTKIND = 2;

  const BATTERYCAPACITY_FAULTKIND = 1;
  const LAMP_FAULTKIND = 2;
  const CHARGER_FAULTKIND = 3;
  const MAINS_FAULTKIND = 4;

  const [batteryTests, setBatteryTests] = useState(0);
  const [lampTests, setLampTests] = useState(0);

  const [batteryCapacityProgress, setBatteryCapacityProgress] = useState({"value": 0, "percent": 0, "trend": "down", "status": "teal"});
  const [lampProgress, setLampProgress] = useState({"value": 0, "percent": 0, "trend": "down", "status": "teal"});
  const [chargerProgress, setChargerProgress] = useState({"value": 0, "percent": 0, "trend": "down", "status": "teal"});
  const [mainsProgress, setMainsProgress] = useState({"value": 0, "percent": 0, "trend": "down", "status": "teal"});

  const [faultsPerAddress, setFaultsPerAddress] = useState([]);

  const dashboardService = new DashboardService();

  // Get Total Count of Battery Tests
  useEffect(() => {
    const fetchData = async () => {
      return dashboardService.getTotalTestCount(BATTERY_TESTKIND);
    };

    // call the function
    fetchData().then((data) => setBatteryTests(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Get Total Count of Lamp Tests
  useEffect(() => {
    const fetchData = async () => {
      return dashboardService.getTotalTestCount(LAMP_TESTKIND);
    };

    // call the function
    fetchData().then((data) => setLampTests(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Get Battery Capacity Fault Progress
  useEffect(() => {
    const fetchData = async () => {
      return dashboardService.getFaultProgress(BATTERYCAPACITY_FAULTKIND);
    };

    // call the function
    fetchData().then((data) => setBatteryCapacityProgress(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Get Lamp Fault Progress
  useEffect(() => {
    const fetchData = async () => {
      return dashboardService.getFaultProgress(LAMP_FAULTKIND);
    };

    // call the function
    fetchData().then((data) => setLampProgress(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Get Charger Fault Progress
  useEffect(() => {
    const fetchData = async () => {
      return dashboardService.getFaultProgress(CHARGER_FAULTKIND);
    };

    // call the function
    fetchData().then((data) => setChargerProgress(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Get Mains Fault Progress
  useEffect(() => {
    const fetchData = async () => {
      return dashboardService.getFaultProgress(MAINS_FAULTKIND);
    };

    // call the function
    fetchData().then((data) => setMainsProgress(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    const fetchData = async () => {
      return dashboardService.getTotalFaultsPerAddress();
    };

    // call the function
    fetchData().then((data) => setFaultsPerAddress(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const countOfTotalsTemplate = (rowData) => {
    const countOfTotalsClassName = classNames({
      none: rowData.totalCnt === 0,
      low: rowData.totalCnt > 0 && rowData.totalCnt < 10,
      high: rowData.totalCnt > 10,
    });

    return <div className={countOfTotalsClassName}>{rowData.totalCnt}</div>;
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "#4bc0c0",
      },
    ],
  };

  return (
    <div class="bg-gray-100 flex-1 p-6 md:mt-16">
      <div class="grid grid-cols-4 gap-6 xl:grid-cols-1">
        <div class="report-card">
          <div class="card">
            <div class="card-body flex flex-col">
              <div class="flex flex-row justify-between items-center">
                <div class="h6 text-indigo-700 fad fa-battery-empty"></div>
                <span class={`rounded-full text-white badge bg-${batteryCapacityProgress.status}-400 text-xs`}>
                  {batteryCapacityProgress.percent}%
                  <i class={`fal fa-chevron-${batteryCapacityProgress.trend} ml-1`}></i>
                </span>
              </div>
              <div class="mt-8">
                <h1 class="h5 num-4">{batteryCapacityProgress.value}</h1>
                <p>Battery Capacity Faults</p>
              </div>
            </div>
          </div>
          <div class="footer bg-white p-1 mx-4 border border-t-0 rounded rounded-t-none"></div>
        </div>
        
        <div class="report-card">
          <div class="card">
            <div class="card-body flex flex-col">
              <div class="flex flex-row justify-between items-center">
                <div class="h6 text-indigo-700 fad fa-lightbulb"></div>
                <span class={`rounded-full text-white badge bg-${lampProgress.status}-400 text-xs`}>
                  {lampProgress.percent}%
                  <i class={`fal fa-chevron-${lampProgress.trend} ml-1`}></i>
                </span>
              </div>
              <div class="mt-8">
                <h1 class="h5 num-4">{lampProgress.value}</h1>
                <p>Lamp Faults</p>
              </div>
            </div>
          </div>
          <div class="footer bg-white p-1 mx-4 border border-t-0 rounded rounded-t-none"></div>
        </div>

        <div class="report-card">
          <div class="card">
            <div class="card-body flex flex-col">
              <div class="flex flex-row justify-between items-center">
                <div class="h6 text-indigo-700 fad fa-car-battery"></div>
                <span class={`rounded-full text-white badge bg-${chargerProgress.status}-400 text-xs`}>
                  {chargerProgress.percent}%
                  <i class={`fal fa-chevron-${chargerProgress.trend} ml-1`}></i>
                </span>
              </div>
              <div class="mt-8">
                <h1 class="h5 num-4">{chargerProgress.value}</h1>
                <p>Charger Faults</p>
              </div>
            </div>
          </div>
          <div class="footer bg-white p-1 mx-4 border border-t-0 rounded rounded-t-none"></div>
        </div>

        <div class="report-card">
          <div class="card">
            <div class="card-body flex flex-col">
              <div class="flex flex-row justify-between items-center">
                <div class="h6 text-indigo-700 fad fa-plug"></div>
                <span class={`rounded-full text-white badge bg-${mainsProgress.status}-400 text-xs`}>
                  {mainsProgress.percent}%
                  <i class={`fal fa-chevron-${mainsProgress.trend} ml-1`}></i>
                </span>
              </div>
              <div class="mt-8">
                <h1 class="h5 num-4">{mainsProgress.value}</h1>
                <p>Mains Faults</p>
              </div>
            </div>
          </div>
          <div class="footer bg-white p-1 mx-4 border border-t-0 rounded rounded-t-none"></div>
        </div>
      </div>

      
      <div class="grid grid-cols-2 gap-6 xl:grid-cols-2">
        <div class="card mt-6">
          <div class="card-body flex items-center">
            <div class="px-3 py-2 rounded bg-blue-600 text-white mr-3">
              <i class="fad fa-battery-quarter"></i>
            </div>

            <div class="flex flex-col">
              <h1 class="font-semibold">
                <span class="num-2">{batteryTests}</span> Battery Running
                Tests
              </h1>
            </div>
          </div>
        </div>
        <div class="card mt-6">
          <div class="card-body flex items-center">
            <div class="px-3 py-2 rounded bg-blue-600 text-white mr-3">
              <i class="fad fa-lightbulb"></i>
            </div>

            <div class="flex flex-col">
              <h1 class="font-semibold">
                <span class="num-2">{lampTests}</span> Lamp Running Tests
              </h1>
            </div>
          </div>
        </div>
      </div>

      
      <div class="grid grid-cols-2 gap-6 mt-6 xl:grid-cols-1">
        <div className="datatable-style">
          <div className="card">
            <DataTable
              value={faultsPerAddress}
              responsiveLayout="scroll"
            >
              <Column field="address" header="Address"></Column>
              <Column field="totalCnt" header="Count of Faults" body={countOfTotalsTemplate}>
              </Column>
            </DataTable>
          </div>
        </div>

        <Chart type="line" data={data} />
      </div>
    </div>
  );
}

export default Dashboard;

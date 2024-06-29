export class DashboardService {

  async getTotalTestCount(testKind) {
    const response = await fetch(
      "https://localhost:7252/api/v1/Dashboard/TestStatus/" + testKind
    );

    return response.json();
  }

  async getFaultProgress(faultKind) {
    const response = await fetch(
      "https://localhost:7252/api/v1/Dashboard/FaultProgress/" + faultKind
    );

    return response.json();
  }

  async getTotalFaultsPerAddress() {
    const response = await fetch(
      "https://localhost:7252/api/v1/Dashboard/TotalFaultsPerAddress"
    );

    return response.json();
 }

}

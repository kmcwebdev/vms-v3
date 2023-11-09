import React from "react";
import RecentVisitors from "./recent-visitors";
import MostVisitedSites from "./most-visited-sites";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <RecentVisitors />
      <MostVisitedSites />
    </div>
  );
};

export default Dashboard;

import React from "react";
import RecentVisitors from "./recent-visitors";
import MostVisitedSites from "./most-visited-sites";

const Dashboard = () => {
  return (
    <div className="flex w-full gap-x-4">
      {/* <h1>Dashboard</h1> */}
      <RecentVisitors />
      <MostVisitedSites />
    </div>
  );
};

export default Dashboard;

import React from "react";
import RecentVisitors from "./recent-visitors";
import Overview from "./overview";
import MostVisitedSites from "./most-visited-sites";

const Dashboard = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <Overview />
      <div className="flex gap-x-4">
        <MostVisitedSites />
        <RecentVisitors />
      </div>
    </div>
  );
};

export default Dashboard;

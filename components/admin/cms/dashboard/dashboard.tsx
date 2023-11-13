import React from "react";
import RecentVisitors from "./recent-visitors";
import Overview from "./overview";

const Dashboard = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <Overview />
      <RecentVisitors />
    </div>
  );
};

export default Dashboard;

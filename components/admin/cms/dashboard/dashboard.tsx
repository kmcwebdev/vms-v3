import React from "react";
import RecentVisitors from "./recent-visitors";

const Dashboard = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <RecentVisitors />
    </div>
  );
};

export default Dashboard;

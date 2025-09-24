
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

import DashboardContent from "./DashboardContent";
import AlumniContent from "./AlumniContent";
import EventsContent from "./EventsContent";
import FacultyContent from "./FacultyContent";
import SettingsContent from "./SettingsContent";


const AdminDashboard = () => {
  const [active, setActive] = useState("Dashboard");

  const renderContent = () => {
    switch (active) {
      case "Dashboard":
        return <DashboardContent />;
      case "Alumni":
        return <AlumniContent />;
      case "Events":
        return <EventsContent />;
      case "Faculty":
        return <FacultyContent />;
      case "Settings":
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar active={active} setActive={setActive} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header active={active} />

        {/* Dynamic Content */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;

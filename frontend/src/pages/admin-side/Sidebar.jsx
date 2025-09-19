import React from "react";
import { Home, Users, GraduationCap, Briefcase, Calendar, Settings } from "lucide-react";

const Sidebar = ({ active, setActive }) => {
  const menuItems = [
    { name: "Dashboard", icon: <Home size={18} /> },
    { name: "Users", icon: <Users size={18} /> },
    { name: "Students", icon: <GraduationCap size={18} /> },
    { name: "Alumni", icon: <Briefcase size={18} /> },
    { name: "Events", icon: <Calendar size={18} /> },
    { name: "Faculty", icon: <Users size={18} /> },
    { name: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav>
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-md mb-2 transition 
              ${active === item.name ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}
          >
            {item.icon} {item.name}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

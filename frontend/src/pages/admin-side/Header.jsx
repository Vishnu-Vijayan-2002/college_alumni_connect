import React from "react";

const Header = ({ active }) => {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login"; // redirect to login after logout
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">{active}</h1>
      <div className="flex items-center gap-4">
        <img
          src="https://ui-avatars.com/api/?name=Admin"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
        <button 
          onClick={logout} // ✅ pass reference, don’t call immediately
          className="bg-red-500 text-white px-3 py-1 rounded-md"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;

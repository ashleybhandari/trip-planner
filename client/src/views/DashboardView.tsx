import { FaPlus } from "react-icons/fa";

const DashboardView = () => {
  const myTrips = [
    { name: "TRIP NAME #1", destination: "Destination", members: "Me, Name1, Name2, Name3, and Name4" },
  ];

  const archivedTrips = {
    2024: [
      { name: "TRIP NAME #1", destination: "Destination", members: "Me, Name1, Name2, Name3, and Name4" },
      { name: "TRIP NAME #2", destination: "Destination", members: "Me, Name1, Name2, Name3" },
      { name: "TRIP NAME #3", destination: "Destination", members: "Me, Name1" },
    ],
    2023: [
      { name: "TRIP NAME #1", destination: "Destination", members: "Me, Name1, Name2, Name3, and Name4" },
      { name: "TRIP NAME #2", destination: "Destination", members: "Me, Name1, Name2, Name3" },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-green-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">trip planner</h1>
        <button className="bg-white text-green-700 px-4 py-2 rounded-md">Sign Out</button>
      </nav>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto p-6">
        {/* My Trips Section */}
        <h2 className="text-lg font-semibold text-center mb-4">my trips</h2>
        <div className="grid grid-cols-2 gap-4 justify-center">
          {/* Create New Trip */}
          <div className="bg-white shadow-md rounded-lg flex items-center justify-center h-32 border border-gray-300 cursor-pointer">
            <FaPlus className="text-3xl text-gray-500" />
          </div>

          {/* Existing Trips */}
          {myTrips.map((trip, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-md font-bold">{trip.name}</h3>
              <p className="text-gray-500">{trip.destination}</p>
              <p className="text-gray-600 text-sm">{trip.members}</p>
            </div>
          ))}
        </div>

        {/* Archive Section */}
        <h2 className="text-lg font-semibold text-center mt-8 mb-4">archive</h2>
        {Object.entries(archivedTrips).map(([year, trips]) => (
          <div key={year}>
            <h3 className="text-gray-500 font-semibold mb-2">– {year} –</h3>
            <div className="grid grid-cols-3 gap-4">
              {trips.map((trip, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4">
                  <h3 className="text-md font-bold">{trip.name}</h3>
                  <p className="text-gray-500">{trip.destination}</p>
                  <p className="text-gray-600 text-sm">{trip.members}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardView;
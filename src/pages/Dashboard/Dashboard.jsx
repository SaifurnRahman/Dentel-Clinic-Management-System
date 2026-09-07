const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="p-5 bg-white shadow rounded-lg">
          <h2>Total Doctors</h2>
          <p className="text-3xl font-bold">12</p>
        </div>

        <div className="p-5 bg-white shadow rounded-lg">
          <h2>Total Patients</h2>
          <p className="text-3xl font-bold">250</p>
        </div>

        <div className="p-5 bg-white shadow rounded-lg">
          <h2>Today's Appointments</h2>
          <p className="text-3xl font-bold">18</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

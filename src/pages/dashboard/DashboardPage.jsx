const DashboardPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">Welcome to PR TOOLS Admin Panel</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Last updated</p>
            <p className="text-sm font-medium text-gray-900">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Total Products</h3>
              <p className="text-4xl font-bold text-indigo-600 mt-2">0</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Total Orders</h3>
              <p className="text-4xl font-bold text-green-600 mt-2">0</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M8 11h8l.64 4.705c.156 1.146-.52 2.235-1.618 2.656A2.25 2.25 0 0112 18.25a2.25 2.25 0 01-2.022-.595c-1.098-.421-1.774-1.51-1.618-2.656L8 11z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Pending Orders</h3>
              <p className="text-4xl font-bold text-orange-600 mt-2">0</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
              <p className="text-4xl font-bold text-blue-600 mt-2">$0</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full text-left px-6 py-4 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 rounded-xl hover:from-indigo-100 hover:to-blue-100 transition-all duration-200 border border-indigo-100 hover:border-indigo-200">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Product
              </div>
            </button>
            <button className="w-full text-left px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-200 border border-green-100 hover:border-green-200">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M8 11h8l.64 4.705c.156 1.146-.52 2.235-1.618 2.656A2.25 2.25 0 0112 18.25a2.25 2.25 0 01-2.022-.595c-1.098-.421-1.774-1.51-1.618-2.656L8 11z" />
                </svg>
                View Orders
              </div>
            </button>
            <button className="w-full text-left px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-200 border border-purple-100 hover:border-purple-200">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Manage Categories
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">System initialized</p>
                <p className="text-xs text-gray-500">Admin panel is ready for use</p>
              </div>
            </div>
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">No recent activity</p>
              <p className="mt-1 text-xs text-gray-400">Activity will appear here as you use the system</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
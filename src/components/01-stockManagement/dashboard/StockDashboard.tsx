import ActivityList from './ActivityList';
import ActivityTable from './ActivityTable';
import OverView from './OverView';

const StockDashboard = () => {
  return (
    <main className="flex-1 pb-8">
      {/* <StockManagementSubHeader /> */}
      <div className="mt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Overview
          </h2>
          <OverView />
        </div>
        <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
          Recent activity
        </h2>
        <ActivityList />
        <ActivityTable />
      </div>
    </main>
  );
};

export default StockDashboard;

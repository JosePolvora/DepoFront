import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/Header';
import { Outlet } from 'react-router-dom';


export default function LayoutAdmin() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <AdminHeader />
        <main className="p-4 bg-gray-100 flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
}



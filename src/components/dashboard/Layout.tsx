import Sidebar from "src/components/dashboard/Sidebar";
export default function create({ children }) {
  return (
    <div>
      <Sidebar />
      <div className="ml-64  ">{children}</div>
    </div>
  );
}

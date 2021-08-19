import Sidebar from "./Sidebar";
export default function Layout({ children }) {
  return (
    <div>
      <Sidebar />
      <div className="md:ml-64  ">{children}</div>
    </div>
  );
}

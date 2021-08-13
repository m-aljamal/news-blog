import Layout from "src/components/dashboard/Layout";
import Navbar from "src/components/dashboard/Navbar";
import Drop from "src/components/shared/Drop";
export default function create() {
  return (
    <Layout>
      <div className=" shadow-md">
        <div className="flex justify-between p-4">
          <p>عنوان</p>
          <div>
            <Drop icon={<i className="fas fa-ellipsis-v"></i>} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableDelivery from "../../components/datatable/Datatable";

const ListStatus = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableDelivery />
      </div>
    </div>
  );
};

export default ListStatus;

import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableDiscount from "../../components/datatable/DatatableDiscount";

const ListStatus = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableDiscount />
      </div>
    </div>
  );
};

export default ListStatus;

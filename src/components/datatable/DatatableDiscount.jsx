import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { discountColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const DatatableDiscount = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "MaGiamGia"));
        //timestamp to date

        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp.toDate().toLocaleString(),
          });

          console.log(doc.id, " => ", doc.data());
        });
        setData(list);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  console.log(data);
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "LoaiSP", id));
      setData(data.filter((item) => item.id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/discount/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Update</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Discounts
        <Link to="/newCat" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={discountColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableDiscount;
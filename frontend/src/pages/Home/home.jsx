// import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";


const Home = ({ data }) => {
  // const [deleteId, setDeleteId] = useState('')
  // headers: { "content-type": "multipart/form-data" },
  
      // body: formData,
      // data: listData,
  const detailPage = useNavigate();
  const editPage = useNavigate();

  const deleteData = async (id) => {
    // const formData = new FormData();
    const API_URL = `http://localhost:5000/api/product/${id}`;
    const options = {
      url: API_URL,
      method: "DELETE"
    };
  
    const response = await axios(options);
    return response.data;
  }

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tamah Produk
      </Link>

      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ _id, name, price }) => {
            return (
              <tr key={_id}>
                <td>{_id.length > 7 ? _id.substring(0, 7) : _id}</td>
                <td>{name}</td>
                <td className="text-right">{price}</td>
                <td className="text-center">
                  <button
                    onClick={() => detailPage(`/detail/${_id}`)}
                    className="btn btn-sm btn-info"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => editPage(`/edit/${_id}`)}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteData(_id)} className="btn btn-sm btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Laptop</td>
            <td className="text-right">RP. 20.000.000</td>
            <td className="text-center">
              <Link to="/detail" className="btn btn-sm btn-info">
                Detail
              </Link>
              <Link to="/edit" className="btn btn-sm btn-warning">
                Edit
              </Link>
              <Link to="#" className="btn btn-sm btn-danger">
                Delete
              </Link>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Monitor</td>
            <td className="text-right">RP. 10.000.000</td>
            <td className="text-center">
              <Link to="/detail" className="btn btn-sm btn-info">
                Detail
              </Link>
              <Link to="/edit" className="btn btn-sm btn-warning">
                Edit
              </Link>
              <Link to="#" className="btn btn-sm btn-danger">
                Delete
              </Link>
            </td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
};

export default Home;

import { Link, useParams } from "react-router-dom";
import "./index.scss";

const Detail = ({ data }) => {
  const { id } = useParams();

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>

      <table className="table">
        {data
          .filter((detail) => detail._id.includes(id))
          .map(({ _id, name, price, stock, status, image_url }) => {
            return (
              <tbody key={_id}>
                <tr>
                  <td>ID</td>
                  <td>: {_id}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>: {name}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>: {price}</td>
                </tr>
                <tr>
                  <td>Stock</td>
                  <td>: {stock}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>: {`${status}`}</td>
                </tr>
                <tr>
                  <td>Image</td>
                  <td>: {image_url}</td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
  );
};

export default Detail;

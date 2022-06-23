import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditForm from "./edit-form";

const Edit = () => {
  const { id } = useParams();
  const {product} = useSelector((state) => state.product)

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        {product
          .filter((list) => list._id.includes(id))
          .map((products) => {
            return (
              <EditForm key={products._id} products={products}/>
            );
          })}
      </div>
    </div>
  );
};

export default Edit;

import { Link, useParams } from "react-router-dom";
import {useSelector} from 'react-redux'
import "./index.scss";
import ProductDetail from "./detail-product";

const Detail = () => {
  const { id } = useParams();
  const {product} = useSelector((state) => state.product)

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>

      <table className="table">
        {product
          .filter((detail) => detail._id.includes(id))
          .map((detail) => (
                <ProductDetail key={detail._id} detail={detail}/>
            )
          )}
      </table>
    </div>
  );
};

export default Detail;

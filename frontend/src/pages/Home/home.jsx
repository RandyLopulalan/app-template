import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProduct, reset } from "../../features/product/productSlice";
import ProductList from "./product-list";
import Spinner from "../../component/Spinner";
import "./index.scss";

const Home = () => {
  const dispatch = useDispatch();
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    dispatch(getProduct());

    //Clear state when compomnent unmound
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    <Spinner />;
  }

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tamah Produk
      </Link>

      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." />
      </div>

      {product.length > 0 ? (
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
            {product.map((products) => (
              <ProductList key={products._id} products={products} />
            ))}
          </tbody>
        </table>
      ) : (
        <h3>Product: 0, click tambah to add product</h3>
      )}
    </div>
  );
};

export default Home;

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createProduct, getProduct } from "../../features/product/productSlice";
import Spinner from "../../component/Spinner";
import ProductForm from "./product-form";
import "./index.scss";


const Tambah = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [createData, setCreateData] = useState({
    name: "",
    price: 0,
    stock: 0,
    status: true,
    image: "",
  });

  const { name, price, stock, status, image } = createData;

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.product);

  const onChange = (e) => {
    setCreateData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    const dataProduct = { name, price, stock, status, image };
    dispatch(createProduct(dataProduct))
    setCreateData('')

    if(isError){
      console.error(message)
    }

    if(isSuccess){
      dispatch(getProduct())
      navigate('/')
    }
  };

  if(isLoading){
    return <Spinner />
  }

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={onSubmit} >
          <ProductForm label="Nama" className="form-control" name="name" id="name" type="text" value={name} onChange={onChange}/>
          <ProductForm label="Harga" className="form-control" name="price"id="price" type="number" value={price} onChange={onChange}/>
          <ProductForm label="Stock" className="form-control" name="stock" id="stock" type="number" value={stock} onChange={onChange}/>
          <ProductForm label="Image" className="form-control" name="image" id="image" type="file" value={image} onChange={onChange}/>
          <ProductForm label="Active" className="is-invalid" name="status" id="status" type="checkbox" defaultChecked={status} onChange={onChange}/>
          <br />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
          <Link to="/" className="btn btn-primary">
            Kembali
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Tambah;

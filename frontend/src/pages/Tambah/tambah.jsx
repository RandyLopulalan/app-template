import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../../features/post/postSlice";
import "./index.scss";
import Spinner from "../../component/Spinner";

const Tambah = () => {
  
  const [createData, setCreateData] = useState({
    name: "",
    price: 0,
    stock: 0,
    status: true,
    image: "",
  });

  const { name, price, stock, status, image } = createData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { dataProduct, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.post);
  
   useEffect(() => {
    if(isError){
      console.error(message)
    }

    if(isSuccess && dataProduct){
      navigate('/')
    }
    
    dispatch(reset())

   }, [dataProduct, isSuccess, isError, message, navigate, dispatch])

  const onChange = (e) => {
    setCreateData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const listData = { name, price, stock, status, image };
    dispatch(register(listData))
  };

  if(isLoading){
    return <Spinner />
  }

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={onSubmit} id="form" encType="multipart/form-data" method="post">
          <label>Nama</label>
          <input
            className="form-control"
            name="name"
            id="name"
            type="text"
            value={name}
            onChange={onChange}
          />

          <label>Harga</label>
          <input
            className="form-control"
            name="price"
            id="price"
            type="number"
            value={price}
            onChange={onChange}
          />

          <label>Stock</label>
          <input
            className="form-control"
            name="stock"
            id="stock"
            type="number"
            value={stock}
            onChange={onChange}
          />

          <label>Image</label>
          <input
            className="form-control"
            name="image"
            id="image"
            type="file"
            accept=".gif,.jpg,.jpeg,.png,.doc,.docx"
            onChange={onChange}
          />

          <input
            className="is-invalid"
            name="status"
            id="status"
            type="checkbox"
            defaultChecked={status}
            onChange={onChange}
          />
          <label>Active</label>
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tambah;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update, reset } from "../../features/put/putSlice";
import Spinner from "../../component/Spinner";
// import Input from "../../Component/Input";

const Edit = ({ data }) => {
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [updateData, setUpdateData] = useState({
    name: "",
    price: 0,
    stock: 0,
    status: true,
    image: "",
  });

  const { name, price, stock, status, image } = updateData;

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
    setUpdateData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const listData = { name, price, stock, status, image };
    dispatch(update(listData))
  };

  if(isLoading){
    return <Spinner />
  }

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        {data
          .filter((detail) => detail._id.includes(id))
          .map((list) => {
            return (
              <form key={list._id} onSubmit={onSubmit} id="form" encType="multipart/form-data" method="put">
                <label>Nama</label>
                <input
                  className="form-control"
                  name="name"
                  id='name'
                  type="text"
                  value={name}
                  placeholder={list.name}
                  onChange={onChange}
                />

                <label>Harga</label>
                <input
                  className="form-control"
                  name="price"
                  id='price'
                  type="number"
                  defaultValue={list.price}
                  placeholder={list.price}
                  onChange={onChange}
                />

                <label>Stock</label>
                <input
                  className="form-control"
                  name="stock"
                  id='stock'
                  type="number"
                  defaultValue={list.stock}
                  placeholder={list.stock}
                  onChange={onChange}
                />

                <label>Image</label>
                <input
                  className="form-control"
                  name="image"
                  id='image'
                  type="file"
                  value={image}
                  placeholder={list.image_url}
                  onChange={onChange}
                />

                <input
                  className="is-invalid"
                  name="status"
                  id='status'
                  type="checkbox"
                  defaultChecked={status}
                  onChange={onChange}
                />
                <label>Active</label>
                <button type="submit" className="btn btn-primary">
                  Simpan
                </button>
              </form>
            );
          })}
      </div>
    </div>
  );
};

export default Edit;

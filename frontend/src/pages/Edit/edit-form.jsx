import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, getProduct, reset } from "../../features/product/productSlice";
import Spinner from "../../component/Spinner";

const EditForm = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateData, setUpdateData] = useState({
    name: "",
    price: 0,
    stock: 0,
    status: true,
    image: "",
  });

  const { name, price, stock, status, image } = updateData;

  const {_id} = products

  const { isLoading, isSuccess, isError, message } = useSelector (
    (state) => state.product);

  const onChange = (e) => {
    setUpdateData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const dataProduct = {_id, name, price, stock, status, image };
    dispatch(updateProduct(dataProduct));
    setUpdateData({
      name: "",
      price: 0,
      stock: 0,
      status: true,
      image: "",
    })

    if(isError){
      console.error(message)
    }

    if(isSuccess){
      dispatch(reset())

      dispatch(getProduct())
      
      navigate('/')
    }
  };

  if(isLoading){
    return <Spinner />
  }

  return (
    <form
      onSubmit={onSubmit}
    >
      <label>Nama</label>
      <input
        className="form-control"
        name="name"
        id="name"
        type="text"
        value={name}
        placeholder={products.name}
        onChange={onChange}
      />

      <label>Harga</label>
      <input
        className="form-control"
        name="price"
        id="price"
        type="number"
        defaultValue={products.price}
        placeholder={products.price}
        onChange={onChange}
      />

      <label>Stock</label>
      <input
        className="form-control"
        name="stock"
        id="stock"
        type="number"
        defaultValue={products.stock}
        placeholder={products.stock}
        onChange={onChange}
      />

      <label>Image</label>
      <input
        className="form-control"
        name="image"
        id="image"
        type="file"
        value={image}
        placeholder={products.image_url}
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
      <br/>
      <button type="submit" className="btn btn-primary">
        Simpan
      </button>
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>
    </form>
  );
};

export default EditForm;

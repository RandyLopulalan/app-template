import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../features/product/productSlice";


const ProductList = ({ products }) => {
  const detailPage = useNavigate();
  const editPage = useNavigate();
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{products._id.substring(0, 10)}</td>
      <td>{products.name}</td>
      <td className="text-right">{products.price}</td>
      <td className="text-center">
        <button
          onClick={() => detailPage(`/detail/${products._id}`)}
          className="btn btn-sm btn-info"
        >
          Detail
        </button>
        <button
          onClick={() => editPage(`/edit/${products._id}`)}
          className="btn btn-sm btn-warning"
        >
          Edit
        </button>
        <button
          onClick={() => dispatch(deleteProduct(products._id))}
          className="btn btn-sm btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ProductList;

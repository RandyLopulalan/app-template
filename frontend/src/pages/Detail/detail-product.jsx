import React from 'react'

const ProductDetail = ({detail}) => {
  return (
    <tbody>
    <tr>
      <td>ID</td>
      <td>: {detail._id}</td>
    </tr>
    <tr>
      <td>Name</td>
      <td>: {detail.name}</td>
    </tr>
    <tr>
      <td>Price</td>
      <td>: {detail.price}</td>
    </tr>
    <tr>
      <td>Stock</td>
      <td>: {detail.stock}</td>
    </tr>
    <tr>
      <td>Status</td>
      <td>: {`${detail.status}`}</td>
    </tr>
    <tr>
      <td>Image</td>
      <td>: {detail.image_url}</td>
    </tr>
  </tbody>
  )
}

export default ProductDetail
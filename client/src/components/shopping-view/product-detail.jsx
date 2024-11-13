import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"

export const ProductDetail = () => {
  const { productList } = useSelector((state) => state.shopProducts);
  const {productId} = useParams()
  const product = productList.find((item) => item._id === productId)
  console.log("product",product);
  
  
  return(
    <div>this product detail</div>
  )
}
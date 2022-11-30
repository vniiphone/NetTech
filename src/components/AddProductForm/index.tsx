import { FormEvent, useState } from "react";
import { Input } from "../Input";
import { productData } from '../../interfaces/Products';
import { useAddProduct } from '../../hooks/useAddProduct';
import { LoadingScreen } from "../LoadingScreen";
import { ErrorMessage } from "../ErrorMessage";
import { FormButton } from "../FormButton";
import { Link } from "react-router-dom";
import { Label } from "../Label";


export const AddProductForm = () => {

  const { addProduct, loading, error } = useAddProduct();

  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productImageUrl, setProductImageUrl] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data: productData = {
      productName,
      productPrice: parseFloat(productPrice),
      productImageUrl,
      productDescription,
    }

    addProduct(data);

    if (!error) {
      setProductName("");
      setProductPrice("");
      setProductImageUrl("");
      setProductDescription("");
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      {loading && <LoadingScreen />}
      <Label label="Product name">
        <Input
          type="text"
          value={productName}
          setState={setProductName}
          placeholder="Your product name"
          required={true}
        />
      </Label>
      <Label label="Price">
        <Input
          type="number"
          value={productPrice}
          setState={setProductPrice}
          placeholder="Product price"
          required={true}
        />
      </Label>
      <Label label="Product image URL">
        <Input
          type="text"
          value={productImageUrl}
          setState={setProductImageUrl}
          placeholder="Your product image"
          required={true}
        />
      </Label>
      <Label label="Description">
        <Input
          type="text"
          value={productDescription}
          setState={setProductDescription}
          placeholder="Describe about your product"
          required={true}
        />
      </Label>
      <div className="form-actions">
        <Link to="/">Go home</Link>
        <FormButton>Add product</FormButton>
      </div>
      {error && <ErrorMessage message={error} />}
    </form>
  );
}
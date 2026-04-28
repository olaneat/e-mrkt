import React, { useEffect, useState, useRef } from "react";
import './style.scss';
import imgsConstant from "../../../../constant/imgs.constant";
import InputField from "../../../../components/input-field/input-field";
import Button from "../../../../components/btns/btn";
import SelectField from "../../../../components/input-field/custom-select-field";
import { useDispatch, useSelector } from "react-redux";
import { displayCategories } from "../../../../slices/categories.slice";
import { RootState } from "../../../../store";
import { CategoryDTO } from "../../../../dto/categories.dto";
import { ProductDetailDTO } from "../../../../dto/product-detail.dto";
import { CreateProduct } from "../../../../slices/new-product.slice";
import { useParams } from "react-router-dom";
import { displayProductDetail } from "../../../../slices/product-detail.slice";
import { UpdateProduct } from "../../../../slices/update-product.slice";
import env from "./../../../../../environment/env";

const AddProduct = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | any>('');
  const [uploadUrl, setUploadUrl] = useState<string>('');
  const { categories, isCategoryLoading } = useSelector((state: RootState) => state.category);
  const { product, isDetailloading } = useSelector((state: RootState) => state.product);

  const [categoryNames, setCategoryNames] = useState<string[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({}); // name -> id
  const [categoryId, setCategoryId] = useState<string>(''); // name -> id

  const dispatch = useDispatch();
  const { id: productId } = useParams<{ id?: string }>();
  const icons = imgsConstant.Icons;

  // Initial form state
  const [productFormData, setFormData] = useState<Partial<ProductDetailDTO>>({
    name: '',
    description: '',
    img: '',
    stock: 0,
    price: 0,
    category: '',
    model: '',
    colour: [],
    wlan: '',
    brand: '',
    platform: '',
    bluetooth: '',
    front_camera: '',
    rear_camera: '',
    weight: '',
    display: '',
    line: '',
    sim: '',
    battery: '',
    manufacturer: '',
    size: [],
    id: ''
    // Add other missing fields you use (sku, processor, etc.)
  });

  // Load categories + product detail on mount
  useEffect(() => {
    dispatch(displayCategories() as any);
    if (productId) {
      dispatch(displayProductDetail(productId) as any);
    }
  }, [dispatch, productId]);

  // Build category name list + name -> id map
  useEffect(() => {
    if (!categories?.length) return;

    const names: string[] = [];
    const map: Record<string, string> = {};

    categories.forEach((cat: CategoryDTO) => {
      if (cat.name) {
        names.push(cat.name);
        map[cat.name] = cat.id || '';
      }
    });

    setCategoryNames(names);
    setCategoryMap(map);
  }, [categories]);

  useEffect(() => {
    if (!product) return;

    setFormData({
      name: product.name ?? '',
      description: product.description ?? '',
      img: product.img ?? '',
      stock: product.stock ?? 0,
      price: product.price ?? 0,
      category: product.category ?? '',
      model: product.model ?? '',
      colour: Array.isArray(product.colour) ? product.colour : [],
      wlan: product.wlan ?? '',
      brand: product.brand ?? '',
      platform: product.platform ?? '',
      bluetooth: product.bluetooth ?? '',
      front_camera: product.front_camera ?? '',
      rear_camera: product.rear_camera ?? '',
      weight: product.weight ?? '',
      display: product.display ?? '',
      line: product.line ?? '',
      sim: product.sim ?? '',
      battery: product.battery ?? '',
      manufacturer: product.manufacturer ?? '',
      size: Array.isArray(product.size) ? product.size : [],
      id: product.id ?? ''
      // Add other fields as needed
    });

    // Set preview if there's an existing image URL
    if (product.img) {
      setPreview(product.img);
    }
  }, [product]);

  const handleClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    setFormData(prev => ({
    ...prev,
    img: file
  }));
  };

  // Unified change handler
  const handleChange = (name: string, value: any) => {
    setFormData(prev => {
      if (name === 'category') {
        const categoryId = categoryMap[value] || value;
        setCategoryId(categoryId);
        return { ...prev, [name]: value };
      }

      if (name === 'colour' || name === 'size') {
        let arr: string[] = [];
        if (typeof value === 'string') {
          arr = value
            .split(',')
            .map(item => item.trim())
            .filter(Boolean);
        } else if (Array.isArray(value)) {
          arr = value;
        }
        return { ...prev, [name]: arr };
      }

      return { ...prev, [name]: value };
    });
  };

  const submitData = () => {
    const form = new FormData();

    Object.entries(productFormData).forEach(([key, value]) => {
      if (key === 'img') {
        if (value instanceof File) {
          form.append(key, value, value.name);
        } else if (typeof value === 'string' && value) {
          form.append(key, value); // existing URL (edit mode)
        }
        return;
      }

      if (key === 'colour' || key === 'size') {
        const arr = Array.isArray(value) ? value : [];
        // Optional: clean size like "45 40" → separate entries
        const cleaned = key === 'size'
          ? arr.flatMap(item => item.includes(' ') ? item.split(' ').map((s:any) => s.trim()) : item)
          : arr;
        form.append(key, JSON.stringify([...new Set(cleaned.filter(Boolean))]));
        return;
      }
      if(key === 'category') {
        form.append(key, categoryId);
        return;
      }

      if (value !== undefined && value !== null) {
        form.append(key, String(value));
      }
      
    });
    if (productId) {
      dispatch(UpdateProduct(form) as any);
    } else {
      dispatch(CreateProduct(form) as any);
    }
  };

  return (
    <div className="add-container">
      <span className="add-title">{productId ? "Edit Product" : "Create Product"}</span>

      {/* Image Upload */}
      <div id="img" className="img-container" onClick={handleClick}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        {preview ? (
          <img src={ `${env.IMG_URL}/${preview}`} alt="Preview" className="preview" />
        ) : (
          <div className="upload">
            <img src={icons.UploadIcon} className="icon-upload" alt="" />
            <span className="upload-txt">Upload</span>
            <span className="txt">Click here to browse an image</span>
            <span className="txt">Supports: JPG, PNG, GIF</span>
          </div>
        )}
      </div>

      <div className="add-form-content">
        <span className="product-title">Product Information</span>

        {/* Example fields - make sure ALL InputField have value + onChange */}
        <div className="product-fields">
          <span className="field-detail">
            <span className="label">Product Name:</span>
            <InputField
              type="text"
              name="name"
              placeholder="Enter product name"
              onChange={handleChange}
              data={productFormData.name}           // ← important
            />
          </span>

          <span className="field-detail">
            <span className="label">Category:</span>
            <SelectField
              options={categoryNames}
              placeholder="Select a category"
              fieldName="category"
              onChange={handleChange}
              preSelectedValue={productFormData.category}
            />
          </span>

          <span className="field-detail">
            <span className="label">Size (comma separated):</span>
            <InputField
              type="text"
              name="size"
              placeholder="e.g. 6.1, 6.7"
              onChange={handleChange}
              data={Array.isArray(productFormData.size) ? productFormData.size.join(', ') : ''}
            />
          </span>
        </div>

        <div className="product-fields">
          <span className="field-detail">
            <span className="label">Price:</span>
            <InputField
              type="text"
              name="price"
              placeholder="Enter price"
              onChange={handleChange}
              data={productFormData.price}
            />
          </span>

          <span className="field-detail">
            <span className="label">Colour (comma separated):</span>
            <InputField
              type="text"
              name="colour"
              placeholder="e.g. Black, White, Blue"
              onChange={handleChange}
              data={Array.isArray(productFormData.colour) ? productFormData.colour.join(', ') : ''}
            />
          </span>

          <span className="field-detail">
            <span className="label">Quantity:</span>
            <InputField
              type="text"
              name="stock"
              placeholder="Enter quantity"
              onChange={handleChange}
              data={productFormData.stock}
            />
          </span>
          <span className="field-detail">
            <span className="label">SKU:</span>
            <InputField
              type="text"
              name="sku"
              placeholder="Enter SKU"
              onChange={handleChange}
              data={productFormData.stock}
            />
          </span>
        </div>

        <div className="product-fields">
          <span className="field-detail">
            <span className="label">Weight:</span>
            <InputField
              type="text"
              name="weight"
              placeholder="Enter price"
              onChange={handleChange}
              data={productFormData.weight}
            />
          </span>

          <span className="field-detail">
            <span className="label">WLAN:</span>
            <InputField
              type="text"
              name="wlan"
              placeholder="WLAN details"
              onChange={handleChange}
              data={productFormData.wlan}
             
            />
          </span>

          <span className="field-detail">
            <span className="label">Bluetooth:</span>
            <InputField
              type="text"
              name="bluetooth"
              placeholder="Bluetooth details"
              onChange={handleChange}
              data={productFormData.bluetooth}
            />
          </span>
          <span className="field-detail">
            <span className="label">Battery:</span>
            <InputField
              type="text"
              name="battery"
              placeholder="Battery capacity"
              onChange={handleChange}
              data={productFormData.battery}
            />
          </span>
        </div>
        
        <div className="product-fields">
          <span className="field-detail">
            <span className="label">Description:</span>
            <InputField
              type="textarea"
              name="description"
              placeholder="Enter Product Description"
              onChange={handleChange}
              data={productFormData.description}
            />
          </span>

          
        </div>
        {/* ... add the rest of your fields similarly ... */}
        <div className="product-fields">
          <span className="field-detail">
            <span className="label">Front Camera:</span>
            <InputField
              type="text"
              name="front_camera"
              placeholder="Enter Front Camera details"
              onChange={handleChange}
              data={productFormData.weight}
            />
          </span>

          <span className="field-detail">
            <span className="label">Rear Camera:</span>
            <InputField
              type="text"
              name="rear_camera"
              placeholder="Rear Camera details"
              onChange={handleChange}
              data={productFormData.wlan}
             
            />
          </span>

          <span className="field-detail">
            <span className="label">Platform:</span>
            <InputField
              type="text"
              name="platform"
              placeholder="Operating system details"
              onChange={handleChange}
              data={productFormData.bluetooth}
            />
          </span>
          <span className="field-detail">
            <span className="label">Memory:</span>
            <InputField
              type="text"
              name="memory"
              placeholder="Storage details"
              onChange={handleChange}
              data={productFormData.battery}
            />
          </span>
        </div>

        <div className="product-fields">
          <span className="field-detail">
            <span className="label">Design:</span>
            <InputField
              type="textarea"
              name="description"
              placeholder="Enter Product Design details"
              onChange={handleChange}
              data={productFormData.description}
            />
          </span>

          
        </div>
        <div className="button">
          <Button type="primary" handleClick={submitData} name={productId ? "Update" : "Submit"} />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
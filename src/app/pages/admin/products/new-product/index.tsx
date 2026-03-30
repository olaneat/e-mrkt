import React, {useEffect, useState, useRef} from "react";
import './style.scss'
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

const AddProduct =()=>{
  const currentImage:string = "";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const { categories, isCategoryLoading, categoryError } = useSelector((state: RootState) => state.category);
  const [categoryName, setCatName] = useState<string[]>()
  const dispatch = useDispatch();
  const icons = imgsConstant.Icons
  const [formData, setFormData] = useState<ProductDetailDTO>({
    name:'',
    description: '',
    img: '', 
    stock: 0,
    price: 0,
    category: '',
    model:'',
    colour: '',
    wlan: '',
    brand: '',
    platform: '',
    bluetooth:'',
    front_camera: '',
    rear_camera: '',
    weight: '',
    display: '',
    line: '',
    sim: '',
    battery: '',
    manufacturer: '',
    
    
  })
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('clicked me')
    const selectedFile:any = event.target.files![0]  ;
    let name = 'img'
    if (selectedFile) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
      getData(name, selectedFile)
      // Pass file to parent
    //   onImageUpload(file);
    }
  };
  useEffect(()=>{
    getCategories();

  },[])
  useEffect(()=>{
    let cat:string[]=[]
    categories?.map((x:CategoryDTO)=>{
      cat.push(x.name ?? "");
      setCatName(cat);
    })
  },[categories])
  const getCategories =()=>{
    dispatch(displayCategories() as any);
    
  } 
  const getData =(name:string, value:ProductDetailDTO)=>{
    let id:string = ""
    if(name=='category'){

        console.log(name, value, 'category name and value')
        categories?.find((x:any)=>{
            if(x.name==value.name){
                console.log(x.id, 'category id')
                id = x.id
            }
        })
        setFormData((prevState:any)=>({
        
        ...prevState,
        [name]:id
    }))
    }
    else if(name == 'size' || name == 'colour'){
      let jsonArray: string[] = [];
      let text = value as unknown as string
        console.log(text, 'is a', typeof(text))
        // Check if value is a string with commas
        if (typeof text === 'string' && text.includes(',')) {
            // Split by comma and trim whitespace
            jsonArray = text.split(',').map((item: string) => item.trim());
        } 
        // Check if value is already an array
        else if (Array.isArray(value)) {
            jsonArray = value;
        }
        // Handle single value
        else if (value) {
            jsonArray = [value.toString().trim()];
        }
        console.log(jsonArray, 'json array')
        setFormData((prevState: any) => ({
            ...prevState,
            [name]: jsonArray
        })); 
    }
     else if (name === 'img') {
        // Handle image file
        if (value instanceof File) {
            setFormData((prevState: any) => ({
                ...prevState,
                [name]: value // Store the File object directly
            }));
        }
    }
    else{
        setFormData((prevState:any)=>({
        
        ...prevState,
        [name]:value
    }))
    }
    
    // setFormData((prevState:any)=>({
    //     ...prevState,
    //     [name]:value
    // }))}


    console.log(formData, 'form data')
  }

  const submitData=()=>{
    const form = new FormData();
     const cleanedData = { ...formData };
    
    // Clean up size array if it exists
    if (cleanedData.size && Array.isArray(cleanedData.size)) {
        const cleanedSize: string[] = [];
        cleanedData.size.forEach((item: string) => {
            if (item.includes(' ')) {
                cleanedSize.push(...item.split(' ').map((part: string) => part.trim()));
            } else {
                cleanedSize.push(item.trim());
            }
        });
        cleanedData.size = [...new Set(cleanedSize.filter((item: string) => item !== ''))];
    }
    
    // Clean up colour array
    // if (cleanedData.colour && Array.isArray(cleanedData.colour)) {
    //     cleanedData.colour = [...new Set(cleanedData.colour.map((item: string) => item.trim()).filter((item: string) => item !== ''))];
    // }
    
    Object.entries(formData).forEach(([key, value]) => {
        // Handle colour and size arrays specially
        if (key === 'img') {
            if (value instanceof File) {
                // Append the actual file
                form.append(key, value, value.name);
            } else if (value && typeof value === 'object' && value !== null) {
                // If it's an object but not a File, stringify it
                form.append(key, JSON.stringify(value));
            } else if (value) {
                form.append(key, value.toString());
            }
        }
        if (key === 'colour' || key === 'size') {
            // Convert array to JSON string for FormData
            if (Array.isArray(value) && value.length > 0) {
                // Clean up the size array to handle "45 40" format
                if (key === 'size') {
                    const cleanedArray: string[] = [];
                    value.forEach((item: string) => {
                        if (item.includes(' ')) {
                            // Split "45 40" into separate items
                            cleanedArray.push(...item.split(' ').map((part: string) => part.trim()));
                        } else {
                            cleanedArray.push(item.trim());
                        }
                    });
                    // Remove duplicates
                    const uniqueArray = [...new Set(cleanedArray)];
                    form.append(key, JSON.stringify(uniqueArray));
                } else {
                    // For colour, just stringify the array
                    form.append(key, JSON.stringify(value));
                }
            } else {
                // If empty array, send empty JSON array
                form.append(key, JSON.stringify([]));
            }
        } 
        // Handle other fields
        else if (value !== undefined && value !== null && value !== '') {
            // For object values like img
            if (typeof value === 'object' && !(value instanceof File)) {
                form.append(key, JSON.stringify(value));
            } else {
                form.append(key, value.toString());
            }
        } else {
            // Send empty string for empty fields
            form.append(key, '');
        }
    });
    console.log(form, 'new form')
    dispatch(CreateProduct(form) as any)
  }
 
  return (
    <div className="add-container">
      <span className="add-title">Create Product</span>
        
      <div  id="img" className="img-container" onClick={handleClick}>
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        {preview ? (
        <img 
          src={preview} 
          alt="Preview" 
          className="preview"
        />
      ) : (
        <div className="upload">
          <img src={icons.UploadIcon} className="icon-upload" alt="" />
          <span className="upload-txt" >Upload</span>
          <span className="txt">Click to here browse an image</span>
          <span className="txt" >Supports: JPG, PNG, GIF</span>
        </div>
      )}
      </div>
      <div className="add-form-content">
        <span className="product-title">Product Information</span>
        <div className="product-fields">
          <span className="field-detail">
            <span className="label">Product Name:</span>
            <InputField 
                type="text"  
                className="field" 
                name="name"
                placeholder="Enter product name"
                onChange={getData}
            />
          </span>
            <span className="field-detail">
              <span className="label">Category:</span>
              <SelectField 
                options={categoryName ?? []}
                placeholder="Select a category"
                fieldName="category"
                onChange={getData}
                className="drop-down"
              />
            </span>
            <span className="field-detail">
            <span className="label">Size:</span>
            <InputField 
                type="text"  
                className="field" 
                name="size"
                placeholder="Enter sizes seperated by coma"
                onChange={getData}
            />
          </span>
        </div>
        <div className="product-fields">
          <span className="field-detail">
            <span className="label">Price:</span>
            <InputField 
                type="text"  
                className="field" 
                name="price"
                placeholder="Enter price"
                onChange={getData}

            />
          </span>
            <span className="field-detail">
              <span className="label">Colour:</span>
               <InputField 
                type="text"  
                className="field" 
                name="colour"
                placeholder="Enter colour seperated by comma"
                onChange={getData}

            />
            </span>
            <span className="field-detail">
              <span className="label">Quantity:</span>
               <InputField 
                type="text"  
                className="field" 
                name="stock"
                placeholder="Enter quantity"
                onChange={getData}

            />
            </span>
        
        </div>
        <div className="product-fields">
          <span className="field-detail">
            <span className="label">Wieght:</span>
            <InputField 
                type="text"  
                className="field" 
                name="weight"
                placeholder="Enter product Weight"
                onChange={getData}

            />
          </span>
            <span className="field-detail">
              <span className="label">Model:</span>
               <InputField 
                type="text"  
                className="field" 
                name="model"
                placeholder="Enter Product Model"
                onChange={getData}

            />
            </span>
            <span className="field-detail">
              <span className="label">Brand:</span>
               <InputField 
                type="text"  
                className="field" 
                name="brand"
                placeholder="Enter brand"
                onChange={getData}

            />
            </span>
        
        </div>
        <div className="product-fields">
          <span className="field-detail">
            <span className="label">Description:</span>
            <InputField 
              type="textarea"  
              className="field" 
              name="description"
              placeholder="Enter description"
              onChange={getData}

            />
          </span>
            
        
        </div>
        <div className="product-fields">
          <span className="field-detail">
            <span className="label">Platform:</span>
            <InputField 
                type="text"  
                className="field" 
                name="platform"
                placeholder="Enter plaform"
            />
          </span>
            <span className="field-detail">
              <span className="label">Battery capacity:</span>
               <InputField 
                type="text"  
                className="field" 
                name="battery"
                placeholder="Enter battery capacity"
            />
            </span>
            <span className="field-detail">
              <span className="label">Processor:</span>
               <InputField 
                type="text"  
                className="field" 
                name="processor"
                placeholder="Enter processor"
                onChange={getData}

            />
            </span>
        
        </div>
        <div className="product-fields">
          <span className="field-detail">
            <span className="label">SKU:</span>
            <InputField 
                type="text"  
                className="field" 
                name="sku"
                placeholder="Enter SKU"
                onChange={getData}

            />
          </span>
            <span className="field-detail">
              <span className="label">Storage capacity:</span>
               <InputField 
                type="text"  
                className="field" 
                name="sorage"
                placeholder="Enter internal storage capacity"
                onChange={getData}

            />
            </span>
            <span className="field-detail">
              <span className="label">RAM:</span>
               <InputField 
                type="text"  
                className="field" 
                name="memmory"
                placeholder="Enter RAM capacity"
                onChange={getData}

            />
            </span>
        
        </div>
        <div className="product-fields">
          <span className="field-detail">
            <span className="label">WLAN:</span>
            <InputField 
                type="text"  
                className="field" 
                name="wlan"
                placeholder="Enter Wlan detail"
                onChange={getData}

            />
          </span>
            <span className="field-detail">
              <span className="label">Rear Camera:</span>
               <InputField 
                type="text"  
                className="field" 
                name="rear_camera"
                placeholder="Enter rear camera details"
                onChange={getData}

            />
            </span>
            <span className="field-detail">
              <span className="label">Front Camera:</span>
               <InputField 
                type="text"  
                className="field" 
                name="front_camera"
                onChange={getData}
                placeholder="Enter Front camera details"
            />
            </span>
        
        </div>
        <div className="product-fields">
          <span className="field-detail">
            <span className="label">Bluetooth:</span>
            <InputField 
                type="text"  
                className="field" 
                name="bluetooh"
                placeholder="Enter Bluethooth info"
            />
          </span>
            <span className="field-detail">
              <span className="label">SIM:</span>
               <InputField 
                type="text"  
                className="field" 
                name="sim"
                placeholder="Enter SIM connectivty detail"
            />
            </span>
            {/* <span className="field-detail">
              <span className="label">RAM:</span>
               <InputField 
                type="text"  
                className="field" 
                name="memmory"
                placeholder="Enter RAM capacity"
            />
            </span> */}
        
        </div>

        <div className="button">
          <div className="btn">
            <Button type="primary" handleClick={submitData} name="Submit"/>

          </div>
        </div>
      </div>

    </div>
  )
}

export default AddProduct
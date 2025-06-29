import React, {useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {InputNumber} from 'primereact/inputnumber';
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';

interface ProductFormProps {
    initialData?: Partial<Product>;
    onSubmit: (product: Partial<Product>) => void;
    submitting: boolean;
}

const inventoryStatusOptions = [
    {label: 'In Stock', value: 'INSTOCK'},
    {label: 'Low Stock', value: 'LOWSTOCK'},
    {label: 'Out of Stock', value: 'OUTOFSTOCK'},
];

export interface Product {
    id?: number;
    code: string;
    name: string;
    description: string;
    image: string;
    category: string;
    price: number;
    quantity: number;
    internalReference: string;
    shellId: number;
    inventoryStatus: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
    rating: number;
    createdAt?: number;
    updatedAt?: number;
}

const ProductForm: React.FC<ProductFormProps> = ({initialData, onSubmit, submitting}) => {
    const [product, setProduct] = useState<Partial<Product>>(initialData || {
        code: '',
        name: '',
        description: '',
        image: '',
        category: '',
        price: 0,
        quantity: 0,
        internalReference: '',
        shellId: 0,
        inventoryStatus: 'INSTOCK',
        rating: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setProduct(prev => ({...prev, [name]: value}));
    };

    const handleNumberChange = (name: keyof Product, value: number) => {
        setProduct(prev => ({...prev, [name]: value}));
    };

    const handleDropdownChange = (e: any) => {
        setProduct(prev => ({...prev, inventoryStatus: e.value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(product);
    };

    return (
        <form onSubmit={handleSubmit} className="p-fluid p-formgrid p-grid" style={{maxWidth: '700px'}}>
            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="code">Code</label>
                <InputText id="code" name="code" value={product.code} onChange={handleChange} required/>
            </div>

            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="name">Name</label>
                <InputText id="name" name="name" value={product.name} onChange={handleChange} required/>
            </div>

            <div className="p-field p-col-12">
                <label htmlFor="description">Description</label>
                <InputText id="description" name="description" value={product.description} onChange={handleChange}/>
            </div>

            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="image">Image URL</label>
                <InputText id="image" name="image" value={product.image} onChange={handleChange}/>
            </div>

            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="category">Category</label>
                <InputText id="category" name="category" value={product.category} onChange={handleChange}/>
            </div>

            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="price">Price</label>
                <InputNumber id="price" name="price" value={product.price}
                             onValueChange={(e) => handleNumberChange('price', e.value || 0)} mode="currency"
                             currency="USD" locale="en-US"/>
            </div>

            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="quantity">Quantity</label>
                <InputNumber id="quantity" name="quantity" value={product.quantity}
                             onValueChange={(e) => handleNumberChange('quantity', e.value || 0)}/>
            </div>

            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="internalReference">Internal Reference</label>
                <InputText id="internalReference" name="internalReference" value={product.internalReference}
                           onChange={handleChange}/>
            </div>

            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="shellId">Shell ID</label>
                <InputNumber id="shellId" name="shellId" value={product.shellId}
                             onValueChange={(e) => handleNumberChange('shellId', e.value || 0)}/>
            </div>

            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="inventoryStatus">Inventory Status</label>
                <Dropdown id="inventoryStatus" value={product.inventoryStatus} options={inventoryStatusOptions}
                          onChange={handleDropdownChange} placeholder="Select Status"/>
            </div>

            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="rating">Rating</label>
                <InputNumber id="rating" name="rating" value={product.rating}
                             onValueChange={(e) => handleNumberChange('rating', e.value || 0)} min={0} max={5}/>
            </div>

            <div className="p-col-12 p-text-right">
                <Button label="Save" type="submit" disabled={submitting}/>
            </div>
        </form>
    );
};

export default ProductForm;

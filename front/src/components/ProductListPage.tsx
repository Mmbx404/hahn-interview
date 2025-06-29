import {useEffect, useState} from 'react';
import {deleteProduct, getProducts} from '../api/productApi';
import Navbar from '../components/Navbar';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {useNavigate} from 'react-router-dom';

interface Product {
    id: number;
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
    createdAt: number;
    updatedAt: number;
}

const ProductListPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const res = await getProducts();
            setProducts(res.data);
        } catch (error) {
            console.error('Failed to fetch products', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                fetchProducts();
            } catch (error) {
                console.error('Delete failed', error);
            }
        }
    };

    const actionBodyTemplate = (rowData: Product) => (
        <>
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-text p-button-info p-mr-2"
                    onClick={() => navigate(`/products/edit/${rowData.id}`)}/>
            <Button icon="pi pi-trash" className="p-button-rounded p-button-text p-button-danger"
                    onClick={() => handleDelete(rowData.id)}/>
        </>
    );

    return (
        <div>
            <Navbar/>
            <div className="p-m-4">
                <h2>Product List</h2>
                <DataTable value={products} responsiveLayout="scroll" paginator rows={10}
                           emptyMessage="No products found">
                    <Column field="code" header="Code"/>
                    <Column field="name" header="Name"/>
                    <Column field="category" header="Category"/>
                    <Column field="price" header="Price" body={(row) => `$${row.price.toFixed(2)}`}/>
                    <Column field="inventoryStatus" header="Stock Status"/>
                    <Column body={actionBodyTemplate} header="Actions" style={{minWidth: '120px'}}/>
                </DataTable>
            </div>
        </div>
    );
};

export default ProductListPage;

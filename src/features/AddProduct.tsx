import appwriteService from '@/appwrite/config'
import AddProductNameDescriptionBrand from '@/widgets/AddProductNameDescriptionBrand'
import { Button } from '@nextui-org/react'
import { ID } from 'appwrite'
import React from 'react'
import { v4 } from 'uuid'

const AddProduct = () => {
    const [createProduct, setCreateProduct] = React.useState(false)
    const [isCreatingProduct, setIsCreatingProduct] = React.useState(false);
    const productID = v4()
    const createProductHandler = async () => {
        try {

            setIsCreatingProduct(true)
            const seller = await appwriteService.getUserData()
            const res = await appwriteService.addProduct(
                { product_id: productID, seller_id: seller.$id, name: "", description: "", category_id: "", sub_category_id: "", brand: "", sku: "", quantity: 0, price: "", sale_price: "", main_image: "", additional_images: [], size: "", color: "", material: "", style: "", packaging: "", features: "", warranty: "", return_policy: true, health_safety: "" }
            );
            console.log(res)
            setIsCreatingProduct(false)
            setCreateProduct(true)
            if (localStorage.getItem('productID') != '') {
                const res = await appwriteService.deleteProduct({ product_id: localStorage.getItem('productID') as ID })
                localStorage.setItem('productID', '')
                console.log(res)
            }
            localStorage.setItem('productID', productID)
        } catch (error) {
            console.log(error)
        } finally {
            setIsCreatingProduct(false)
        }
    }
    return (
        <div className='w-full max-h-[90vh] flex flex-wrap'>
            {
                !createProduct && <div className="w-max-[50px]">
                    {!isCreatingProduct ? <Button
                        color="secondary"
                        hidden={isCreatingProduct}
                        onClick={createProductHandler}
                    >
                        Add Product
                    </Button> :
                        <Button
                            isLoading
                            color="secondary"
                            hidden={!isCreatingProduct}
                            spinner={
                                <svg
                                    className="animate-spin h-5 w-5 text-current"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        fill="currentColor"
                                    />
                                </svg>
                            }
                        >
                            Wait...
                        </Button>}
                </div>}
            {createProduct &&
                <>
                    <AddProductNameDescriptionBrand productID={productID} />
                    <AddProductNameDescriptionBrand productID={productID} />

                </>
            }
        </div>
    )
}

export default AddProduct
import appwriteService from '@/appwrite/config'
import { Button, Card, CardBody, CardFooter, Input, Textarea } from '@nextui-org/react'
import React from 'react'

const AddProductNameDescriptionBrand = ({ productID }: any) => {
    const [data, setData] = React.useState<any>({
        name: "",
        description: "",
        brand: "",
    })
    const [isNotSaved, setIsNotSaved] = React.useState(true)
    const [isSaving, setIsSaving] = React.useState(false)
    const [isEdit, setIsEdit] = React.useState(false)
    const saveProductHandler = async () => {
        try {
            setIsNotSaved(true)
            console.log(productID)
            setIsSaving(true)
            const res = await appwriteService.updateProductNameDescriptionBrand({
                product_id: productID,
                name: data.name,
                description: data.description,
                brand: data.brand,
            })
            console.log(res)
            setIsSaving(false)
            setIsNotSaved(false)
            // setIsEdit(true)
        } catch (error) {
            console.log(error)
        } finally {
            setIsSaving(false)
            // setIsNotSaved(true)
        }
    }
    return (
        <Card
            style={{
                minWidth: '480px',
            }}
        >
            {isNotSaved === true ? <CardBody className='gap-2'>
                <Input
                    isDisabled={!isNotSaved}
                    label="Product Name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <Textarea
                    isDisabled={!isNotSaved}
                    label="Product Description"
                    maxLength={200}
                    maxRows={10}
                    value={data.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                />
                <Input
                    isDisabled={!isNotSaved}
                    label="Product Brand"
                    value={data.brand}
                    onChange={(e) => setData({ ...data, brand: e.target.value })}
                />
            </CardBody> : <CardBody className='gap-2'>
            </CardBody>}
            <CardFooter>
                <div className="flex justify-end">
                    {isNotSaved === true ? <Button
                        isDisabled={isSaving}
                        className='btn btn-primary'
                        onClick={saveProductHandler}
                    >
                        {isSaving ? "Saving..." : "Save"}
                    </Button> :
                        <Button
                            className='btn btn-primary'
                            onClick={() => setIsNotSaved(true)}
                        >
                            Edit
                        </Button>}
                </div>
            </CardFooter>
        </Card>
    )
}

export default AddProductNameDescriptionBrand
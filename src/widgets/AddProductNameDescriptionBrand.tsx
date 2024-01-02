import appwriteService from '@/appwrite/config'
import { Button, Card, CardBody, CardFooter, Input, Textarea } from '@nextui-org/react'
import React from 'react'

const AddProductNameDescriptionBrand = ({ productID }: any) => {
    const [data, setData] = React.useState<any>({
        name: "",
        description: "",
        brand: "",
    })
    const [isSaved, setIsSaved] = React.useState(false)
    const [isSaving, setIsSaving] = React.useState(false)
    const saveProductHandler = async () => {
        try {
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
            setIsSaved(true)
        } catch (error) {
            console.log(error)
        } finally {
            setIsSaving(false)
        }
    }
    return (
        <Card
            style={{
                minWidth: '480px',
            }}
        >
            <CardBody className='gap-2'>
                <Input
                    isDisabled={isSaved}
                    label="Product Name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <Textarea
                    isDisabled={isSaved}
                    label="Product Description"
                    maxLength={200}
                    maxRows={10}
                    value={data.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                />
                <Input
                    isDisabled={isSaved}
                    label="Product Brand"
                    value={data.brand}
                    onChange={(e) => setData({ ...data, brand: e.target.value })}
                />
            </CardBody>
            <CardFooter>
                <div className="flex justify-end">
                    {!isSaved ? <Button
                        className='btn btn-primary'
                        onClick={saveProductHandler}
                    >
                        Save
                    </Button> :
                        <Button
                            className='btn btn-primary'
                            hidden={!isSaving}
                        >
                            Saving...
                        </Button>}
                </div>
            </CardFooter>
        </Card>
    )
}

export default AddProductNameDescriptionBrand
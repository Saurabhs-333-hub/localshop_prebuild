import { Card, CardBody, Input, Textarea } from '@nextui-org/react'
import React from 'react'

const AddProductNameDescriptionBrand = ({ productID }: any) => {
    const [data, setData] = React.useState<any>({
        name: "",
        description: "",
        brand: "",
    })
    return (
        <Card
            style={{
                height: '90vh',
                overflow: 'scroll',
                width: '100%',
            }}
        >
            <CardBody className='w-full gap-2'>
                <Input
                    label="Product Name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <Textarea
                    label="Product Description"
                    maxLength={200}
                    maxRows={10}
                    value={data.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                />
                <Input
                    label="Product Brand"
                    value={data.brand}
                    onChange={(e) => setData({ ...data, brand: e.target.value })}
                />
            </CardBody>
        </Card>
    )
}

export default AddProductNameDescriptionBrand
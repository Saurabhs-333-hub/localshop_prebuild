'use client'
import { Avatar, Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Popover, PopoverContent, PopoverTrigger, ScrollShadow, Tab, Tabs } from '@nextui-org/react'
import React from 'react'
import { TbSquareRoundedPlus } from "react-icons/tb";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { MdOutlineInsights } from "react-icons/md";
import AddProduct from '@/features/AddProduct';


const Dashboard = () => {
    const [selected, setSelected] = React.useState("addproduct");
    return (
        <>
            <div className="flex w-full items-center flex-col">
                <Tabs aria-label="Options"
                className='w-full'
                    selectedKey={selected}
                    onSelectionChange={(e) => setSelected(e.toString())} color="secondary" variant="bordered">
                    <Tab
                        key="addproduct"
                        className='w-full'
                        title={
                            <div className="flex items-center space-x-2">
                                <span className='text-2xl'><TbSquareRoundedPlus /></span>
                                <span className='text-medium'>Add Product</span>
                            </div>
                        }
                    >
                        <AddProduct />
                    </Tab>
                    <Tab
                        key="insights"
                        title={
                            <div className="flex items-center space-x-2">
                                <span className='text-2xl'><MdOutlineInsights /></span>
                                <span className='text-medium'>Insights</span>
                            </div>
                        }
                    >
                        <Card className='m-5'>
                            <CardBody>
                                <ScrollShadow hideScrollBar className="max-h-[74vh]">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </ScrollShadow>
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}

export default Dashboard
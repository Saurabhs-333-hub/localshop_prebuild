import React, { useEffect } from 'react'
import shopCategories from "@/json/shopCategories.json";
import bankstates from "@/json/states.json";
import { ModalContent, Modal, ModalHeader, ModalBody, ModalFooter, Input, Select, SelectItem, Divider, Accordion, AccordionItem, useDisclosure, Button } from '@nextui-org/react';
import { validate,fetchDetails } from "ifsc";

const SellerRegistration = ({ showModal = false }) => {
    const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure()
    useEffect(() => {
        if (showModal) {
            onOpen()
        }
    })
    return (
        <div><Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            size="5xl"
            scrollBehavior="outside"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Register Your Shop</ModalHeader>
                        <ModalBody >
                            <form className="flex flex-col gap-1">
                                <section className="flex flex-wrap gap-1">
                                    <Input autoFocus
                                        isRequired
                                        className="max-w-xs"
                                        label="Shop Name"
                                        variant="flat" />
                                    <Select className="max-w-xs" isRequired label="Choose shop category">
                                        {
                                            shopCategories.map((category) => {
                                                return <SelectItem value={category.name} key={category.id}>{category.name}</SelectItem>
                                            })
                                        }
                                    </Select>

                                    <Input className="max-w-xs" label="Shop Address" isRequired variant="flat" />
                                    <Input className="max-w-xs" label="Shop Description" isRequired variant="flat" />
                                    <Input className="max-w-xs" type="number" isRequired label="Shop Phone" variant="flat" />
                                    <Input className="max-w-xs" label="Shop Email" variant="flat" />
                                    <Input className="max-w-xs" label="GSTIN Number" description="USE 22AAAAA0000A1Z5 FORMAT" isRequired variant="flat" />
                                    <Input className="max-w-xs" label="PAN Number" description="USE AAAAA0000A FORMAT" isRequired variant="flat" />
                                    <Input className="max-w-xs" label="Aadhar Number" description="USE 0000 0000 0000 FORMAT" isRequired variant="flat" />
                                    <Input className="max-w-xs" label="Bank Account Number" description="USE 0000 0000 0000 FORMAT" isRequired variant="flat" />
                                    <Input className="max-w-xs" label="IFSC Code" description="USE 0000 0000 0000 FORMAT" onChange={()=>{

                                    }} isRequired variant="flat" />
                                    <Input className="max-w-xs" label="Bank Name" isDisabled variant="flat" />
                                    <Input className="max-w-xs" label="Bank Branch" isDisabled variant="flat" />
                                    <Input className="max-w-xs" label="Bank Address" isDisabled variant="flat" />
                                    <Input className="max-w-xs" label="Bank City" isDisabled variant="flat" />
                                    <Select className="max-w-xs" disabled label="Choose bank state">
                                        {
                                            bankstates.states.map((category) => {
                                                return <SelectItem value={category.name} key={category.id}>{category.name}</SelectItem>
                                            })
                                        }
                                    </Select>
                                    <Input className="max-w-xs" label="Bank Pincode" isDisabled variant="flat" />
                                    <Input className="max-w-xs" label="Bank Phone" isDisabled variant="flat" />
                                    <Input className="max-w-xs" label="Bank Email" isDisabled variant="flat" />
                                    <Input className="max-w-xs" label="Bank Website" isDisabled variant="flat" />

                                </section>
                                <Divider />
                                <ModalHeader>
                                    Extra Details
                                </ModalHeader>
                                <Accordion
                                // className="flex flex-wrap gap-1"
                                >
                                    <AccordionItem
                                        key={"social media"}
                                        title="Social Media(Not Required)"
                                    >
                                        <section className="flex flex-wrap gap-1">
                                            <Input className="max-w-xs" type="url" label="Shop Website" variant="flat" />
                                            <Input className="max-w-xs" type="url" label="Shop Facebook" variant="flat" />
                                            <Input className="max-w-xs" type="url" label="Shop Twitter" variant="flat" />
                                            <Input className="max-w-xs" type="url" label="Shop Instagram" variant="flat" />
                                            <Input className="max-w-xs" type="url" label="Shop Youtube" variant="flat" />
                                            <Input className="max-w-xs" type="url" label="Shop Whatsapp" variant="flat" />
                                        </section>
                                    </AccordionItem>
                                </Accordion>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Action
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal></div>
    )
}

export default SellerRegistration
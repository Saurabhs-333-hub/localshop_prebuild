'use client'
import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, useDisclosure, ModalContent, Modal, ModalHeader, ModalBody, ModalFooter, Input, Select, SelectItem, Divider, Accordion, AccordionItem } from "@nextui-org/react";
import appwriteService from "@/appwrite/config";
import { useParams, useRouter } from "next/navigation";
import { Models } from "appwrite";
import useAuth from "@/context/useAuth";
import Modals from "@/widgets/Modal";
import shopCategories from "@/json/shopCategories.json";
import bankstates from "@/json/states.json";
// import { } from "module";



export default function Header() {
    const [user, setUser] = useState<Models.Document>()
    const [loader, setLoader] = React.useState(false)
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const router = useRouter()
    const { authStatus } = useAuth()
    const params = useParams()
    const handleLogout = async () => {
        setLoader(true)
        router.replace('/auth/logout')
        setLoader(false)
    }
    useEffect(() => {
        (async () => {
            try {


                const res = await appwriteService.getUserData()
                setUser(res)
                console.log(res.profilePic)
            } catch (error) {

                return <Modals headerColor={'text-red-600'} footerColor={'bg-transparent'} bodyColor={"text-red-200"} action={false} title={"Oo...Oh!"} text={error} />
            }
        })()
    }, [])
    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    const [isuser, setIsUser] = useState(false)
    const [active, setActive] = useState(false)
    useEffect(() => {
        (async () => {
            const res = await appwriteService.isLoggedIn();
            setIsUser(res);
        })()
    },
    )
    const { onOpen, onClose, isOpen, onOpenChange } = useDisclosure()
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}>
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
            />
            <NavbarBrand>
                {/* <AcmeLogo /> */}
                <p className="font-bold text-inherit">LOCALSHOP</p>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <Dropdown>
                    <NavbarItem>
                        <DropdownTrigger>
                            <Button
                                disableRipple
                                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                                // endContent={icons.chevron}
                                radius="sm"
                                variant="light"
                            >
                                Men
                            </Button>
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu
                        aria-label="ACME features"
                        className="w-[340px]"
                        itemClasses={{
                            base: "gap-4",
                        }}
                    >
                        <DropdownItem
                            key="autoscaling"
                            description="ACME scales apps to meet user demand, automagically, based on load."
                        // startContent={icons.scale}
                        >
                            Autoscaling
                        </DropdownItem>
                        <DropdownItem
                            key="usage_metrics"
                            description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
                        // startContent={icons.activity}
                        >
                            Usage Metrics
                        </DropdownItem>
                        <DropdownItem
                            key="production_ready"
                            description="ACME runs on ACME, join us and others serving requests at web scale."
                        // startContent={icons.flash}
                        >
                            Production Ready
                        </DropdownItem>
                        <DropdownItem
                            key="99_uptime"
                            description="Applications stay on the grid with high availability and high uptime guarantees."
                        // startContent={icons.server}
                        >
                            +99% Uptime
                        </DropdownItem>
                        <DropdownItem
                            key="supreme_support"
                            description="Overcome any challenge with a supporting team ready to respond."
                        // startContent={icons.user}
                        >
                            +Supreme Support
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <NavbarItem isActive>
                    <Button disableRipple
                        className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                        // endContent={icons.chevron}
                        radius="sm"
                        variant="light">
                        Women
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button disableRipple
                        className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                        // endContent={icons.chevron}
                        radius="sm"
                        variant="light">
                        Sale
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>


                <NavbarMenuItem isActive>
                    <Button fullWidth>
                        Women
                    </Button>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Button color="default" fullWidth >
                        Sale
                    </Button>
                </NavbarMenuItem>


            </NavbarMenu>
            {authStatus == false || isuser == null || user == null ? <NavbarContent justify="end"> <NavbarItem>
                <Button color="primary" onClick={() => {
                    router.push('/auth/login')
                }} variant="flat">
                    Login
                </Button>
            </NavbarItem>
            </NavbarContent>
                : <NavbarContent as="div" justify="end">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Jason Hughes"
                                size="sm"
                                src={user!.profilePic}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <div className="flex">
                                    <p className="font-semibold text-purple-500">{user!.name}</p>
                                    <p className="font-semibold text-purple-500 m-auto uppercase">{user!.countryName}</p>

                                </div>
                            </DropdownItem>
                            <DropdownItem key="selleraccount" className='text-success' color='success' onClick={onOpen}>Seller Account</DropdownItem>
                            <DropdownItem key="settings" showDivider>Settings</DropdownItem>
                            <DropdownItem key="system">System</DropdownItem>
                            <DropdownItem key="configurations">Configurations</DropdownItem>
                            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                            <DropdownItem description="This will logout you!" onClick={handleLogout} className='text-danger' color='danger'>Logout</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                size="5xl"
                scrollBehavior="outside"
                placement="auto"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Register Your Shop</ModalHeader>
                            <ModalBody >
                                <form>
                                    <Accordion variant="bordered" defaultExpandedKeys={["shop details"]} motionProps={{
                                        variants: {
                                            enter: {
                                                y: 0,
                                                opacity: 1,
                                                height: "auto",
                                                transition: {
                                                    height: {
                                                        type: "spring",
                                                        stiffness: 500,
                                                        damping: 30,
                                                        duration: 1,
                                                    },
                                                    opacity: {
                                                        easings: "ease",
                                                        duration: 1,
                                                    },
                                                },
                                            },
                                            exit: {
                                                y: -10,
                                                opacity: 0,
                                                height: 0,
                                                transition: {
                                                    height: {
                                                        easings: "ease",
                                                        duration: 0.25,
                                                    },
                                                    opacity: {
                                                        easings: "ease",
                                                        duration: 0.3,
                                                    },
                                                },
                                            },
                                        },
                                    }}>
                                        <AccordionItem
                                            key={"shop details"}
                                            title={"Shop Details"}
                                        >
                                            <section className="flex flex-wrap gap-1 justify-center items-center">
                                                <Input
                                                    isRequired
                                                    className="max-w-md"
                                                    label="Shop Name"
                                                    variant="flat" />
                                                <Select className="max-w-md" isRequired label="Choose shop category">
                                                    {
                                                        shopCategories.map((category) => {
                                                            return <SelectItem value={category.name} key={category.id}>{category.name}</SelectItem>
                                                        })
                                                    }
                                                </Select>

                                                <Input className="max-w-md" label="Shop Address" isRequired variant="flat" />
                                                <Input className="max-w-md" label="Shop Description" isRequired variant="flat" />
                                                <Input className="max-w-md" type="number" isRequired label="Shop Phone" variant="flat" />
                                                <Input className="max-w-md" label="Shop Email" variant="flat" />
                                                <Accordion variant="bordered" defaultExpandedKeys={"important details"} motionProps={{
                                                    variants: {
                                                        enter: {
                                                            y: 0,
                                                            opacity: 1,
                                                            height: "auto",
                                                            transition: {
                                                                height: {
                                                                    type: "spring",
                                                                    stiffness: 500,
                                                                    damping: 30,
                                                                    duration: 1,
                                                                },
                                                                opacity: {
                                                                    easings: "ease",
                                                                    duration: 1,
                                                                },
                                                            },
                                                        },
                                                        exit: {
                                                            y: -10,
                                                            opacity: 0,
                                                            height: 0,
                                                            transition: {
                                                                height: {
                                                                    easings: "ease",
                                                                    duration: 0.25,
                                                                },
                                                                opacity: {
                                                                    easings: "ease",
                                                                    duration: 0.3,
                                                                },
                                                            },
                                                        },
                                                    },
                                                }}>
                                                    <AccordionItem key={"important details"} title={"Important Details"}>
                                                        <Input className="max-w-full" label="GSTIN Number" description="USE 22AAAAA0000A1Z5 FORMAT" isRequired variant="flat" />
                                                        <Input className="max-w-full" label="PAN Number" description="USE AAAAA0000A FORMAT" isRequired variant="flat" />
                                                        <Input className="max-w-full" label="Aadhar Number" description="USE 0000 0000 0000 FORMAT" isRequired variant="flat" />
                                                    </AccordionItem>
                                                </Accordion>
                                            </section>
                                        </AccordionItem>
                                        <AccordionItem key={"bank details"} title={"Bank Details"}>
                                            <section className="flex flex-wrap gap-1 justify-center items-center">

                                                <Input className="max-w-md" label="Bank Account Number" description="USE 0000 0000 0000 FORMAT" isRequired variant="flat" />
                                                <Input className="max-w-md" label="IFSC Code" description="USE 0000 0000 0000 FORMAT" onChange={() => {
                                                }} isRequired variant="flat" />
                                                <Input className="max-w-md" label="Bank Name" isDisabled variant="flat" />
                                                <Input className="max-w-md" label="Bank Branch" isDisabled variant="flat" />
                                                <Input className="max-w-md" label="Bank Address" isDisabled variant="flat" />
                                                <Input className="max-w-md" label="Bank City" isDisabled variant="flat" />
                                                <Select className="max-w-md" disabled label="Choose bank state">
                                                    {
                                                        bankstates.states.map((category) => {
                                                            return <SelectItem value={category.name} key={category.id}>{category.name}</SelectItem>
                                                        })
                                                    }
                                                </Select>
                                                <Input className="max-w-md" label="Bank Pincode" isDisabled variant="flat" />
                                                <Input className="max-w-md" label="Bank Phone" isDisabled variant="flat" />
                                                <Input className="max-w-md" label="Bank Email" isDisabled variant="flat" />
                                                <Input className="max-w-md" label="Bank Website" isDisabled variant="flat" />
                                            </section>
                                        </AccordionItem>

                                        <AccordionItem
                                            key={"social media"}
                                            title="Social Media(Not Required)"
                                        >
                                            <section className="flex flex-wrap gap-1 justify-center items-center">
                                                <Input className="max-w-md" type="url" label="Shop Website" variant="flat" />
                                                <Input className="max-w-md" type="url" label="Shop Facebook" variant="flat" />
                                                <Input className="max-w-md" type="url" label="Shop Twitter" variant="flat" />
                                                <Input className="max-w-md" type="url" label="Shop Instagram" variant="flat" />
                                                <Input className="max-w-md" type="url" label="Shop Youtube" variant="flat" />
                                                <Input className="max-w-md" type="url" label="Shop Whatsapp" variant="flat" />
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
            </Modal>
        </Navbar>
    );
}

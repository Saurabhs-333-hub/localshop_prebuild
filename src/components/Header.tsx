'use client'
import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, useDisclosure, ModalContent, Modal, ModalHeader, ModalBody, ModalFooter, Input, Select, SelectItem, Divider } from "@nextui-org/react";
import appwriteService from "@/appwrite/config";
import { useParams, useRouter } from "next/navigation";
import { Models } from "appwrite";
import useAuth from "@/context/useAuth";
import Modals from "@/widgets/Modal";
import shopCategories from "@/json/shopCategories.json";


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
                                        <Input className="max-w-xs" label="GSTIN Number" isRequired variant="flat" />
                                    </section>
                                    <Divider />
                                    <ModalHeader>
                                        Social Media (not required)
                                    </ModalHeader>
                                    <section className="flex flex-wrap gap-1">
                                        <Input className="max-w-xs" type="url" label="Shop Website" variant="flat" />
                                        <Input className="max-w-xs" type="url" label="Shop Facebook" variant="flat" />
                                        <Input className="max-w-xs" type="url" label="Shop Twitter" variant="flat" />
                                        <Input className="max-w-xs" type="url" label="Shop Instagram" variant="flat" />
                                        <Input className="max-w-xs" type="url" label="Shop Youtube" variant="flat" />
                                        <Input className="max-w-xs" type="url" label="Shop Whatsapp" variant="flat" />
                                    </section>
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

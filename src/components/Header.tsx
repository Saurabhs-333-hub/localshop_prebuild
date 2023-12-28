'use client'
import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, useDisclosure, ModalContent, Modal, ModalHeader, ModalBody, ModalFooter, Input, Select, SelectItem, Divider, Accordion, AccordionItem } from "@nextui-org/react";
import appwriteService from "@/appwrite/config";
import { redirect, useParams, useRouter } from "next/navigation";
import { Models } from "appwrite";
import useAuth from "@/context/useAuth";
import Modals from "@/widgets/Modal";
import shopCategories from "@/json/shopCategories.json";
import bankstates from "@/json/states.json";
import axios from "axios";
import { errorComponentsExtractor } from "@/json/methods";



export default function Header() {
    const [user, setUser] = useState<Models.Document>()
    const [loader, setLoader] = React.useState(false)
    const [errorTitle, setErrorTitle] = React.useState('')
    const [errorDescription, setErrorDescription] = React.useState('')
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [invalidDetails, setInvalidDetails] = React.useState(true)
    const [formData, setformData] = React.useState({
        shopName: "",
        shopCategory: "",
        shopAddress: "",
        shopDescription: "",
        shopPhone: "",
        shopEmail: "",
        gstinNumber: "",
        panNumber: "",
        aadharNumber: "",
        bankAccountNumber: "",
        ifscCode: "",
        bankName: "",
        bankBranch: "",
        bankAddress: "",
        bankCity: "",
        bankState: "",
        bankCode: "",
        bankPhone: "",
        bankEmail: "",
        bankWebsite: "",
        shopWebsite: "",
        shopFacebook: "",
        shopTwitter: "",
        shopInstagram: "",
        shopYoutube: "",
        shopWhatsapp: ""
    })
    const handleInputChange = (fieldName: string, value: string) => {
        setformData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const handleSelectChange = (fieldName: string, value: string) => {
        setformData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const registerShop = async () => {
        try {
            if (formData.aadharNumber.length === 16 && formData.panNumber.length === 10 && formData.gstinNumber.length === 15 &&
                formData.bankAccountNumber.length > 8 && formData.ifscCode.length > 6 && formData.shopName !== '' &&
                formData.shopCategory !== '' && formData.shopAddress !== '' && formData.shopDescription !== '' && formData.shopPhone.length > 8
            ) {
                if (isUserHasShop) {
                    setErrorTitle('Already Registered')
                    setErrorDescription('You have already registered your shop')
                } else {
                    setLoader(true)
                    const res = await appwriteService.registerShop(formData)
                    setLoader(false)
                    onClose()
                    redirect('/dashboard')
                    console.log(res)
                }
            } else {
                setErrorTitle('Invalid Details')
                setErrorDescription('Please check your details again')
            }
        } catch (error: any) {
            console.log(error)
            const { title, description } = errorComponentsExtractor(error.message)
            setErrorTitle(title)
            setErrorDescription(description)
        } finally {
            setLoader(false)
        }
    }
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
    const [isUserHasShop, setIsUserHasShop] = useState(false)

    const [active, setActive] = useState(false)
    useEffect(() => {
        (async () => {
            try {
                const res = await appwriteService.isLoggedIn();
                setIsUser(res);
                const response = await appwriteService.getShop();
                setIsUserHasShop(response);
            } catch (error) {
                setIsUserHasShop(false);
            }
        })()
    }, []
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
                            {isUserHasShop ? <DropdownItem key="dashboard" className='text-success' color='success' onClick={() => {
                                router.push('/dashboard')
                            }}>Dash Board</DropdownItem> : <DropdownItem key="selleraccount" className='text-success' color='success' onClick={onOpen}>Become a Seller! 💰</DropdownItem>}
                            <DropdownItem key="settings" showDivider>Settings</DropdownItem>
                            <DropdownItem key="system">System</DropdownItem>
                            <DropdownItem key="configurations">Configurations</DropdownItem>
                            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                            <DropdownItem description="This will logout you!" onClick={handleLogout} className='text-danger' color='danger'>Logout</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>}
            <Modal
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                size="5xl"
                scrollBehavior="outside"
                placement="auto"
            >
                <ModalContent>
                    {(onClose) => (
                        <><form>
                            <ModalHeader className="flex flex-col gap-1">Register Your Shop</ModalHeader>
                            <ModalBody >

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
                                                className="max-w-md" onChange={(e) => handleInputChange("shopName", e.target.value)} value={formData.shopName}
                                                label="Shop Name"
                                                variant="flat" />
                                            <Select className="max-w-md" value={formData.shopCategory}
                                                isRequired label="Choose shop category" placeholder={formData.shopCategory}>
                                                {
                                                    shopCategories.map((category) => {
                                                        return <SelectItem onClick={(e) => handleSelectChange("shopCategory", category.name)} value={category.name} key={category.id}>{category.name}</SelectItem>
                                                    })
                                                }
                                            </Select>

                                            <Input className="max-w-md" onChange={(e) => handleInputChange("shopAddress", e.target.value)} value={formData.shopAddress} label="Shop Address" isRequired variant="flat" />
                                            <Input className="max-w-md" onChange={(e) => handleInputChange("shopDescription", e.target.value)} value={formData.shopDescription} label="Shop Description" isRequired variant="flat" />
                                            <Input className="max-w-md" onChange={(e) => handleInputChange("shopPhone", e.target.value)} value={formData.shopPhone} type="number" isRequired label="Shop Phone" variant="flat" />
                                            <Input className="max-w-md" onChange={(e) => handleInputChange("shopEmail", e.target.value)} value={formData.shopEmail} label="Shop Email" variant="flat" />
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
                                                    <Input className="max-w-full" onChange={(e) => handleInputChange("gstinNumber", e.target.value)} value={formData.gstinNumber} label="GSTIN Number" description="USE 22AAAAA0000A1Z5 FORMAT" isRequired variant="flat" />
                                                    <Input className="max-w-full" onChange={(e) => handleInputChange("panNumber", e.target.value)} value={formData.panNumber} label="PAN Number" description="USE AAAAA0000A FORMAT" isRequired variant="flat" />
                                                    <Input className="max-w-full" onChange={(e) => handleInputChange("aadharNumber", e.target.value)} value={formData.aadharNumber} type="number" label="Aadhar Number" description="USE 0000 0000 0000 FORMAT" isRequired variant="flat" />
                                                </AccordionItem>
                                            </Accordion>
                                        </section>
                                    </AccordionItem>
                                    <AccordionItem key={"bank details"} title={"Bank Details"}>
                                        <section className="flex flex-wrap gap-1 justify-center items-center">

                                            <Input className="max-w-3xl" type="number" onChange={(e) => handleInputChange("bankAccountNumber", e.target.value)} value={formData.bankAccountNumber} label="Bank Account Number" description="USE 0000 0000 0000 FORMAT" isRequired variant="flat" />
                                            <span className="flex w-full justify-evenly flex-wrap">
                                                <Input className="max-w-md" onChange={(e) => {
                                                    handleInputChange("ifscCode", e.target.value);

                                                }} value={formData.ifscCode} label="IFSC Code" description="USE 0000 0000 0000 FORMAT" isRequired variant="flat" />
                                                <Button onClick={async () => {
                                                    await axios.get(`https://ifsc.razorpay.com/` + formData.ifscCode).then((res) => {
                                                        console.log(res.data)
                                                        handleInputChange("bankName", res.data.BANK);
                                                        handleInputChange("bankBranch", res.data.BRANCH);
                                                        handleInputChange("bankAddress", res.data.ADDRESS);
                                                        handleInputChange("bankCity", res.data.CITY);
                                                        handleInputChange("bankState", res.data.STATE);
                                                        handleInputChange("bankCode", res.data.BANKCODE);
                                                        handleInputChange("bankPhone", res.data.CONTACT);
                                                    }).catch((err) => {
                                                        console.log(err)
                                                    }
                                                    )
                                                }} color="primary" variant="flat">Get Bank Details</Button></span>
                                            <Input className="max-w-md" onChange={(e) => handleInputChange("bankName", e.target.value)} value={formData.bankName} label="Bank Name" isDisabled variant="flat" />
                                            <Input className="max-w-md" onChange={(e) => handleInputChange("bankBranch", e.target.value)} value={formData.bankBranch} label="Bank Branch" isDisabled variant="flat" />
                                            <Input className="max-w-md" onChange={(e) => handleInputChange("bankAddress", e.target.value)} value={formData.bankAddress} label="Bank Address" isDisabled variant="flat" />
                                            <Input className="max-w-md" onChange={(e) => handleInputChange("bankCity", e.target.value)} value={formData.bankCity} label="Bank City" isDisabled variant="flat" />
                                            <Select className="max-w-md" value={formData.bankState}
                                                placeholder={formData.bankState}
                                                disabled label="Choose bank state">
                                                {
                                                    bankstates.states.map((category) => {
                                                        return <SelectItem value={category.name} onClick={(e) => handleSelectChange("bankState", category.name)} key={category.id}>{category.name}</SelectItem>
                                                    })
                                                }
                                            </Select>
                                            <Input className="max-w-md" onChange={(e) => handleInputChange("bankCode", e.target.value)} value={formData.bankCode} isDisabled label="Bank Code" variant="flat" />
                                            <Input className="max-w-md" onChange={(e) => handleInputChange("bankPhone", e.target.value)} value={formData.bankPhone} label="Bank Phone" variant="flat" />
                                            <Input className="max-w-md" onChange={(e) => handleInputChange("bankEmail", e.target.value)} value={formData.bankEmail} label="Bank Email" variant="flat" />
                                            <Input className="max-w-md" onChange={(e) => handleInputChange("bankWebsite", e.target.value)} value={formData.bankWebsite} label="Bank Website" variant="flat" />
                                        </section>
                                    </AccordionItem>

                                    <AccordionItem
                                        key={"social media"}
                                        title="Social Media(Not Required)"
                                    >
                                        <section className="flex flex-wrap gap-1 justify-center items-center">
                                            <Input className="max-w-md" onChange={(e) => handleInputChange("shopWebsite", e.target.value)} value={formData.shopWebsite} type="url" label="Shop Website" variant="flat" />
                                            <Input className="max-w-md" onChange={(e) => handleInputChange("shopFacebook", e.target.value)} value={formData.shopFacebook} type="url" label="Shop Facebook" variant="flat" />
                                            <Input className="max-w-md" onChange={(e) => handleInputChange("shopTwitter", e.target.value)} value={formData.shopTwitter} type="url" label="Shop Twitter" variant="flat" />
                                            <Input className="max-w-md" onChange={(e) => handleInputChange("shopInstagram", e.target.value)} value={formData.shopInstagram} type="url" label="Shop Instagram" variant="flat" />
                                            <Input className="max-w-md" onChange={(e) => handleInputChange("shopYoutube", e.target.value)} value={formData.shopYoutube} type="url" label="Shop Youtube" variant="flat" />
                                            <Input className="max-w-md" onChange={(e) => handleInputChange("shopWhatsapp", e.target.value)} value={formData.shopWhatsapp} type="url" label="Shop Whatsapp" variant="flat" />
                                        </section>
                                    </AccordionItem>
                                </Accordion>


                            </ModalBody>
                            <ModalFooter
                            >
                                {loader === true ? <Button color="warning" variant="flat" >Registering...</Button> : <><Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                    <Button color="success" variant="ghost"
                                        onClick={() => {
                                            setErrorTitle('')
                                            setErrorDescription('')
                                            registerShop()
                                        }}
                                    >
                                        Register
                                    </Button>
                                </>}

                            </ModalFooter>
                        </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {errorTitle && <Modals headerColor={'text-red-600'} footerColor={'bg-transparent'} bodyColor={"text-red-200"} action={false} title={errorTitle} text={errorDescription} />}
        </Navbar>
    );
}

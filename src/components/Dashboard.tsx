'use client'
import { Avatar, Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Popover, PopoverContent, PopoverTrigger, ScrollShadow, Tab, Tabs } from '@nextui-org/react'
import React from 'react'
import { TbSquareRoundedPlus } from "react-icons/tb";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { MdOutlineInsights } from "react-icons/md";


const Dashboard = () => {
    const [selected, setSelected] = React.useState("addproduct");
    return (
        <>
            <div className="flex w-full items-center flex-col">
                <Tabs aria-label="Options"
                    selectedKey={selected}
                    onSelectionChange={(e) => setSelected(e.toString())} color="secondary" variant="bordered">
                    <Tab
                        key="addproduct"
                        title={
                            <div className="flex items-center space-x-2">
                                <span className='text-2xl'><TbSquareRoundedPlus /></span>
                                <span className='text-medium'>Add Product</span>
                            </div>
                        }
                    >
                        <Card className='m-5'>
                            <CardBody>
                                <ScrollShadow hideScrollBar className="max-h-[74vh]">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit debitis deserunt iste, ad dolor molestiae delectus similique, nam dolorum minus saepe quas natus ratione quam facilis consectetur porro! Molestias cupiditate, inventore, excepturi, non nostrum quasi voluptatum commodi provident officia quae similique blanditiis voluptatibus vero reprehenderit laboriosam quidem eaque quas earum fugit at. Maxime vel molestias inventore, voluptates quasi quaerat, culpa dolor omnis ad aspernatur consequatur optio, asperiores sapiente? Placeat sint voluptatibus totam, laboriosam id reprehenderit magni atque quod autem quae iste ipsa corporis provident dolores ut, nesciunt quis sequi explicabo cumque itaque! Et ex sunt minima veniam, aperiam, quam aspernatur facilis necessitatibus quaerat enim magnam a consequuntur. Maiores dicta impedit recusandae soluta aspernatur quas debitis saepe odit cumque placeat architecto enim perferendis, repellendus temporibus quia, sapiente reprehenderit ducimus quis labore ut commodi consectetur! Sunt soluta quidem ipsa, architecto nostrum doloremque, minus adipisci consequatur voluptatibus ullam aut suscipit excepturi laboriosam nisi perspiciatis repellendus mollitia quas nulla. Laborum, quasi! Ut ullam eligendi quas nemo, architecto velit voluptatum repellendus rerum facere dolores dolor corporis nesciunt quis assumenda magni, praesentium repellat earum suscipit accusamus, quasi amet fuga odit! Architecto totam eum similique quod distinctio commodi veniam, excepturi dolor amet voluptatem doloribus ea aliquid! Delectus, expedita accusamus. Repellendus sunt culpa blanditiis voluptate error rerum, ab facilis ut expedita veniam cum qui quis dolores laboriosam voluptas cupiditate minima harum corporis sit magni dicta. Tempora modi labore fuga, temporibus quo officiis possimus consequatur ea quas magnam praesentium autem nesciunt odio sed aliquam commodi. Eaque cupiditate minus ipsa rerum perspiciatis delectus eum minima molestias asperiores animi nemo ipsum repellat numquam cum voluptas culpa, corrupti dolores nulla perferendis consectetur ad rem laudantium? Maxime aliquid, iure, commodi at, animi perspiciatis nostrum autem modi asperiores rerum doloremque distinctio harum? Soluta, alias dicta. Aut quae eos officiis odit fuga. Mollitia, eveniet. Adipisci labore laborum corporis aliquam id animi dignissimos voluptatem ratione quos facere. Sint mollitia quisquam dolorum atque deserunt natus dolore ipsam voluptates, ipsa omnis pariatur, eligendi error dolorem delectus illo rem at reprehenderit ab. Hic esse architecto in itaque quidem earum. Nemo qui eum earum quaerat velit ut, laboriosam non molestiae, veniam voluptatibus cumque. Iusto voluptate sunt possimus. Harum consequatur excepturi sequi accusantium, quis libero porro itaque, minus magnam mollitia molestias eligendi delectus laudantium, ea voluptatibus. Ea, qui natus! Non illo fugiat incidunt, assumenda quaerat quas doloribus cumque necessitatibus commodi corrupti, in, quo quasi aliquid? Quaerat omnis debitis veritatis pariatur? Necessitatibus eveniet amet placeat vero perspiciatis aliquid, expedita, nobis repellat ducimus laboriosam suscipit aut quis quidem eligendi voluptatem distinctio soluta, odio voluptas ratione magnam. Maxime officia ducimus optio libero blanditiis velit, voluptas veritatis expedita iure fugit, eos, quibusdam obcaecati voluptatum aperiam laudantium ipsam laboriosam impedit unde provident doloremque repellendus voluptates quisquam vero odit. Iure animi maxime quod optio rerum iste reiciendis perferendis quia unde qui dolor dignissimos debitis saepe, eius sapiente consectetur temporibus adipisci nam dicta! Perferendis ipsa eius voluptas aut numquam hic aspernatur nam, placeat reprehenderit officia labore debitis iure doloremque cumque eum saepe natus corporis veritatis, amet, consequuntur voluptates magni ut rem nobis? Recusandae, exercitationem earum necessitatibus ipsa animi iusto a deleniti, accusamus maiores quas ad quo labore perferendis ex aperiam, sunt et! Quo fuga facere dolorum aliquid veritatis maiores, harum quos, temporibus unde doloribus accusamus sequi incidunt hic laudantium quidem? Maxime suscipit vero illum ad reprehenderit consectetur magnam, dolore perspiciatis accusantium libero illo rem neque quis itaque tempora! Illum quaerat, quasi distinctio iure accusamus debitis excepturi vitae iste aperiam quo et sed ipsa consequuntur maxime tenetur dicta reprehenderit nisi placeat, quidem sapiente error sint a eum. Aut, quos voluptatem harum amet ab natus quidem inventore maxime, culpa minima labore deserunt quas quam hic ex quo nisi nemo veritatis in numquam earum laudantium. Error, quasi unde quas pariatur esse, omnis libero voluptate, fugit tempore reprehenderit corrupti officiis. Saepe nam nemo numquam ex et suscipit dicta odio error quas repudiandae. Fugit dignissimos cum ducimus. Est sapiente, quasi necessitatibus officiis et dolores a, consectetur repellendus at deserunt voluptatum porro consequuntur ea amet maiores eos odio dolore accusantium commodi tempora eveniet incidunt magnam, iure iste! Facilis magni quam reiciendis minus, illo earum saepe necessitatibus? Accusantium porro aperiam obcaecati, sit explicabo laudantium non, incidunt tempore officia eos, dolorem consectetur! Iusto sint repellat, nesciunt nam maxime autem! Vel maiores reprehenderit placeat aliquam! Quod corrupti maxime cumque voluptate hic obcaecati. Veniam maxime recusandae voluptatem ducimus officiis doloribus, saepe praesentium aliquam sit rerum adipisci dolores quasi temporibus neque accusamus ratione nisi hic dolorem inventore reiciendis odit tenetur voluptates cum molestiae. Asperiores repudiandae magnam minus dicta assumenda voluptatem porro minima nesciunt voluptas, totam accusantium error ex aliquid tenetur. Officia adipisci et placeat obcaecati assumenda quis unde magnam, soluta incidunt atque illum quae deleniti harum ipsum sunt explicabo quidem iure, maiores sed facere. A obcaecati fugit aliquid maxime quae dignissimos qui hic, est beatae veritatis eum facilis officiis animi nihil vel tempore ratione iusto voluptate! Facere in facilis accusantium, laudantium blanditiis rerum alias maiores? Iusto, tempora dolor assumenda magnam repudiandae cupiditate deserunt saepe vero molestias, corporis, quod aliquam ducimus velit. Provident et perferendis dolores quae blanditiis consequatur aut ut maxime earum necessitatibus ea, aliquid a nam officia suscipit consequuntur sint? Et perferendis, accusantium officia eum consequuntur unde perspiciatis quaerat magni tempore voluptate nostrum voluptas delectus qui aspernatur molestias suscipit? Quam accusantium culpa ut. Voluptas adipisci nobis molestiae distinctio exercitationem! Excepturi at unde ullam incidunt vel pariatur nulla fuga nemo mollitia eligendi quidem, doloremque iure sit laudantium possimus aperiam quaerat quibusdam itaque, vero nisi quisquam laboriosam. Vitae excepturi officia nam, repudiandae eius tempore magni ex dolorem animi quis ducimus ad mollitia ullam. Sunt, nostrum? Exercitationem fuga corrupti quos, et deserunt est fugiat minima aliquam praesentium amet quis itaque, tempora dolorem qui pariatur repellendus corporis aut, neque minus officia vero molestias nihil eos. Perferendis voluptatem, fuga eius amet, quibusdam reprehenderit omnis et enim saepe ea accusantium dicta vel sed quod numquam vitae unde iure! Repellat ab debitis suscipit fuga unde nulla deserunt sint, neque inventore dolorem itaque praesentium, fugit maiores in voluptatum numquam ex quisquam. Aperiam numquam omnis eaque adipisci!
                                </ScrollShadow>
                            </CardBody>
                        </Card>
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
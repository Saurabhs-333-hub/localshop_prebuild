
import { Client, Account, ID, Databases, Storage } from "appwrite";
import { NextResponse } from "next/server";
import { useDispatch } from "react-redux";
import { login } from "@/features/authSlice";
import { v4 } from "uuid";
const cors = require('cors')
cors()
type CreateUser = {
    email: string;
    password: string;
    name: string;
    profileImage: {
        id: any,
        file: any
    };
};

type LoginUser = {
    email: string;
    password: string;
};

export const client = new Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("6541df0eeecce0cfc02b");

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);


export class AppwriteService {
    async createFile(file: any, id: any) {
        try {
            const res = await storage.createFile("6577c442991fb8f4fd50", id, file, ["*"]);
            return res;
        } catch (error) {
            throw new Error(`Error creating file: ${error}`);
        }
    }
    //? This is the function that creates the user
    async createUser({ email, password, name, profileImage }: CreateUser) {
        try {
            const userAccount = await account.create(ID.unique(), email, password, name)
            const { $id } = userAccount;
            // this.createFile(profilePic, $id)
            console.log('fen' + profileImage.file)
            const res = await storage.createFile("6577c442991fb8f4fd50", profileImage.id, profileImage.file,);
            const fileUrl = storage.getFilePreview("6577c442991fb8f4fd50", profileImage.id)
            const userSaved = await database.createDocument("65576297141df7832e98", `${process.env.NEXT_PUBLIC_UC_ID}`, $id, {
                "name": name,
                "email": email,
                "password": password,
                "profilePic": fileUrl,
                "ip": "",
                "osCode": "",
                "osName": "",
                "osVersion": "",
                "clientType": "",
                "clientCode": "",
                "clientName": "",
                "clientVersion": "",
                "clientEngine": "",
                "clientEngineVersion": "",
                "deviceName": "",
                "deviceBrand": "",
                "deviceModel": "",
                "countryCode": "",
                "countryName": "",
            })
            if (userAccount) {
                return this.loginUser({ email, password })
            } else {
                return userAccount
            }
        } catch (error) {
            throw new Error(`Error creating user: ${error}`);
        }
    }

    //? This is the function that logs the user in
    async loginUser({ email, password }: LoginUser) {
        try {
            const res = await account.createEmailSession(email, password);
            const respon = NextResponse.json({
                message: "Login SuccessFull",
                success: true
            })

            await database.updateDocument("65576297141df7832e98", `${process.env.NEXT_PUBLIC_UC_ID}`, res.userId, {
                "ip": res.ip.toString(),
                "osCode": res.osCode.toString(),
                "osName": res.osName.toString(),
                "osVersion": res.osVersion.toString(),
                "clientType": res.clientType.toString(),
                "clientCode": res.clientCode.toString(),
                "clientName": res.clientName.toString(),
                "clientVersion": res.clientVersion.toString(),
                "clientEngine": res.clientEngine.toString(),
                "clientEngineVersion": res.clientEngineVersion.toString(),
                "deviceName": res.deviceName.toString(),
                "deviceBrand": res.deviceBrand.toString(),
                "deviceModel": res.deviceModel.toString(),
                "countryCode": res.countryCode.toString(),
                "countryName": res.countryName.toString(),
            })

            // const dispatch = useDispatch()
            // dispatch(login(res))
            //? Setting token to cookies
            respon.cookies.set("token", "token", {
                httpOnly: true
            })
            respon.headers.set('Access-Control-Allow-Origin', '*')
            return res
        } catch (error) {
            throw new Error(`Error logging in user: ${error}`);
        }
    }

    //? This is the function that checks if the user is logged in
    async isLoggedIn(): Promise<boolean> {
        try {
            const session = await this.getUser();
            return Boolean(session)
        } catch (error) {
            return false;
        }
    }

    //? This is the function that logs the user out
    async logoutUser() {
        try {
            account.deleteSession("current");
        } catch (error) {
            throw new Error(`Error logging out user: ${error}`);
        }
    }

    //? This is the function that gets the user
    async getUser() {
        try {
            return await account.get();
        } catch (error) {
            throw new Error(`Error getting user: ${error}`);
        }
    }
    async getUserData() {
        try {
            const res = await account.get();
            const user = await database.getDocument("65576297141df7832e98", `${process.env.NEXT_PUBLIC_UC_ID}`, res.$id)
            console.log(user)
            return user
        } catch (error) {
            throw new Error(`Error getting user: ${error}`);
        }
    }
    //? This is the function that updates the user
    async updateUser(name: string) {
        try {
            await account.updateSession(name);
        } catch (error) {
            throw new Error(`Error updating user: ${error}`);
        }
    }

    async registerShop({ shopName,
        shopCategory,
        shopAddress,
        shopDescription,
        shopPhone,
        shopEmail,
        gstinNumber,
        panNumber,
        aadharNumber,
        bankAccountNumber,
        ifscCode,
        bankName,
        bankBranch,
        bankAddress,
        bankCity,
        bankState,
        bankCode,
        bankPhone,
        bankEmail,
        bankWebsite,
        shopWebsite,
        shopFacebook,
        shopTwitter,
        shopInstagram,
        shopYoutube,
        shopWhatsapp, }: any) {
        try {
            const user = await account.get();
            const res = await database.createDocument("65576297141df7832e98", `${process.env.NEXT_PUBLIC_SSHOPSC_ID}`, user.$id, {
                "shopId": v4(),
                "shopName": shopName,
                "shopCategory": shopCategory,
                "shopAddress": shopAddress,
                "shopDescription": shopDescription,
                "shopPhone": shopPhone,
                "shopEmail": shopEmail,
                "gstinNumber": gstinNumber,
                "panNumber": panNumber,
                "aadharNumber": aadharNumber,
                "bankAccountNumber": bankAccountNumber,
                "ifscCode": ifscCode,
                "bankName": bankName,
                "bankBranch": bankBranch,
                "bankAddress": bankAddress,
                "bankCity": bankCity,
                "bankState": bankState,
                "bankCode": bankCode,
                "bankPhone": bankPhone,
                "bankEmail": bankEmail,
                "bankWebsite": bankWebsite,
                "shopWebsite": shopWebsite,
                "shopFacebook": shopFacebook,
                "shopTwitter": shopTwitter,
                "shopInstagram": shopInstagram,
                "shopYoutube": shopYoutube,
                "shopWhatsapp": shopWhatsapp,
            })
            return res
        } catch (error) {
            throw new Error(`Error registering shop: ${error}`);
        }
    }

    async getShop() {
        try {
            const user = await account.get();
            const res = await database.getDocument("65576297141df7832e98", `${process.env.NEXT_PUBLIC_SSHOPSC_ID}`, user.$id)
            if (res) {
                return true
            } else {
                return false
            }
        } catch (error) {
            throw new Error(`Error getting shop: ${error}`);
        }
    }

    async addProduct({
        product_id,
        seller_id,
        name,
        description,
        category_id,
        sub_category_id,
        brand,
        sku,
        quantity,
        price,
        sale_price,
        main_image,
        additional_images,
        size,
        color,
        material,
        style,
        packaging,
        features,
        warranty,
        return_policy,
        health_safety
    }: any) {
        try {
            const res = await database.createDocument("65576297141df7832e98", `${process.env.NEXT_PUBLIC_SPC_ID}`, product_id, {
                "seller_id": seller_id,
                "name": name,
                "description": description,
                "category_id": category_id,
                "sub_category_id": sub_category_id,
                "brand": brand,
                "sku": sku,
                "quantity": quantity,
                "price": price,
                "sale_price": sale_price,
                "main_image": main_image,
                "additional_images": additional_images,
                "size": size,
                "color": color,
                "material": material,
                "style": style,
                "packaging": packaging,
                "features": features,
                "warranty": warranty,
                "return_policy": return_policy,
                "health_safety": health_safety
            })
            return res
        } catch (error) {
            throw new Error(`Error adding product: ${error}`);
        }
    }
    async deleteProduct({ product_id }: any) {
        try {
            const res = await database.deleteDocument("65576297141df7832e98",
                `${process.env.NEXT_PUBLIC_SPC_ID}`,
                product_id)
            return res
        } catch (error) {
            throw new Error(`Error deleting product: ${error}`);
        }
    }

    async getProduct({ product_id }: any) {
        try {
            const res = await database.getDocument("65576297141df7832e98",
                `${process.env.NEXT_PUBLIC_SPC_ID}`,
                product_id)
            return res
        } catch (error) {
            throw new Error(`Error getting product: ${error}`);
        }
    }
    async updateProductNameDescriptionBrand({ product_id, name, description, brand }: any) {
        try {
            const res = await database.updateDocument("65576297141df7832e98",
                `${process.env.NEXT_PUBLIC_SPC_ID}`
                , product_id, {
                "name": name,
                "description": description,
                "brand": brand,
            })
            return res
        } catch (error) {
            throw new Error(`Error updating product: ${error}`);
        }
    }
    async updateProductPrice({ product_id, price, sale_price }: any) {
        try {
            const res = await database.updateDocument("65576297141df7832e98",
                `${process.env.NEXT_PUBLIC_SPC_ID}`
                , product_id, {
                "price": price,
                "sale_price": sale_price,
            })
            return res
        } catch (error) {
            throw new Error(`Error updating product: ${error}`);
        }
    }
}

export const appwriteService = new AppwriteService();

export default appwriteService;


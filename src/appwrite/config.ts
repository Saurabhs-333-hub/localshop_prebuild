
import { Client, Account, ID, Databases, Storage } from "appwrite";
import { NextResponse } from "next/server";
import { useDispatch } from "react-redux";
import { login } from "@/features/authSlice";
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
            const userSaved = await database.createDocument("65576297141df7832e98", "6557640249fc55d337be", $id, {
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

            await database.updateDocument("65576297141df7832e98", "6557640249fc55d337be", res.userId, {
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

    //? This is the function that updates the user
    async updateUser(name: string) {
        try {
            await account.updateSession(name);
        } catch (error) {
            throw new Error(`Error updating user: ${error}`);
        }
    }
}

export const appwriteService = new AppwriteService();

export default appwriteService;


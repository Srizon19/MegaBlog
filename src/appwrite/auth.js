import conf from "../conf/conf";
import {Client, Account, ID} from "appwrite"

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client)
    }


    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if(userAccount){
                //call another method to log in

                return this.loginAccount({email, password})
            }else{
                return userAccount;
            }
        } catch (err) {
            console.error("Failed to create account:", err);
            throw new Error("Unable to register at this time. Please try again.");
        }
        
    }

    async loginAccount({email, password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }
        catch(err){
            console.error("Failed to log in:", err);
        }
    }


    //to check if the user is available
    async getCurrentUser(){
        try{
            return await this.account.get()
        }
        catch(err){
            console.error("Appwrite service:: getCurrentUser ", err);
        }

        return null;
    }


    async logout(){
        try{
            await this.account.deleteSessions();
        }
        catch(err){
            console.error("Appwrite service :: logout ", err)
        }
    }
}

const authService = new AuthService()

export default authService;
import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteEndpoint)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    //creating custom account creation method for avoiding vendor-lock problem 
    async createAccount({ name, email, password }) {
        try {
            const userAccount = await this.account.create(ID.unique(), name, email, password);
            if (userAccount) {
                // function to directly login user at the time of successfull account creation.
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    //login function
    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    //check account exists or not 
    async getCurrentuser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Service:: getCurrentUser :: error", error);
        }
        return null;
    }
    //logout function
    async logout() {
        try {
            //function to logout from all the browser, to logout from the currect browser use - deleteSession("current") or, deleteSession(userID)
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("service::logout::error ", error);
        }
    }
}

const authService = new AuthService();

export default authService;
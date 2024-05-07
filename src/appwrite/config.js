import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteEndpoint)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    //function for create a post
    async createPost({ title, slug, content, feturedImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteEndpointDatabaseId,
                conf.appwriteEndpointCollectionId,
                slug,
                {
                    title,
                    content,
                    feturedImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Service::createPost::error", error);
        }
    }
    //function for update a post
    async updatePost(slug, { title, content, feturedImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteEndpointDatabaseId,
                conf.appwriteEndpointCollectionId,
                slug,
                {
                    title,
                    content,
                    feturedImage,
                    status
                }
            )
        } catch (error) {
            console.log("Service::updatePost::error", error)
        }
    }
    //function to delete a post
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteEndpointDatabaseId,
                conf.appwriteEndpointCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Service::deletePost::error", error)
            return false;
        }
    }
    //function to get a particular post
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteEndpointDatabaseId,
                conf.appwriteEndpointCollectionId,
                slug
            )
        } catch (error) {
            console.log("Service::getPost::error", error)
        }
    }
    //function to get all posts 
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,


            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    //function to get all the active post
    async getActivePosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteEndpointDatabaseId,
                conf.appwriteEndpointCollectionId,
                queries
            )
        } catch (error) {
            console.log("Service::getActivePosts::error", error);
            return false
        }
    }
    //function to upload file
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Service::uploadFile::error", error);
            return false;
        }
    }
    //function to delete file
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Service::deleteFile::error", error);
            return false;
        }
    }
    //function to preview file
    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Service::getFilePreview::error", error);
            return false
        }
    }

}

const service = new Service()

export default service;
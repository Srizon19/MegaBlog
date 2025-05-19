import conf from "../conf/conf";
import {Client, Accout, ID, Databases, Storage, Query} from "appwrite"


export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);

        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatebaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title, 
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }
        catch(err){
            console.error("Appwrite Service :: create post ", err);
        }
    }

    async updatePost(slug ,{title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatebaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content, 
                    featuredImage,
                    status
                }
            )
        }
        catch(err){
            console.error("appwrite service:: update post", err)
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatebaseId,
                conf.appwriteCollectionId,
                slug
            )

            return true;
        }
        catch(err){
            console.error("appwrite service :: delete post", err);
            return false;
        }

        
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatebaseId,
                conf.appwriteCollectionId,
                slug
            )
        }
        catch(err){
            console.error("Appwrite service :: getPost :: ", err);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try{
            await this.databases.listDocuments(
                conf.appwriteDatebaseId,
                conf.appwriteCollectionId,
                queries,

            )
        }
        catch(err){
            console.error("Appwrite service :: get posts :: ", err);
        }
    }

    // file uploading method

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.error("appwrite service :: upload files :: ", error);
        }
    }

    // delete file

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,

            )

            return true;
        } catch (error) {
            console.error("Appwrite service :: delete file :: ", error)
        }
    }

    // file preview

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,fileId
        )
    }
}


const service = new Service();

export default service
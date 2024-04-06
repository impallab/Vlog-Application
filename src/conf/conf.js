const conf = {
    appwriteEndpoint: String(import.meta.env.VITE_VITE_APPWRITE_ENDPOINT),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteEndpointDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteEndpointCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}
export default conf
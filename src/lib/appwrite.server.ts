'server-only'
import { Client, Databases } from 'node-appwrite'

export function getServerDomainAppwrite() {
    const endpoint = process.env.APPWRITE_ENDPOINT
    const projectId = process.env.APPWRITE_PROJECT_ID
    const databaseId = process.env.APPWRITE_DATABASE_ID
    const collectionId = process.env.APPWRITE_DOMAIN_COLLECTION_ID
    const apiKey = process.env.APPWRITE_API_KEY

    if (!endpoint || !projectId || !databaseId || !collectionId || !apiKey) {
        throw new Error('Missing Appwrite env vars')
    }

    const client = new Client()
        .setEndpoint(endpoint)
        .setProject(projectId)
        .setKey(apiKey)

    return {
        databases: new Databases(client),
        databaseId,
        collectionId
    }
}
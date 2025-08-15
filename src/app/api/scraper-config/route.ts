import { NextResponse } from 'next/server'
import { getServerDomainAppwrite } from '@/lib/appwrite.server'
import { AppwriteException, ID, Models } from 'node-appwrite'

type DomainDoc = Models.Document & { domain?: string }
const docId = process.env.APPWRITE_DOMAIN_DOCUMENT_ID!

export async function GET() {
    const { databases, databaseId, collectionId } = getServerDomainAppwrite()

    try {
        const doc = await databases.getDocument<DomainDoc>(
            databaseId,
            collectionId,
            docId
        )

        return NextResponse.json({ domain: doc.domain })
    } catch (err) {
        if (err instanceof AppwriteException && err.code === 404) {
            return NextResponse.json({ domain: 'example.com' })
        }
        console.error('Failed to fetch domain document:', err)
        return NextResponse.json({ error: 'Failed to fetch domain' }, { status: 500 })
    }
}
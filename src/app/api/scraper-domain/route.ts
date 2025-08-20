import { NextResponse } from 'next/server'
import { getServerDomainAppwrite } from '@/lib/appwrite.server'
import { AppwriteException, ID, Models } from 'node-appwrite'

import { z } from "zod"

import { isValidHost, normalizeHost } from '@/lib/utils'

type DomainDoc = Models.Document & { domain?: string }
const docId = process.env.APPWRITE_DOMAIN_DOCUMENT_ID!

const domainSchema = z.object({ domain: z.url() })
                     .transform(({ domain }) => ({ host: normalizeHost(domain) }))
                     .refine(({ host }) => isValidHost(host), { message: "Invalid domain"})

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
            return NextResponse.json({ domain: null }, { status: 404 })
        }
        console.error('Failed to fetch domain document:', err)
        return NextResponse.json({ error: 'Failed to fetch domain' }, { status: 500 })
    }
}

export async function PUT(req: Request) {
    const { databases, databaseId, collectionId } = getServerDomainAppwrite()

    const domain = domainSchema.safeParse(await req.json().catch(() => ({})))
    if (!domain.success) return NextResponse.json({ error: domain.error.issues[0]?.message ?? "Invalid input" }, { status: 400 })

    const { host } = domain.data
    try {
        await databases.updateDocument(databaseId, collectionId, docId, { host })
    } catch (err) {
        if (err instanceof AppwriteException && err.code === 404) {
            await databases.createDocument(databaseId, collectionId, docId, { host })
        } else {
            return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
        }
    }

    return NextResponse.json({ ok: true, domain: host })
}
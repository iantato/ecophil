'use client'

import { useRef } from "react"

import { toast } from "sonner"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { DialogClose, DialogFooter } from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"

import { normalizeHost } from "@/lib/utils"

const formSchema = z.object({
    domain: z.url({message: "Invalid domain URL. Insert a valid URL (don't forget the https://)."}).nonempty()
})

export function DomainForm() {

    const closeRef = useRef<HTMLButtonElement>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.domain) {
            closeRef.current?.click()
        }

        const host = normalizeHost(values.domain)

        try {
            const res = await fetch("/api/scraper-domain", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ domain: host })
            })

            if (res.ok) {
                toast.success(
                    <>Domain Updated to <span className="font-mono text-xs bg-gray-100 px-1 rounded">{values.domain}</span></>
                )
            } else {
                toast.error("Failed to update domain.")
            }

        } catch (err) {
            toast.error("Failed to update domain.")
            return
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                 control={form.control}
                 name="domain"
                 render={({ field }) => (
                        <FormItem>

                            <FormControl>
                                <Input type="text"
                                className="input font-mono"
                                placeholder="https://www.example.com"
                                autoComplete="off"
                                value={field.value ?? ""}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                                />
                            </FormControl>

                            <FormMessage />

                        </FormItem>
                    )}
                />
                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    {
                        <Button type="submit">Submit</Button>
                    }
                    <DialogClose asChild>
                        <button ref={closeRef} type="button" className="hidden" aria-hidden="true" />
                    </DialogClose>
                </DialogFooter>
            </form>
        </Form>
    )
}
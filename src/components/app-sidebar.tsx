'use client'

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { toast } from "sonner"

import { Bot } from "lucide-react"

import { useScraperStatus } from "@/hooks/use-scraper-status"

import {
  	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuBadge
} from "@/components/ui/sidebar"

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose
} from "@/components/ui/dialog"

import { DomainForm } from "./domain-form"

export function AppSidebar() {

	const [domain, setDomain] = useState<string | null>(null)
	const [input, setInput] = useState('')

	useEffect(() => {
		const ctrl = new AbortController()

		async function fetchDomain() {
			try {
				const res = await fetch('/api/scraper-domain')
				if (!res.ok) {
					console.error('Failed to fetch domain:', res.statusText)
					return
				}
				const data = await res.json() as { domain: string }
				setDomain(data.domain)
			} catch (e) {
				if ((e as any).name !== 'AbortError') console.error('fetchDomain error', e)
			}
		}

		fetchDomain()
		return () => {
			ctrl.abort()
		}
	}, [])

	const wsUrl = domain ? `wss://${domain}/ws/scraper` : null
	const status = useScraperStatus(wsUrl)

	const dot = status === 'online' ? 'bg-emerald-500' : 'bg-rose-500'

	return (
		<Sidebar collapsible="icon">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<Dialog>
								<SidebarMenuItem>
									<DialogTrigger asChild>
										<SidebarMenuButton className="font-medium cursor-pointer">
											<Bot size={24} strokeWidth={2.5}/>
											Scraper
											<SidebarMenuBadge className="border-gray-200 border-1">
												<span className={`mr-1 inline-block size-2 rounded-full ${dot}`} />
												{status}
											</SidebarMenuBadge>
										</SidebarMenuButton>
									</DialogTrigger>
								</SidebarMenuItem>

								<DialogContent>
									<DialogHeader>
										<DialogTitle className="select-none"> <span className="cursor-text">Change Scraper API Domain</span></DialogTitle>

										<DialogDescription>
											Change the current domain of the scraper API. This will restart the scraper with the new domain.
										</DialogDescription>
									</DialogHeader>

									<DomainForm />
								</DialogContent>
							</Dialog>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
  )
}
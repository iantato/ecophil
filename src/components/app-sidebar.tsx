'use client'

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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


export function AppSidebar() {

	const [domain, setDomain] = useState<string | null>(null)

	useEffect(() => {
		const ctrl = new AbortController()

		async function fetchDomain() {
			try {
				const res = await fetch('/api/scraper-config')
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
										<SidebarMenuButton asChild>
											<button type="button" className="font-medium cursor-pointer">
												<Bot size={24} strokeWidth={2.5} />
												Scraper
												<SidebarMenuBadge className="border-gray-200 border-1">
													<span className={`mr-1 inline-block size-2 rounded-full ${dot}`} />
													{status}
												</SidebarMenuBadge>
											</button>
										</SidebarMenuButton>
									</DialogTrigger>
								</SidebarMenuItem>

								<DialogContent>
									<DialogHeader>
										<DialogTitle>Change Scraper API Domain</DialogTitle>
										<DialogDescription>
											Change the current domain of the scraper API. This will restart the scraper with the new domain.
										</DialogDescription>
									</DialogHeader>
									<div>
										<Input type="text" className="input font-mono" placeholder="https://www.example.com" />
									</div>
									<DialogFooter>
										<DialogClose asChild>
											<Button variant="outline">Cancel</Button>
										</DialogClose>
										<DialogClose asChild>
											<Button type="submit">Submit</Button>
										</DialogClose>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
  )
}
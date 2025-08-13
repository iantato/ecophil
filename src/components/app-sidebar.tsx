'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
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

	const domain = 'example.com'
	const wsUrl = `ws://${domain}/ws/scraper`
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
										<DialogTitle>Scraper Status</DialogTitle>
										<DialogDescription>
											The scraper is currently {status}.
										</DialogDescription>
									</DialogHeader>
									<DialogFooter>
										<DialogClose asChild>
											<Link href={`http://${domain}/scraper`} className="btn btn-primary">
												View Scraper
											</Link>
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
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  FileText,
  Home,
  ChevronRight
} from "lucide-react"

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home
  },
  {
    title: "Documents",
    url: "/documents",
    icon: FileText
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>

              <Collapsible className="group/documents">

                <CollapsibleTrigger className="flex items-center justify-between w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md p-2 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4"/>
                    <span className="font-medium">Documents</span>
                  </div>
                  <ChevronRight className="h-4 w-4 transition-transform duration-240 group-data-[state=open]/documents:rotate-90" />
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild>
                      <Link href="/documents/#">
                        <span>Liquidation & Summary</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSub>

                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild>
                      <Link href="/documents/#">
                        <span>VBS OneStop</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSub>
                </CollapsibleContent>

              </Collapsible>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
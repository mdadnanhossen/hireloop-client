import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import { admin } from "better-auth/plugins"
import { Plus } from "lucide-react"
import { receiveMessageOnPort } from "worker_threads"

const menuItemBYRole = {
  seeker : [

  ],
  recruiter : [

  ],
  admin : [

  ],
}

export function DashboardSidebar() {

  const { data : session , isPending } = useSession()
  const role = session?.user?.role || "seeker"
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroup>
          <SidebarMenu>
  {
  // menuItemBYRole[role]?.map((item) => (
  //   <SidebarMenuItem key={item.id}>
  //     <SidebarMenuButton render={<a href={item.url} />}>
  //       <item.icon />
  //       <span>{item.name}</span>
  //     </SidebarMenuButton>
  //   </SidebarMenuItem>
  // ))
  }
</SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

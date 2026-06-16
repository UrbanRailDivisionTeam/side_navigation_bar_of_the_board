"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Home, Moon, Sun } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { navigation, type NavSection } from "@/lib/navigation"

function NavSectionGroup({ section }: { section: NavSection }) {
    const pathname = usePathname()
    const [open, setOpen] = useState(section.items.some((item) => pathname.startsWith(item.url)))

    const Icon = section.icon

    return (
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setOpen(!open)}>
                        <Icon className="size-4" />
                        <span className="flex-1 text-left font-medium">{section.title}</span>
                        <ChevronDown className={`size-3.5 shrink-0 transition-transform duration-200 ${open ? "rotate-0" : "-rotate-90"}`} />
                    </SidebarMenuButton>
                    <AnimatePresence initial={false}>
                        {open && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeInOut" as const }}
                                className="overflow-hidden"
                            >
                                <SidebarMenuSub>
                                    {section.items.map((item) => {
                                        const isActive = pathname === item.url
                                        return (
                                            <SidebarMenuSubItem key={item.url}>
                                                <SidebarMenuSubButton asChild isActive={isActive}>
                                                    <Link href={item.url}>
                                                        <span>{item.title}</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        )
                                    })}
                                </SidebarMenuSub>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    )
}

export function AppSidebar() {
    const pathname = usePathname()
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader className="px-4 py-3">
                <h1 className="text-sm font-semibold text-sidebar-foreground">看板导航</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === "/dashboard"} tooltip="首页概览">
                                    <Link href="/dashboard">
                                        <Home className="size-4" />
                                        <span>首页概览</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarSeparator />
                {navigation.map((section) => (
                    <NavSectionGroup key={section.title} section={section} />
                ))}
            </SidebarContent>
            <SidebarFooter className="gap-3 px-3 py-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                            tooltip={resolvedTheme === "dark" ? "切换亮色模式" : "切换暗色模式"}
                        >
                            <span className="relative size-4 shrink-0">
                                <Sun className="absolute inset-0 size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                                <Moon className="absolute inset-0 size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                            </span>
                            {mounted ? <span>{resolvedTheme === "dark" ? "亮色模式" : "暗色模式"}</span> : <span className="invisible">暗色模式</span>}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <p className="text-[10px] text-sidebar-foreground/40">看板监控系统 v1.0</p>
            </SidebarFooter>
        </Sidebar>
    )
}

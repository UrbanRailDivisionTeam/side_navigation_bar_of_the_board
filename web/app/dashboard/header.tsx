"use client"

import { motion } from "framer-motion"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function DashboardHeader() {
    return (
        <motion.header
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" as const }}
            className="flex h-12 shrink-0 items-center gap-2 border-b px-4"
        >
            <SidebarTrigger className="-ml-1" />
        </motion.header>
    )
}

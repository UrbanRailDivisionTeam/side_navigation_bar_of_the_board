"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

export function PageContent({ slug, title }: { slug: string[]; title: string }) {
    const pathname = usePathname()

    if (!slug || slug.length === 0) {
        return (
            <motion.div
                key={pathname}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" as const }}
                className="flex flex-1 items-center justify-center"
            >
                <div className="flex max-w-md flex-col gap-2 text-center">
                    <h2 className="text-xl font-semibold">看板监控系统</h2>
                    <p className="text-sm text-muted-foreground">请从左侧导航选择要查看的板块</p>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.08, delayChildren: 0.05 }}
            className="flex flex-1 flex-col gap-4"
        >
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" as const }}>
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-sm text-muted-foreground">当前板块：{title}（内容待开发）</p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" as const, delay: 0.1 }}
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed p-12"
            >
                <p className="text-sm text-muted-foreground">{title} — 数据面板区域</p>
            </motion.div>
        </motion.div>
    )
}

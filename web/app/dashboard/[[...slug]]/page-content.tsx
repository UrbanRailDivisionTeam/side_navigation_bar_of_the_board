"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { MATERIAL_IFRAME_URL, VEHICLETRACK_IFRAME_URL } from "@/lib/navigation"
import { normalizePath } from "@/lib/utils"

export function PageContent({ slug, title }: { slug: string[]; title: string }) {
    const pathname = usePathname()

    const isMaterialBoard = normalizePath(pathname) === "/dashboard/awareness/cabinet"
    const isVehicleTrack = normalizePath(pathname) === "/dashboard/awareness/debug"

    if (!slug || slug.length === 0) {
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: "easeOut" as const }}
                    className="flex flex-1 items-center justify-center"
                >
                    <div className="flex max-w-md flex-col gap-2 text-center">
                        <h2 className="text-xl font-semibold">看板监控系统</h2>
                        <p className="text-sm text-muted-foreground">请从左侧导航选择要查看的板块</p>
                    </div>
                </motion.div>
            </AnimatePresence>
        )
    }

    if (isMaterialBoard) {
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15, ease: "easeOut" as const }}
                    className="flex flex-1 flex-col gap-4"
                >
                    <div className="flex flex-1">
                        <iframe
                            src={MATERIAL_IFRAME_URL}
                            className="h-full w-full rounded-lg border"
                            title={title}
                        />
                    </div>
                </motion.div>
            </AnimatePresence>
        )
    }
    else if(isVehicleTrack) {
        return(
            <AnimatePresence mode = "wait" >
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15, ease: "easeOut" as const }}
                        className="flex flex-1 flex-col gap-4"
                    >
                        <div className="flex flex-1">
                            <iframe
                                src={VEHICLETRACK_IFRAME_URL}
                                className="h-full w-full rounded-lg border"
                                title={title}
                            />
                        </div>
                    </motion.div>
            </AnimatePresence>
        )
    }

return (
    <AnimatePresence mode="wait">
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" as const }}
            className="flex flex-1 flex-col gap-4"
        >
            <div>
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-sm text-muted-foreground">当前板块：{title}（内容待开发）</p>
            </div>
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed p-12">
                <p className="text-sm text-muted-foreground">{title} — 数据面板区域</p>
            </div>
        </motion.div>
    </AnimatePresence>
)
}

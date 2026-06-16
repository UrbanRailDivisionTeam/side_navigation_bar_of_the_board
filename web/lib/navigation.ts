import { Brain, Play, Monitor, type LucideIcon } from "lucide-react"

export interface NavItem {
    title: string
    url: string
}

export interface NavSection {
    title: string
    icon: LucideIcon
    items: NavItem[]
}

export const navigation: NavSection[] = [
    {
        title: "决策层",
        icon: Brain,
        items: [
            { title: "经营成本板块", url: "/dashboard/decision/cost" },
            { title: "生产进度板块", url: "/dashboard/decision/progress" },
            { title: "资源保障板块", url: "/dashboard/decision/resources" },
            { title: "持续改进板块", url: "/dashboard/decision/improvement" },
        ],
    },
    {
        title: "执行层",
        icon: Play,
        items: [
            { title: "风险预警板块", url: "/dashboard/execution/risk" },
            { title: "六要素监控板块", url: "/dashboard/execution/six-elements" },
            { title: "生产过程监控板块", url: "/dashboard/execution/production" },
            { title: "进程协同管理板块", url: "/dashboard/execution/collaboration" },
        ],
    },
    {
        title: "态势感知可视化看板",
        icon: Monitor,
        items: [
            { title: "立体货柜电子屏", url: "/dashboard/awareness/cabinet" },
            { title: "物料转运通道电子屏", url: "/dashboard/awareness/material" },
            { title: "总成组装电子大屏", url: "/dashboard/awareness/assembly-large" },
            { title: "总成组装电子小屏", url: "/dashboard/awareness/assembly-small" },
            { title: "调试厂房电子屏", url: "/dashboard/awareness/debug" },
        ],
    },
]

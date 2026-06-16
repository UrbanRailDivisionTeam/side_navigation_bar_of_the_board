import { navigation, type NavItem } from "@/lib/navigation"
import { PageContent } from "./page-content"

function flattenItems(items: NavItem[]): NavItem[] {
    const result: NavItem[] = []
    for (const item of items) {
        result.push(item)
        if (item.children) {
            result.push(...flattenItems(item.children))
        }
    }
    return result
}

export function generateStaticParams() {
    const paths: { slug: string[] }[] = [{ slug: [] }]
    for (const section of navigation) {
        for (const item of flattenItems(section.items)) {
            const slug = item.url.replace("/dashboard/", "").split("/")
            paths.push({ slug })
        }
    }
    return paths
}

type Params = Promise<{ slug?: string[] }>

function resolveTitle(slug: string[]): string {
    const path = "/dashboard/" + slug.join("/")
    for (const section of navigation) {
        for (const item of flattenItems(section.items)) {
            if (item.url === path) {
                return item.title
            }
        }
    }
    return slug.join(" / ")
}

export default async function SectionPage({ params }: { params: Params }) {
    const { slug = [] } = await params
    const title = slug.length > 0 ? resolveTitle(slug) : ""

    return <PageContent slug={slug} title={title} />
}

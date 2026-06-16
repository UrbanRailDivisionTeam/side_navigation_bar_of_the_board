import { navigation } from "@/lib/navigation"
import { PageContent } from "./page-content"

export function generateStaticParams() {
    const paths: { slug: string[] }[] = [{ slug: [] }]
    for (const section of navigation) {
        for (const item of section.items) {
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
        for (const item of section.items) {
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

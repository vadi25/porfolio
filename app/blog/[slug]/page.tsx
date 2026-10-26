import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Polar } from "@/components/ice/polar"
import { formatPostDate, getPost, getPosts } from "@/lib/posts"
import { person } from "@/lib/site"

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  const title = post.draft ? `${post.title} (Draft)` : post.title
  return {
    title: `${title} — ${person.name}`,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <div className="ice-page">
      <a className="skip-link" href="#main-content">
        Skip to Main Content
      </a>
      <Polar />
      <main id="main-content" className="reading">
        <p className="back-link">
          <Link href="/blog">Blog</Link>
        </p>
        <article>
          {post.draft ? <p className="draft-flag">Draft</p> : null}
          <h1>{post.title}</h1>
          <p className="post-meta">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </p>
          <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </main>
    </div>
  )
}

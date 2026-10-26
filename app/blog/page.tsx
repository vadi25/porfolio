import type { Metadata } from "next"
import Link from "next/link"

import { Snow } from "@/components/ice/snow"
import { formatPostDate, getPosts } from "@/lib/posts"
import { person } from "@/lib/site"

export const metadata: Metadata = {
  title: `Blog — ${person.name}`,
  description: `Notes by ${person.name}.`,
}

export default function BlogIndexPage() {
  const posts = getPosts()

  return (
    <div className="ice-page">
      <a className="skip-link" href="#main-content">
        Skip to Main Content
      </a>
      <Snow />
      <main id="main-content" className="reading">
        <p className="back-link">
          <Link href="/">Home</Link>
        </p>
        <h1>Blog</h1>
        {posts.length === 0 ? <p className="bio">No notes yet.</p> : null}
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                {post.draft ? <span className="draft-flag">Draft</span> : null}
                <span className="post-title">{post.title}</span>
                <time className="post-meta" dateTime={post.date}>
                  {formatPostDate(post.date)}
                </time>
                {post.description ? <span className="post-description">{post.description}</span> : null}
              </Link>
            </li>
          ))}
        </ul>
        <p className="rss-link">
          <a href="/rss.xml">RSS</a>
        </p>
      </main>
    </div>
  )
}

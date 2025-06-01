import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return(
    <main className="flex min-h-screen flex-col lg:flex-row">
    {/* Visual Side - only visible on large screens */}
    <aside className="hidden lg:flex w-full lg:w-1/2 bg-gray-100 items-center justify-center">
      <img
        src="https://media.licdn.com/dms/image/v2/D4D12AQHARvg6qKGfoA/article-cover_image-shrink_720_1280/B4DZT4yvgtGcAM-/0/1739340840975?e=2147483647&v=beta&t=f_WLxXeJABjFMit5m4HUo3HrcLQaEb3YGkXqzAO3bZ8" // Replace with your actual image
        alt="Welcome visual"
        className="object-cover h-full"
      />
    </aside>

    {/* Auth Side */}
    <section className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6">
      <SignIn afterSignInUrl="/dashboard"/>
    </section>
  </main>
  )
}
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return(
    <main className="flex min-h-screen flex-col lg:flex-row">
    {/* Visual Side - only visible on large screens */}
    <aside className="hidden lg:flex w-full lg:w-1/2 bg-gray-100 items-center justify-center">
      <img
        src="/your-image.jpg" // Replace with your actual image
        alt="Welcome visual"
        className="object-cover w-full h-full"
      />
    </aside>

    {/* Auth Side */}
    <section className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6">
      <SignIn/>
    </section>
  </main>
  )
}
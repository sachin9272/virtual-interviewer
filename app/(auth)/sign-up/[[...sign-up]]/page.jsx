import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Image - hidden on small screens */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="/your-image-path.jpg" // replace with your actual image path
          alt="Sign Up Visual"
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Right SignUp Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <SignUp />
      </div>
    </div>
  );
}

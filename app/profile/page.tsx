import type { Metadata } from "next";
import ProfileView from "@/components/profile/ProfileView";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = { title: "My Profile" };

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        title="My Profile"
        subtitle="Your account details and BookNook activity."
      />
      <ProfileView />
    </div>
  );
}
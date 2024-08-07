// /app/dashboard/create-listings/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Listings - Explore Solana",
  description: "Add your Solana project or Blink to Explore Solana platform",
  // other metadata
};

const CreateListingsPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  return (
    <>
      <section className="flex-grow pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]">
            <div className="absolute bottom-17.5 left-0 -z-1 h-1/3 w-full">
              <Image
                src="/images/shape/shape-dotted-light.svg"
                alt="Dotted"
                className="dark:hidden"
                fill
              />
              <Image
                src="/images/shape/shape-dotted-dark.svg"
                alt="Dotted"
                className="hidden dark:block"
                fill
              />
            </div>
          </div>

          <div className="mb-10 flex flex-col items-center justify-center">
            <Link
              href="/"
              className=" text-foreground bg-btn-background hover:bg-btn-background-hover group absolute left-8 top-8 flex items-center rounded-md px-4 py-2 text-sm no-underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>{" "}
              Back
            </Link>
          </div>

          <h1 className="mb-5 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
            CREATE LISTINGS - DASHBOARD PAGE
          </h1>

          <div className="mb-5 text-center">
            <div>Welcome to Explore Solana!</div>
            <div>
              There are multiple explorers and directories on Explore Solana
              that you can submit your listings to.
            </div>
            <div>
              Please select one that match
              your listings type to get started 
              <br />
              (Submitting Blinks for example as
              a projects listings will be rejected and deleted not moved over to
              blinks because they are separate directories):
            </div>
            <div className="mt-4">
              <button className="m-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                <Link href="/dashboard/create-listings/projects">
                  Create Listings For Project
                </Link>
              </button>
              <button className="m-2 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700">
                <Link href="/dashboard/create-listings/blinks">
                  Create Listings For Blinks
                </Link>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateListingsPage;

// /components/Blinks/Listings/FullDetailsPage/ContentMain.tsx
"use client";
import React from "react";
import Link from "next/link";
import { AppendSiteUrlToExternalLink } from "@/utils/AppendSiteUrlToExternalLink";
import EmailSubscriptionForm from "@/components/Newsletter/EmailSubscriptionForm";
import { renderMultilineText } from "@/utils/FormatText";
import ListingsBlinksRelatedSuggestion from "../ListingsBlinksRelatedSuggestion";
import BlinksFavoritesButton from "../../Favorites/Button";
import BlinksRatingReviewsForm from "../../RatingsReviews/Form";
import BlinksRatingReviewsList from "../../RatingsReviews/List";
import Image from "next/image";

const ContentMain: React.FC<{
  listing: DisplayListingBlinksTypes;
  userId: string | null;
}> = ({ listing, userId }) => {
  const defaultImageUrl =
    "https://res.cloudinary.com/difhad1rl/image/upload/v1712648696/ExploreSol-Banner-01_qgtopx.jpg";

  return (
    <div className="lg:w-2/3">
      <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
        {/* Title */}
        <h1 className="mb-5 mt-11 text-center text-5xl font-semibold text-black dark:text-white 2xl:text-sectiontitle2">
          {listing.name} Blinks
        </h1>
        {/* Status */}
        <ul className="mb-9 flex flex-wrap gap-5 2xl:gap-7.5">
          <li>
            <span className="text-black dark:text-white">Project Status: </span>{" "}
            {listing.status}
          </li>
          {/* Year Created */}
          <li>
            <span className="text-black dark:text-white">Year Created: </span>{" "}
            {listing.year_created}
          </li>
          {/* Moderation Status */}
          <li>
            <span className="text-black dark:text-white">
              Moderation Status:{" "}
            </span>{" "}
            {listing.moderation_status}
          </li>
        </ul>
        {/* Image display */}
        <div className="mb-10 w-full overflow-hidden">
          <div className="relative flex aspect-[97/60] w-full items-center justify-center sm:aspect-[97/44]">
            <Image
              src={listing.image_url || defaultImageUrl}
              alt={listing.name}
              className="rounded-md object-cover object-center"
              width={800}
              height={800}
            />
          </div>
        </div>

        <div className="blog-details">
          {/* Favorite Button */}
          <BlinksFavoritesButton userId={userId} blinksId={listing.id} />

          {/* Registry Status */}
          <ul className="mb-9">
            <li>
              <span className="text-black dark:text-white">
                Registry Status:{" "}
              </span>{" "}
              {listing.blinks_registry_status} Blinks
            </li>
            <li>
              <span className="text-black dark:text-white">Categories: </span>{" "}
              {listing.category_1_name}, {listing.category_2_name},{" "}
              {listing.category_3_name}, {listing.category_4_name},{" "}
              {listing.category_5_name}
            </li>
          </ul>

          {/* Summary */}
          <h2>{listing.name} Blinks Summary:</h2>
          {renderMultilineText(listing.short_description)}
          <div>
            <b>Note:</b> Kindly check the blinks integrated platforms section to see current platforms
            where {listing.name} Blinks are available.
            <br />
            <br />
          </div>

          {/* Key Features */}
          <h2>{listing.name} Blinks Key Features:</h2>
          {renderMultilineText(listing.key_features)}

          {/* Demo Video */}
          <div className="mb-7">
            <h2>{listing.name} Blinks Demo:</h2>
            {listing.demo_url ? (
              <Link
                href={AppendSiteUrlToExternalLink(listing.demo_url)}
                target="_blank"
                className="text-blue-400 hover:text-blue-300"
              >
                See {listing.name} Blinks Demo
              </Link>
            ) : (
              <span className="text-gray-500">
                {listing.name} Demo link not available
              </span>
            )}
          </div>

          {/* Donate */}
          <div className="text-center">
            <h4>
              Kindly support to keep this ExploreSolana project going to
              continue to add more Solana projects like {listing.name}:
            </h4>
            <Link href={"/donate"} className="text-xl font-bold text-green-500">
              Kindly Donate Here - Thanks!
            </Link>
          </div>

          {/* Email Subscription Form */}
          <EmailSubscriptionForm />

          {/* Related Blinks Listings */}
          <div className="mt-8">
            <h2>{listing.name} Blinks Alternatives & Related Listings:</h2>
            Checkout {listing.name} Blinks alternatives below:
            {listing && listing.category_1_name && (
              <ListingsBlinksRelatedSuggestion
                mainCategory={listing.category_1_name}
              />
            )}
          </div>

          {/* Rate and Review */}
          <div className="mt-8">
            <h2>Rate & Review {listing.name} Blinks:</h2>
            <BlinksRatingReviewsForm blinksId={listing?.id} userId={userId} />
          </div>
          <div className="mt-8">
            <h2>{listing.name} Blinks Users Ratings & Reviews:</h2>
            <span>Discover other users experience with {listing.name}:</span>
            <BlinksRatingReviewsList blinksId={listing?.id} userId={null} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentMain;

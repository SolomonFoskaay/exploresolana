// ExploreSol/globalTypes.ts

/*
TYPE DEFINITION 1: for exploresol/app/directory/[slug]/page.tsx
Define a type for listing data and it can be used anywhere in the app 
to fix listings type errors
*/
type DisplayListingTypes = {
  id: number;
  author_id: string;
  author: string;
  name: string;
  logo_url: string;
  category: string;
  category_1: string;
  category_2: string;
  category_3: string;
  category_4: string;
  category_5: string;
  category_1_name?: string;
  category_2_name?: string;
  category_3_name?: string;
  category_4_name?: string;
  category_5_name?: string;
  status: string;
  keyword: string;
  year_founded: number;
  short_description: string;
  full_description: string;
  website: string;
  twitter: string;
  discord: string;
  telegram: string;
  solarplex: string;
  pros: string;
  cons: string;
  team: string;
  governance: string;
  blockchain: string;
  use_case: string;
  pricing: string;
  roadmap_url: string;
  whitepaper_url: string;
  nft_collection: string;
  nft_collection_url: string;
  tokenomic: string;
  token_name: string;
  demo_url: string;
  moderation_status: string;
  created_at: string;
  updated_at: string;
  slug: string;
}


/*
TYPE DEFINITION 2: for exploresol/components/CreateListings.tsx
Define a type for listing data and it can be used anywhere in the app 
to fix listings type errors

NOTE: commented out  like "id" means not needed for this form submission types
and leaving it there will cause error during form submission
*/
type CreateListingTypes = {
  // id: number; 
  // author_id: string;
  // author: string;
  name: string;
  logo_url: string;
  category_1: string;
  category_2: string;
  category_3: string;
  category_4: string;
  category_5: string;
  status: string;
  keyword: string;
  year_founded: number;
  short_description: string;
  full_description: string;
  website: string;
  twitter: string;
  discord: string;
  telegram: string;
  solarplex: string;
  pros: string;
  cons: string;
  team: string;
  governance: string;
  blockchain: string;
  use_case: string;
  pricing: string;
  roadmap_url: string;
  whitepaper_url: string;
  nft_collection: string;
  nft_collection_url: string;
  tokenomic: string;
  token_name: string;
  demo_url: string;
  moderation_status: string;
  // created_at: string;
  // updated_at: string;
  // slug: string;
}


/*
TYPE DEFINITION 3: for Categories types in 
exploresol/components/CreateListings.tsx
Define a type for listing data and it can be used anywhere in the app 
to fix listings type errors
*/
type CategoryListingTypes = {
  id: number;
  name: string;
}

/*
TYPE DEFINITION 4: for Categories name by IDs types 
Define a type for listing data and it can be used anywhere in the app 
to fix listings type errors
*/
interface CategoryNamesById {
  [key: string]: string;
}


/*
TYPE DEFINITION 5: for ListingsFullDetailsPageProps types 
Define a type for listing data and it can be used anywhere in the app 
to fix listings type errors
*/
type ListingsFullDetailsPageProps = {
  slug: string;
};

/*
TYPE DEFINITION 6: for Categories name by IDs types 
Define a type for listing data and it can be used anywhere in the app 
to fix listings type errors
*/
interface CategoryNamesWithId {
  //empty
}


/*
TYPE DEFINITION 7: for favorite props types 
Define a type for listing data and it can be used anywhere in the app 
to fix listings type errors
*/
// Define an interface for the component props
interface FavoritePageProps {
  userId: string | null;
  listingId: number | null;
}



/*
TYPE DEFINITION 8: for ratings reviews types 
Define a type for listing data and it can be used anywhere in the app 
to fix listings type errors
*/
type RatingsReviewsType = {
  id: number;
  rating: number;
  review: string;
  username: string;
  created_at: string;
};

/*
TYPE DEFINITION 8.1: for ratings reviews form props types 
Define a type for listing data and it can be used anywhere in the app 
to fix listings type errors
*/
interface RatingReviewsProps {
  listingId: number | null;
  userId: string | null;
}

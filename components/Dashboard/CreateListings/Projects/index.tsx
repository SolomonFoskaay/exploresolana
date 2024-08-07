// /components/Dashboard/CreateListings/Projects/index.tsx

"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { createClient } from "@/utils/supabase/client";
import axios from "axios";
import { motion } from "framer-motion";
import BasicInfo from "./BasicInfo";
import ProjectInfo from "./ProjectInfo";
import SocialMediaInfo from "./SocialMediaInfo";
import SupportInfo from "./SupportInfo";
import DownloadInfo from "./DownloadInfo";
import UploadInfo from "./UploadInfo";
import TeamInfo from "./TeamInfo"; // Import the new TeamInfo component

// Define types for categories and other fetched options
interface Category {
  id: number;
  name: string;
}

const CreateListingsProjects = () => {
  // Initial form data state
  const initialFormData = {
    name: "",
    logo_url: "",
    category_1: "",
    category_2: "",
    category_3: "",
    category_4: "",
    category_5: "",
    status: "",
    keyword: "",
    year_founded: 2050,
    short_description: "",
    full_description: "",
    website: "",
    twitter: "",
    discord: "",
    telegram: "",
    youtube: "",
    pros: "",
    cons: "",
    team: "",
    governance: "",
    blockchain: "",
    use_case: "",
    pricing: "",
    roadmap_url: "",
    whitepaper_url: "",
    nft_collection: "",
    nft_collection_url: "",
    tokenomic: "",
    token_name: "",
    demo_url: "",
    moderation_status: "pending",
    github_url: "",
    documentation_url: "",
    support_website_url: "",
    support_livechat_url: "",
    support_email: "",
    support_discord_url: "",
    support_twitter_url: "",
    support_telegram_url: "",
    download_google_play_url: "",
    download_apple_app_store_url: "",
    download_solana_dapp_store_url: "",
    download_chrome_extension_url: "",
    download_website_url: "",
    faq_url: "",
    source_code_access: "",
    linkedin: "",
    job_url: "",
    bounty_url: "",
    grant_url: "",
    team_1_name: "",
    team_1_x_url: "",
    team_1_linkedin_url: "",
    team_2_name: "",
    team_2_x_url: "",
    team_2_linkedin_url: "",
    team_3_name: "",
    team_3_x_url: "",
    team_3_linkedin_url: "",
    team_4_name: "",
    team_4_x_url: "",
    team_4_linkedin_url: "",
    team_5_name: "",
    team_5_x_url: "",
    team_5_linkedin_url: "",
    team_all_x_url: "",
    team_all_linkedin_url: "",
    team_all_website_url: "",
  };

  // State variables
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: string } | null>(
    null,
  );
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCategory1, setSelectedCategory1] = useState<string | null>(
    null,
  );
  const [selectedCategory2, setSelectedCategory2] = useState<string | null>(
    null,
  );
  const [selectedCategory3, setSelectedCategory3] = useState<string | null>(
    null,
  );
  const [selectedCategory4, setSelectedCategory4] = useState<string | null>(
    null,
  );
  const [selectedCategory5, setSelectedCategory5] = useState<string | null>(
    null,
  );
  const [statuses, setStatuses] = useState([]);
  const [pricingOptions, setPricingOptions] = useState([]);
  const [blockchainOptions, setBlockchainOptions] = useState([]);
  const [tokenomicOptions, setTokenomicOptions] = useState([]);
  const [nftcollectionOptions, setNftCollectionOptions] = useState([]);
  const [governanceOptions, setGovernanceOptions] = useState([]);
  const [sourceCodeAccessOptions, setSourceCodeAccessOptions] = useState([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const supabaseClient = createClient();

  // Fetch initial data and user information
  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabaseClient
        .from("categories")
        .select("id, name");
      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        // Sort the retrieved categories list alphabetically before set in state
        const sortedCategoriesData = data.sort((a, b) => a.name.localeCompare(b.name));
        setCategories(sortedCategoriesData);
      }
    }

    async function fetchStatuses() {
      const { data, error } = await supabaseClient.rpc("enum_status_values");
      if (error) {
        console.error("Error fetching statuses:", error);
      } else {
        setStatuses(data);
      }
    }

    async function fetchPricingOptions() {
      const { data, error } = await supabaseClient.rpc("enum_pricing_values");
      if (error) {
        console.error("Error fetching pricing options:", error);
      } else {
        setPricingOptions(data);
      }
    }

    async function fetchBlockchainOptions() {
      const { data, error } = await supabaseClient.rpc(
        "enum_blockchain_values",
      );
      if (error) {
        console.error("Error fetching blockchain options:", error);
      } else {
        setBlockchainOptions(data);
      }
    }

    async function fetchTokenomicOptions() {
      const { data, error } = await supabaseClient.rpc("enum_tokenomic_values");
      if (error) {
        console.error("Error fetching tokenomic options:", error);
      } else {
        setTokenomicOptions(data);
      }
    }

    async function fetchNftCollectionOptions() {
      const { data, error } = await supabaseClient.rpc(
        "enum_nft_collection_values",
      );
      if (error) {
        console.error("Error fetching NFT Collection options:", error);
      } else {
        setNftCollectionOptions(data);
      }
    }

    async function fetchGovernanceOptions() {
      const { data, error } = await supabaseClient.rpc(
        "enum_governance_values",
      );
      if (error) {
        console.error("Error fetching Governance options:", error);
      } else {
        setGovernanceOptions(data);
      }
    }

    async function fetchSourceCodeAccessOptions() {
      const { data, error } = await supabaseClient.rpc(
        "enum_source_code_access_values",
      );
      if (error) {
        console.error("Error fetching Source Code Access options:", error);
      } else {
        setSourceCodeAccessOptions(data);
      }
    }

    // Fetch user information and initial data
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();
      if (user) {
        setUserId(user.id);
        loadDraft(user.id);
      }
      fetchCategories();
      fetchStatuses();
      fetchPricingOptions();
      fetchBlockchainOptions();
      fetchTokenomicOptions();
      fetchNftCollectionOptions();
      fetchGovernanceOptions();
      fetchSourceCodeAccessOptions();
    };

    fetchData();
  }, []);

  // Auto-save the draft every minute
  useEffect(() => {
    const interval = setInterval(() => {
      saveDraft();
    }, 60000); // Auto-save every 1 minute

    return () => clearInterval(interval);
  }, [formData]);

  // Load draft from the database
  const loadDraft = async (userId: string) => {
    const { data, error } = await supabaseClient.rpc("get_draft", {
      user_uuid: userId,
    });

    if (data) {
      const draft = data[0].form_data;
      setFormData(draft);
      setSelectedCategory1(draft.category_1);
      setSelectedCategory2(draft.category_2);
      setSelectedCategory3(draft.category_3);
      setSelectedCategory4(draft.category_4);
      setSelectedCategory5(draft.category_5);
    } else if (error) {
      console.error("Error loading draft:", error);
    }
  };

  // Save draft to the database
  const saveDraft = async () => {
    if (!userId) return;

    const draftData = {
      ...formData,
      category_1: selectedCategory1,
      category_2: selectedCategory2,
      category_3: selectedCategory3,
      category_4: selectedCategory4,
      category_5: selectedCategory5,
    };

    const { error } = await supabaseClient.rpc("save_draft", {
      user_uuid: userId,
      form: draftData,
    });

    if (error) {
      console.error("Error saving draft:", error);
      setMessage({ text: "Error saving draft.", type: "error" });
    } else {
      setMessage({ text: "Draft saved successfully!", type: "success" });
      // Clear the message after 5 seconds
      setTimeout(() => setMessage(null), 15000);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    if (name === "year_founded") {
      const currentYear = new Date().getFullYear();
      if (value.length === 4 && (value < 1900 || value > currentYear)) {
        return;
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  // Handle category changes
  const handleCategoryChange = (categoryIndex: number, value: string) => {
    switch (categoryIndex) {
      case 1:
        setSelectedCategory1(value);
        break;
      case 2:
        setSelectedCategory2(value);
        break;
      case 3:
        setSelectedCategory3(value);
        break;
      case 4:
        setSelectedCategory4(value);
        break;
      case 5:
        setSelectedCategory5(value);
        break;
      default:
        break;
    }
  };

  // Handle file selection for image upload
  const handleFileSelect = (
    eventOrFile: File | ChangeEvent<HTMLInputElement>,
  ) => {
    let file: File | null = null;
    if (eventOrFile instanceof File) {
      file = eventOrFile;
    } else if (eventOrFile.target && eventOrFile.target.files) {
      file = eventOrFile.target.files[0];
    }
    if (file) {
      setSelectedFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  // Remove selected image
  const removeSelectedImage = () => {
    setSelectedFile(null);
    setImage(null);
  };

  // Drag and drop event handlers
  const dragOver = (e: { preventDefault: () => any }) => e.preventDefault();
  const dragEnter = (e: { preventDefault: () => any }) => e.preventDefault();
  const dragLeave = (e: { preventDefault: () => any }) => e.preventDefault();
  const fileDrop = (e: {
    preventDefault: () => void;
    dataTransfer: { files: any };
  }) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileSelect(files[0]);
    }
  };

  // Trigger file input click
  const onFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle form submission
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    console.log("Form submitted!");
    event.preventDefault();
    setLoading(true);
    setMessage({ text: "Submitting...", type: "pending" });

    let imageUrl = "";
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET!);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData,
        );
        imageUrl = response.data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        setLoading(false);
        setMessage({ text: "Failed to upload image.", type: "error" });
        // Clear the message after 5 seconds
        setTimeout(() => setMessage(null), 15000);
        return;
      }
    }

    const submissionData = {
      ...formData,
      logo_url: imageUrl,
      category_1: selectedCategory1 ? parseInt(selectedCategory1) : null,
      category_2: selectedCategory2 ? parseInt(selectedCategory2) : null,
      category_3: selectedCategory3 ? parseInt(selectedCategory3) : null,
      category_4: selectedCategory4 ? parseInt(selectedCategory4) : null,
      category_5: selectedCategory5 ? parseInt(selectedCategory5) : null,
    };

    try {
      const { data, error } = await supabaseClient
        .from("listings")
        .insert([submissionData]);
      if (error) {
        throw error;
      }
      setMessage({ text: "Listing added successfully!", type: "success" });
      setLoading(false);
      setFormData(initialFormData);
      setImage(null);
      setSelectedCategory1(null);
      setSelectedCategory2(null);
      setSelectedCategory3(null);
      setSelectedCategory4(null);
      setSelectedCategory5(null);

      // Delete the draft only after successful submission
      const deleteError = await deleteDraft(userId);
      if (deleteError) {
        console.error("Failed to delete draft:", deleteError);
      }
    } catch (error) {
      console.error("Failed to add listing:", error);
      const message = (error as any).message ?? "An unknown error occurred";
      setMessage({ text: `Failed to add listing: ${message}`, type: "error" });
    } finally {
      setLoading(false);
      // Clear the message after 5 seconds
      setTimeout(() => setMessage(null), 15000);
    }
  };

  // Delete draft from the database
  const deleteDraft = async (userId: string | null) => {
    if (!userId) return;

    const { error } = await supabaseClient
      .from("listings_drafts")
      .delete()
      .eq("user_id", userId);

    return error;
  };

  const [currentStep, setCurrentStep] = useState(0);

  // Steps for the multi-step form
  const steps = [
    <BasicInfo
      formData={formData}
      handleInputChange={handleInputChange}
      statuses={statuses}
      loading={loading}
    />,
    <ProjectInfo
      formData={formData}
      handleInputChange={handleInputChange}
      categories={categories}
      selectedCategory1={selectedCategory1}
      setSelectedCategory1={setSelectedCategory1}
      selectedCategory2={selectedCategory2}
      setSelectedCategory2={setSelectedCategory2}
      selectedCategory3={selectedCategory3}
      setSelectedCategory3={setSelectedCategory3}
      selectedCategory4={selectedCategory4}
      setSelectedCategory4={setSelectedCategory4}
      selectedCategory5={selectedCategory5}
      setSelectedCategory5={setSelectedCategory5}
      loading={loading}
      blockchainOptions={blockchainOptions}
      tokenomicOptions={tokenomicOptions}
      nftcollectionOptions={nftcollectionOptions}
      governanceOptions={governanceOptions}
      sourceCodeAccessOptions={sourceCodeAccessOptions}
      pricingOptions={pricingOptions}
      handleCategoryChange={handleCategoryChange}
    />,
    <SocialMediaInfo
      formData={formData}
      handleInputChange={handleInputChange}
      loading={loading}
    />,
    <SupportInfo
      formData={formData}
      handleInputChange={handleInputChange}
      loading={loading}
    />,
    <DownloadInfo
      formData={formData}
      handleInputChange={handleInputChange}
      loading={loading}
    />,
    <TeamInfo // Add the new TeamInfo step here
      formData={formData}
      handleInputChange={handleInputChange}
      loading={loading}
    />,
    <UploadInfo
      image={image}
      handleFileSelect={handleFileSelect}
      removeSelectedImage={removeSelectedImage}
      fileInputRef={fileInputRef}
      loading={loading}
      dragOver={dragOver}
      dragEnter={dragEnter}
      dragLeave={dragLeave}
      fileDrop={fileDrop}
      onFileInputClick={onFileInputClick}
    />,
  ];

  // Titles and summaries for each step
  const stepTitles = [
    "Basic Info",
    "Project Info",
    "Social Media Info",
    "Support Info",
    "Download Info",
    "Team Info", // Add the new step title here
    "Upload Image",
  ];

  const stepSummaries = [
    "Enter the basic information about your project.",
    "Provide detailed information about your project.",
    "Share social media account links for your project.",
    "Enter support-related details for your project.",
    "Provide download links for your project.",
    "Enter team information.", // Add the new step summary here
    "Upload the project logo or screenshot (must be 1200(Width)x630(Height)px).",
  ];

  return (
    <>
      <div className="flex w-full flex-1 flex-col items-center px-4 py-6">
        <div className="w-full max-w-4xl rounded bg-gray-700 p-5 shadow">
          <div className="col-span-full mb-4">
            <div className="mb-2 flex flex-wrap items-center justify-between">
              {stepTitles.map((title, index) => (
                <div
                  key={index}
                  className={`rounded p-2 ${currentStep === index ? "bg-green-500 text-white" : "bg-gray-500 text-gray-300"} mb-2 cursor-pointer`} // Added cursor-pointer for better UX
                  onClick={() => setCurrentStep(index)} // Added onClick handler
                >
                  {index + 1}. {title}
                </div>
              ))}
            </div>
            <p className="text-center text-white">
              {stepSummaries[currentStep]}
            </p>
          </div>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {steps[currentStep]}
          </form>
          <div className="col-span-full mt-4 flex justify-between">
            {currentStep > 0 && (
              <button
                type="button"
                className="btn rounded bg-blue-500 p-2 text-white hover:bg-blue-700"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Previous
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                className="btn rounded bg-blue-500 p-2 text-white hover:bg-blue-700"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                className="btn mx-auto mt-6 rounded bg-green-500 p-2 text-white hover:bg-green-700"
                onClick={handleSubmit}
                disabled={loading}
              >
                Submit
              </button>
            )}
            <button
              type="button"
              className="btn rounded bg-yellow-500 p-2 text-white hover:bg-yellow-700"
              onClick={saveDraft}
            >
              Save Draft
            </button>
          </div>
          {message && (
            <motion.div
              className="col-span-full mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p
                className={`text-m ${
                  message.type === "error"
                    ? "text-red-500"
                    : message.type === "success"
                      ? "text-green-500"
                      : "text-yellow-500"
                }`}
              >
                {message.text}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateListingsProjects;

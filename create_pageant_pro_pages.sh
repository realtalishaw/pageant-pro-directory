#!/bin/bash

# Create the base directory structure
mkdir -p src/app src/components

# Create the PageTemplate component
cat << EOF > src/components/PageTemplate.tsx
import React from 'react';

interface PageTemplateProps {
  pageName: string;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ pageName }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">{pageName}</h1>
    </div>
  );
};

export default PageTemplate;
EOF

# Function to create a page
create_page() {
    local dir="src/app/$1"
    local name="$2"
    mkdir -p "$dir"
    cat << EOF > "$dir/page.tsx"
import PageTemplate from '@/components/PageTemplate';

export default function $name() {
  return <PageTemplate pageName="$name" />;
}
EOF
}

# Create pages
create_page "" "Home"
create_page "login" "Login"
create_page "signup" "SignUp"
create_page "forgot-password" "ForgotPassword"
create_page "verify-email" "VerifyEmail"
create_page "directory" "Directory"
create_page "directory/search" "DirectorySearch"
create_page "directory/[id]" "DirectoryListing"
create_page "claim-profile" "ClaimProfile"
create_page "submit-listing" "SubmitListing"
create_page "profile/[username]" "UserProfile"
create_page "profile/edit" "EditProfile"
create_page "feed" "SocialFeed"
create_page "post/create" "CreatePost"
create_page "post/[id]" "SinglePost"
create_page "post/search" "PostSearch"
create_page "messages" "MessagesInbox"
create_page "messages/[id]" "Conversation"
create_page "sponsored-listing" "SponsoredListing"
create_page "upgrade-account" "UpgradeAccount"
create_page "search" "AdvancedSearch"
create_page "about" "About"
create_page "contact" "Contact"
create_page "faq" "FAQ"
create_page "terms" "TermsOfService"
create_page "privacy" "PrivacyPolicy"
create_page "dashboard" "UserDashboard"
create_page "admin/users" "ManageUsers"
create_page "admin/listings" "ManageListings"
create_page "admin/moderation" "ModerateContent"
create_page "admin/analytics" "ViewAnalytics"
create_page "notifications" "NotificationCenter"
create_page "events" "EventsCalendar"
create_page "events/[id]" "EventDetails"
create_page "events/create" "CreateEvent"
create_page "resources/articles" "Articles"
create_page "resources/tips" "TipsAndAdvice"
create_page "community/forums" "Forums"
create_page "community/groups" "Groups"
create_page "gallery" "MediaGallery"
create_page "reviews" "RatingsAndReviews"
create_page "sponsors" "SponsorDirectory"
create_page "sponsors/[id]" "SponsorProfile"

echo "All pages have been created successfully!"
import React from 'react';

// Layout
import MainAppLayout from '../components/layout/MainAppLayout';

// Organisms for Main Content
import PostComposer from '../components/Dashboard/PostComposer';
import StorySection from '../components/Dashboard/StorySection';
import PostCard from '../components/Dashboard/PostCard';

// Organisms for Right Sidebar
import SuggestedGroups from '../components/Dashboard/SuggestedGroups';

// Fixed Components
import ChatBar from '../components/Dashboard/ChatBar';

// TypeScript interfaces for data structures
interface PostUserData {
  name: string;
  avatarUrl: string;
}

interface PostStats {
  likes: number;
  comments: number;
  shares: number;
}

interface Post {
  id: string;
  user: PostUserData;
  timestamp: string;
  location?: string;
  content?: string;
  imageUrl?: string;
  mapImageUrl?: string;
  stats: PostStats;
}

interface CurrentAppUser {
  name: string;
  avatarUrl: string;
  firstName?: string;
}

const IndexPage: React.FC = () => {
  // Dummy data definitions
  const currentUserData: CurrentAppUser = {
    name: 'Olenna Mason',
    avatarUrl: 'https://via.placeholder.com/40?text=OM',
    firstName: 'Olenna',
  };

  const postsData: Post[] = [
    {
      id: 'post1',
      user: { name: 'Julia Fillory', avatarUrl: 'https://via.placeholder.com/40?text=JF' },
      timestamp: '2 hrs ago',
      location: 'Raleigh, North Carolina',
      content: 'Checking out some new stores downtown! The vibe is amazing and found some unique items. Highly recommend a visit if you are in the area. 🏙️☕',
      mapImageUrl: 'https://via.placeholder.com/600x338/A2D2FF/000000?Text=Map+of+Raleigh+Downtown',
      stats: { likes: 152, comments: 18, shares: 7 },
    },
    {
      id: 'post2',
      user: { name: 'Alex Chen', avatarUrl: 'https://via.placeholder.com/40?text=AC' },
      timestamp: '5 hrs ago',
      content: "Just adopted this little furball! Everyone, meet Luna. 🐾 Couldn't be happier right now. Any tips for new cat owners?",
      imageUrl: 'https://via.placeholder.com/600x450/FFA07A/000000?Text=Cute+Kitten+Luna',
      stats: { likes: 567, comments: 123, shares: 45 },
    },
    {
      id: 'post3',
      user: { name: 'Maria Rodriguez', avatarUrl: 'https://via.placeholder.com/40?text=MR' },
      timestamp: '1 day ago',
      location: 'Grand Canyon National Park',
      content: 'Absolutely breathtaking views at the Grand Canyon today. Nature is truly spectacular. Feeling so grateful for this experience. #travel #nature #grandcanyon',
      imageUrl: 'https://via.placeholder.com/600x400/87CEEB/000000?Text=Grand+Canyon+View',
      stats: { likes: 320, comments: 45, shares: 22 },
    },
    {
      id: 'post4',
      user: { name: 'TechLead Tom', avatarUrl: 'https://via.placeholder.com/40?text=TT' },
      timestamp: '3 days ago',
      content: "Excited to announce I'll be speaking at the Global Tech Summit 2024! My talk will be on 'The Future of AI in Web Development'. Hope to see some of you there. Full details and registration link in bio. #AI #WebDevelopment #TechSummit2024",
      stats: { likes: 189, comments: 33, shares: 15 },
    },
    {
      id: 'post5',
      user: { name: 'Creative Corner', avatarUrl: 'https://via.placeholder.com/40?text=CC' },
      timestamp: 'Jan 15 at 10:00 AM',
      content: 'New DIY tutorial up on our blog! Learn how to make these amazing custom planters. Perfect weekend project! 🌿✨ Link in bio!',
      imageUrl: 'https://via.placeholder.com/600x750/90EE90/000000?Text=DIY+Planters',
      stats: { likes: 412, comments: 67, shares: 30 },
    },
  ];

  // Content for the right sidebar
  const rightSidebarContent = (
    <div className="space-y-6">
      {/* The project requirements indicate StorySection is a horizontal scrolling component, which is typically in the main feed. */}
      {/* SuggestedGroups is appropriate for the right sidebar. */}
      <SuggestedGroups />
      {/* Additional right sidebar components like 'Contacts', 'Birthdays', etc., could be added here if needed */}
      {/* For example, a simple contacts list placeholder: */}
      {/* <Card>
        <CardHeader><CardTitle className="text-base">Contacts</CardTitle></CardHeader>
        <CardContent><p className="text-sm text-muted-foreground">Your contacts list would appear here.</p></CardContent>
      </Card> */}
    </div>
  );

  return (
    <MainAppLayout 
      currentUser={currentUserData} 
      rightSidebarContent={rightSidebarContent}
    >
      {/* Main content area children, will be styled by MainAppLayout's central column */}
      <PostComposer currentUser={{ name: currentUserData.name, avatarUrl: currentUserData.avatarUrl }} />
      <StorySection />
      
      {/* List of posts */}
      <div className="space-y-4">
        {postsData.map(post => (
          <PostCard
            key={post.id}
            id={post.id}
            user={post.user}
            timestamp={post.timestamp}
            location={post.location}
            content={post.content}
            imageUrl={post.imageUrl}
            mapImageUrl={post.mapImageUrl}
            stats={post.stats}
          />
        ))}
      </div>
      
      {/* ChatBar is fixed position, so its placement in the DOM tree here is fine */}
      {/* It will position itself relative to the viewport */}
      <ChatBar />
    </MainAppLayout>
  );
};

export default IndexPage;

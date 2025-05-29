import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, Archive, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

interface Story {
  id: string;
  userName: string;
  userAvatarUrl: string;
  storyImageUrl: string;
  isViewed?: boolean;
}

interface StorySectionProps {
  className?: string;
}

const storiesData: Story[] = [
  { id: '1', userName: 'Jane Doe', userAvatarUrl: 'https://via.placeholder.com/40?text=JD', storyImageUrl: 'https://via.placeholder.com/110x180/FFA500/FFFFFF?Text=Story+1', isViewed: false },
  { id: '2', userName: 'John Smith', userAvatarUrl: 'https://via.placeholder.com/40?text=JS', storyImageUrl: 'https://via.placeholder.com/110x180/4CAF50/FFFFFF?Text=Story+2', isViewed: false },
  { id: '3', userName: 'Alice Green', userAvatarUrl: 'https://via.placeholder.com/40?text=AG', storyImageUrl: 'https://via.placeholder.com/110x180/2196F3/FFFFFF?Text=Story+3', isViewed: true },
  { id: '4', userName: 'Bob White', userAvatarUrl: 'https://via.placeholder.com/40?text=BW', storyImageUrl: 'https://via.placeholder.com/110x180/9C27B0/FFFFFF?Text=Story+4', isViewed: false },
  { id: '5', userName: 'Carol Black', userAvatarUrl: 'https://via.placeholder.com/40?text=CB', storyImageUrl: 'https://via.placeholder.com/110x180/FFC107/000000?Text=Story+5', isViewed: true },
  { id: '6', userName: 'Dave Brown', userAvatarUrl: 'https://via.placeholder.com/40?text=DB', storyImageUrl: 'https://via.placeholder.com/110x180/795548/FFFFFF?Text=Story+6', isViewed: false },
];

const StorySection: React.FC<StorySectionProps> = ({ className }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className={cn('bg-card p-4 rounded-lg shadow', className)}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-card-foreground">Stories</h2>
        <div>
          <Button variant="ghost" size="sm" className="text-primary hover:bg-accent mr-1">
            <Archive className="w-4 h-4 mr-1" /> Archive
          </Button>
          <Button variant="ghost" size="sm" className="text-primary hover:bg-accent">
            <Settings className="w-4 h-4 mr-1" /> Settings
          </Button>
        </div>
      </div>
      <div className="relative">
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-card hover:bg-accent rounded-full shadow-md h-8 w-8 -ml-2 hidden md:flex"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div ref={scrollRef} className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          <Card className="w-[110px] h-[180px] flex-shrink-0 rounded-lg overflow-hidden relative group cursor-pointer border-2 border-dashed border-primary/50 hover:border-primary">
            <div className="bg-background h-3/5 flex items-center justify-center">
               {/* Placeholder for background image, if any */}
            </div>
            <div className="bg-card h-2/5 relative flex flex-col items-center justify-end pb-2">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary rounded-full p-1 border-2 border-card">
                <PlusCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <p className="text-xs font-medium text-center text-card-foreground mt-2">Add to Story</p>
            </div>
          </Card>
          {storiesData.map((story) => (
            <Card 
              key={story.id} 
              className={cn(
                'w-[110px] h-[180px] flex-shrink-0 rounded-lg overflow-hidden relative group cursor-pointer border-2',
                story.isViewed ? 'border-border' : 'border-primary'
              )}
            >
              <img src={story.storyImageUrl} alt={`${story.userName}'s story`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <Avatar className="absolute top-2 left-2 h-8 w-8 border-2 border-primary">
                <AvatarImage src={story.userAvatarUrl} alt={story.userName} />
                <AvatarFallback>{story.userName.substring(0, 1)}</AvatarFallback>
              </Avatar>
              <p className="absolute bottom-2 left-0 right-0 text-center text-xs font-medium text-white px-1 truncate">
                {story.userName}
              </p>
            </Card>
          ))}
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-card hover:bg-accent rounded-full shadow-md h-8 w-8 -mr-2 hidden md:flex"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default StorySection;

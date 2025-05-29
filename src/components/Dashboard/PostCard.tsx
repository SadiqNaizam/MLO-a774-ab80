import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, ThumbsUp, MessageCircle, Share2, Globe, MapPin, Bookmark, Bell, Flag, XCircle } from 'lucide-react';

interface PostUserData {
  name: string;
  avatarUrl: string;
}

interface PostStats {
  likes: number;
  comments: number;
  shares: number;
}

interface PostCardProps {
  id: string;
  user: PostUserData;
  timestamp: string;
  location?: string;
  content?: string;
  imageUrl?: string;
  mapImageUrl?: string; // For map-like content
  stats: PostStats;
  className?: string;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  user,
  timestamp,
  location,
  content,
  imageUrl,
  mapImageUrl,
  stats,
  className,
}) => {
  const [liked, setLiked] = React.useState(false);
  const [currentLikes, setCurrentLikes] = React.useState(stats.likes);

  const handleLike = () => {
    setLiked(!liked);
    setCurrentLikes(prev => liked ? prev -1 : prev + 1);
  };

  return (
    <Card className={cn('w-full shadow', className)}>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm text-card-foreground">
                {user.name} 
                {location && <span className="font-normal text-muted-foreground"> is in <MapPin className="inline h-3 w-3 mr-0.5"/>{location}</span>}
              </p>
              <div className="text-xs text-muted-foreground flex items-center">
                <span>{timestamp}</span>
                <span className="mx-1">·</span>
                <Globe className="w-3 h-3" />
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Bookmark className="mr-2 h-4 w-4" /> Save post</DropdownMenuItem>
              <DropdownMenuItem><Bell className="mr-2 h-4 w-4" /> Turn on notifications</DropdownMenuItem>
              <DropdownMenuItem><Flag className="mr-2 h-4 w-4" /> Report post</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10"><XCircle className="mr-2 h-4 w-4" /> Hide post</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {content && <p className="px-4 pb-3 text-sm text-card-foreground whitespace-pre-line">{content}</p>}
        {(imageUrl || mapImageUrl) && (
          <div className="bg-gray-200 aspect-[16/9] w-full overflow-hidden">
            <img 
              src={imageUrl || mapImageUrl || 'https://via.placeholder.com/600x338?text=Post+Image'}
              alt="Post content" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="p-2 flex flex-col items-start">
        {(currentLikes > 0 || stats.comments > 0 || stats.shares > 0) && (
           <div className="flex justify-between w-full px-2 py-2 text-xs text-muted-foreground">
            <div>{currentLikes > 0 && `${currentLikes} Likes`}</div>
            <div className='space-x-2'>
                {stats.comments > 0 && <span>{`${stats.comments} Comments`}</span>}
                {stats.shares > 0 && <span>{`${stats.shares} Shares`}</span>}
            </div>
          </div>
        )}
        <div className="w-full border-t border-border my-1"></div>
        <div className="flex justify-around w-full">
          <Button variant="ghost" className="text-muted-foreground hover:bg-accent flex-1 py-2" onClick={handleLike}>
            <ThumbsUp className={cn("w-5 h-5 mr-2", liked && "text-primary fill-primary/20")} />
            <span className={cn("text-sm font-medium", liked && "text-primary")}>Like</span>
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:bg-accent flex-1 py-2">
            <MessageCircle className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Comment</span>
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:bg-accent flex-1 py-2">
            <Share2 className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Share</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;

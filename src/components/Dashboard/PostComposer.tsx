import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Video, ImageDown, Users, Smile, MapPin, Flag, MoreHorizontal, PencilLine } from 'lucide-react';

interface PostComposerProps {
  className?: string;
  currentUser?: {
    name: string;
    avatarUrl: string;
  };
}

const PostComposer: React.FC<PostComposerProps> = ({ className, currentUser }) => {
  const [postText, setPostText] = useState<string>('');

  const defaultUser = {
    name: 'Olenna Mason',
    avatarUrl: 'https://via.placeholder.com/40?text=OM',
  };

  const user = currentUser || defaultUser;

  return (
    <div className={cn('bg-card p-4 rounded-lg shadow', className)}>
      <div className="flex items-center justify-between mb-3 px-2 pt-1 pb-2 border-b border-border">
        <Button variant="ghost" className="text-sm font-semibold text-muted-foreground hover:bg-accent px-3 py-2 rounded-md flex items-center">
          <PencilLine className="w-5 h-5 mr-2 text-blue-500" />
          Make Post
        </Button>
        <Button variant="ghost" className="text-sm font-semibold text-muted-foreground hover:bg-accent px-3 py-2 rounded-md flex items-center">
          <ImageDown className="w-5 h-5 mr-2 text-green-500" />
          Photo/Video Album
        </Button>
        <Button variant="ghost" className="text-sm font-semibold text-muted-foreground hover:bg-accent px-3 py-2 rounded-md flex items-center">
          <Video className="w-5 h-5 mr-2 text-red-500" />
          Live Video
        </Button>
      </div>
      <div className="flex items-start space-x-3 mb-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <Input
          type="text"
          placeholder={`What's on your mind, ${user.name.split(' ')[0]}?`}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          className="flex-1 rounded-full bg-background border-none h-10 px-4 text-md placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
        />
      </div>
      <Separator className="my-3" />
      <div className="flex justify-around items-center">
        <Button variant="ghost" className="text-muted-foreground hover:bg-accent flex-1">
          <ImageDown className="w-5 h-5 mr-2 text-green-500" />
          <span className="text-sm font-medium">Photo/Video</span>
        </Button>
        <Button variant="ghost" className="text-muted-foreground hover:bg-accent flex-1">
          <Users className="w-5 h-5 mr-2 text-blue-500" />
          <span className="text-sm font-medium">Tag Friends</span>
        </Button>
        <Button variant="ghost" className="text-muted-foreground hover:bg-accent flex-1 hidden sm:flex">
          <Smile className="w-5 h-5 mr-2 text-yellow-500" />
          <span className="text-sm font-medium">Feeling/Activity</span>
        </Button>
        <Button variant="ghost" className="text-muted-foreground hover:bg-accent flex-1 md:hidden">
          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
};

export default PostComposer;

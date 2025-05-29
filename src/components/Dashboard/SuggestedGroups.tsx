import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Users, X } from 'lucide-react';

interface GroupSuggestion {
  id: string;
  name: string;
  memberCount: number;
  bannerImageUrl: string;
  memberAvatarUrls: string[];
}

interface SuggestedGroupsProps {
  className?: string;
}

const groupsData: GroupSuggestion[] = [
  {
    id: '1',
    name: 'Mad Men (MADdicts)',
    memberCount: 6195,
    bannerImageUrl: 'https://via.placeholder.com/300x100/EEEEEE/AAAAAA?Text=Mad+Men+Banner',
    memberAvatarUrls: [
      'https://via.placeholder.com/30?text=U1',
      'https://via.placeholder.com/30?text=U2',
      'https://via.placeholder.com/30?text=U3',
      'https://via.placeholder.com/30?text=U4',
    ],
  },
  {
    id: '2',
    name: 'Dexter Morgan Fans',
    memberCount: 6984,
    bannerImageUrl: 'https://via.placeholder.com/300x100/DDDDDD/999999?Text=Dexter+Banner',
    memberAvatarUrls: [
      'https://via.placeholder.com/30?text=M1',
      'https://via.placeholder.com/30?text=M2',
      'https://via.placeholder.com/30?text=M3',
    ],
  },
  {
    id: '3',
    name: 'React Developers Hub',
    memberCount: 12050,
    bannerImageUrl: 'https://via.placeholder.com/300x100/CCCCCC/888888?Text=React+Banner',
    memberAvatarUrls: [
      'https://via.placeholder.com/30?text=R1',
      'https://via.placeholder.com/30?text=R2',
      'https://via.placeholder.com/30?text=R3',
      'https://via.placeholder.com/30?text=R4',
      'https://via.placeholder.com/30?text=R5',
    ],
  },
];

const SuggestedGroups: React.FC<SuggestedGroupsProps> = ({ className }) => {
  const [visibleGroups, setVisibleGroups] = React.useState(groupsData);

  const handleDismiss = (groupId: string) => {
    setVisibleGroups(prev => prev.filter(group => group.id !== groupId));
  };

  return (
    <Card className={cn('shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <CardTitle className="text-lg font-semibold">Suggested Groups</CardTitle>
        <Button variant="link" className="text-primary p-0 h-auto text-sm">See All</Button>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-border">
          {visibleGroups.map((group) => (
            <li key={group.id} className="p-4 hover:bg-accent/50 relative group">
              <Button 
                variant="ghost" 
                size="icon"
                className="absolute top-2 right-2 w-7 h-7 rounded-full opacity-0 group-hover:opacity-100 bg-background/50 hover:bg-background/80"
                onClick={() => handleDismiss(group.id)}
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </Button>
              <div className="relative h-20 rounded-md overflow-hidden mb-3">
                <img src={group.bannerImageUrl} alt={`${group.name} banner`} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 flex -space-x-2">
                  {group.memberAvatarUrls.slice(0, 4).map((avatarUrl, index) => (
                    <Avatar key={index} className="h-6 w-6 border-2 border-card">
                      <AvatarImage src={avatarUrl} />
                      <AvatarFallback>{index + 1}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
              <h3 className="font-semibold text-sm text-card-foreground mb-0.5 truncate">{group.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">{group.memberCount.toLocaleString()} members</p>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                <Plus className="w-4 h-4 mr-2" /> Join Group
              </Button>
            </li>
          ))}
          {visibleGroups.length === 0 && (
            <p className="text-center text-muted-foreground py-6 text-sm">No more group suggestions for now.</p>
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SuggestedGroups;

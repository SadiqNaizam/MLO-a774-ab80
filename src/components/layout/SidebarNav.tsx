import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Newspaper,
  MessageSquare,
  PlaySquare,
  Store,
  Users,
  Flag,
  CalendarDays,
  ListOrdered,
  HeartHandshake,
  ChevronDown,
  ChevronUp,
  Settings2,
  Megaphone,
  FilePlus,
  UsersRound,
  CalendarPlus,
  HandHeart,
  UserCircle,
  Gamepad2,
  Ellipsis
} from 'lucide-react';

// Define IconType based on lucide-react available icons
type IconType = React.ElementType;

interface SidebarNavItemProps {
  href: string;
  icon: IconType;
  label: string;
  isActive?: boolean;
  chip?: string | number;
  isSubItem?: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ href, icon: Icon, label, isActive, chip, isSubItem }) => {
  return (
    <a
      href={href}
      className={cn(
        'flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        isActive ? 'bg-sidebar-accent text-sidebar-primary font-semibold' : 'text-sidebar-foreground',
        isSubItem && 'pl-6 text-xs'
      )}
    >
      <Icon className={cn('h-5 w-5', isActive ? 'text-sidebar-primary' : 'text-sidebar-foreground/80')} />
      <span className="flex-1 truncate">{label}</span>
      {chip && (
        <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
          {chip}
        </span>
      )}
    </a>
  );
};

interface CurrentUser {
  name: string;
  avatarUrl: string;
}

interface SidebarNavProps {
  currentUser?: CurrentUser;
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ currentUser, className }) => {
  const [exploreOpen, setExploreOpen] = useState(true);
  const [shortcutsOpen, setShortcutsOpen] = useState(true);
  const [createOpen, setCreateOpen] = useState(false); // Closed by default as it's usually a popup/secondary actions

  const user = currentUser || {
    name: 'Olenna Mason',
    avatarUrl: 'https://via.placeholder.com/40?text=OM',
  };

  const mainNavItems = [
    { id: 'news_feed', label: 'News Feed', icon: Newspaper, href: '#', isActive: true },
    { id: 'messenger', label: 'Messenger', icon: MessageSquare, href: '#' },
    { id: 'watch', label: 'Watch', icon: PlaySquare, href: '#', chip: '9+' },
    { id: 'marketplace', label: 'Marketplace', icon: Store, href: '#' },
  ];

  const shortcutItems = [
    { id: 'farmville', label: 'FarmVille 2', icon: Gamepad2, href: '#' },
    { id: 'your_game', label: 'Your Favorite Game', icon: Gamepad2, href: '#' },
  ];

  const exploreItems = [
    { id: 'events', label: 'Events', icon: CalendarDays, href: '#', chip: 12 },
    { id: 'pages', label: 'Pages', icon: Flag, href: '#' },
    { id: 'groups', label: 'Groups', icon: Users, href: '#', chip: '3 new' },
    { id: 'friend_lists', label: 'Friend Lists', icon: ListOrdered, href: '#' },
    { id: 'fundraisers', label: 'Fundraisers', icon: HeartHandshake, href: '#' },
  ];

  const createItems = [
    { id: 'ad', label: 'Ad', icon: Megaphone, href: '#' },
    { id: 'page', label: 'Page', icon: FilePlus, href: '#' },
    { id: 'group', label: 'Group', icon: UsersRound, href: '#' },
    { id: 'event', label: 'Event', icon: CalendarPlus, href: '#' },
    { id: 'fundraiser_create', label: 'Fundraiser', icon: HandHeart, href: '#' },
  ];

  return (
    <aside className={cn('fixed left-0 top-0 z-0 h-screen w-[280px] bg-sidebar border-r border-sidebar-border flex flex-col', className)}>
      <div className="h-[60px] flex-shrink-0">{/* Placeholder for TopHeader overlap */}</div>
      <ScrollArea className="flex-1 py-4">
        <div className="px-3 space-y-1">
          <a href="#" className="flex items-center space-x-3 rounded-md px-3 py-2 mb-2 hover:bg-sidebar-accent">
            <Avatar className="h-7 w-7">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-sm text-sidebar-foreground truncate">{user.name}</span>
          </a>
        </div>

        <nav className="px-3 space-y-1">
          {mainNavItems.map((item) => (
            <SidebarNavItem key={item.id} {...item} />
          ))}
        </nav>

        <Separator className="my-4 mx-3 w-auto bg-sidebar-border" />

        <Collapsible open={shortcutsOpen} onOpenChange={setShortcutsOpen} className="px-3 space-y-1">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-sidebar-accent w-full">
              <h3 className="text-xs font-semibold uppercase text-sidebar-foreground/70 tracking-wider">Shortcuts</h3>
              {shortcutsOpen ? <ChevronUp className="h-4 w-4 text-sidebar-foreground/70" /> : <ChevronDown className="h-4 w-4 text-sidebar-foreground/70" />}
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
            {shortcutItems.map((item) => (
              <SidebarNavItem key={item.id} {...item} isSubItem />
            ))}
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible open={exploreOpen} onOpenChange={setExploreOpen} className="px-3 space-y-1 mt-2">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-sidebar-accent w-full">
              <h3 className="text-xs font-semibold uppercase text-sidebar-foreground/70 tracking-wider">Explore</h3>
              {exploreOpen ? <ChevronUp className="h-4 w-4 text-sidebar-foreground/70" /> : <ChevronDown className="h-4 w-4 text-sidebar-foreground/70" />}
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
            {exploreItems.slice(0, 5).map((item) => ( // Show initial items, can add 'See More' logic
              <SidebarNavItem key={item.id} {...item} isSubItem />
            ))}
             {/* Add See More/Less button if needed */}
          </CollapsibleContent>
        </Collapsible>

        <Separator className="my-4 mx-3 w-auto bg-sidebar-border" />

        <Collapsible open={createOpen} onOpenChange={setCreateOpen} className="px-3 space-y-1">
           <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-sidebar-accent w-full">
              <h3 className="text-xs font-semibold uppercase text-sidebar-foreground/70 tracking-wider">Create</h3>
              {createOpen ? <ChevronUp className="h-4 w-4 text-sidebar-foreground/70" /> : <ChevronDown className="h-4 w-4 text-sidebar-foreground/70" />}
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
            {createItems.map((item) => (
              <SidebarNavItem key={item.id} {...item} isSubItem />
            ))}
          </CollapsibleContent>
        </Collapsible>

      </ScrollArea>
      <div className="px-3 py-3 border-t border-sidebar-border mt-auto flex-shrink-0">
        <Button variant="ghost" className="w-full justify-start text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <Settings2 className="h-5 w-5 mr-3" />
          <span className="text-sm">Settings</span>
        </Button>
      </div>
    </aside>
  );
};

export default SidebarNav;

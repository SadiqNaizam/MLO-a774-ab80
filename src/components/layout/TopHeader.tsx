import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  Facebook,
  Search,
  Home,
  Users,
  PlaySquare,
  Store,
  Users2, // Using Users2 for a slightly different 'groups' icon feel
  PlusCircle,
  MessageSquare,
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  UserCircle,
  HelpCircle
} from 'lucide-react';

interface CurrentUser {
  name: string;
  avatarUrl: string;
  firstName?: string;
}

interface TopHeaderProps {
  currentUser?: CurrentUser;
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ currentUser, className }) => {
  const user = currentUser || {
    name: 'Olenna Mason',
    avatarUrl: 'https://via.placeholder.com/32?text=OM',
    firstName: 'Olenna',
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, href: '#', isActive: true },
    { id: 'friends', label: 'Friends', icon: Users, href: '#' },
    { id: 'watch', label: 'Watch', icon: PlaySquare, href: '#' },
    { id: 'marketplace', label: 'Marketplace', icon: Store, href: '#' },
    { id: 'groups', label: 'Groups', icon: Users2, href: '#' },
  ];

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-20 h-[60px] bg-card border-b border-border flex items-center justify-between px-4 shadow-sm', className)}>
      {/* Left Section */}
      <div className="flex items-center space-x-2">
        <a href="#" aria-label="Facebook home">
          <Facebook className="h-10 w-10 text-primary fill-primary" />
        </a>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search Facebook"
            className="pl-9 pr-3 py-2 h-9 w-[240px] rounded-full bg-background border-none focus-visible:ring-1 focus-visible:ring-primary text-sm"
          />
        </div>
        <Button variant="ghost" size="icon" className="md:hidden rounded-full">
          <Search className="h-5 w-5 text-foreground" />
        </Button>
      </div>

      {/* Center Section - Navigation Links */}
      <nav className="hidden lg:flex flex-grow justify-center items-center space-x-2 max-w-xl">
        {navItems.map(item => (
          <Button
            key={item.id}
            variant="ghost"
            asChild
            className={cn(
              'group h-12 w-24 flex-col justify-center rounded-md hover:bg-accent px-1',
              item.isActive && 'border-b-2 border-primary text-primary'
            )}
          >
            <a href={item.href} aria-label={item.label}>
              <item.icon className={cn('h-6 w-6', item.isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')} />
            </a>
          </Button>
        ))}
      </nav>

      {/* Right Section - Actions & Profile */}
      <div className="flex items-center space-x-2">
        <Button variant="secondary" size="sm" className="hidden md:flex items-center rounded-full bg-muted hover:bg-muted/80 text-sm font-semibold">
          <PlusCircle className="h-5 w-5 mr-1.5 text-foreground" /> Create
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full relative bg-muted hover:bg-muted/80">
          <MessageSquare className="h-5 w-5 text-foreground" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs" variant="destructive">8</Badge>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full relative bg-muted hover:bg-muted/80">
          <Bell className="h-5 w-5 text-foreground" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs" variant="destructive">36</Badge>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full p-0 h-9 w-9 bg-muted hover:bg-muted/80">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map(n=>n[0]).join('').toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1 p-2 hover:bg-accent rounded-md cursor-pointer">
                <div className="flex items-center space-x-2">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.split(' ').map(n=>n[0]).join('').toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-semibold leading-none text-card-foreground">{user.name}</p>
                </div>
                <p className="text-xs leading-none text-muted-foreground">See your profile</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Settings & Privacy</DropdownMenuItem>
            <DropdownMenuItem><HelpCircle className="mr-2 h-4 w-4" /> Help & Support</DropdownMenuItem>
            <DropdownMenuItem><UserCircle className="mr-2 h-4 w-4" /> Display & Accessibility</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><LogOut className="mr-2 h-4 w-4" /> Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;

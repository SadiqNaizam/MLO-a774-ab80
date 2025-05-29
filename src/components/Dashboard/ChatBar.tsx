import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquarePlus, Users, Settings2, Search, ChevronUp, ChevronDown, Circle } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  avatarUrl: string;
  isOnline: boolean;
  lastMessage?: string;
  unreadCount?: number;
}

interface ChatBarProps {
  className?: string;
}

const contactsData: Contact[] = [
  { id: '1', name: 'Alice Wonderland', avatarUrl: 'https://via.placeholder.com/32?text=AW', isOnline: true, lastMessage: 'Hey, how are you?', unreadCount: 2 },
  { id: '2', name: 'Bob The Builder', avatarUrl: 'https://via.placeholder.com/32?text=BB', isOnline: true, lastMessage: 'Can we fix it?' },
  { id: '3', name: 'Charlie Chaplin', avatarUrl: 'https://via.placeholder.com/32?text=CC', isOnline: false, lastMessage: 'A day without laughter...' },
  { id: '4', name: 'Diana Prince', avatarUrl: 'https://via.placeholder.com/32?text=DP', isOnline: true, unreadCount: 1 },
  { id: '5', name: 'Edward Scissorhands', avatarUrl: 'https://via.placeholder.com/32?text=ES', isOnline: false },
  { id: '6', name: 'Fiona Gallagher', avatarUrl: 'https://via.placeholder.com/32?text=FG', isOnline: true, lastMessage: 'Running late!' },
];

const ChatBar: React.FC<ChatBarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredContacts = contactsData.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={cn('fixed bottom-0 right-4 w-[300px] z-50', className)}>
      <div className="bg-card shadow-lg rounded-t-lg overflow-hidden border border-b-0">
        <div 
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-accent"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center space-x-2">
            <Avatar className="h-7 w-7">
              <AvatarImage src="https://via.placeholder.com/32?text=Me" alt="My Avatar" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-sm text-card-foreground">Chat</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="w-7 h-7 rounded-full" onClick={(e) => e.stopPropagation()}>
              <MessageSquarePlus className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="w-7 h-7 rounded-full" onClick={(e) => e.stopPropagation()}>
              <Users className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="w-7 h-7 rounded-full" onClick={(e) => e.stopPropagation()}>
              <Settings2 className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="w-7 h-7 rounded-full">
              {isOpen ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronUp className="w-4 h-4 text-muted-foreground" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <>
            <div className="p-2 border-t border-b">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  type="text"
                  placeholder="Search contacts..."
                  className="pl-8 h-8 text-xs rounded-md bg-background border-none focus-visible:ring-1 focus-visible:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <ScrollArea className="h-[300px]">
              <div className="p-2 space-y-1">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map(contact => (
                    <div 
                      key={contact.id} 
                      className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-accent cursor-pointer"
                    >
                      <Avatar className="h-8 w-8 relative">
                        <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                        <AvatarFallback>{contact.name.substring(0,1)}</AvatarFallback>
                        {contact.isOnline && (
                          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-card ring-white" />
                        )}
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-card-foreground truncate">{contact.name}</p>
                        {contact.lastMessage && <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>}
                      </div>
                      {contact.unreadCount && contact.unreadCount > 0 && (
                        <div className="bg-primary text-primary-foreground text-[10px] font-semibold rounded-full px-1.5 py-0.5">
                          {contact.unreadCount}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-xs text-muted-foreground py-4">No contacts found.</p>
                )}
              </div>
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBar;

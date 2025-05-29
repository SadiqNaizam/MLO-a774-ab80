import React from 'react';
import { cn } from '@/lib/utils';
import TopHeader from './TopHeader';
import SidebarNav from './SidebarNav';

interface MainAppLayoutProps {
  children: React.ReactNode;
  rightSidebarContent?: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({
  children,
  rightSidebarContent,
  className,
}) => {
  const currentUser = {
    name: 'Olenna Mason',
    avatarUrl: 'https://via.placeholder.com/40?text=OM',
    firstName: 'Olenna'
  };

  return (
    <div className={cn('h-screen flex flex-col bg-background text-foreground', className)}>
      <TopHeader currentUser={currentUser} />
      <div className="flex flex-1 pt-[60px]"> {/* pt-[60px] to offset fixed TopHeader */}
        <SidebarNav currentUser={currentUser} />
        <div className="flex flex-1 pl-[280px]"> {/* pl-[280px] to offset fixed SidebarNav */}
          <main className="flex-1 overflow-y-auto bg-background">
            {/* Layout Requirements: mainContent: layout: "grid grid-cols-1 gap-4 px-6 pt-6", container: "flex flex-col gap-6 pb-6" */}
            {/* Applying container style directly here */}
            <div className="w-full max-w-[1024px] mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
              {children}
            </div>
          </main>
          {rightSidebarContent && (
            <aside className="w-[300px] h-full overflow-y-auto border-l border-border bg-background p-4 hidden xl:block">
              {/* Note: h-full here means calc(100vh - 60px) because of parent's pt-[60px] */}
              {rightSidebarContent}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainAppLayout;

import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopNavigation from './TopNavigation';
import './layout.css';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="global-visual">
          <div className="abstract-shape shape-1"></div>
          <div className="abstract-shape shape-2"></div>
        </div>
        <TopNavigation />
        <main className="page-container" style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}

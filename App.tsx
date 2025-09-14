import React, { useState, useEffect, useMemo } from 'react';
import { Stream, FeedMode, User, Comment } from './types';
import { initialStreams } from './data/mockData';
import { TranslationProvider } from './contexts/TranslationContext';
import Header from './components/Header';
import StreamFeed from './components/StreamFeed';
import DetailView from './components/DetailView';
import SettingsModal from './components/SettingsModal';
import ComposeBar from './components/ComposeBar';

const currentUser: User = { id: `user-${Date.now()}` }; // Simple session user

function App() {
  const [streams, setStreams] = useState<Stream[]>(initialStreams);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [feedMode, setFeedMode] = useState<FeedMode>('global');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [expiringStreams, setExpiringStreams] = useState<Set<string>>(new Set());

  // Prune expired streams
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const activeStreams = streams.filter(s => s.expiresAt > now);
      if (activeStreams.length < streams.length) {
          
        const expiredIds = streams.filter(s => s.expiresAt <= now).map(s => s.id);
        const newExpiring = new Set(expiringStreams);
        expiredIds.forEach(id => newExpiring.add(id));
        setExpiringStreams(newExpiring);

        // Wait for fade-out animation before removing
        setTimeout(() => {
            setStreams(currentStreams => currentStreams.filter(s => s.expiresAt > now));
            setExpiringStreams(new Set());
            if (selectedStream && expiredIds.includes(selectedStream.id)) {
                setSelectedStream(null);
            }
        }, 500); // match animation duration
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [streams, selectedStream, expiringStreams]);
  
  const handleAddPost = (body: string, durationMinutes: number, visibility: FeedMode) => {
    const newStream: Stream = {
      id: `stream-${Date.now()}`,
      author: currentUser,
      body,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + durationMinutes * 60 * 1000),
      visibility,
      comments: [],
    };
    setStreams(prev => [newStream, ...prev]);
  };

  const handleAddComment = (streamId: string, body: string, parentId?: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: currentUser,
      body,
      createdAt: new Date(),
      replies: [],
    };

    const addReplyRecursively = (comments: Comment[]): Comment[] => {
      return comments.map(comment => {
        // Base case: found the parent comment
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [newComment, ...comment.replies]
          };
        }
        // Recursive step: check replies of the current comment
        if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: addReplyRecursively(comment.replies)
          };
        }
        // Not the parent and no replies to check, return as is
        return comment;
      });
    };

    const updatedStreams = streams.map(stream => {
      if (stream.id !== streamId) {
        return stream;
      }

      const updatedComments = parentId
        ? addReplyRecursively(stream.comments)
        : [newComment, ...stream.comments];
      
      const updatedStream: Stream = {
        ...stream,
        comments: updatedComments
      };
      
      // If the currently viewed stream is the one being updated, refresh its state
      if (selectedStream?.id === streamId) {
        setSelectedStream(updatedStream);
      }

      return updatedStream;
    });

    setStreams(updatedStreams);
  };

  const filteredStreams = useMemo(() => {
    return streams
        .filter(stream => stream.visibility === feedMode || feedMode === 'global')
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [streams, feedMode]);
  
  const handleSelectStream = (stream: Stream) => {
      setSelectedStream(stream);
  };
  
  const handleBack = () => {
      setSelectedStream(null);
  };

  const handleFeedModeChange = (mode: FeedMode) => {
    setFeedMode(mode);
  };

  return (
    <TranslationProvider>
      <div className="bg-slate-900 text-slate-100 min-h-screen font-sans">
        <Header 
          onSettings={() => setIsSettingsOpen(true)}
          feedMode={feedMode}
          onFeedModeChange={handleFeedModeChange}
        />

        <main className="container mx-auto px-4 pb-40">
          {selectedStream ? (
            <DetailView stream={selectedStream} onBack={handleBack} onAddComment={handleAddComment}/>
          ) : (
            <StreamFeed streams={filteredStreams} onSelectStream={handleSelectStream} expiringStreams={expiringStreams} />
          )}
        </main>
        
        {!selectedStream && <ComposeBar onPost={handleAddPost} />}
        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      </div>
    </TranslationProvider>
  );
}

export default App;
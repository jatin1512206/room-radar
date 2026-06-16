import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export default function Favorites() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Heart className="w-8 h-8 text-primary" />
      </div>
      <h1 className="font-display text-2xl font-bold mb-2">Saved Properties</h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Properties you save will appear here. Browse listings and tap the heart icon to save your favorites.
      </p>
      <Link to="/listings">
        <Button size="lg" className="font-medium">Browse Listings</Button>
      </Link>
    </div>
  );
}
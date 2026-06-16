import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg text-background">RoomRadar</span>
            </div>
            <p className="text-sm text-background/60 leading-relaxed">
              Helping students find the perfect accommodation near their colleges across 50+ cities in India.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-background mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-3">
              <Link to="/listings" className="block text-sm hover:text-primary transition-colors">Browse Listings</Link>
              <Link to="/list-property" className="block text-sm hover:text-primary transition-colors">List Your Property</Link>
              <Link to="/" className="block text-sm hover:text-primary transition-colors">About Us</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-background mb-4 text-sm uppercase tracking-wider">Top Cities</h4>
            <div className="space-y-3">
              {["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad"].map(city => (
                <Link key={city} to={`/listings?city=${city}`} className="block text-sm hover:text-primary transition-colors">
                  {city}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-background mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                support@roomradar.in
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                +91 98765 43210
              </div>
              <div className="flex items-center gap-3 mt-4">
                <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/40">
          © 2026 RoomRadar. All rights reserved. Made with ❤️ for students.
        </div>
      </div>
    </footer>
  );
}
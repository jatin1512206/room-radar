import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import {
  MapPin, Star, Heart, Wifi, UtensilsCrossed, Shield, AirVent,
  ChevronLeft, ChevronRight, BadgeCheck, Users
} from 'lucide-react';

const facilityIconMap = {
  "Wi-Fi": Wifi,
  "Food": UtensilsCrossed,
  "Security": Shield,
  "AC": AirVent,
};

const genderColors = {
  boys: "bg-blue-100 text-blue-700",
  girls: "bg-pink-100 text-pink-700",
  "co-ed": "bg-purple-100 text-purple-700",
};

export default function PropertyCard({ property, index = 0 }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const images = property.images?.length > 0
    ? property.images
    : ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80"];

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage(prev => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage(prev => (prev - 1 + images.length) % images.length);
  };

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      viewport={{ once: true }}
    >
      <Link to={`/property/${property.id}`} className="group block">
        <div className="bg-card rounded-2xl border border-border/60 overflow-hidden hover:shadow-xl hover:shadow-foreground/5 transition-all duration-300 hover:-translate-y-1">
          {/* Image Section */}
          <div className="relative aspect-[16/11] overflow-hidden">
            <img
              src={images[currentImage]}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Image navigation */}
            {images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-white">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-white">
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, idx) => (
                    <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImage ? 'bg-white w-4' : 'bg-white/60'}`} />
                  ))}
                </div>
              </>
            )}

            {/* Like Button */}
            <button onClick={toggleLike} className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
              <Heart className={`w-4 h-4 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-foreground/60'}`} />
            </button>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {property.is_verified && (
                <Badge className="bg-green-500 text-white border-0 gap-1 text-xs">
                  <BadgeCheck className="w-3 h-3" /> Verified
                </Badge>
              )}
              {property.is_featured && (
                <Badge className="bg-accent text-accent-foreground border-0 text-xs">Featured</Badge>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-base leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                {property.title}
              </h3>
              {property.rating > 0 && (
                <div className="flex items-center gap-1 shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold">{property.rating?.toFixed(1)}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{property.area}{property.area && property.city ? ', ' : ''}{property.city}</span>
              {property.distance_from_college && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full shrink-0 font-medium">
                  {property.distance_from_college} from college
                </span>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {property.gender && (
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${genderColors[property.gender] || 'bg-secondary text-secondary-foreground'}`}>
                  <Users className="w-3 h-3 inline mr-1" />
                  {property.gender}
                </span>
              )}
              {property.property_type && (
                <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-secondary text-secondary-foreground uppercase">
                  {property.property_type}
                </span>
              )}
              {property.sharing_options?.slice(0, 2).map(opt => (
                <span key={opt} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                  {opt}
                </span>
              ))}
            </div>

            {/* Facilities preview */}
            <div className="flex items-center gap-3 mb-4">
              {property.facilities?.slice(0, 4).map(f => {
                const Icon = facilityIconMap[f];
                return Icon ? (
                  <div key={f} className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{f}</span>
                  </div>
                ) : null;
              })}
            </div>

            {/* Price */}
            <div className="flex items-end justify-between pt-3 border-t border-border/60">
              <div>
                <p className="font-display font-bold text-xl text-primary">
                  ₹{property.price_per_month?.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">per month</p>
              </div>
              {property.deposit > 0 && (
                <p className="text-xs text-muted-foreground">
                  Deposit: ₹{property.deposit?.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
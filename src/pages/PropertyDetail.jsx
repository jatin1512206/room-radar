import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProperty } from '@/api/properties';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin, Star, Phone, ChevronLeft, ChevronRight, BadgeCheck,
  Calendar, IndianRupee, Users, ArrowLeft, Share2,
  Wifi, UtensilsCrossed, Shield, AirVent, Car, Zap, Eye, BookOpen,
  Flame, Tv, Sparkles, Heart, Loader2
} from 'lucide-react';

const facilityIconMap = {
  "Wi-Fi": Wifi, "AC": AirVent, "Food": UtensilsCrossed, "Security": Shield,
  "Parking": Car, "Power Backup": Zap, "CCTV": Eye, "Study Room": BookOpen,
  "Hot Water": Flame, "TV/Common Room": Tv, "Housekeeping": Sparkles, "Medical": Heart,
  "Laundry": Sparkles, "Gym": Zap,
};

export default function PropertyDetail() {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);

  const { data: property, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: () => getProperty(id),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="font-display text-2xl font-bold">Property not found</h2>
        <Link to="/listings"><Button>Browse Listings</Button></Link>
      </div>
    );
  }

  const images = property.images?.length > 0
    ? property.images
    : ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"];

  const whatsappLink = property.contact_whatsapp
    ? `https://wa.me/${property.contact_whatsapp.replace(/\D/g, '')}?text=Hi, I found your listing "${property.title}" on RoomRadar. I'm interested to know more.`
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back */}
      <Link to="/listings" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-secondary">
            <motion.img
              key={currentImage}
              src={images[currentImage]}
              alt={property.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImage(p => (p - 1 + images.length) % images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentImage(p => (p + 1) % images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-xs font-medium">
                  {currentImage + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    i === currentImage ? 'border-primary ring-2 ring-primary/20' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Title & Info */}
          <div>
            <div className="flex items-start gap-3 flex-wrap mb-2">
              {property.is_verified && (
                <Badge className="bg-green-500 text-white border-0 gap-1">
                  <BadgeCheck className="w-3 h-3" /> Verified
                </Badge>
              )}
              {property.is_featured && (
                <Badge className="bg-accent text-accent-foreground border-0">Featured</Badge>
              )}
              {property.property_type && (
                <Badge variant="secondary" className="uppercase">{property.property_type}</Badge>
              )}
              {property.gender && (
                <Badge variant="outline" className="capitalize">{property.gender}</Badge>
              )}
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold mt-3">{property.title}</h1>

            <div className="flex items-center gap-4 mt-3 text-muted-foreground text-sm flex-wrap">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {property.address || `${property.area}, ${property.city}`}
              </span>
              {property.rating > 0 && (
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {property.rating?.toFixed(1)} ({property.total_reviews} reviews)
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          {property.description && (
            <div>
              <h2 className="font-display font-semibold text-lg mb-3">About this property</h2>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>
          )}

          {/* Facilities */}
          {property.facilities?.length > 0 && (
            <div>
              <h2 className="font-display font-semibold text-lg mb-4">Facilities & Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.facilities.map(f => {
                  const Icon = facilityIconMap[f] || Sparkles;
                  return (
                    <div key={f} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border/40">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{f}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sharing Options */}
          {property.sharing_options?.length > 0 && (
            <div>
              <h2 className="font-display font-semibold text-lg mb-4">Room Sharing Options</h2>
              <div className="flex flex-wrap gap-3">
                {property.sharing_options.map(opt => (
                  <div key={opt} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/40">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{opt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Pricing & Contact */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-5">
            {/* Price Card */}
            <div className="bg-card rounded-2xl border border-border/60 p-6 shadow-lg shadow-foreground/5">
              <div className="mb-5">
                <p className="text-sm text-muted-foreground mb-1">Monthly Rent</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-3xl font-bold text-primary">
                    ₹{property.price_per_month?.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
              </div>

              {property.deposit > 0 && (
                <div className="flex items-center justify-between py-3 border-t border-border/60">
                  <span className="text-sm text-muted-foreground">Security Deposit</span>
                  <span className="text-sm font-semibold">₹{property.deposit?.toLocaleString()}</span>
                </div>
              )}

              {property.nearest_college && (
                <div className="flex items-center justify-between py-3 border-t border-border/60">
                  <span className="text-sm text-muted-foreground">Nearest College</span>
                  <span className="text-sm font-semibold text-right max-w-[60%]">{property.nearest_college}</span>
                </div>
              )}

              {property.distance_from_college && (
                <div className="flex items-center justify-between py-3 border-t border-border/60">
                  <span className="text-sm text-muted-foreground">Distance</span>
                  <span className="text-sm font-semibold">{property.distance_from_college}</span>
                </div>
              )}

              {property.available_from && (
                <div className="flex items-center justify-between py-3 border-t border-border/60">
                  <span className="text-sm text-muted-foreground flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Available from</span>
                  <span className="text-sm font-semibold">{new Date(property.available_from).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                </div>
              )}
            </div>

            {/* Contact Card */}
            <div className="bg-card rounded-2xl border border-border/60 p-6">
              {property.owner_name && (
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-display font-bold text-primary text-lg">
                      {property.owner_name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{property.owner_name}</p>
                    <p className="text-xs text-muted-foreground">Property Owner</p>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {property.contact_phone && (
                  <a href={`tel:${property.contact_phone}`} className="block">
                    <Button variant="outline" className="w-full gap-2 font-medium">
                      <Phone className="w-4 h-4" />
                      Call Now
                    </Button>
                  </a>
                )}

                {whatsappLink && (
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full gap-2 font-medium bg-green-600 hover:bg-green-700 text-white">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </Button>
                  </a>
                )}
              </div>
            </div>

            {/* Share */}
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
            >
              <Share2 className="w-4 h-4" /> Share this property
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
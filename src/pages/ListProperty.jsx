import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProperty, uploadPropertyImage } from '@/api/properties';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Loader2, CheckCircle } from 'lucide-react';
import { cities, allFacilities } from '@/lib/cityCollegeData';
import { toast } from "sonner";

const sharingOptions = ['Single', 'Double', 'Triple', 'Quad'];

export default function ListProperty() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    title: '', description: '', property_type: '', gender: '', city: '',
    area: '', address: '', nearest_college: '', distance_from_college: '',
    price_per_month: '', deposit: '', sharing_options: [], facilities: [],
    contact_phone: '', contact_whatsapp: '', owner_name: '',
    food_included: false, ac_available: false, images: [],
  });
  const [uploading, setUploading] = useState(false);

  const mutation = useMutation({
    mutationFn: (data) => createProperty(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property listed successfully!');
      navigate('/listings');
    },
    onError: () => {
      toast.error('Failed to publish property. Please try again.');
    },
  });

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const toggleArray = (key, value) => {
    setForm(prev => {
      const arr = prev[key];
      return { ...prev, [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] };
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const urls = [];
      for (const file of files) {
        const { file_url } = await uploadPropertyImage(file);
        urls.push(file_url);
      }
      update('images', [...form.images, ...urls]);
    } catch {
      toast.error('Image upload failed. Check Firebase Storage rules and configuration.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    update('images', form.images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      ...form,
      price_per_month: Number(form.price_per_month),
      deposit: Number(form.deposit) || 0,
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold mb-2">List Your Property</h1>
        <p className="text-muted-foreground mb-8">Fill in the details to list your property on RoomRadar.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Property Title *</Label>
                <Input value={form.title} onChange={e => update('title', e.target.value)} placeholder="e.g., Spacious PG near IIT Delhi" required />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={form.description} onChange={e => update('description', e.target.value)} placeholder="Describe your property..." rows={4} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Property Type *</Label>
                  <Select value={form.property_type} onValueChange={v => update('property_type', v)}>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pg">PG</SelectItem>
                      <SelectItem value="hostel">Hostel</SelectItem>
                      <SelectItem value="room">Room</SelectItem>
                      <SelectItem value="flat">Flat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Gender</Label>
                  <Select value={form.gender} onValueChange={v => update('gender', v)}>
                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boys">Boys</SelectItem>
                      <SelectItem value="girls">Girls</SelectItem>
                      <SelectItem value="co-ed">Co-ed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Location</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>City *</Label>
                  <Select value={form.city} onValueChange={v => update('city', v)}>
                    <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                    <SelectContent>
                      {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Area/Locality</Label>
                  <Input value={form.area} onChange={e => update('area', e.target.value)} placeholder="e.g., Hauz Khas" />
                </div>
              </div>
              <div>
                <Label>Full Address</Label>
                <Input value={form.address} onChange={e => update('address', e.target.value)} placeholder="Complete address" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Nearest College</Label>
                  <Input value={form.nearest_college} onChange={e => update('nearest_college', e.target.value)} placeholder="College name" />
                </div>
                <div>
                  <Label>Distance from College</Label>
                  <Input value={form.distance_from_college} onChange={e => update('distance_from_college', e.target.value)} placeholder="e.g., 0.5 km" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Pricing</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Monthly Rent (₹) *</Label>
                  <Input type="number" value={form.price_per_month} onChange={e => update('price_per_month', e.target.value)} placeholder="e.g., 8000" required />
                </div>
                <div>
                  <Label>Security Deposit (₹)</Label>
                  <Input type="number" value={form.deposit} onChange={e => update('deposit', e.target.value)} placeholder="e.g., 10000" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Room & Facilities</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label className="mb-3 block">Room Sharing</Label>
                <div className="flex flex-wrap gap-2">
                  {sharingOptions.map(opt => (
                    <button key={opt} type="button" onClick={() => toggleArray('sharing_options', opt)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${form.sharing_options.includes(opt) ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary/50 border-border hover:border-primary/40'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="mb-3 block">Facilities</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {allFacilities.map(f => (
                    <label key={f} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox checked={form.facilities.includes(f)} onCheckedChange={() => toggleArray('facilities', f)} />
                      <span className="text-sm">{f}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox checked={form.food_included} onCheckedChange={v => update('food_included', v)} />
                  <span className="text-sm font-medium">Food Included</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox checked={form.ac_available} onCheckedChange={v => update('ac_available', v)} />
                  <span className="text-sm font-medium">AC Available</span>
                </label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Property Images</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 mb-4">
                {form.images.map((url, i) => (
                  <div key={i} className="relative w-24 h-20 rounded-lg overflow-hidden group">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <label className="flex items-center justify-center gap-2 p-8 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/40 transition-colors">
                {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5 text-muted-foreground" />}
                <span className="text-sm text-muted-foreground">{uploading ? 'Uploading...' : 'Click to upload images'}</span>
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} disabled={uploading} />
              </label>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Owner Name</Label>
                <Input value={form.owner_name} onChange={e => update('owner_name', e.target.value)} placeholder="Your name" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Phone Number</Label>
                  <Input value={form.contact_phone} onChange={e => update('contact_phone', e.target.value)} placeholder="+91 98765 43210" />
                </div>
                <div>
                  <Label>WhatsApp Number</Label>
                  <Input value={form.contact_whatsapp} onChange={e => update('contact_whatsapp', e.target.value)} placeholder="+91 98765 43210" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full font-semibold text-base gap-2" disabled={mutation.isPending}>
            {mutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
            {mutation.isPending ? 'Publishing...' : 'Publish Property'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

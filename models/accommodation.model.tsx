export interface Accommodation {
  id: string;
  host_id: string;
  name: string;
  description?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  price_per_night: number;
  property_type?: 'Căn hộ' | 'Nhà' | 'Biệt thự' | 'Khách sạn' | 'Nhà nghỉ' | 'Homestay' | 'Cắm trại' | 'Khác';
  status: 'active' | 'inactive';
  max_guest: number;
  created_at: string;
  updated_at: string;
};

export interface AccommodationImage {
  id: string;
  accommodation_id: string;
  image_url: string;
};

export interface AccommodationAmenity {
  accommodation_id: string;
  amenity_id: number;
};

export interface AccommodationFeature {
  accommodation_id: string;
  feature_id: string;
};

export interface AccommodationRoom {
  id: string;
  accommodation_id: string;
  image_url: string;
  name: string;
  description: string;
};

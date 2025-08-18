export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone_number?: string;
  avatar_url?: string;
  user_type: 'Host' | 'Guest' | 'Admin';
  created_at: string; // or Date
  updated_at: string; // or Date
};

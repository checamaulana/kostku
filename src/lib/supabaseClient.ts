import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be defined in .env file');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipe data untuk Kost
export interface Kost {
  id?: number
  nama: string
  alamat: string
  harga: number
  tipe: 'putra' | 'putri' | 'campur'
  rating: number
  fasilitas: string[]
  foto: string
  deskripsi: string
  nama_pemilik?: string
  telepon_pemilik?: string
  created_at?: string
  updated_at?: string
}

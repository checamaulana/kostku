import { supabase, type Kost } from './supabaseClient'

export interface KostFormData {
  nama: string
  alamat: string
  harga: number
  tipe: 'putra' | 'putri' | 'campur'
  rating: number
  deskripsi: string
  fasilitas: string[]
  foto: string
  nama_pemilik: string
  telepon_pemilik: string
}

// CREATE - Menambah kost baru
export const createKost = async (kostData: KostFormData): Promise<Kost | null> => {
  try {
    const { data, error } = await supabase
      .from('kost')
      .insert([kostData])
      .select()
      .single()

    if (error) {
      console.error('Error creating kost:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error in createKost:', error)
    return null
  }
}

// READ - Mengambil semua kost
export const getAllKost = async (): Promise<Kost[]> => {
  try {
    const { data, error } = await supabase
      .from('kost')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching kost:', error)
      throw error
    }

    // Transformasi data fasilitas dari string ke array of strings
    const transformedData = data?.map(kost => ({
      ...kost,
      fasilitas: typeof kost.fasilitas === 'string'
        ? kost.fasilitas.split(',').map(f => f.trim())
        : [],
    })) || []


    return transformedData
  } catch (error) {
    console.error('Error in getAllKost:', error)
    return []
  }
}

// READ - Mengambil kost berdasarkan ID
export const getKostById = async (id: number): Promise<Kost | null> => {
  try {
    const { data, error } = await supabase
      .from('kost')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching kost by id:', error)
      throw error
    }

    if (!data) {
      return null
    }

    // Transformasi data fasilitas dari string ke array of strings
    const transformedData = {
      ...data,
      fasilitas: typeof data.fasilitas === 'string'
        ? data.fasilitas.split(',').map(f => f.trim())
        : [],
    }

    return transformedData
  } catch (error) {
    console.error('Error in getKostById:', error)
    return null
  }
}

// UPDATE - Mengupdate kost
export const updateKost = async (id: number, kostData: Partial<KostFormData>): Promise<Kost | null> => {
  try {
    const { data, error } = await supabase
      .from('kost')
      .update(kostData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating kost:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error in updateKost:', error)
    return null
  }
}

// DELETE - Menghapus kost
export const deleteKost = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('kost')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting kost:', error)
      throw error
    }

    return true
  } catch (error) {
    console.error('Error in deleteKost:', error)
    return false
  }
}

// SEARCH - Mencari kost berdasarkan nama atau lokasi
export const searchKost = async (searchTerm: string, typeFilter?: 'putra' | 'putri' | 'campur'): Promise<Kost[]> => {
  try {
    let query = supabase
      .from('kost')
      .select('*')
      .or(`nama.ilike.%${searchTerm}%,alamat.ilike.%${searchTerm}%`)

    if (typeFilter) {
      query = query.eq('tipe', typeFilter)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Error searching kost:', error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Error in searchKost:', error)
    return []
  }
}

// UPLOAD - Mengunggah gambar kost ke Supabase Storage
export const uploadKostImage = async (file: File): Promise<string | null> => {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('kost-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('kost-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error in uploadKostImage:', error);
    return null;
  }
};

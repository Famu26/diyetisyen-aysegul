// Tarayıcıda CDN, Node.js'te node_modules'dan yüklenir
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://sccotzlkxflewjyvrvcu.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_DmSehThBll53zKyXHwVHLQ_fjTqRYnA'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export async function testConnection() {
  try {
    const { data, error } = await supabase.from('posts').select('*').limit(5)
    if (error) throw error
    console.log('✅ Supabase bağlantısı başarılı!')
    console.log('Veriler:', data)
    return { success: true, data }
  } catch (err) {
    console.error('❌ Supabase hatası:', err.message)
    return { success: false, error: err.message }
  }
}

// Node.js ile test: npm run test:supabase
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://sccotzlkxflewjyvrvcu.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_DmSehThBll53zKyXHwVHLQ_fjTqRYnA'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function run() {
  console.log('Supabase bağlantısı test ediliyor...')
  const { data, error } = await supabase.from('posts').select('*').limit(5)
  if (error) {
    console.error('❌ Hata:', error.message)
    console.log('\nEğer "relation posts does not exist" hatası alıyorsan,')
    console.log('Supabase SQL Editor\'da şu komutu çalıştır:')
    console.log(`
CREATE TABLE posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  content text,
  slug text UNIQUE,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Herkes okuyabilir" ON posts
  FOR SELECT USING (published = true);
    `)
  } else {
    console.log('✅ Bağlantı başarılı! Kayıt sayısı:', data.length)
    if (data.length > 0) console.log('İlk kayıt:', data[0])
  }
}

run()

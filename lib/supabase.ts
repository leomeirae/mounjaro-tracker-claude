import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { useAuth } from '@/lib/clerk';
import { createLogger } from '@/lib/logger';

const logger = createLogger('Supabase');

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Custom storage adapter que funciona tanto na web quanto em mobile
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    if (Platform.OS === 'web') {
      // Na web, usar localStorage
      return Promise.resolve(localStorage.getItem(key));
    }
    // Em mobile, usar SecureStore
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    if (Platform.OS === 'web') {
      // Na web, usar localStorage
      localStorage.setItem(key, value);
      return Promise.resolve();
    }
    // Em mobile, usar SecureStore
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    if (Platform.OS === 'web') {
      // Na web, usar localStorage
      localStorage.removeItem(key);
      return Promise.resolve();
    }
    // Em mobile, usar SecureStore
    return SecureStore.deleteItemAsync(key);
  },
};

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          clerk_id: string;
          email: string;
          name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          clerk_id: string;
          email: string;
          name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          clerk_id?: string;
          email?: string;
          name?: string | null;
          updated_at?: string;
        };
      };
      medications: {
        Row: {
          id: string;
          user_id: string;
          type: 'mounjaro' | 'ozempic' | 'saxenda' | 'wegovy' | 'zepbound';
          dosage: number;
          frequency: 'weekly' | 'daily';
          start_date: string;
          end_date: string | null;
          active: boolean;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: 'mounjaro' | 'ozempic' | 'saxenda' | 'wegovy' | 'zepbound';
          dosage: number;
          frequency: 'weekly' | 'daily';
          start_date: string;
          end_date?: string | null;
          active?: boolean;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          type?: 'mounjaro' | 'ozempic' | 'saxenda' | 'wegovy' | 'zepbound';
          dosage?: number;
          frequency?: 'weekly' | 'daily';
          start_date?: string;
          end_date?: string | null;
          active?: boolean;
          notes?: string | null;
          updated_at?: string;
        };
      };
      weight_logs: {
        Row: {
          id: string;
          user_id: string;
          weight: number;
          unit: 'kg' | 'lbs';
          date: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          weight: number;
          unit?: 'kg' | 'lbs';
          date: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          weight?: number;
          unit?: 'kg' | 'lbs';
          date?: string;
          notes?: string | null;
          updated_at?: string;
        };
      };
      side_effects: {
        Row: {
          id: string;
          user_id: string;
          medication_id: string | null;
          type: string;
          severity: 1 | 2 | 3 | 4 | 5;
          date: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          medication_id?: string | null;
          type: string;
          severity: 1 | 2 | 3 | 4 | 5;
          date: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          medication_id?: string | null;
          type?: string;
          severity?: 1 | 2 | 3 | 4 | 5;
          date?: string;
          notes?: string | null;
          updated_at?: string;
        };
      };
      medication_applications: {
        Row: {
          id: string;
          user_id: string;
          medication_id: string;
          dosage: number;
          application_date: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          medication_id: string;
          dosage: number;
          application_date: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          dosage?: number;
          application_date?: string;
          notes?: string | null;
        };
      };
    };
  };
}

// Hook to sync Supabase auth with Clerk
export function useSupabaseAuth() {
  const { getToken, userId } = useAuth();

  const setSupabaseAuth = async () => {
    if (!userId) {
      logger.debug('No user ID found for Supabase auth');
      return;
    }

    try {
      logger.debug('Attempting to get Clerk token for Supabase');
      
      // Get Clerk JWT token with Supabase template
      const token = await getToken({ template: 'supabase' });
      
      if (token) {
        logger.debug('Setting Supabase auth with Clerk token');
        
        // Set the auth session in Supabase
        const { error } = await supabase.auth.setSession({
          access_token: token,
          refresh_token: token,
        });

        if (error) {
          logger.error('Error setting Supabase session', error as Error);
          // Se o template 'supabase' não existir, tentar sem template
          logger.warn('Falling back to default token');
          try {
            const defaultToken = await getToken();
            if (defaultToken) {
              logger.debug('Trying with default token');
            }
          } catch (fallbackError) {
            logger.error('Error getting default token', fallbackError as Error);
          }
        } else {
          logger.info('Supabase session set successfully');
        }
      } else {
        logger.warn('No token received from Clerk');
      }
    } catch (error) {
      logger.error('Error getting Clerk token', error as Error);
      // Se o template não existir, isso é esperado - vamos continuar sem ele
      logger.info('Note: Clerk template "supabase" may not be configured. This is OK if RLS allows inserts.');
    }
  };

  return { setSupabaseAuth };
}

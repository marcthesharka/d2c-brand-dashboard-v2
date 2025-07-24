import { supabase } from '../lib/supabase';

export interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  source: string;
}

class NewsletterService {
  async subscribe(email: string, source: string = 'learn_page'): Promise<{ success: boolean; message: string }> {
    try {
      if (!supabase) {
        return { success: false, message: 'Database connection not available.' };
      }

      // Basic email validation
      if (!email || !email.includes('@')) {
        return { success: false, message: 'Please enter a valid email address.' };
      }

      // Check if email already exists
      const { data: existingSubscriber } = await supabase
        .from('newsletter_subscribers')
        .select('id, is_active')
        .eq('email', email.toLowerCase())
        .single();

      if (existingSubscriber) {
        if (existingSubscriber.is_active) {
          return { success: false, message: 'You\'re already subscribed to our newsletter!' };
        } else {
          // Reactivate subscription
          const { error: updateError } = await supabase
            .from('newsletter_subscribers')
            .update({ is_active: true, updated_at: new Date().toISOString() })
            .eq('id', existingSubscriber.id);

          if (updateError) {
            console.error('Error reactivating subscription:', updateError);
            return { success: false, message: 'Error reactivating subscription. Please try again.' };
          }

          return { success: true, message: 'Welcome back! Your subscription has been reactivated.' };
        }
      }

      // Insert new subscriber
      const { error: insertError } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: email.toLowerCase(),
          source,
          is_active: true
        });

      if (insertError) {
        console.error('Error subscribing:', insertError);
        if (insertError.code === '23505') { // Unique constraint violation
          return { success: false, message: 'You\'re already subscribed to our newsletter!' };
        }
        return { success: false, message: 'Error subscribing. Please try again.' };
      }

      return { success: true, message: 'Successfully subscribed to our newsletter!' };
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      return { success: false, message: 'An unexpected error occurred. Please try again.' };
    }
  }

  async unsubscribe(email: string): Promise<{ success: boolean; message: string }> {
    try {
      if (!supabase) {
        return { success: false, message: 'Database connection not available.' };
      }

      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({ is_active: false })
        .eq('email', email.toLowerCase());

      if (error) {
        console.error('Error unsubscribing:', error);
        return { success: false, message: 'Error unsubscribing. Please try again.' };
      }

      return { success: true, message: 'Successfully unsubscribed from our newsletter.' };
    } catch (error) {
      console.error('Newsletter unsubscribe error:', error);
      return { success: false, message: 'An unexpected error occurred. Please try again.' };
    }
  }

  async getSubscriberCount(): Promise<number> {
    try {
      if (!supabase) {
        return 0;
      }

      const { count, error } = await supabase
        .from('newsletter_subscribers')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      if (error) {
        console.error('Error getting subscriber count:', error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error('Error getting subscriber count:', error);
      return 0;
    }
  }

  async getRecentSubscribers(limit: number = 10): Promise<NewsletterSubscriber[]> {
    try {
      if (!supabase) {
        return [];
      }

      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error getting recent subscribers:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error getting recent subscribers:', error);
      return [];
    }
  }
}

export const newsletterService = new NewsletterService(); 
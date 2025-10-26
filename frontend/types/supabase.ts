export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'citizen' | 'reporter' | 'municipal' | 'admin'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'citizen' | 'reporter' | 'municipal' | 'admin'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'citizen' | 'reporter' | 'municipal' | 'admin'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      civic_issues: {
        Row: {
          id: string
          location: string
          type: string
          status: 'pending' | 'in_progress' | 'resolved'
          description: string | null
          latitude: number | null
          longitude: number | null
          date_reported: string
          last_update: string
          priority: 'high' | 'medium' | 'low'
          reported_by: string | null
          assigned_to: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          location: string
          type: string
          status?: 'pending' | 'in_progress' | 'resolved'
          description?: string | null
          latitude?: number | null
          longitude?: number | null
          date_reported?: string
          last_update?: string
          priority?: 'high' | 'medium' | 'low'
          reported_by?: string | null
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          location?: string
          type?: string
          status?: 'pending' | 'in_progress' | 'resolved'
          description?: string | null
          latitude?: number | null
          longitude?: number | null
          date_reported?: string
          last_update?: string
          priority?: 'high' | 'medium' | 'low'
          reported_by?: string | null
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      departments: {
        Row: {
          id: string
          name: string
          type: string
          location: string
          status: 'operational' | 'under_maintenance' | 'closed'
          latitude: number | null
          longitude: number | null
          contact_info: Record<string, unknown> | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          location: string
          status?: 'operational' | 'under_maintenance' | 'closed'
          latitude?: number | null
          longitude?: number | null
          contact_info?: Record<string, unknown> | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          location?: string
          status?: 'operational' | 'under_maintenance' | 'closed'
          latitude?: number | null
          longitude?: number | null
          contact_info?: Record<string, unknown> | null
          created_at?: string
          updated_at?: string
        }
      }
      training_modules: {
        Row: {
          id: string
          title: string
          duration: string
          content: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          duration: string
          content?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          duration?: string
          content?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          module_id: string
          progress: number
          completed: boolean
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          module_id: string
          progress?: number
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          module_id?: string
          progress?: number
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
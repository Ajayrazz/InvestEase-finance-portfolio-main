import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../utils/supabaseClient';

interface Finance {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description?: string;
  date: string;
}

interface FinanceContextType {
  finances: Finance[];
  addFinance: (finance: Omit<Finance, 'id'>) => Promise<void>;
  updateFinance: (id: string, finance: Partial<Finance>) => Promise<void>;
  deleteFinance: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}

interface FinanceProviderProps {
  children: ReactNode;
}

export function FinanceProvider({ children }: FinanceProviderProps) {
  const [finances, setFinances] = useState<Finance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFinances();
  }, []);

  async function fetchFinances() {
    try {
      const { data, error } = await supabase
        .from('finances')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setFinances(data || []);
    } catch (err) {
      setError('Error fetching finances');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

  async function addFinance(finance: Omit<Finance, 'id'>) {
    try {
      const { data, error } = await supabase
        .from('finances')
        .insert([finance])
        .select()
        .single();

      if (error) throw error;
      setFinances(prev => [data, ...prev]);
    } catch (err) {
      setError('Error adding finance');
      console.error('Error:', err);
    }
  }

  async function updateFinance(id: string, finance: Partial<Finance>) {
    try {
      const { data, error } = await supabase
        .from('finances')
        .update(finance)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setFinances(prev => prev.map(f => f.id === id ? { ...f, ...data } : f));
    } catch (err) {
      setError('Error updating finance');
      console.error('Error:', err);
    }
  }

  async function deleteFinance(id: string) {
    try {
      const { error } = await supabase
        .from('finances')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setFinances(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      setError('Error deleting finance');
      console.error('Error:', err);
    }
  }

  const value = {
    finances,
    addFinance,
    updateFinance,
    deleteFinance,
    loading,
    error
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}
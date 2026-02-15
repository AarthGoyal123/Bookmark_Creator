'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({
    user: null,
    signOut: async () => { },
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (session?.user) {
                    setUser(session.user);
                } else {
                    setUser(null);
                }
                router.refresh();
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase, router]);

    const signOut = async () => {
        if (window.confirm('Are you sure you want to sign out?')) {
            await supabase.auth.signOut();
            router.push('/login');
        }
    };

    return (
        <AuthContext.Provider value={{ user, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

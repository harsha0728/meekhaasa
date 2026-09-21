"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminBookingsPanel from "@/components/AdminBookingsPanel";

export default function AdminDashboard() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      if (isMounted) {
        setSession(data.session);
        setLoading(false);
      }
    }

    loadSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (isMounted) {
        setSession(currentSession);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  if (loading) {
    return <div className="admin-shell"><div className="admin-card"><p>Checking your session...</p></div></div>;
  }

  if (!session) {
    return (
      <div className="admin-shell">
        <div className="admin-card">
          <p className="auth-kicker">Access required</p>
          <h1>You are not logged in</h1>
          <p>Please sign in to view the admin area.</p>
          <div className="admin-actions">
            <a className="primary-button" href="/admin/login">Go to login</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell admin-shell-large">
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="brand-mark admin-brand">
            <span className="brand-icon">M</span>
            <span>MeeKhaasa</span>
          </div>

          <nav className="admin-nav">
            <span className="nav-item active">Bookings</span>
            <span className="nav-item">Events</span>
            <span className="nav-item">Settings</span>
          </nav>

          <button className="secondary-button" type="button" onClick={handleLogout}>
            Logout
          </button>
        </aside>

        <main className="admin-content">
          <div className="admin-topbar">
            <div>
              <p className="auth-kicker">Admin dashboard</p>
              <h1>Welcome back</h1>
            </div>
            <div className="account-pill">{session.user?.email}</div>
          </div>

          <div className="admin-grid">
            <div className="admin-panel">
              <h2>Today</h2>
              <p>Review active reservations and incoming guest requests.</p>
            </div>

            <div className="admin-panel">
              <h2>Pending</h2>
              <p>Follow up with customers before the dining date.</p>
            </div>

            <div className="admin-panel">
              <h2>Confirmed</h2>
              <p>Track bookings approved for service and guest flow.</p>
            </div>
          </div>

          <AdminBookingsPanel />
        </main>
      </div>
    </div>
  );
}

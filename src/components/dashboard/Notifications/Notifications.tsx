import { useState } from "react";

const notifications = [
  {
    id: 1,
    type: "user",
    title: "New User Registration",
    description: "John Smith just registered for a Premium account",
    time: "5 minutes ago",
    read: false,
    color: "green",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    type: "property",
    title: "New Property Listed",
    description: 'Investor042 listed "Coastal Villa" worth $5M',
    time: "2 hours ago",
    read: false,
    color: "gold",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    id: 3,
    type: "payment",
    title: "Payment Received",
    description: "Premium subscription payment of $99 received",
    time: "3 hours ago",
    read: true,
    color: "green",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
  {
    id: 4,
    type: "request",
    title: "New Investment Request",
    description: "Developer009 posted request for hotel assets",
    time: "5 hours ago",
    read: true,
    color: "blue",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    id: 5,
    type: "system",
    title: "System Update",
    description: "Dashboard analytics updated with new metrics",
    time: "1 day ago",
    read: true,
    color: "purple",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 6,
    type: "user",
    title: "New User Registration",
    description: "Sarah Chen just registered for a Standard account",
    time: "1 day ago",
    read: true,
    color: "green",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    id: 7,
    type: "property",
    title: "Property Offer Accepted",
    description: 'Buyer117 accepted offer on "Manhattan Penthouse" for $12.3M',
    time: "2 days ago",
    read: true,
    color: "gold",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
];

const colorMap = {
  green: {
    bg: "rgba(74, 222, 128, 0.08)",
    border: "rgba(74, 222, 128, 0.2)",
    text: "#4ade80",
    glow: "rgba(74, 222, 128, 0.15)",
  },
  gold: {
    bg: "rgba(212, 175, 55, 0.08)",
    border: "rgba(212, 175, 55, 0.2)",
    text: "#D4AF37",
    glow: "rgba(212, 175, 55, 0.15)",
  },
  blue: {
    bg: "rgba(96, 165, 250, 0.08)",
    border: "rgba(96, 165, 250, 0.2)",
    text: "#60a5fa",
    glow: "rgba(96, 165, 250, 0.15)",
  },
  purple: {
    bg: "rgba(167, 139, 250, 0.08)",
    border: "rgba(167, 139, 250, 0.2)",
    text: "#a78bfa",
    glow: "rgba(167, 139, 250, 0.15)",
  },
};

const filters = ["All", "Unread", "Users", "Properties", "Payments", "System"];
const typeMap = { user: "Users", property: "Properties", payment: "Payments", system: "System", request: "System" };

export default function Notifications() {
  const [notifs, setNotifs] = useState(notifications);
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);

  const markAllRead = () => setNotifs((n) => n.map((x) => ({ ...x, read: true })));
  const markRead = (id: any) => setNotifs((n) => n.map((x) => (x.id === id ? { ...x, read: true } : x)));

  const filtered = notifs.filter((n: any) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Unread") return !n.read;
    return typeMap[n.type as keyof typeof typeMap] === activeFilter;
  });

  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <div className="">
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 70%)",
      }} />

      <div style={{ position: "relative", zIndex: 1, margin: "0 auto", }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 36 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <h1 style={{
                fontSize: 28, fontWeight: 400, letterSpacing: "0.06em", color: "#fff",
                fontFamily: "'Georgia', serif",
              }}>
                Notifications
              </h1>
              {unreadCount > 0 && (
                <span style={{
                  background: "linear-gradient(135deg, #D4AF37, #B8960C)",
                  color: "#0D0D0D", fontSize: 11, fontWeight: 700,
                  borderRadius: 20, padding: "2px 9px", letterSpacing: "0.04em",
                  fontFamily: "monospace",
                }}>
                  {unreadCount} NEW
                </span>
              )}
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, letterSpacing: "0.04em" }}>
              Manage your activity and platform updates
            </p>
          </div>
          <button
            onClick={markAllRead}
            style={{
              background: "transparent", border: "1px solid rgba(212,175,55,0.3)",
              color: "#D4AF37", fontSize: 12, letterSpacing: "0.08em",
              padding: "8px 18px", borderRadius: 6, cursor: "pointer",
              transition: "all 0.2s", fontFamily: "inherit",
            }}
            onMouseEnter={(e: any) => {
              e.target.style.background = "rgba(212,175,55,0.08)";
              e.target.style.borderColor = "rgba(212,175,55,0.6)";
            }}
            onMouseLeave={(e: any) => {
              e.target.style.background = "transparent";
              e.target.style.borderColor = "rgba(212,175,55,0.3)";
            }}
          >
            MARK ALL READ
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)", marginBottom: 28 }} />

        {/* Filter Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 28, flexWrap: "wrap" }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: "7px 16px", borderRadius: 6, fontSize: 12,
                letterSpacing: "0.07em", cursor: "pointer", transition: "all 0.2s",
                fontFamily: "monospace",
                background: activeFilter === f ? "rgba(212,175,55,0.12)" : "transparent",
                border: activeFilter === f ? "1px solid rgba(212,175,55,0.5)" : "1px solid rgba(255,255,255,0.06)",
                color: activeFilter === f ? "#D4AF37" : "rgba(255,255,255,0.4)",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {filtered.length === 0 && (
            <div style={{
              textAlign: "center", padding: "64px 0",
              color: "rgba(255,255,255,0.25)", fontSize: 14, letterSpacing: "0.06em",
            }}>
              No notifications in this category
            </div>
          )}
          {filtered.map((notif: any, i: number) => {
            const c = colorMap[notif.color as keyof typeof colorMap];
            const isHovered = hoveredId === notif.id;
            return (
              <div
                key={notif.id}
                onClick={() => markRead(notif.id)}
                onMouseEnter={() => setHoveredId(notif.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  display: "flex", gap: 16, padding: "20px 22px",
                  borderRadius: 10, cursor: "pointer",
                  border: `1px solid ${isHovered ? "rgba(212,175,55,0.15)" : notif.read ? "rgba(255,255,255,0.04)" : "rgba(212,175,55,0.08)"}`,
                  background: isHovered
                    ? "rgba(212,175,55,0.04)"
                    : notif.read ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.025)",
                  transition: "all 0.2s",
                  position: "relative",
                  animation: `fadeInUp 0.4s ease both`,
                  animationDelay: `${i * 0.05}s`,
                }}
              >
                {/* Left accent line for unread */}
                {!notif.read && (
                  <div style={{
                    position: "absolute", left: 0, top: "20%", bottom: "20%",
                    width: 2, borderRadius: 2,
                    background: "linear-gradient(180deg, transparent, #D4AF37, transparent)",
                  }} />
                )}

                {/* Icon */}
                <div style={{
                  width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: c.bg, border: `1px solid ${c.border}`,
                  color: c.text,
                  boxShadow: isHovered ? `0 0 20px ${c.glow}` : "none",
                  transition: "box-shadow 0.3s",
                }}>
                  {notif.icon}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <p style={{
                      fontSize: 14, fontWeight: notif.read ? 400 : 600,
                      color: notif.read ? "rgba(255,255,255,0.75)" : "#fff",
                      letterSpacing: "0.02em",
                    }}>
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <span style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: "#60a5fa", flexShrink: 0,
                        boxShadow: "0 0 6px rgba(96,165,250,0.6)",
                      }} />
                    )}
                  </div>
                  <p style={{
                    fontSize: 13, color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.5, marginBottom: 8,
                  }}>
                    {notif.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                      style={{ width: 12, height: 12, color: "rgba(255,255,255,0.25)" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em", fontFamily: "monospace" }}>
                      {notif.time}
                    </span>
                  </div>
                </div>

                {/* Type badge */}
                <div style={{
                  alignSelf: "flex-start", flexShrink: 0,
                  padding: "3px 10px", borderRadius: 20,
                  background: c.bg, border: `1px solid ${c.border}`,
                  color: c.text, fontSize: 10, letterSpacing: "0.08em",
                  fontFamily: "monospace", textTransform: "uppercase",
                }}>
                  {notif.type}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
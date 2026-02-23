import React from "react";

const USER_KEY = "maya_auth_user";
const FALLBACK_AVATAR = "https://i.pravatar.cc/120?u=maya-nutrition-profile";

function Profile() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const raw = localStorage.getItem(USER_KEY);
    setUser(raw ? JSON.parse(raw) : null);
  }, []);

  const avatarUrl =
    user?.profile_image_url || user?.avatarUrl || user?.avatar || FALLBACK_AVATAR;

  return (
    <div className="rounded-3xl bg-white/95 p-8 shadow-lg">
      <div className="flex flex-wrap items-center gap-6">
        <img
          src={avatarUrl}
          alt="Profile"
          className="h-20 w-20 rounded-full object-cover shadow-lg"
        />
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Profile</p>
          <h1 className="mt-2 font-display text-3xl text-ink">
            {user?.name || "Maya Member"}
          </h1>
          <p className="mt-2 text-sm text-muted">{user?.email || "Signed-in user"}</p>
          <p className="mt-2 text-sm text-muted">Role: {user?.role || "member"}</p>
        </div>
      </div>
      <div className="mt-8 rounded-2xl bg-cream/70 p-6 text-sm text-muted">
        This is a starter profile view. We can extend it with preferences, saved
        plans, and account settings.
      </div>
    </div>
  );
}

export default Profile;

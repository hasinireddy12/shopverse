function Profile() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  if (!user) {

    return (
      <div className="page-shell">
        <div className="empty-state">
          <h2>Please Login</h2>
        </div>
      </div>
    );
  }

  return (

    <div className="page-shell">

      <div className="profile-card">

        <span className="page-header__eyebrow mb-3">
          Account profile
        </span>

        <h2>
          {user.name}
        </h2>

        <p className="muted-text mb-4">
          Manage your account details in a cleaner, premium profile view.
        </p>

        <div className="stack-list">

          <p>
            <strong>Email:</strong>
            {" "}
            {user.email}
          </p>

          <p>
            <strong>Phone:</strong>
            {" "}
            {user.phone}
          </p>

          {/* Role removed from profile view for privacy */}

        </div>

      </div>

    </div>
  );
}

export default Profile;
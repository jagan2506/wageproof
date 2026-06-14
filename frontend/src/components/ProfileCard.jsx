
function ProfileCard() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <div className="profile-card">
      <div className="avatar">
        {user?.name?.charAt(0)}
      </div>

      <div>
        <h3>{user?.name}</h3>

        <p>{user?.email}</p>

        <span className="role-badge">
          {user?.role}
        </span>
      </div>
    </div>
  );
}

export default ProfileCard;
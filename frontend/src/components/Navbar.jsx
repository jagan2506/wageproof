import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div>
        <h2>💼 WageProof</h2>
      </div>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
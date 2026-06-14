import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>WageProof</h2>

      <ul>
        <li>
          <Link to="/worker">
            📊 Dashboard
          </Link>
        </li>

        <li>
          <Link to="/employerlogs">
            💰 Payments
          </Link>
        </li>

        <li>
          <Link to="/mylogs">
            📍 Work Logs
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
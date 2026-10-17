import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Product Manager</Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/product/new">Add Product</Link>
      </div>
    </nav>
  );
}

export default Navbar;
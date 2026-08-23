import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/dentists">Dentists</NavLink>
      </li>

      <li>
        <NavLink to="/services">Services</NavLink>
      </li>

      <li>
        <NavLink to="/appointments">Appointments</NavLink>
      </li>
    </>
  );

  return (
    <header className="border-b bg-white">
      <div className="navbar mx-auto max-w-7xl px-4">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost">
              ☰
            </button>

            <ul
              tabIndex={0}
              className="menu dropdown-content z-50 mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>

          <Link
            to="/"
            className="text-xl font-bold text-sky-700"
          >
            DentalCare BD
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <Link to="/login" className="btn btn-ghost">
            Login
          </Link>

          <Link
            to="/register"
            className="btn bg-sky-600 text-white hover:bg-sky-700"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
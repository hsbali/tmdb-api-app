import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const categoryNavItems = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "TV Shows",
      link: "/tv-shows",
    },
    {
      text: "Movies",
      link: "/movies",
    },
    {
      text: "New & Popular",
      link: "/new",
    },
  ];

  const [activeCategoryNav, setActiveCategoryNav] = useState(null);

  useEffect(() => {
    setActiveCategoryNav(
      categoryNavItems.find((el) => el.link === window.location.pathname)
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <header>
      <div
        className={`main-nav d-flex flex-column flex-md-row gap-4 align-items-center p-3 w-100`}
      >
        <div className="d-flex justify-content-center justify-content-md-start">
          <img src="/images/netflix-logo.png" alt="Netflix" width="140" />
        </div>
        <nav className="flex-grow-1">
          <ul className="d-flex flex-wrap justify-content-center justify-content-md-start gap-3">
            {categoryNavItems.map((item, i) => {
              return (
                <Fragment key={i}>
                  <li onClick={() => setActiveCategoryNav(item)}>
                    <Link
                      to={item.link}
                      className={
                        activeCategoryNav &&
                        activeCategoryNav.link === item.link
                          ? `active`
                          : ""
                      }
                    >
                      {item.text}
                    </Link>
                  </li>
                </Fragment>
              );
            })}
          </ul>
        </nav>
        <nav className="user-nav d-none d-lg-block">
          <ul className="d-flex gap-4">
            <li className="nav-item">
              <Link to="/">
                <i className="bi bi-search"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/">
                <i className="bi bi-gift"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/">
                <i className="bi bi-bell-fill"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/">
                <div className="d-flex align-items-center gap-1">
                  <i className="bi bi-person-circle"></i>
                  <small style={{ fontSize: "10px" }}>
                    <i className="bi bi-caret-down-fill"></i>
                  </small>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/">
                <div className="d-flex align-items-center gap-1">
                  <i className="bi bi-funnel-fill"></i>
                  <small style={{ fontSize: "10px" }}>
                    <i className="bi bi-caret-down-fill"></i>
                  </small>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

//...
import "./SideNav.css";

const SideNav = ({ selectedMenuOption, onMenuItemSelect }) => {
  const menuItems = [
    "User Executive",
    "Reports Management",
    "Access Data",
    "Work Allocation",
    "Notice Management",
    "Performance Management",
    "Data Management",
    "Clients"
  ];
  return (
    <div className="sideNavbar">
      <div className="menuItemContainer">
        <div className="heading">Admin Panel</div>
        {menuItems.map((menuOption, index) => (
          <div
            key={index}
            onClick={onMenuItemSelect.bind(this, menuOption)}
            className={`button ${
              selectedMenuOption === menuOption
                ? "button-selected"
                : "button-deselected"
            }`}
          >
            {menuOption}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;

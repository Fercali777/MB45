import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ProfileInfo from "../components/ProfileInfo";
import ProductForm from "../components/ProductForm";
import MyStore from "../components/MyStore";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState<"settings" | "favorites" | "store" | "add">("add");
  const isSeller = user?.role === "seller";

  /** 🔸 Devuelve "buttonDash bt-orange" si es la sección activa;
   *   de lo contrario "buttonDash bt-cream"   */
  const btnClass = (section: typeof activeSection) =>
    `buttonDash ${activeSection === section ? "bt-orange" : "bt-cream"}`;

  const renderContent = () => {
    switch (activeSection) {
      case "add":
        return (
          <>
            <h2>New Product Entry</h2>
            <ProductForm />
          </>
        );
      case "store":
        return  (
          <>
            <h2>My profile</h2>
            <MyStore />
          </>
        );
      case "favorites":
        return <div>Favorites (aquí irá el componente de favoritos)</div>;
      case "settings":
        return (
          <>
            <h2>My profile</h2>
            <ProfileInfo />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-3 col-sm-12">
          <div className="flex flex-column gap-2">
            <button
              className={btnClass("settings")}
              onClick={() => setActiveSection("settings")}
            >
              Settings
            </button>

            <button
              className={btnClass("favorites")}
              onClick={() => setActiveSection("favorites")}
            >
              Favorites
            </button>

            {/* Solo visible para seller */}
            {isSeller && (
              <>
                <button
                  className={btnClass("store")}
                  onClick={() => setActiveSection("store")}
                >
                  My Store
                </button>
                <button
                  className={btnClass("add")}
                  onClick={() => setActiveSection("add")}
                >
                  Add New Product
                </button>
              </>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="col-lg-9 col-sm-12">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
import { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { AuthContext } from "../context/AuthContext";
import ProfileInfo from "../components/ProfileInfo";
import ProductForm from "../components/ProductForm";
import { ShoppingItemsList } from "../components/ShoppingItemsList";
import MyStore from "../components/MyStore";
import MyFavorites from "../components/MyFavorites";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState<"settings" | "ShoppingCart" | "store" | "add" | "favorites">("add");
  const isSeller = user?.role === "seller";
  const isBuyer = user?.role === "buyer";

  // Check URL parameter for initial section
  useEffect(() => {
    const section = searchParams.get('section');
    if (section && ['settings', 'ShoppingCart', 'store', 'add', 'favorites'].includes(section)) {
      setActiveSection(section as typeof activeSection);
    }
  }, [searchParams]);

  const btnClass = (section: typeof activeSection) =>
    `buttonDash ${activeSection === section ? "bt-orange" : "bt-cream"}`;

  const handleSectionChange = (section: typeof activeSection) => {
    setActiveSection(section);
    setSearchParams({ section });
  };

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
        return (
          <>
            <h2>My profile</h2>
            <MyStore />
          </>
        );
      case "ShoppingCart":
        return (
          <>
            <ShoppingItemsList />
          </>
        );
      case "settings":
        return (
          <>
            <h2>My profile</h2>
            <ProfileInfo />
          </>
        );
      case "favorites":
        return (
          <>
            <MyFavorites />
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
              onClick={() => handleSectionChange("settings")}
            >
              Settings
            </button>

            {/* Show only for buyers */}
            {isBuyer && (
              <>
                <button
                  className={btnClass("ShoppingCart")}
                  onClick={() => handleSectionChange("ShoppingCart")}
                >
                  Shopping Cart
                </button>
                <button
                  className={btnClass("favorites")}
                  onClick={() => handleSectionChange("favorites")}
                >
                  My Favorites
                </button>
              </>
            )}

            {/* Only visible for seller */}
            {isSeller && (
              <>
                <button
                  className={btnClass("store")}
                  onClick={() => handleSectionChange("store")}
                >
                  My Store
                </button>
                <button
                  className={btnClass("add")}
                  onClick={() => handleSectionChange("add")}
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
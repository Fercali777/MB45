import { useContext, useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useAlertModal } from "../hooks/useAlertModal";
import AlertModal from "../components/AlertModal";
import ProfileInfo from "../components/ProfileInfo";
import ProductForm from "../components/ProductForm";
import { ShoppingItemsList } from "../components/ShoppingItemsList";
import MyStore from "../components/MyStore";
import MyFavorites from "../components/MyFavorites";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { alertState, showInfo, hideAlert } = useAlertModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState<"settings" | "ShoppingCart" | "store" | "add" | "favorites">("add");
  const isSeller = user?.role === "seller";
  const isBuyer = user?.role === "buyer";

  // Check URL parameter for initial section
  useEffect(() => {
    const section = searchParams.get('section');
    if (section && ['settings', 'ShoppingCart', 'store', 'add', 'favorites'].includes(section)) {
      // Check if user is trying to access favorites without being logged in
      if (section === 'favorites' && !user) {
        showInfo(
          'Login Required',
          'You need to be logged in to view your favorites. Please log in to continue.'
        );
        setActiveSection("settings");
        setSearchParams({ section: "settings" });
        return;
      }
      setActiveSection(section as typeof activeSection);
    }
  }, [searchParams, user]);

  const btnClass = (section: typeof activeSection) =>
    `buttonDash ${activeSection === section ? "bt-orange" : "bt-cream"}`;

  const handleSectionChange = (section: typeof activeSection) => {
    // Check if user is trying to access favorites without being logged in
    if (section === 'favorites' && !user) {
      showInfo(
        'Login Required',
        'You need to be logged in to view your favorites. Please log in to continue.'
      );
      return;
    }
    
    setActiveSection(section);
    setSearchParams({ section });
  };

  const handleLoginRedirect = () => {
    hideAlert();
    navigate('/login');
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
    <>
      <AlertModal
        isOpen={alertState.isOpen}
        onClose={handleLoginRedirect}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
        showCloseButton={true}
      />
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
    </>
  );
};

export default Dashboard;
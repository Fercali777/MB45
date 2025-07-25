import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./forms.css";
import "./buttons.css";
const API_URL = import.meta.env.VITE_API_URL;

interface FieldData {
  name: string;
  label: string;
  type: string;
  editable: boolean;
  value: string;
}

const ProfileInfo: React.FC = () => {
  const { user, token } = useAuth();
  const [message, setMessage] = useState("");
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");

  const [fields, setFields] = useState<FieldData[]>([
    { name: "name", label: "Name", type: "text", editable: true, value: "" },
    { name: "email", label: "Email", type: "email", editable: true, value: "" },
    { name: "phone", label: "Phone Number", type: "text", editable: true, value: "" },
    { name: "address", label: "Address", type: "text", editable: true, value: "" },
    { name: "city", label: "City", type: "text", editable: true, value: "" },
    { name: "country", label: "Country", type: "text", editable: true, value: "" },
    { name: "postCode", label: "Post Code", type: "text", editable: true, value: "" },
    { name: "role", label: "Role", type: "text", editable: false, value: "" },
  ]);

  useEffect(() => {
    if (user && token) {
      axios
        .get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("User data:", response.data);
          const data = response.data.user;
          setFields(prevFields =>
            prevFields.map(field => ({
              ...field,
              value: data[field.name] || ""
            }))
          );
        })
        .catch((error) => {
          console.error("Error getting user profile:", error);
        });
    }
  }, [user, token]);

  const handleEdit = (fieldName: string) => {
    const field = fields.find(f => f.name === fieldName);
    if (field && field.editable) {
      setEditingField(fieldName);
      setTempValue(field.value);
    }
  };

  const handleSave = async (fieldName: string) => {
    try {
      const updateData = { [fieldName]: tempValue };

      await axios.put(
        `${API_URL}/auth/update`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state
      setFields(prevFields =>
        prevFields.map(field =>
          field.name === fieldName
            ? { ...field, value: tempValue }
            : field
        )
      );

      setEditingField(null);
      setTempValue("");
      setMessage("Field updated successfully!");

      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error updating field:", error);
      setMessage("Error updating field");
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent, fieldName: string) => {
    if (e.key === 'Enter') {
      handleSave(fieldName);
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!token) {
    return <p>You are not logged in</p>;
  }

  return (
    <div>

      {message && <p className="message">{message}</p>}

      <div className="grid-2-col-form">
        {fields.map((field) => (
          <div key={field.name} >


            {editingField === field.name ? (
              // Edit mode
              <div className="edit-mode">
                <h5 className="">{field.label}:</h5>
                <input
                  type={field.type}
                  value={tempValue}
                  onChange={handleInputChange}
                  onKeyDown={(e) => handleKeyPress(e, field.name)}
                  autoFocus
                  disabled={!field.editable}
                />
                <div className="edit-buttons">
                  <button
                    type="button"
                    className="button-1 bt-orange"
                    onClick={() => handleSave(field.name)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="button-1 bt-black"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Display mode
              <div className="display-mode">
                {field.editable && (
                  <button
                    type="button"
                    className="button-edit bt-orange"
                    onClick={() => handleEdit(field.name)}
                  >
                    <img 
                      src="/img/Icons/Edit.svg" 
                      alt="Edit" 
                      width="16" 
                      height="16"
                    />
                  </button>
                )}
                <h5 className="">{field.label}:</h5>
                <span className="field-value">{field.value || "Not set"}</span>

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileInfo;

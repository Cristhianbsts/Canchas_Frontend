import CardField from "./CardField";
import { useState, useEffect } from "react";
import ReserveModal from "./ReserveModal";
import { getField } from "../helpers/field";

const ListCardField = () => {
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        setLoading(true);

        const data = await getField();

        if (Array.isArray(data)) {
          setFields(data);
        } else if (Array.isArray(data?.fields)) {
          setFields(data.fields);
        } else {
          setFields([]);
        }
      } catch (error) {
        console.error("Error cargando canchas:", error);
        setFields([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  if (loading) {
    return <div className="container px-4">Cargando canchas...</div>;
  }

  return (
    <div className="container px-4">
      <div className="row">
        {fields.length === 0 ? (
          <p>No hay canchas disponibles</p>
        ) : (
          fields.map((field) => (
            <CardField
              key={field._id}
              court={field}
              openModal={() => setSelectedCourt(field)}
            />
          ))
        )}
      </div>

      {selectedCourt && (
        <ReserveModal
          court={selectedCourt}
          closeModal={() => setSelectedCourt(null)}
        />
      )}
    </div>
  );
};

export default ListCardField;
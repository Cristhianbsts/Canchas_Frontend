import CardField from "./CardField";
import { useState, useEffect } from "react";
import ReserveModal from "./ReserveModal";
import { getField } from "../helpers/field";

const ListCardField = () => {
  const [selectedCourt, setSelectedCourt] = useState(null);

  const [fields, setFields] = useState([]);

  useEffect(() => {
    const fetchFields = async () => {
      const data = await getField();
      setFields(data);
    };

    fetchFields();
  }, []);
  return (
    <div className="container px-4">
      <div className="row">
        {fields.map((field) => (
          <CardField
            key={field._id}
            court={field}
            openModal={() => setSelectedCourt(field)}
          />
        ))}
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

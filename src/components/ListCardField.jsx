import CardField from "./CardField";
import { useState, useEffect, useContext, useMemo } from "react";
import ReserveModal from "./ReserveModal";
import { getField } from "../helpers/field";
import { UserContext } from "../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";

const ListCardField = () => {
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  const { user, loadUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleOpenModal = async (field) => {
    const currentUser = user?._id ? user : await loadUserData();

    if (!currentUser?._id) {
      alert("Debes iniciar sesión para reservar una cancha");
      navigate("/login", { state: { from: location } });
      return;
    }

    setSelectedCourt(field);
  };

  const filteredFields = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const result = fields.filter((field) => {
      const matchesSearch =
        !normalizedSearch ||
        String(field?.name || "").toLowerCase().includes(normalizedSearch);

      const matchesAvailability =
        availabilityFilter === "all" ||
        (availabilityFilter === "available" && field?.active) ||
        (availabilityFilter === "unavailable" && !field?.active);

      return matchesSearch && matchesAvailability;
    });

    return result.sort((a, b) => {
      if (sortBy === "price-asc") return Number(a?.pricePerHour || 0) - Number(b?.pricePerHour || 0);
      if (sortBy === "price-desc") return Number(b?.pricePerHour || 0) - Number(a?.pricePerHour || 0);
      if (sortBy === "name") return String(a?.name || "").localeCompare(String(b?.name || ""));
      if (Boolean(b?.active) !== Boolean(a?.active)) return Number(Boolean(b?.active)) - Number(Boolean(a?.active));
      return Number(a?.pricePerHour || 0) - Number(b?.pricePerHour || 0);
    });
  }, [availabilityFilter, fields, searchTerm, sortBy]);

  if (loading) {
    return (
      <div className="container px-4">
        <div className="fields-loading text-center py-5">Cargando canchas...</div>
      </div>
    );
  }

  return (
    <div className="container px-4">
      <div className="fields-toolbar">
        <div className="fields-toolbar-copy">
          <span className="fields-toolbar-label">Explora y filtra</span>
          <h3 className="fields-toolbar-title">Encontrá tu horario ideal</h3>
          <p className="fields-toolbar-text">
            Buscá por nombre, filtrá disponibilidad y ordená por precio para reservar más rápido.
          </p>
        </div>

        <div className="fields-filters">
          <div className="fields-filter-item fields-filter-search">
            <label htmlFor="field-search" className="fields-filter-label">
              Buscar cancha
            </label>
            <input
              id="field-search"
              type="text"
              className="fields-filter-input"
              placeholder="Ej: Cancha 11"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div className="fields-filter-item">
            <label htmlFor="field-availability" className="fields-filter-label">
              Estado
            </label>
            <select
              id="field-availability"
              className="fields-filter-select"
              value={availabilityFilter}
              onChange={(event) => setAvailabilityFilter(event.target.value)}
            >
              <option value="all">Todas</option>
              <option value="available">Disponibles</option>
              <option value="unavailable">No disponibles</option>
            </select>
          </div>

          <div className="fields-filter-item">
            <label htmlFor="field-sort" className="fields-filter-label">
              Ordenar por
            </label>
            <select
              id="field-sort"
              className="fields-filter-select"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="recommended">Recomendadas</option>
              <option value="price-asc">Precio menor</option>
              <option value="price-desc">Precio mayor</option>
              <option value="name">Nombre</option>
            </select>
          </div>
        </div>
      </div>

      <div className="fields-results-meta">
        <span className="fields-results-badge">
          {filteredFields.length} cancha{filteredFields.length === 1 ? "" : "s"} encontrada{filteredFields.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="fields-grid row g-4">
        {filteredFields.length === 0 ? (
          <div className="col-12">
            <div className="fields-empty text-center">
              No encontramos canchas con esos filtros.
            </div>
          </div>
        ) : (
          filteredFields.map((field) => (
            <CardField
              key={field._id}
              court={field}
              openModal={() => handleOpenModal(field)}
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

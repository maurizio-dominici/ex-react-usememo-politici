import { useState, useEffect, useMemo, memo } from "react";

function PoliticianRender({ name, image, position, biography }) {
  console.log("card");

  return (
    <div className="card">
      <div className="card-media">
        <img src={image} alt={name} />
      </div>
      <div className="card-content">
        <h3>{name}</h3>
        <span>{position}</span>
        <p>{biography}</p>
      </div>
    </div>
  );
}

const MemoizedPoliticianCard = memo(PoliticianRender);

export default function PoliticiansList() {
  const [politicians, setPoliticians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [positionsFilter, setPositionFilter] = useState("");

  useEffect(() => {
    const fetchPoliticians = async () => {
      try {
        const response = await fetch("http://localhost:3333/politicians");
        if (!response.ok) {
          throw new Error(`Errore HTTP: ${response.status}`);
        }
        const data = await response.json();
        setPoliticians(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPoliticians();
  }, []);

  const positions = useMemo(() => {
    const uniquePositions = [];
    politicians.forEach((p) => {
      if (!uniquePositions.includes(p.position)) {
        uniquePositions.push(p.position);
      }
    });
    return uniquePositions;
  }, [politicians]);

  const filterPoliticians = useMemo(() => {
    return politicians.filter((politician) => {
      const isInName = politician.name
        .toLowerCase()
        .includes(filter.toLocaleLowerCase());
      const isInBio = politician.biography
        .toLowerCase()
        .includes(filter.toLocaleLowerCase());
      const isPositionValid =
        positionsFilter === "" || positionsFilter === politician.position;
      return (isInName || isInBio) && isPositionValid;
    });
  }, [politicians, filter, positionsFilter]);

  if (loading) return <p>Caricamento in corso...</p>;
  if (error) return <p>Errore: {error.message}</p>;

  return (
    <>
      <h1>Lista dei politici</h1>

      <input
        type="text"
        placeholder="Cerca per nome o biografia"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <select
        value={positionsFilter}
        onChange={(e) => setPositionFilter(e.target.value)}
      >
        <option value="">Filtra per posizione politica</option>
        {positions.map((position, index) => (
          <option key={index} value={position}>
            {position}
          </option>
        ))}
      </select>
      <div className="container">
        {filterPoliticians.map((p, index) => (
          <MemoizedPoliticianCard key={index} {...p} />
        ))}
      </div>
    </>
  );
}

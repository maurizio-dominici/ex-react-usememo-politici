import { useState, useEffect, useMemo } from "react";

export default function PoliticiansList() {
  const [politicians, setPoliticians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  console.log(filter);
  console.log(politicians);

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

  const filterPoliticians = useMemo(() => {
    return politicians.filter((politician) => {
      const isInName = politician.name
        .toLowerCase()
        .includes(filter.toLocaleLowerCase());
      const isInBio = politician.biography
        .toLowerCase()
        .includes(filter.toLocaleLowerCase());
      return isInName || isInBio;
    });
  }, [politicians, filter]);

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
      <div className="container">
        {filterPoliticians.map((p, index) => (
          <div key={index} className="card">
            <div className="card-media">
              <img src={p.image} alt={p.name} />
            </div>
            <div className="card-content">
              <h3>{p.name}</h3>
              <span>{p.position}</span>
              <p>{p.biography}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

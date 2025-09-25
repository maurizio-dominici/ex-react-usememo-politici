import { useState, useEffect } from "react";

export default function PoliticiansList() {
  const [politicians, setPoliticians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Caricamento in corso...</p>;
  if (error) return <p>Errore: {error.message}</p>;

  return (
    <>
      <h1>Lista dei politici</h1>

      <div className="container">
        {politicians.map((p, index) => (
          <div key={index} className="card">
            <div className="card-media">
              <img src={p.image} alt={p.name} />
            </div>
            <div className="card-content">
              <h3>{p.name}</h3>
              <span>{p.position}</span>
              <p>{p.biografy}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

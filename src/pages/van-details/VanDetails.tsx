import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Van } from '../../types/VanInterfaces';

export default function VanDetails() {
  const [van, setVan] = useState<Van | null>(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/vans/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVan(data.vans);
      });
  }, [id]);
  console.log(van);
  return <div>VanDetails</div>;
}

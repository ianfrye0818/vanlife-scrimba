//library imports
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

//component imports
import ReactLoading from 'react-loading';

//type imports
import { VanFilterEnum } from '../../types/VanEnums';

//context imports
import { VanFilterContext } from '../../pages/vans/VansPage';
import { DocumentData, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Van } from '../../types/VanInterfaces';

export default function Vanslist() {
  const { vanFilter } = useContext(VanFilterContext);
  const navigate = useNavigate();

  //fetches the vans from the server - uses react-query that also performs caching, refetching, and error/loading states
  const {
    data: vans,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['vans'],
    //query database for vans that are listed as available and assign them to vans variable
    queryFn: async () => {
      const q = query(collection(db, 'vans'), where('available', '==', true));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as DocumentData));
      return data as Van[];
    },
  });

  // while loading show the "bubble" loading component from react-loading
  if (isLoading) {
    return (
      <div className='h-[calc(100vh-100px)] flex justify-center items-center'>
        <ReactLoading
          type='bubbles'
          color='green'
          height={300}
          width={375}
        />
      </div>
    );
  }

  // if there is an error, show the error message
  if (error) {
    return (
      <div className='min-h-screen flex flex-col justify-center items-center text-3xl'>
        No vans Found
      </div>
    );
  }

  //if data does not exisist return null and redirec to 404 not found page
  if (vans === null || vans === undefined) {
    navigate('/not-found');
    return null;
  }

  //extract vans out of data.vans

  //filter the vans based on the vanFilter context
  const filteredVans =
    vanFilter.length > 0
      ? vans.filter((van) => vanFilter.includes(van.type as VanFilterEnum))
      : vans;

  return (
    <main className='min-h-screen'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-col-4 gap-5 p-0 w-full max-w-5xl my-16 mx-auto'>
        {filteredVans.map((van, index) => (
          <Link
            to={`/vans/${van.id}`}
            key={index}
          >
            <div className='p-5 rounded-xl flex flex-col justify-between gap-3 h-full md:border-1 md:border'>
              <img
                className='w-full h-full md:max-h-[300px] sm:object-contain  bg-cover rounded-xl'
                src={van.imageURL}
                alt={van.name}
              />
              <div className='flex justify-between items-center'>
                <h2>{van.name}</h2>
                <div className='flex flex-col justify-center items-end text-xl'>
                  <span>${van.price}</span>
                  <span className='text-lg'>/day</span>
                </div>
              </div>
              <div
                className={`p-3 text-[#ffead0] inline max-w-28 text-center rounded-xl text-xl ${van.type}`}
              >
                {van.type}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

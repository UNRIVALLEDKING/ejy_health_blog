'use client';
import { GetRequest } from '@/constants/functions';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function ProfilePage({ params }) {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  const fetchData = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const data = await GetRequest(`/user-info/${params.id}`, token);
        if (data.status === 401) {
          toast.error('Token Expired');
          toast.info('Please log in again.');
          // router.push('/login');
          console.log('data', data);
        } else if (data.status === 200) {
          setUserData(data.fetchData);
          const user = data.fetchData.user;
          // console.log('data', user);
          localStorage.setItem(
            'userData',
            JSON.stringify({
              fullname: user.fullname,
              verified: user.isEmailVerified,
            })
          );
        } else {
          console.error('Error fetching user data:', data);
          toast.error('Error fetching user data.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error fetching user data.');
      }
    } else {
      console.error('Invalid User login again');
      toast.error('Invalid User login again');
      router.push('/login');
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);

  return (
    <div>
      <div>
        <p>Yahallo! {userData?.user.fullname} </p>
      </div>
    </div>
  );
}

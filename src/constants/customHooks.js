'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { GetRequest } from './functions';

export function useUser() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    setToken(userToken);

    const sessionAuthData = sessionStorage.getItem('authData');
    if (sessionAuthData) {
      const authData = JSON.parse(sessionAuthData);
      setUser(authData.user);
      setAuthenticated(authData.authenticated);
      setLoading(false);
      return;
    }

    const getAuthenticated = async () => {
      try {
        let userStatus = await GetRequest(
          `/admin/users/detail-user/${id}`,
          userToken
        );
        if (userStatus.status === 200) {
          setUser(userStatus.fetchData);
          setAuthenticated(true);

          // Store authentication data in session storage
          sessionStorage.setItem(
            'authData',
            JSON.stringify({ user: userStatus.fetchData, authenticated: true })
          );
        } else if (userStatus.status === 401) {
          toast.error('Token Expired');
          toast.info('Please login again');
          router.push('/login');
        } else {
          console.log('Error Authenticating user', data);
          toast.error('Error Authenticating user');
          toast.info('Please login again');
          router.push('/login');
        }
      } catch (error) {
        console.error('Error Authenticating user', error);
        toast.error('Error Authenticating user');
        toast.info('Please login again');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    getAuthenticated();
  }, []);

  return { userData: user, authenticated, token, loading };
}

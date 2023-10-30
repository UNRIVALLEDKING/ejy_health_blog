'use client';

import { useUser } from '@/constants/customHooks';
import { PutRequest } from '@/constants/functions';
import { toast } from 'react-toastify';

export default function TempComponent() {
  const { userData, authenticated, loading, token } = useUser();

  const upgradeToAdmin = async () => {
    // put request to /admin/users/add-role/:id
    const id = userData.user._id;
    const formData = {
      name: 'admin',
    };
    let isAdmin = false;
    userData.user.roles.map((item) => {
      if (item.name === 'admin') {
        isAdmin = true;
      }
    });
    const orgPass = prompt('Enter Organisation Password');
    if (orgPass === 'EJY_health_76qhf9d7hr') {
      if (!isAdmin) {
        const addRole = await PutRequest(
          `/admin/users/add-role/${id}`,
          formData,
          token
        );
        if (addRole.status === 200) {
          toast.success('You are an admin now');
          sessionStorage.clear();
        } else {
          console.log('err', addRole);
        }
      } else {
        toast.info('you are already an admin');
      }
    }

    console.log('role', isAdmin);
  };
  return (
    <>
      Roles
      {userData?.user.roles.map((item, id) => (
        <p key={id}>{item.name}</p>
      ))}
      <button className="btn-primary" onClick={upgradeToAdmin}>
        Upgrade to Admin
      </button>
    </>
  );
}

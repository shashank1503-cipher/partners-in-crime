import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileDetail from '../components/ProfileDetail';

import SidebarWithHeader from '../components/Sidebar';


const ProfileDetailPage = () => {
  let { id } = useParams();
  console.log(id);
  return (
    <SidebarWithHeader>
      <ProfileDetail id={id} />
    </SidebarWithHeader>
  );
};

export default ProfileDetailPage;

import React from 'react';
import { useLocation, useParams } from 'react-router';
import EditProject from '../components/EditProject';
import SidebarWithHeader from '../components/Sidebar';

const EditProjectPage = () => {
  let { id } = useParams();
  let { state } = useLocation();
  let { data } = state;
  return (
    <SidebarWithHeader>
      <EditProject id={id} initialData={data} />
    </SidebarWithHeader>
  );
};

export default EditProjectPage;

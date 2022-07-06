import React from 'react';
import { useParams } from 'react-router';
import SidebarWithHeader from '../components/Sidebar';
import SpecificProject from '../components/SpecificProject';

const SpecificProjectPage = () => {
  let { id } = useParams();
  console.log(id);
  return (
    <SidebarWithHeader>
      <SpecificProject id={id} />
    </SidebarWithHeader>
  );
};

export default SpecificProjectPage;

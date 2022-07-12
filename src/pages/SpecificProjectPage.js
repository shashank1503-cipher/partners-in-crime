import React from 'react';
import { useParams } from 'react-router-dom';

import SidebarWithHeader from '../components/Sidebar';
import SpecificProject from '../components/SpecificProject';

const SpecificProjectPage = () => {
  let { id } = useParams();
 
  return (
    <SidebarWithHeader>
      <SpecificProject id={id} />
    </SidebarWithHeader>
  );
};

export default SpecificProjectPage;

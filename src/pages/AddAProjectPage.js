import React from 'react';
import AddAProject from '../components/AddAProject';
import Footer from '../components/Footer';
import SidebarWithHeader from '../components/Sidebar';

const AddAProjectPage = () => {
  return (
    <SidebarWithHeader>
      <AddAProject />
      <Footer/>
    </SidebarWithHeader>
   
  );
};

export default AddAProjectPage;

import React from 'react'
import SidebarWithHeader from '../components/Sidebar'

import Search from '../components/Search';
  
  export default function Searchpage() {
    return (
        <SidebarWithHeader>
        <Search></Search>
      </SidebarWithHeader>
    );
  }

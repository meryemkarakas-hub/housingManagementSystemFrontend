import React from 'react'
import NestedListMenu from "./NestedListMenu"; 
import DashboardMenu from "./DashboardMenu"; 
import '../styles.css';

export default function Menu() {
  return (
    <div>
      <DashboardMenu />
      <div className="leftMenu"> 
        <NestedListMenu />
      </div>
    </div>
  )
}

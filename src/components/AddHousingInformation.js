import React from 'react'
import NestedListMenu from "./NestedListMenu"; 
import DashboardMenu from "./DashboardMenu"; 

export default function AddHousingInformation() {
  return (
    <div>
    <DashboardMenu />
    <div className="leftMenu"> 
      <NestedListMenu />
    </div>
  </div>
  )
}

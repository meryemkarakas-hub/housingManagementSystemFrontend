import React from 'react'
import NestedListMenu from "./NestedListMenu"; 
import DashboardMenu from "./DashboardMenu"; 
import FileUpload from './FileUpload';

export default function AddHousingInformation() {
  return (
    <div>
      <DashboardMenu />
      <div className="leftMenu"> 
        <NestedListMenu />
      </div>
      <div className="rightMenu">
        <FileUpload /> {/* FileUpload komponentini sağ menüye ekleyin */}
      </div>
    </div>
  )
}

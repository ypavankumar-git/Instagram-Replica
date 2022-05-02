import React from "react";
import "./style.css";

export default function Links() {
    return(
        <div className="linkContainer">
         <div className="upperLinks links">
              <p className="paraLink">Meta</p>
              <p className="paraLink">About</p>
              <p className="paraLink">Blog</p>
              <p className="paraLink">Jobs</p>
              <p className="paraLink">Help</p>
              <p className="paraLink">API</p>
              <p className="paraLink">Privacy</p>
              <p className="paraLink">Terms</p>
              <p className="paraLink">Top accounts</p>
              <p className="paraLink">Hashtags</p>
              <p className="paraLink">Locations</p>
              <p className="paraLink">Instagram Lite</p>
         </div>
              
         <div className="lowerLinks links">
              <p className="paraLink">Dance</p>
              <p className="paraLink">Food & drink</p>
              <p className="paraLink">Home & garden</p>
              <p className="paraLink">Music</p>
              <p className="paraLink">Visual arts</p>
         </div>
              
        </div>
    )
}
import { Link, NavLink } from "react-router-dom";
import { navbarLinks } from "../libs/constants";
import React, { useContext } from "react";
import { ProductContext } from "../libs/context";
function Navbar() {
  const data=useContext(ProductContext)
  console.log("dataaaaaa:",data);
  return (
    
    <div className="relative w-[100%] ">
      <header className="bg-[#2b2b2b]  text-white flex flex-wrap gap-1 py-3 w-[100%] justify-between">
        <div className="flex justify-start">
          {navbarLinks.map((item, index) => {
            console.log(item, index);
            return (
              <NavLink
                to={item.path}
                key={index}
                className={({ isActive }) =>
                  isActive
                    ? "sm:mx-[4.5px] ms-[1.9px] lg:text-2xl text-[17.4px] mx-2 sm:text-[21px] text-warning"
                    : "sm:mx-[4.5px] text-[17.4px] mx-2 ms-[1.9px] lg:text-2xl sm:text-[21px]"
                }
              >
                <React.Fragment>{item.title}</React.Fragment>
              </NavLink>
            );
          })}
          {/* Open the modal using document.getElementById('ID').showModal() method */}
        </div>

        <button
          className="mr-4 btn bg-primary  text-white"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          cart (0)
        </button>
     
      </header>
    </div>
  );
}

export default Navbar;

import CompanyNavbar from '../CompanyNavbar/CompanyNavbar'
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import ShowEvents from '../CompanyHomepage/ShowEvents';
import ProfileDetails from '../CompanyHomepage/ProfileDetails';
import EventModal from '../CompanyHomepage/EventModal';


import {
  FaChartBar,
  FaExchangeAlt,
} from "react-icons/fa";
function CompanyProfile() {
    const [open, setOpen] = useState(true);
    const [event,setEvent ]= useState(false)
    const [activeComponent, setActiveComponent] = useState("Company Profile");
    const handleCloseModal = () =>{
        setEvent(!event)
     }
    const Menus = [
      { title: "Company Profile", icon: <FaChartBar /> },
      { title: "Events", icon: <FaExchangeAlt /> },
    //   { title: "Loyalty", icon: <FaCreditCard /> },
    //   { title: "Subscriptions", icon: <FaCalendarAlt /> },
    //   { title: "Debts", icon: <FaBalanceScale /> },
    //   { title: "Legal", icon: <FaBalanceScale /> },
    //   { title: "Notifications", icon: <FaBell /> },
    //   { title: "Setting", icon: <FaCog /> },
    ];
  
    const renderComponent = () => {
      switch (activeComponent) {
        case "Company Profile":
          return <ProfileDetails/>
        case "Events":
          return <ShowEvents/>
        case "Loyalty":
          return <div className="animate-slideIn">Loyalty Cards Content</div>;
        case "Subscriptions":
          return <div className="animate-slideIn">Subscriptions Content</div>;
        case "Debts":
          return <div className="animate-slideIn">Debts Content</div>;
        case "Legal":
          return <div className="animate-slideIn">Legal information Content</div>;
        case "Notifications":
          return <div className="animate-slideIn">Notifications Content</div>;
        case "Setting":
          return <div className="animate-slideIn">Setting Content</div>;
        default:
          return <div className="animate-slideIn">Overview Content</div>;
      }
    };
    
    
      const handleOpenModal = () => {
        setEvent(true);
      };
  return (
    <>
    <CompanyNavbar onOpenModal={handleOpenModal}/>
    {event && (< div className='w-[890px]  delay-[2000ms] border shadow-md h-screen flex ml-[18%] mt-[100px]  bg-[#F6F6F6] rounded-md absolute z-50 '>
      <EventModal onClose={handleCloseModal} />
    </div>)}
    <div className="flex mt-10 " >
      <div
        className={`${
          open ? "w-72" : "w-20 pr-3" 
        } bg-blue-500 h-screen  pl-3 pt-8 relative duration-300 transition-all ease-in-out`}
      >
        <div
          className={`absolute flex justify-center items-center cursor-pointer right-2 h-[30px]     outline-white top-9 w-7  rounded-full ${
            !open && "rotate-180"
          } transition-transform duration-300 ease-in-out`}
          onClick={() => setOpen(!open)}
        ><IoIosArrowForward className='text-white font-bold'/></div>
       
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex ${
                index === 0 && "bg-light-white"
              } ${
                activeComponent === Menu.title && "bg-blue-400"
              } rounded-md pt-2 pl-3 pb-2 cursor-pointer hover:bg-blue-400 text-white
               text-sm items-center gap-x-4 mt-2 transition-all duration-300 ease-in-out `}
              onClick={() => setActiveComponent(Menu.title)}
            >
              <div className="text-xl">{Menu.icon}</div>
              <span
                className={`${
                  !open && "hidden"
                } origin-left transition-all duration-300 ease-in-out`}
              >
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div onClick={()=>setEvent(false)}
        className="flex-1 mt-6  h-screen w-full bg-slate-200 text-white transition-all duration-300 ease-in-out overflow-auto"
      >
        {renderComponent()}
      </div>
    </div>
    </>
  )
}

export default CompanyProfile
import { useEffect } from "react";
import Footer from "../components/home/Footer/Footer";
import FooterBottom from "../components/home/Footer/FooterBottom";
import Header from "../components/home/Header/Header";
import HeaderBottom from "../components/home/Header/HeaderBottom";
import SpecialCase from "../components/SpecialCase/SpecialCase";
import { ScrollRestoration, Outlet, useNavigate } from "react-router-dom";

const ThePublicLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem('accessToken');
    if (token === null) {
      navigate('/signin');
    }
  }, []);

  return (
    <div className="container-total">
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <div className="container-footer">
        <Footer />
        <FooterBottom />
      </div>
    </div>
  );
}
export default ThePublicLayout;
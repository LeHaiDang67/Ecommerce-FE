import React, { useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import BestSellers from "../../components/home/BestSellers/BestSellers";

const sortByType = [
  "BestSellers",
  "NewArrival",
  "Featured",
  "FinalOffer"
]

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortType, setSortType] = useState("");
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  const handleSortType = (event) =>{
    setSortType(event.target.value);
  }

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />
      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} sortType={sortType} onhandleSortType={handleSortType} />
          <Pagination itemsPerPage={itemsPerPage} sortType={sortType}/>
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;

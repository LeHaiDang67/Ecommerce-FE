import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { paginationItems, BestSellerItems, NewArrivalItems, SpecialOfferItem } from "../../../constants";
import { useEffect } from "react";
import $ from "jquery";
import { useSelector } from "react-redux";

const items = paginationItems;
function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item._id} className="w-full">
            <Product
              _id={item._id}
              img={item.img}
              productName={item.productName}
              price={item.price}
              color={item.color}
              badge={item.badge}
              des={item.des}
            />
          </div>
        ))}
    </>
  );
}

const Pagination = ({ itemsPerPage, sortType }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const seachtxt = useSelector((state) => state.orebiReducer.seachtxt);
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const [currentItems, setCurrentItems] = useState(items)

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % totalItem;
    setItemOffset(newOffset);
    setItemStart(newOffset);
  };

  useEffect(() => {
    $(`.font-semibold .mr-6:nth-child(${0})`).addClass("bg-black text-white");
    setItemOffset(0);
    setItemStart(0);
  }, [sortType])

  const handleType = (data, endOffset) => {
    if(seachtxt != ''){
      const filtered = data.filter((item) =>
      item.productName.toLowerCase().includes(seachtxt.toLowerCase())
      );
      setCurrentItems(filtered.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(filtered.length / itemsPerPage));
      setTotalItem(filtered.length);
    } else {
      setCurrentItems(data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(data.length / itemsPerPage));
      setTotalItem(data.length);
    }
  
  }

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    switch (sortType) {
      case "BestSellers":
        handleType(BestSellerItems, endOffset);
        break;
      case "NewArrival":
        handleType(NewArrivalItems, endOffset);
        break;
      case "Featured":
        handleType(SpecialOfferItem, endOffset);
        break;
      case "FinalOffer":
        handleType(SpecialOfferItem, endOffset);
        break;
      default:
        handleType(paginationItems, endOffset);
        break;
    }
  }, [sortType, itemOffset, itemsPerPage, seachtxt]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={currentItems} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
          key={pageCount}
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart === 0 ? 1 : itemStart} to {(itemOffset + itemsPerPage) > totalItem ? totalItem : (itemOffset + itemsPerPage)} of{" "}
          {totalItem}
        </p>
      </div>
    </div>
  );
};

export default Pagination;

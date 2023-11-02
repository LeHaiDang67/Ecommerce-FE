import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { paginationItems, BestSellerItems, NewArrivalItems, SpecialOfferItem } from "../../../constants";
import { useEffect } from "react";
import $ from "jquery";

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
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const [currentItems, setCurrentItems] = useState(items)

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    setItemStart(newOffset);
  };

  useEffect(() => {
    setItemOffset(0);
    setItemStart(0);
  }, [sortType])

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    $(`.font-semibold .mr-6:nth-child(${0})`).addClass("bg-black text-white");
    switch (sortType) {
      case "BestSellers":
        setCurrentItems(BestSellerItems.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(BestSellerItems.length / itemsPerPage));
        break;
      case "NewArrival":
        setCurrentItems(NewArrivalItems.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(NewArrivalItems.length / itemsPerPage));
        break;
      case "Featured":
        setCurrentItems(NewArrivalItems.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(NewArrivalItems.length / itemsPerPage));
        break;
      case "FinalOffer":
        setCurrentItems(SpecialOfferItem.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(SpecialOfferItem.length / itemsPerPage));
        break;
      default:
        setCurrentItems(paginationItems.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(paginationItems.length / itemsPerPage));
        break;
    }
  }, [sortType, itemOffset, itemsPerPage]);

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
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart === 0 ? 1 : itemStart} to {itemOffset + itemsPerPage} of{" "}
          {items.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;

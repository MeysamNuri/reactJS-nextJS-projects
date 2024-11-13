import { useState } from 'react'
import ReactPaginate from "react-paginate"
import ProductListing from "../ProductListing"

const PaginateItems = ({ productsPerPage, products, isLoading,isSuccess,isError }) => {
  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + productsPerPage

  const currentProducts = products.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(products.length / productsPerPage)

  const handlePage = (e) => {
    const newOffset = e.selected * productsPerPage
    setItemOffset(newOffset)
    document.documentElement.scrollTop = 0
  }

  return (
    <>
      <ProductListing currentProducts={currentProducts} isLoading={isLoading} isSuccess={isSuccess} isError={isError}/>
      <ReactPaginate
        containerClassName="flex justify-center items-center mt-8 mb-4"
        pageClassName="block border border-solid border-lightGray w-10 h-10 flex items-center justify-center rounded-md mr-2"
        activeClassName="bg-palette-primary text-palette-light hover:bg-palette-dark"
        breakLabel="..."
        pageCount={pageCount}
        onPageChange={handlePage}
        renderOnZeroPageCount={null}
        previousLabel={null}
        nextLabel={null}
        pageRangeDisplayed={5}
      />
    </>
  )
}

export default PaginateItems
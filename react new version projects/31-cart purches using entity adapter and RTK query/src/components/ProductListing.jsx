import { useSelector } from "react-redux";

import { useGetAllProductsQuery } from "../slices/productApi";
import ProductCard from "./ProductCard";

const ProductListing = ({isLoading,currentProducts,isSuccess,isError}) => {
    // const { status } = useSelector((state) => state.products);

    // const { data } = useGetAllProductsQuery();
    return (
        <div className="py-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
            {isSuccess? (
                <>
                    {currentProducts?.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </>
            ) : isLoading ? (
                <p>در حال بارگذاری</p>
            ) : (
                <p>مشکلی پیش آمده...</p>
            )}
        </div>
    );
};

export default ProductListing;

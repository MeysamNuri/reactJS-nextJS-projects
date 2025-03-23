import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiscountDialog } from "../../actions/MainActions";
import Header from "../../components/header/Header";
import DiscountListItems from "../../components/listItems/discountListItems";
import useDataApi from "../../components/fetchData/useDataApi";
import AlertDialog from "../../components/dialog/dialog";
import "./discount.less";

const style = {
  height: "18vh",
  margin: 0,
  background: "#FFFFFF",
  marginBottom: "16px",
  borderRadius: "8px",
};

const styleDialog = {
  height: "30vh",
};

const options = [
  "حروف الفبا",
  "بیشترین تخفیف",
  "ارزان ترین",
  "گران ترین",
  "جدیدترین",
  "پر فروش ترین",
];

function Discount() {
  const open = useSelector((state) => state.MainReducer.discountDialog);
  const tick = useSelector((state) => state.MainReducer.discountTick);
  const Dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const [
    { data, isLoading, isError },
    doFetch,
  ] = useDataApi(`https://hn.algolia.com/api/v1/search?query=${query}`, {
    hits: [],
  });
  const url = "https://#";
  const back = "store";

  // useEffect(() => {
  //   window.scrollTo(0, '10vh');
  // }, []);

  useEffect(() => {
    const elem = document.getElementById(`tick${tick}`);
    if (elem) {
      document.getElementById(`tick${tick === 2 ? 1 : 2}`).style.display =
        "none";
      elem.style.display = "block";
    }
  }, [tick]);

  const handleClick = useCallback((e) => {
    Dispatch(getDiscountDialog(!open));
    document.getElementsByClassName("container")[0].style.filter =
      "blur(2.5px)";
  });
  
  return (
    <div className="container">
      <Header
        title="تخفیف دارها"
        leftIcon="assets/images/arrow-w-rotate.svg"
        rightIcon="assets/images/sort-tool.svg"
        isSearch={true}
        placeholder={"جستجو در کالاها"}
        url={url}
        back={back}
        handleRightClick={(e) => handleClick(e)}
      />
      <div className="content">
        <DiscountListItems data={data} style={style} />
      </div>
      <AlertDialog
        title={"چیدن محصولات براساس:"}
        options={options}
        style={styleDialog}
      />
    </div>
  );
}

export default Discount;

import React from "react";
import { withRouter } from "react-router-dom";
import ListDialog from "../container/ListDialogContainer";
import CalcDialog from "../container/CalcDialogContainer";
import SetStorage from "./SetStorage";
import search from "../images/search.svg";
import backSearch from "../images/arrow_back.svg";
import back from "../images/back.svg";
import { Grid, Container } from "@material-ui/core/";
import store from "../libs/myStore";
import star from "../images/stars9.svg";
import "./styles.css";
import { style } from "@material-ui/system";
import {
  getFoodDrawer,
  getCalcDrawer,
  getBackCategory
} from "../action/conversation";
class Food extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedState: 0,
      flag: false,
      query: "",
      data: [],
      search: false,
      information: store.get("information").FoodCatagories,
      searchString: []
    };
    var temp = new Array();
    var info = this.state.information;
    ///ExerciseCatagories[0].Exercises[0].Exercise,
    for (let i = 0; i < info.length; i++) {
      for (let j = 0; j < info[i].Foods.length; j++) {
        this.state.data.push(info[i].Foods[j].FoodName);
        this.state.searchString.push(info[i].Foods[j].FoodName);
      }
    }
  }
  componentWillMount() {
    if (!store.get("Login")) {
      this.props.history.push("./");
    }
  }
  handleInputChange = event => {
    this.setState(
      {
        query: event.target.value
      },
      () => {
        this.filterArray();
      }
    );
  };

  filterArray = () => {
    let searchString = this.state.query;
    let responseData = this.state.data;

    if (searchString.length > 0) {
      responseData = responseData.filter(a => a.includes(searchString));
      this.setState({
        responseData
      });
    }
  };
  handleChange(number) {
    this.props.dispatch(getFoodDrawer(true));
    this.setState({ selectedState: number });
  }
  handleFavorite() {
    const FavoriteFoods = store.get("FavoriteFoods");

    if (FavoriteFoods != undefined) {
      return FavoriteFoods.map(food => (
        <div
          className="regular_font"
          style={{
            display: "inline-block",
            height: "4vh",
            backgroundColor: "#f2f2f2",
            borderRadius: 5,
            fontSize: "2vh",
            margin: "1vh",
            padding: "2vh"
          }}
          onClick={() => {
            store.set("foodName", food.FoodName);
            this.props.dispatch(getCalcDrawer(true));
            this.props.dispatch(getBackCategory(true));
          }}
        >
          {food.FoodName}
        </div>
      ));
    } else {
    }
  }
  handleClick(e, i) {
    store.set("foodName", i);
    
    this.props.dispatch(getBackCategory(true));
    this.props.dispatch(getCalcDrawer(true));
    var info = this.state.information;
    for (let i = 0; i < info.length; i++) {
      for (let j = 0; j < info[i].Foods.length; j++) {
        if (info[i].Foods[j].FoodName === i) {
          store.set("foodData", info[i].Foods[j]);
        }
      }
    }
  }
  render() {
    return (
      <Grid
        container
        direction="column"
        style={{ height: "173vw", display: "flex", fontSize: "2vh" }}
        className="bold_font"
      >
        <Grid
          item
          container
          direction="row"
          style={{ height: "16vw", backgroundColor: "#44DC85" }}
        >
          <Grid
            xs={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <img
              src={search}
              style={{
                height: "4vh"
              }}
              onClick={() => {
                this.setState({ search: !this.state.search });
              }}
            />
          </Grid>
          <Grid xs={6}></Grid>
          <Grid
            xs={4}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
            onClick={() => this.props.history.push("./main")}
          >
            <span style={{ fontSize: "3vh", color: "#fff" }}>غذاها</span>
            <img
              src={back}
              style={{
                height: "4vh"
              }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          style={{
            height: "16vw",
            width: "100%",
            display: "block",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            overflow: "auto",
            whiteSpace: "nowrap"
          }}
        >
          {this.handleFavorite()}
        </Grid>
        <Grid
          item
          container
          direction="column"
          style={{
            height: "140vw",
            width: "80vw",
            alignSelf: "center",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "space-around"
          }}
        >
          <Grid
            item
            container
            direction="row"
            style={{ height: "25vw", justifyContent: "space-between" }}
          >
            <Grid item style={{ width: "24vw" }} className="sport">
              <input
                name="sport"
                value="1"
                type="radio"
                className="sport-input"
                onClick={() => this.handleChange(1)}
              />
              <label style={{ width: "100%", height: "100%" }}>تنقلات</label>
            </Grid>
            <Grid item style={{ width: "24vw" }} className="sport">
              <input
                name="sport"
                value="2"
                type="radio"
                className="sport-input"
                onClick={() => this.handleChange(2)}
              />
              <label style={{ width: "100%", height: "100%" }}>پلوها</label>
            </Grid>
            <Grid item style={{ width: "24vw" }} className="sport">
              <input
                name="sport"
                value="3"
                type="radio"
                className="sport-input"
                onClick={() => this.handleChange(3)}
              />
              <label style={{ width: "100%", height: "100%" }}>شیرینی</label>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            style={{ height: "25vw", justifyContent: "space-between" }}
          >
            <Grid item style={{ width: "24vw" }} className="sport">
              <input
                name="sport"
                value="4"
                type="radio"
                className="sport-input"
                onClick={() => this.handleChange(4)}
              />
              <label style={{ width: "100%", height: "100%" }}>خورشت</label>
            </Grid>
            <Grid item style={{ width: "24vw" }} className="sport">
              <input
                name="sport"
                value="5"
                type="radio"
                className="sport-input"
                onClick={() => this.handleChange(5)}
              />
              <label style={{ width: "100%", height: "100%" }}>سبزیجات</label>
            </Grid>
            <Grid item style={{ width: "24vw" }} className="sport">
              <input
                name="sport"
                value="6"
                type="radio"
                className="sport-input"
                onClick={() => this.handleChange(6)}
              />
              <label style={{ width: "100%", height: "100%" }}>میوه ها</label>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            style={{ height: "25vw", justifyContent: "space-between" }}
          >
            <Grid item style={{ width: "24vw" }} className="sport">
              <input
                name="sport"
                value="7"
                type="radio"
                className="sport-input"
                onClick={() => this.handleChange(7)}
              />
              <label style={{ width: "100%", height: "100%" }}> نوشیدنی </label>
            </Grid>
            <Grid item style={{ width: "24vw" }} className="sport">
              <input
                name="sport"
                value="8"
                type="radio"
                className="sport-input"
                onClick={() => this.handleChange(8)}
              />
              <label style={{ width: "100%", height: "100%" }}> متفرقه</label>
            </Grid>
            <Grid item style={{ width: "24vw" }} className="sport">
              <input
                name="sport"
                value="9"
                type="radio"
                className="sport-input"
                onClick={() => this.handleChange(9)}
              />
              <label style={{ width: "100%", height: "100%" }}>
                حبوبات و غلات
              </label>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            style={{ height: "25vw", justifyContent: "space-between" }}
          >
            <Grid item style={{ width: "24vw" }} className="sport">
              <input
                name="sport"
                value="10"
                type="radio"
                className="sport-input"
                onClick={() => this.handleChange(10)}
              />
              <label style={{ width: "100%", height: "100%" }}>
                گوشت و لبنیات
              </label>
            </Grid>
            <Grid style={{ width: "24vw" }} className="sport">
              <input
                name="sport"
                value="11"
                type="radio"
                className="sport-input"
                onClick={() => this.handleChange(11)}
              />
              <label style={{ width: "100%", height: "100%" }}>سالاد</label>
            </Grid>
            <Grid item style={{ width: "24vw" }} className="sport">
              <input
                name="sport"
                value="12"
                type="radio"
                className="sport-input"
                onClick={() => this.handleChange(12)}
              />
              <label style={{ width: "100%", height: "100%" }}>فست فود</label>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            style={{ height: "25vw", justifyContent: "space-between" }}
          >
            <Grid item style={{ width: "24vw" }} className="sport">
              <input
                name="sport"
                value="10"
                type="radio"
                className="sport-input"
                onClick={() => this.handleChange(100)}
              />
              <label style={{ width: "100%", height: "100%" }}>
                <img
                  src={star}
                  style={{ alignSelf: "center", height: "8vh" }}
                  // onClick={() => this.handleWeight()}
                />
              </label>
            </Grid>
            <Grid item style={{ width: "24vw" }} className="sport">
              <input
                name="sport"
                value="11"
                type="radio"
                className="sport-input"
                onClick={() => this.handleChange(13)}
              />
              <label style={{ width: "100%", height: "100%" }}>
                غذای رژیمی
              </label>
            </Grid>
            <Grid style={{ width: "24vw" }} className="sport">
              <input
                name="sport"
                value="12"
                type="radio"
                className="sport-input"
                onClick={() => this.handleChange(14)}
              />
              <label style={{ width: "100%", height: "100%" }}>
                غذاهای شخصی
              </label>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          className={
            this.state.search === false ? "sport_header" : "search_header"
          }
        >
          <div className="searchForm">
            <form>
              <input
                type="text"
                id="filter"
                placeholder="جستجو..."
                value={this.state.query}
                autoComplete="off"
                onChange={this.handleInputChange}
              />
            </form>
            <div
              style={{
                position: "absolute",
                top: "15vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                left: "10vw",
                width: "80vw"
              }}
            >
              {this.state.responseData != null
                ? this.state.responseData.map(i => (
                    <span
                      style={{
                        zIndex: 100,
                        direction: "rtl",
                        padding: "3vh",
                        color: "darkgrey",
                        fontSize: "2.5vh"
                      }}
                      onClick={event => this.handleClick(event, i)}
                    >
                      {i}
                    </span>
                  ))
                : null}
            </div>
          </div>
        </Grid>
        <Grid
          item
          className={this.state.search === false ? "sport_body" : "search_body"}
        ></Grid>

        {this.props.foodSlide === true && (
          <ListDialog
            category={this.state.selectedState}
            Slide={this.props.foodSlide}
            id={1}
          />
        )}
        {this.props.calcSlide === true && (
          <CalcDialog
            // category={this.state.selectedState}
            Slide={this.props.calcSlide}
            mealFood={this.props.mealFood}
            id={1}
            // backCategory={this.props.backCategory}
          />
        )}
        <img
          src={backSearch}
          style={{
            position: "absolute",
            height: "4vh",
            top: "3vh",
            left: "5vw",
            display: this.state.search ? "block" : "none"
          }}
          onClick={() => {
            this.setState({ search: !this.state.search });
            this.setState({ query: "" });
          }}
        />
      </Grid>
    );
  }
}
export default withRouter(Food);

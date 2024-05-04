import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { toast } from "react-toastify"



const cartAdapter = createEntityAdapter()

const initialState = cartAdapter.getInitialState({
    //ids:[],entities:{}, -> id-> bookId ->selectedId
    cartTotalQty: 0,
    cartTotalAmount: 0
})
// const initialState = {
//     cartItems: localStorage.getItem("cartItems") ?
//         JSON.parse(localStorage.getItem("cartItems")) : [],
//     cartTotalQty: 0,
//     cartTotalAmount: 0
// }

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        populateCart(state, action) {
            if (localStorage.getItem("cartItems")) {
                cartAdapter.setAll(state, JSON.parse(localStorage.getItem("cartItems")))
            }
        },
        addToCart(state, action) {
            // let existingItem = state.cartItems.findIndex((item) => item.id === action.payload.id)
            // if (existingItem >= 0) {
            //     state.cartItems[existingItem] = {
            //         ...state.cartItems[existingItem],
            //         cartQty: state.cartItems[existingItem].cartQty + 1
            //     }
            //     toast.info("تعداد افزایش یافت", {
            //         position: "bottom-right"
            //     })
            // }
            const productExist = state.entities[action.payload.id]
            if (productExist) {
                state.entities[action.payload.id].cartQty += 1
                toast.info("تعداد افزایش یافت", {
                    position: "bottom-right"
                })
            }

            else {
                // let tempProduct = {
                //     ...action.payload,
                //     cartQty: action.payload?.cartQty
                // }
                // state.cartItems.push(tempProduct)

                cartAdapter.addOne(state, action.payload)
                toast.success("محصول با موفقیت اضافه شد", {
                    position: "bottom-right"
                })
            }
            localStorage.setItem("cartItems", JSON.stringify(state.entities))
        },
        decreaseCart(state, action) {

            // const itemIndex = state.cartItems?.findIndex((item) => {
            //     return item.id === action.payload.id
            // })
            // if (state.cartItems[itemIndex].cartQty > 1) {
            //     state.cartItems[itemIndex].cartQty -= 1

            //     toast.info("تعداد کاهش یافت", {
            //         position: "bottom-left",
            //     });
            // }

            const productItem = state.entities[action.payload.id]
            if (productItem.cartQty > 1) {
                productItem.cartQty -= 1
                toast.info("تعداد کاهش یافت", {
                    position: "bottom-left",
                });
            }
            else if (productItem.cartQty === 1) {
                // const removeCart = state.cartItems.filter((f) => {
                //     f.id !== action.payload.id
                // })
                // state.cartItems = removeCart
                cartAdapter.removeOne(state, action.payload.id)
                toast.error("محصول از سبد خرید حذف شد", {
                    position: "bottom-right"
                })

            }
            localStorage.setItem("cartItems", JSON.stringify(state.entities))
        },
        removeFromCart(state, action) {
            // state.cartItems.map((item) => {
            //     if (item.id === action.payload.id) {
            //         let nextCartItem = state.cartItems.filter((f) => {
            //             return f.id !== action.payload.id
            //         })
            //         state.cartItems = nextCartItem
            //         toast.error("محصول از سبد خرید حذف شد", {
            //             position: "bottom-right"
            //         })
            //     }
            //     localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            //     return state
            // })

            cartAdapter.removeOne(state, action.payload.id)
            toast.error("محصول از سبد خرید حذف شد", {
                position: "bottom-right"
            })
            localStorage.setItem("cartItems", JSON.stringify(state.entities))
        },
        getTotal(state, action) {
            let { mytotal, myqty } = Object.values(state.entities).reduce((cartTotal, catItem) => { //ابجکت را به لیست تبدیل میکند و فقط مقدار هارو درون لیست قرار میدهد
                const { price, cartQty } = catItem
                const totalAmount = price * cartQty
                cartTotal.mytotal += totalAmount
                cartTotal.myqty += cartQty

                return cartTotal
            },

                {
                    mytotal: 0,
                    myqty: 0
                })
            mytotal = parseFloat(mytotal.toFixed())
            state.cartTotalAmount = mytotal,
                state.cartTotalQty = myqty
        }
    }

})

export const { selectAll } = cartAdapter.getSelectors((state) => state.cart)

export const { addToCart,
    getTotal,
    removeFromCart,
    decreaseCart,
    populateCart } = cartSlice.actions
export default cartSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import { toast } from "react-toastify"




const initialState = {
    cartItems: localStorage.getItem("cartItems") ?
        JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQty: 0,
    cartTotalAmount: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            let existingItem = state.cartItems.findIndex((item) => item.id === action.payload.id)

            if (existingItem >= 0) {
                state.cartItems[existingItem] = {
                    ...state.cartItems[existingItem],
                    cartQty: state.cartItems[existingItem].cartQty + 1
                }
                toast.info("تعداد افزایش یافت", {
                    position: "bottom-right"
                })
            }
            else {
                let tempProduct = {
                    ...action.payload,
                    cartQty: action.payload?.cartQty
                }
                state.cartItems.push(tempProduct)

                toast.success("محصول با موفقیت اضافه شد", {
                    position: "bottom-right"
                })
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        decreaseCart(state, action) {

            const itemIndex = state.cartItems?.findIndex((item) => {
                return item.id === action.payload.id
            })

            if (state.cartItems[itemIndex].cartQty > 1) {
                state.cartItems[itemIndex].cartQty -= 1
                toast.info("تعداد کاهش یافت", {
                    position: "bottom-left",
                });
            }
            else if (state.cartItems[itemIndex].cartQty === 1) {
                const removeCart = state.cartItems.filter((f) => {
                    f.id !== action.payload.id
                })
                state.cartItems = removeCart
                toast.error("محصول از سبد خرید حذف شد", {
                    position: "bottom-right"
                })

            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        removeFromCart(state, action) {
            state.cartItems.map((item) => {
                if (item.id === action.payload.id) {
                    let nextCartItem = state.cartItems.filter((f) => {
                        return f.id !== action.payload.id
                    })
                    state.cartItems = nextCartItem
                    toast.error("محصول از سبد خرید حذف شد", {
                        position: "bottom-right"
                    })
                }
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
                return state
            })

        },
        getTotal(state, action) {
            let { mytotal, myqty } = state.cartItems.reduce((cartTotal, catItem) => {
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
export const { addToCart, getTotal, removeFromCart, decreaseCart } = cartSlice.actions
export default cartSlice.reducer
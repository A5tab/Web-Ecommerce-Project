import { useSelector, useDispatch } from 'react-redux'
import { cartTabHandler, changeQuantity } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';
function CartDetails() {
  const dispatch = useDispatch();
  const cartTabClicked = useSelector(state => state.cart.cartTabClicked);
  const cartProducts = useSelector(state => state.cart.cartProducts) || [];

  const totalPrice = cartProducts.reduce((accum, cproduct) => accum + (cproduct.quantity * cproduct.price), 0);
  return (
    <div className="w-full h-full bg-slate-900 text-white shadow-2xl border-l border-amber-500 p-5 flex flex-col">
      {/* Cart Header */}
      <div className="flex justify-between items-center border-b border-slate-700 pb-3">
        <h2 className="text-xl font-semibold text-amber-400">Your Cart</h2>
        <button className="text-blue-400 hover:text-amber-300 transition" onClick={() => dispatch(cartTabHandler(cartTabClicked))}>✕</button>
      </div>

      {/* Cart Items */}

      {cartProducts.length > 0 ? (
        <div className="flex-1 overflow-y-auto space-y-4 mt-4">
          {cartProducts.map((cproduct) => (
            <div key={cproduct.id} className="bg-slate-800 p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-blue-300">{cproduct.title}</h3>
                <p className="text-sm text-slate-400">Quantity: {cproduct.quantity}</p>
              </div>
              <span className="text-amber-400 font-semibold">${cproduct.price}</span>
              <div className="mt-2 flex items-center gap-3">
                <button
                  className="bg-amber-500 text-slate-900 px-3 py-1 rounded-md font-bold hover:bg-amber-400 transition"
                  onClick={() => dispatch(changeQuantity({ productId: cproduct.id, quantity: cproduct.quantity + 1 }))}
                >
                  +
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md font-bold hover:bg-red-400 transition"
                  onClick={() => dispatch(changeQuantity({ productId: cproduct.id, quantity: cproduct.quantity - 1 }))}
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-400 mt-4">Cart is Empty</p>
      )
      }



      {/* Checkout Button */}
      {cartProducts.length ? (
        <div>
          <div className="border-t border-slate-700 pt-3 mt-3">
            <div className="flex justify-between text-lg font-semibold">
              <span className="text-slate-300">Total</span>
              <span className="text-amber-400">${totalPrice}</span>
            </div>
            <Link to='/checkout'>
              <button className="w-full bg-amber-500 text-slate-900 py-2 mt-4 rounded-lg font-semibold hover:bg-amber-400 transition">
                Checkout
              </button>
            </Link>
          </div>
        </div>) : ''
      }
    </div>
  )
}

export default CartDetails;
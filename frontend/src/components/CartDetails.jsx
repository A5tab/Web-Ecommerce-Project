import { useSelector, useDispatch } from 'react-redux';
import { cartTabHandler, changeQuantity } from '../features/cart/cartSlice';
import useProductAddedQT from '../hooks/useProductAddedQT';
import { useProducts } from '../context/ProductsProvider';
import { useMemo, useCallback } from 'react';

function CartDetails() {
  const dispatch = useDispatch();
  const cartTabClicked = useSelector(state => state.cart.cartTabClicked);
  const cartProducts = useSelector(state => state.cart.cartProducts) || [];
  const { state: { products = [] } } = useProducts();

  // Create a lookup map to avoid repeated `find()` calls
  const productLookup = useMemo(() => {
    return products.reduce((acc, product) => {
      acc[product._id] = product;
      return acc;
    }, {});
  }, [products]);

  const totalPrice = useMemo(() => 
    cartProducts.reduce((accum, cproduct) => accum + (cproduct.quantity * cproduct.price), 0),
    [cartProducts]
  );

  const getProductQT = useProductAddedQT();
  const addedProductQT = useMemo(() => {
    return cartProducts.reduce((acc, product) => {
      acc[product.id] = getProductQT(product.id);
      return acc;
    }, {});
  }, [cartProducts, getProductQT]);

  const increaseQuantity = useCallback(
    (id, quantity) => {
      dispatch(changeQuantity({ productId: id, quantity: quantity + 1 }));
    },
    [dispatch]
  );

  const decreaseQuantity = useCallback(
    (id, quantity) => {
      dispatch(changeQuantity({ productId: id, quantity: quantity - 1 }));
    },
    [dispatch]
  );

  return (
    <div className="w-full h-full bg-slate-900 text-white shadow-2xl border-l border-amber-500 p-5 flex flex-col">
      <div className="flex justify-between items-center border-b border-slate-700 pb-3">
        <h2 className="text-xl font-semibold text-amber-400">Your Cart</h2>
        <button className="text-blue-400 hover:text-amber-300 transition" onClick={() => dispatch(cartTabHandler(cartTabClicked))}>✕</button>
      </div>

      {cartProducts.length > 0 ? (
        <div className="flex-1 overflow-y-auto space-y-4 mt-4">
          {cartProducts.map((cproduct) => {
            const productData = productLookup[cproduct.id];
            const stockAvailable = productData ? productData.stock : 0;
            const cartQuantity = addedProductQT[cproduct.id] || 0;
            const isDisabled = cartQuantity >= stockAvailable;

            return (
              <div key={cproduct.id} className="bg-slate-800 p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-blue-300">{cproduct.title}</h3>
                  <p className="text-sm text-slate-400">Quantity: {cproduct.quantity}</p>
                </div>
                <span className="text-amber-400 font-semibold">${cproduct.price}</span>
                <div className="mt-2 flex items-center gap-3">
                  <button className={`px-3 py-1 rounded-md font-bold transition ${isDisabled ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-amber-500 text-slate-900 hover:bg-amber-400'}`}
                    onClick={() => increaseQuantity(cproduct.id, cproduct.quantity)}
                    disabled={isDisabled}>
                    +
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md font-bold hover:bg-red-400 transition"
                    onClick={() => decreaseQuantity(cproduct.id, cproduct.quantity)}>
                    -
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : <p className="text-center text-slate-400 mt-4">Cart is Empty</p>}

      {cartProducts.length ? (
        <div className="border-t border-slate-700 pt-3 mt-3 flex justify-between text-lg font-semibold">
          <span className="text-slate-300">Total</span>
          <span className="text-amber-400">${totalPrice}</span>
        </div>
      ) : null}
    </div>
  );
}

export default CartDetails;

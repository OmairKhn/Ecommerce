import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';

function Order() {
  const storedUser = localStorage.getItem('currentUser');
  let userid = null;

  if (storedUser) {
    try {
      userid = JSON.parse(storedUser).user.uid;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
    }
  }

  const storedCart = localStorage.getItem('cart');
  let cartItems = [];

  if (storedCart) {
    try {
      cartItems = JSON.parse(storedCart);
    } catch (error) {
      console.error('Error parsing cart data from localStorage:', error);
    }
  }

  const context = useContext(myContext);
  const { mode, loading } = context;

  return (
    <Layout>
      {loading && <Loader />}
      {cartItems && cartItems.length > 0 ? (
        <div className="h-full pt-10">
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            {cartItems.map((item, index) => (
              <div className="rounded-lg md:w-2/3" key={index}>
                <div
                  className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                  style={{
                    backgroundColor: mode === 'dark' ? '#282c34' : '',
                    color: mode === 'dark' ? 'white' : '',
                  }}
                >
                  <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        {item.title}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        {item.category}
                      </p>
                      <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center ">
          <h2 className="text-center text-2xl" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
            No Orders
          </h2>
        </div>
      )}
    </Layout>
  );
}

export default Order;

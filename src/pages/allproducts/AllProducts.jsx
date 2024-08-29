import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/data/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import useSelection from "antd/es/table/hooks/useSelection";
import Filter from "../../components/filter/Filter";

const AllProduct = () => {
  const navigate = useNavigate();

  const context = useContext(myContext);
  const { product,searchkey, filterType, filterPrice  } = context;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Added to cart');
};
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}, [cartItems]);
  return (
    <Layout>
      <Filter/>
      <div className="py-8">
        {/* Heading  */}
        <div className="">
          <h1 className=" text-center mb-5 text-2xl font-semibold">
            All Products
          </h1>
        </div>

        {/* main  */}
        <section className="text-gray-600 body-font">
          <div className="container px-5 lg:px-0 py-5 mx-auto">
            <div className="flex flex-wrap -m-4">
              {product  .filter((obj) =>
                            obj.title.toLowerCase().includes(searchkey.toLowerCase())
                        )
                        .filter((obj) =>
                            obj.category.toLowerCase().includes(filterType.toLowerCase())
                        ).filter((obj) => obj.price.toString().includes(filterPrice))
                        .map((item, index) => {
                const { id, title, price, imageUrl } = item;
                return (
                  <div key={index} className="p-4 w-full md:w-1/4">
                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                      <img
                        onClick={() => navigate("/productinfo")}
                        className="lg:h-80  h-96 w-full"
                        src={imageUrl}
                        alt="blog"
                      />
                      <div className="p-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                          E-Pak
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          {title.substring(0, 25)}
                        </h1>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          Rs{price}
                        </h1>

                        <div className="flex justify-center ">
                          <button onClick={() => addCart(item)}
                           className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AllProduct;

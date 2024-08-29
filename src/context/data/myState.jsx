import React, { useEffect, useState } from 'react'
import MyContext from './myContext';
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';

function MyState(props) {
   const [mode,setMode] = useState('light');
   const [getAllProduct, setGetAllProduct] = useState([]);

   const getAllProductFunction = async () => {
    setLoading(true);
    try {
        const q = query(
            collection(fireDB, "products"),
            orderBy('time')
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
            let productArray = [];
            QuerySnapshot.forEach((doc) => {
                productArray.push({ ...doc.data(), id: doc.id });
            });
            setGetAllProduct(productArray);
            setLoading(false);
        });
        return () => data;
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
}
const [getAllOrder, setGetAllOrder] = useState([]);
const getAllOrderFunction = async () => {
  setLoading(true);
  try {
      const q = query(
          collection(fireDB, "order"),
          orderBy('time')
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
          let orderArray = [];
          QuerySnapshot.forEach((doc) => {
              orderArray.push({ ...doc.data(), id: doc.id });
          });
          setGetAllOrder(orderArray);
          setLoading(false);
      });
      return () => data;
  } catch (error) {
      console.log(error);
      setLoading(false);
  }
}
useEffect(() => {
  getAllProductFunction();
  getAllOrderFunction();
}, []);
   const toggleMode = () => {
    if (mode === 'light') {
        setMode('dark');
        document.body.style.backgroundcolor = "rgb(17, 24, 39)"
    }
    else{
   setMode('light');
   document.body.style.backgroundcolor = "white"
}
   }
   const [loading, setLoading] = useState(false)

   const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )

  } )

  // ********************** Add Product Section  **********************
  const addProduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error('Please fill all fields')
    }
    // const productRef = collection(fireDB, "products")
    setLoading(true)
    try {
        const productRef = collection(fireDB, "products")

      await addDoc(productRef, products)
      toast.success("Product Add successfully")


      setTimeout(() => {
        window.location.href= '/dashboard'
      },800)
    //   getProductData()
    //   closeModal()
    getProductData();
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    setProducts("")
  }

  const [product, setProduct] = useState([]);

  // ****** get product
  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time"),
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray)
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
 
  useEffect(() => {
    getProductData();
  }, []);

  const edithandle = (item) => {
    setProducts(item)
  }
  // update product
  const updateProduct = async (item) => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully")
      getProductData();
      setLoading(false)
      window.location.href = '/dashboard'
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
    setProducts("")
  }

  const delteProduct = async (item) => {
    setLoading(true)
    try{
        await deleteDoc (doc(fireDB,'products',item.id))
        toast.success('Product Delete sucessfully')
        getProductData();
        setLoading(false);
    }
    catch (error) {
        console.log(error)
        setLoading(false)
    }
  }

  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "order"))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false)
      });
      setOrder(ordersArray);
      console.log(ordersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "user"))
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false)
      });
      setUser(usersArray);
      console.log(usersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();

  }, []);

  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')
  return (
    <MyContext.Provider value={{ 
        mode, toggleMode, loading,setLoading,
        products, setProducts,addProduct,product, edithandle, updateProduct, delteProduct,order , getAllProduct,
        getAllProductFunction, getAllOrder,user,
        searchkey, setSearchkey,filterType, setFilterType,
        filterPrice, setFilterPrice  
}}>
        {props.children}
      </MyContext.Provider>
  )
}

export default MyState
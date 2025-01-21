import { getProductError, getProductPending, getProductSuccess } from "@/toolkits/ProductSlicer";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaLaptop, FaTabletAlt, FaTv } from "react-icons/fa";
import { MdOutlineDesktopWindows, MdPhoneIphone, MdWatch } from "react-icons/md";
import { useDispatch } from "react-redux";
import Axios from "../middlewares/Axios";
import Products from "@/components/Products";
import { Buttons } from "@/middlewares/interfaces";
import Footer from "@/components/Footer";
import { useUser } from "@clerk/nextjs";
import Cookies from "js-cookie";

const Index = () => {
  const router = useRouter();
  const { device } = router.query;

  const deviceString = typeof device === "string" ? device : "windows";
  const { user, isSignedIn } = useUser();
  const [selectedCategory, setSelectedCategory] = useState(deviceString);
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllProducts = async () => {
      dispatch(getProductPending());
      try {
        const response = await Axios.get("product");
        const products = response.data?.data || [];
        dispatch(getProductSuccess(products));
      } catch (error: any) {
        dispatch(
          getProductError(error.response?.data?.message || "Noma'lum xato")
        );
      }
    };
    getAllProducts();
  }, [dispatch]);

  useEffect(() => {
    if (isSignedIn && user) {
      const saveUserDataToMongoDB = async () => {
        try {
          {
            const { data } = await Axios.post('/client/login', {
              email: user.emailAddresses[0].emailAddress,
              password: user.firstName,
              firstName: user.firstName,
              lastName: user.lastName,
              avatar: user.imageUrl,

            });

            Cookies.set("user", data.token);
            console.log(data.token);
          }
        } catch (error) {
          console.error('Error saving user data:', error);
        }
      };



      saveUserDataToMongoDB();
    }
  }, [isSignedIn, user]);
  console.log(user);


  const buttons: Buttons[] = [
    { title: "Windows", icon: <MdOutlineDesktopWindows />, path: "windows" },
    { title: "Phone", icon: <MdPhoneIphone />, path: "phone" },
    { title: "Tablet", icon: <FaTabletAlt />, path: "tablet" },
    { title: "TV", icon: <FaTv />, path: "tv" },
    { title: "Chromebook", icon: <FaLaptop />, path: "chromebook" },
    { title: "Watch", icon: <MdWatch />, path: "watch" },
  ];

  const handleCategoryChange = (path: string) => {
    setSelectedCategory(path);
    router.push(`/?device=${path}`, undefined, { shallow: true });
  };

  return (
    <div>
      <Head>
        <title>Play Market</title>
        <link
          rel="shortcut icon"
          href="https://brandlogos.net/wp-content/uploads/2021/04/play-store-logo-300x300.png"
          type="image/x-icon"
        />
      </Head>
      <div className="w-full gap-5 h-10 flex items-center pt-5 pl-28">
        {buttons.map((item) => (
          <button
            key={item.path}
            onClick={() => handleCategoryChange(item.path)}
            className={`flex border px-3 rounded-full gap-2 h-[30px] items-center 
              ${selectedCategory === item.path
                ? "border-green-700 text-green-700 bg-green-100"
                : "border-[#5F6368] text-[#5F6368]"}`}
          >
            {item.icon}
            {item.title}
          </button>
        ))}
      </div>
      <div className="p-5">
        <Products device={deviceString} />
      </div>
      <Footer />
    </div>
  );
};

export default Index;

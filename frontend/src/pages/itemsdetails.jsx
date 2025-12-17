import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ImageSliderTailwind from "@/component/slider1";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../api/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Loader from "@/component/Loader";

const ItemDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [addeditem, setaddeditem] = useState(null);
  // const [relatedLoading, setRelatedLoading] = useState(true);
  const token = localStorage.getItem("token");

  const categoryfetch = async (category) => {
    try {
      // setRelatedLoading(true);
      const response = await API.get(`/products/category/${category}`);
      setRelatedProducts(response.data);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
    // finally {
    //   setRelatedLoading(false);
    // }
  };
  useEffect(() => {
    const fetchById = async () => {
      try {
        const response = await API.get(`/products/${id}`); // ⬅️ Correct API endpoint
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product by ID:", error);
      }
    };

    if (id) {
      fetchById();
    }
  }, [id]);

  useEffect(() => {
    if (product && product.clothType) {
      categoryfetch(product.clothType);
    }
  }, [product]);

  const handleaddtocard = async (product) => {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }
    if (token) {
      const itemsforbackend = [
        {
          productId: product._id,
          quantity: 1,
          size: selectedSize,
        },
      ];
      try {
        await API.post(
          "/cart/setitems",
          {
            items: itemsforbackend,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, //  Token must be sent
            },
          }
        );
        // alert("cart was succesully add");
        // console.log("Cart synced with server:", response.data);
        setaddeditem(product._id);
      } catch (err) {
        alert("cart was not  add somthing was worng");
        console.error("Error syncing cart:", err.response?.data || err.message);
      }
    } else {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.findIndex(
        (item) => item._id === product._id && item.size === selectedSize
      );
      if (existing >= 0) {
        cart[existing].quantity += 1;
      } else {
        cart.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          img: product.image[0],
          size: selectedSize,
          quantity: 1,
        });
      }
      // Cart ko wapas localStorage mein save karo
      localStorage.setItem("cart", JSON.stringify(cart));
      setaddeditem(product._id);
    }
  };

  const navigate = useNavigate();
  if (!product) {
    return <Loader />;
  }
  return (
    <>
      <div className="md:space-y-6 space-y-2">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex justify-center items-start space-x-3 pt-4 overflow-hidden ">
            <div className="hidden md:flex flex-col w-24 h-88 rounded-lg overflow-hidden space-y-2 p-2">
              {product.image && product.image.length > 0 ? (
                product.image.map((imgSrc, idx) => (
                  <img
                    key={idx}
                    src={imgSrc}
                    alt={`Thumbnail ${idx + 1}`}
                    onClick={() => setSelectedImage(imgSrc)}
                    className="w-full h-20 object-cover rounded-2xl"
                  />
                ))
              ) : (
                <div className="text-center text-gray-500">
                  No images available
                </div>
              )}
            </div>
            <div
              className={`w-full space-y-4 md:p-0 p-2 relative ${
                addeditem === product._id ? "opacity-50" : ""
              }`}
            >
              {addeditem === product._id && (
                <div className="absolute top-2 left-2 z-20 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  ✔ Added
                </div>
              )}
              <div className="overflow-hidden rounded-lg md:block hidden">
                <img
                  src={selectedImage || product.image?.[0]} // assuming it's an array
                  alt={product._id}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="overflow-hidden h-full rounded-lg block md:hidden">
                <Swiper
                  modules={[Navigation, Pagination]}
                  pagination={{ clickable: true }}
                  spaceBetween={10}
                  slidesPerView={1}
                  className="rounded-lg md:hidden"
                >
                  {product.image?.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        src={img}
                        alt={`Product image ${idx + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="flex md:flex-row flex-col gap-3">
                <button
                  className="w-full bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition cursor-pointer"
                  onClick={() => {
                    handleaddtocard(product);
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className="w-full bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary-dark transition cursor-pointer"
                  onClick={() => {
                    if (!selectedSize) {
                      alert("Please select a size first!");
                      return;
                    }
                    // const token = localStorage.getItem("token");
                    const user = JSON.parse(localStorage.getItem("user"));
                    if (token && user) {
                      navigate("/home/checkout", {
                        state: { buyNowProduct: product, size: selectedSize },
                      });
                    } else {
                      navigate("/", { state: { open: true } });
                    }
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-2xl font-semibold text-primary mb-4">
              ₹{product.price}
            </p>
            <div className="py-3 px-2 border rounded mb-6">
              <h3 className="md:text-3xl">Select size</h3>
              <div className="flex gap-2 flex-wrap mt-2">
                {product.size.map((size, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 border rounded transition cursor-pointer ${
                      selectedSize === size
                        ? "bg-green-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-gray-700 mb-4 text-xl">COLOR: {product.color}</p>
            <p className="text-gray-700 mb-4 text-xl">Brand: {product.brand}</p>
            <div className="mb-4">
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-medium text-2xl">
                    Product details
                  </AccordionTrigger>
                  <AccordionContent>
                    {product.productdetails.map((detail, index) => (
                      <div key={index} className="p-2 md:text-[16px] mb-2 ">
                        {detail}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2 ">
                  <AccordionTrigger className="font-medium text-2xl">
                    Specifications
                  </AccordionTrigger>
                  <AccordionContent>
                    {product.specification.map((detail, index) => (
                      <div
                        key={index}
                        className="p-2 mb-2 md:text-[16px] border-b"
                      >
                        {detail}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="font-medium text-2xl">
                    Shipping info
                  </AccordionTrigger>
                  <AccordionContent>
                    We offer worldwide shipping within 5-7 business days.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        <ImageSliderTailwind
          products={relatedProducts}
          title="More Related"
          showNavigation={true}
          autoplay={false}
        />
      </div>
    </>
  );
};

export default ItemDetails;

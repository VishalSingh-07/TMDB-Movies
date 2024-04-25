import React, { useEffect, useState } from "react";
import "../../assests/styles/ProfileScreen.css";
import { auth, db } from "../../firebase";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import Nav from "../pages/Nav";
import { loadStripe } from "@stripe/stripe-js";
import FooterBottom from "../common/FooterBottom";
import Loader from "../common/Loading";
function ProfileScreen() {
  const user = useSelector(selectUser);
  const [products, setProducts] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState(null);
  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start: subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);
  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
              priceAmount: price.data().unit_amount / 100,
            };
          });
        });
        setProducts(products);
      });
  }, []);
  const loadCheckout = async (priceId) => {
    setLoading(true);
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error ocurred: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(process.env.REACT_APP_stripeKey);
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };
  const priceMap = {
    prod_PxzPMkSQL1Ihwo: "149",
    prod_PxzQggEA8o2pve: "249",
    prod_PxzR9vPD3pkpzq: "449",
    prod_PxzRMoCkvLG5fX: "649",
  };
  return (
    <div className='profile'>
      <Nav />
      <div className='profile__header'>
        <img
          src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user.displayname}&backgroundType=gradientLinear,solid&eyes=closed,closed2,crying&mouth=cute,drip,faceMask&randomizeIds=false`}
          alt='Avatar'
        />
        <h1>Hi, {user.displayname}!</h1>
        <button
          className='button'
          onClick={() => {
            auth.signOut();
          }}>
          <span className='text'>Sign Out</span>
        </button>
      </div>
      <h3>{subscription ? "Manage your subscription" : "Subscribe Now to Start Watching"}</h3>
      <div className='packs'>
        {Object.entries(products).map(([productId, productData]) => {
          const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);
          const descriptionParts = productData.description.split(",").map((part, index) => (
            <p key={index} className='description-part'>
              {part.trim()}
            </p>
          ));
          return (
            <div key={productId} className={isCurrentPackage ? "pack active" : "pack"}>
              <h3>{productData.name}</h3>
              <ul className='desc'>{descriptionParts}</ul>
              <p className='price'>
                ₹ {priceMap[productId]}
                <small>/month</small>
              </p>
              <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                {isCurrentPackage
                  ? `Renews in ${parseInt(
                      (subscription.current_period_end - subscription.current_period_start) /
                        (24 * 60 * 60)
                    )} day(s)`
                  : "Activate Now"}
              </button>
            </div>
          );
        })}
      </div>
      {Loading ? <Loader /> : null}
      <FooterBottom />
    </div>
  );
}
export default ProfileScreen;

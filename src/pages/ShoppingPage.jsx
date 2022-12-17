import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTypography,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import Lottie from "react-lottie-player";

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SpaceButton from "../components/Button/SpaceButton";
import Header from "../components/Header/Header";
import { goods } from "../Data/Goods";
import { places } from "../Data/Stadiums";
import useItem from "../hooks/useItem";
//import "../styles/VideoStyle.css";

const ShoppingPage = () => {
  const data = useParams();
  const find = places.find((item) => item.id === data.id);
  const { cart, addProductToCart, removeProductFromCart } = useItem();
  const [donation, setDonation] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [centredModal, setCentredModal] = useState(false);
  const [fullscreenXlModal, setFullscreenXlModal] = useState(false);
  const [exitButton, setExitButton] = useState(false);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [controls, setControls] = useState(true);

  const toggleShow = () => setCentredModal(!centredModal);
  const toggleShowCheckout = () => setCheckoutModal(!checkoutModal);
  const toggleShowFullScreen = () => setFullscreenXlModal(!fullscreenXlModal);
  const reset = () => {
    toggleShowFullScreen();
    setIsWatched(true);
    setExitButton(false);
    setControls(true);
  };

  return (
    <section className="h-100 gradient-custom">
      <Header />
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center my-4">
          <MDBCol md="8">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3">
                <MDBTypography tag="h5" className="mb-0">
                  {find.name}
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                {goods.map((item, index) => (
                  <MDBRow key={index}>
                    <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                      <MDBRipple
                        rippleTag="div"
                        rippleColor="light"
                        className="bg-image rounded hover-zoom hover-overlay"
                      >
                        <img src={item.image} className="w-100" />
                        <a href="#!">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.2)",
                            }}
                          ></div>
                        </a>
                      </MDBRipple>
                    </MDBCol>

                    <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                      <p>
                        <strong>{item.name}</strong>
                      </p>
                      <p>Stock : {item.stock}</p>
                      <p>You can buy only : {item.max_to_buy}</p>

                      <MDBBtn
                        color="danger"
                        onClick={() => removeProductFromCart(item.id)}
                        style={{
                          background:
                            "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
                        }}
                      >
                        <MDBIcon fas icon="trash" />
                      </MDBBtn>
                      {"  "}

                      <MDBBtn
                        style={{
                          background:
                            "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
                        }}
                        onClick={() => addProductToCart(item)}
                        disabled={
                          cart[index]?.id === item.id
                            ? cart[index].disabled
                            : null
                        }
                      >
                        <MDBIcon fas icon="plus" size="7" />
                      </MDBBtn>
                    </MDBCol>
                    <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                      <p className="text-start text-md-center">
                        <strong>{item.price} DT</strong>
                      </p>
                    </MDBCol>
                    <hr className="my-4" />
                  </MDBRow>
                ))}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="4">
            <MDBCard className="mb-4">
              <MDBCardHeader>
                <MDBTypography tag="h5" className="mb-0">
                  Cart
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                {cart.map((item, index) => {
                  return (
                    <MDBListGroup flush key={index}>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Product
                        <span>{item.name}</span>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Price
                        <span>{item.price}DT</span>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                        Quantity
                        <span>({item.quantity})</span>
                      </MDBListGroupItem>
                    </MDBListGroup>
                  );
                })}
                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total amount</strong>
                    <strong>
                      <p className="mb-0">(including donation)</p>
                    </strong>
                  </div>
                  <span>
                    <strong>
                      {cart
                        .reduce((acc, curr) => {
                          return (
                            acc +
                            curr.price * curr.quantity +
                            (donation ? 0.1 * curr.quantity : 0)
                          );
                        }, 0)
                        .toFixed(2)}{" "}
                      DT
                    </strong>
                  </span>
                </MDBListGroupItem>

                <MDBListGroupItem className="justify-content-between align-items-center border-0 ">
                  <MDBBtn
                    block
                    style={{
                      justifyContent: "center",
                    }}
                    size="sm"
                    onClick={toggleShow}
                    disabled={cart.length === 0 || donation}
                    id="btn"
                  >
                    Choose donation
                  </MDBBtn>
                  <MDBBtn
                    id="btn"
                    style={{
                      justifyContent: "center",
                    }}
                    block
                    size="sm"
                    onClick={toggleShowFullScreen}
                    disabled={cart.length === 0 || isWatched}
                  >
                    Watch Ads
                  </MDBBtn>
                  <MDBModal
                    tabIndex="-1"
                    show={fullscreenXlModal}
                    setShow={setFullscreenXlModal}
                  >
                    <MDBModalDialog size="fullscreen">
                      <MDBModalContent>
                        <MDBModalHeader>
                          <MDBModalTitle>Ads</MDBModalTitle>
                          <MDBBtn
                            type="button"
                            className="btn-close"
                            color="none"
                            disabled={exitButton}
                            onClick={toggleShowFullScreen}
                          ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                          <video
                            controls={controls}
                            width="100%"
                            height="100%"
                            autoPlay={fullscreenXlModal ? true : false}
                            onPlay={() => {
                              setExitButton(true);
                              setControls(false);
                            }}
                            onEnded={() => reset()}
                          >
                            <source src={"/jumia.mp4"} type="video/mp4" />
                            Sorry, your browser doesn't support embedded videos.
                          </video>
                        </MDBModalBody>
                        <MDBModalFooter></MDBModalFooter>
                      </MDBModalContent>
                    </MDBModalDialog>
                  </MDBModal>
                  <MDBModal
                    tabIndex="-1"
                    show={centredModal}
                    setShow={setCentredModal}
                  >
                    <MDBModalDialog centered>
                      <MDBModalContent>
                        <MDBModalHeader>
                          <MDBModalTitle>Donate</MDBModalTitle>
                          <MDBBtn
                            className="btn-close"
                            color="none"
                            onClick={toggleShow}
                          ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                          <p>
                            By clicking confirm you will pay extra money in
                            order to help needy people , it will cost 100
                            Millimes on each article you add to your cart
                          </p>
                        </MDBModalBody>
                        <MDBModalFooter>
                          <MDBBtn color="secondary" onClick={toggleShow}>
                            Close
                          </MDBBtn>
                          <MDBBtn
                            onClick={() => {
                              setDonation(true);
                              setCentredModal(!centredModal);
                            }}
                          >
                            Confirm
                          </MDBBtn>
                        </MDBModalFooter>
                      </MDBModalContent>
                    </MDBModalDialog>
                  </MDBModal>
                </MDBListGroupItem>

                {(donation || isWatched) && (
                  <div
                    style={{
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <SpaceButton onClick={toggleShowCheckout} />
                    <MDBModal
                      tabIndex="-1"
                      show={checkoutModal}
                      setShow={setCheckoutModal}
                    >
                      <MDBModalDialog centered>
                        <MDBModalContent>
                          <MDBModalHeader>
                            <MDBModalTitle>Checkout</MDBModalTitle>
                            <MDBBtn
                              className="btn-close"
                              color="none"
                              onClick={toggleShowCheckout}
                            ></MDBBtn>
                          </MDBModalHeader>
                          <MDBModalBody>
                            <p style={{ textAlign: "center" }}>
                              Your order is completed , we will contact your for
                              delivery !
                            </p>

                            <Lottie
                              loop
                              animationData={require("../Data/checkout-astronaut.json")}
                              play
                              style={{
                                width: 150,
                                height: 150,

                                marginLeft: 150,
                              }}
                            />
                          </MDBModalBody>
                          <MDBModalFooter>
                            <MDBBtn
                              onClick={() => {
                                setCheckoutModal(!checkoutModal);
                              }}
                            >
                              Confirm
                            </MDBBtn>
                          </MDBModalFooter>
                        </MDBModalContent>
                      </MDBModalDialog>
                    </MDBModal>
                  </div>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};
export default ShoppingPage;

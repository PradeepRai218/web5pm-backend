"use client";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../globals.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
export default function page() {
  const { error, isLoading, Razorpay } = useRazorpay();

  const [paymentMethod, setPaymentMethod] = useState(1);
  let token = useSelector((store) => store.authStore.token);

  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEPATH;

  let saveOrder = (e) => {
    let orderItems = [
      {
        productName: "Caroline Study Tables",
        productPrice: 300,
        quantity: 1,
        imagePath:
          "https://cdn.shopify.com/s/files/1/0283/0187/2747/products/Caroline-Study-Table_600x.jpg?v=1669394418",
      },
      {
        productName: "Caroline Study Tables New",
        productPrice: 300,
        quantity: 1,
        imagePath:
          "https://cdn.shopify.com/s/files/1/0283/0187/2747/products/Caroline-Study-Table_600x.jpg?v=1669394418",
      },
    ];
    let shippingAddess = {
      name: "John Doe",
      mobile_number: "1234567890",
      billing_name: "John Doe",
      billing_email: "johndoe@example.com",
    };
    let orderAmount = 600;
    let orderQty = orderItems.length;
    let shippingCharges = 100;

    let orderObject = {
      orderItems,
      shippingAddess,
      orderAmount,
      orderQty,
      shippingCharges,
      paymentMethod,
    };

    axios
      .post(`${apiBaseUrl}order/place-order`, orderObject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (paymentMethod == 1) {
          if (response.data._status) {
            alert("Order Placed Successfully");
          }
        } else {
            
          if (response.data._status) {
            const options = {
              key: "rzp_test_WAft3lA6ly3OBc",
              amount: response.data.orderRes.amount, // Amount in paise
              currency: "INR",
              name: "MODERN FURNITURE",
              description: "Test Transaction",
              order_id: response.data.orderRes.id, // Generate order_id on server
              handler: (response) => {

                axios.post(`${apiBaseUrl}order/verify-payment`, response, {
                  headers: {
                    Authorization: `Bearer ${token}`,   
                  },
                })
                .then((res) => {    
                    if(res.data._status){
                        alert("Payment Successful and Verified");
                    }
                })
                .catch((error) => {
                  console.error(error);
                });
               
              },
              prefill: {
                name: "John Doe",
                email: "john.doe@example.com",
                contact: "9999999999",
              },
              theme: {
                color: "#F37254",
              },
            };
             const razorpayInstance = new Razorpay(options);
            razorpayInstance.open();

          }
          // Enter the Key ID generated from the Dashboard
        }
      })
      .catch((error) => {
        console.error(error);
      });

    e.preventDefault();
  };

  return (
    <>
      <Container fluid className="breadcrumbs_area">
        <Container className="breadcrumb_content">
          <Row>
            <Col lg={12}>
              <h3>Checkout</h3>
              <ul className="p-0">
                <li>
                  <Link href="/">home</Link>
                </li>
                <li>&gt;</li>
                <li>Checkout</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </Container>

      <section className="border-bottom border-1 pb-5">
        <Container className="checkout_form">
          <Row>
            <Form
              onSubmit={saveOrder}
              id="checkout_address"
              autoComplete="off"
              noValidate="novalidate"
              className="bv-form"
            >
              <Button
                type="submit"
                style={{ display: "none", width: "0", height: "0" }}
              ></Button>
              <Row>
                <Col lg={6} md={6}>
                  <h3>Billing Details</h3>
                  <Row>
                    <Col lg={6} className="mb-20">
                      <div className="form-group has-feedback">
                        <label htmlFor="name">Name*</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          defaultValue=""
                          data-bv-field="name"
                        />
                      </div>
                    </Col>

                    <Col lg={6} className="mb-20">
                      <div className="form-group has-feedback">
                        <label htmlFor="name">Mobile Number*</label>
                        <input
                          type="text"
                          className="form-control numeric"
                          id="mobile_number"
                          maxLength="15"
                          name="mobile_number"
                          defaultValue=""
                          data-bv-field="mobile_number"
                        />
                      </div>
                    </Col>

                    <Col lg={6} className="mb-20">
                      <div className="form-group has-feedback">
                        <label htmlFor="name">Billing Name*</label>
                        <input
                          type="text"
                          className="form-control"
                          id="billing_name"
                          name="billing_name"
                          defaultValue=""
                          data-bv-field="billing_name"
                        />
                      </div>
                    </Col>

                    <Col lg={6} className="mb-20">
                      <div className="form-group has-feedback">
                        <label htmlFor="name">Billing Email*</label>
                        <input
                          type="text"
                          className="form-control"
                          id="billing_email"
                          name="billing_email"
                          defaultValue=""
                          data-bv-field="billing_email"
                        />
                      </div>
                    </Col>

                    <Col xs={12} className="mb-20">
                      <div className="form-group has-feedback">
                        <label htmlFor="name">Billing Mobile Number*</label>
                        <input
                          type="text"
                          className="form-control numeric"
                          id="billing_mobile"
                          maxLength="15"
                          name="billing_mobile"
                          defaultValue=""
                          data-bv-field="billing_mobile"
                        />
                      </div>
                    </Col>

                    <Col xs={12} className="mb-20">
                      <div className="form-group has-feedback">
                        <label htmlFor="name">Billing Address*</label>
                        <input
                          type="text"
                          className="form-control"
                          name="billing_address"
                          id="billing_address"
                          defaultValue=""
                          data-bv-field="billing_address"
                        />
                      </div>
                    </Col>

                    <Col xs={12} className="mb-20">
                      <div className="form-group has-feedback">
                        <label htmlFor="name">Country*</label>

                        <select className="nice-select niceselect_option">
                          <option>Select Country</option>
                          <option>India</option>
                          <option>Pakistan</option>
                          <option>China</option>
                        </select>
                      </div>
                    </Col>

                    <Col lg={6} className="mb-20">
                      <div className="form-group has-feedback">
                        <label htmlFor="billing_state">State*</label>
                        <input
                          type="text"
                          className="form-control"
                          name="billing_state"
                          id="billing_state"
                          defaultValue=""
                          data-bv-field="billing_state"
                        />
                      </div>
                    </Col>

                    <Col lg={6} className="mb-20">
                      <div className="form-group has-feedback">
                        <label htmlFor="billing_city">City*</label>
                        <input
                          type="text"
                          className="form-control"
                          name="billing_city"
                          id="billing_city"
                          defaultValue=""
                          data-bv-field="billing_city"
                        />
                      </div>
                    </Col>

                    <Col className="mb-20">
                      <input
                        id="address"
                        type="checkbox"
                        data-bs-target="createp_account"
                      />
                      <label
                        className="righ_0"
                        htmlFor="address"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsetwo"
                        aria-controls="collapseOne"
                      >
                        Ship to a different address?
                      </label>
                    </Col>

                    <Col xs={12} className="mb-20">
                      <div className="order-notes">
                        <label htmlFor="order_note">Order Notes</label>
                        <textarea
                          id="order_note"
                          rows="5"
                          placeholder="Notes about your order, e.g. special notes for delivery."
                        ></textarea>
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col lg={6} md={6}>
                  <h3>Your order</h3>
                  <div className="order_table table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {" "}
                            Caroline Study Tables <strong> × 1</strong>
                          </td>
                          <td> Rs. 2,500</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Cart Subtotal</th>
                          <td>Rs. 2,500</td>
                        </tr>
                        <tr>
                          <th>Discount (-)</th>
                          <td>
                            <strong>Rs. 0</strong>
                          </td>
                        </tr>
                        <tr className="order_total">
                          <th>Order Total</th>
                          <td>
                            <strong>Rs. 2,500</strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="order_button">
                    <div className="mb-4">
                      <h4 className="mb-3">Payment Method</h4>
                      <div className="d-flex flex-column gap-2">
                        <Form.Check
                          type="radio"
                          id="payment-cod"
                          name="payment_method"
                          label="COD"
                          style={{ width: "10px" }}
                          value="1"
                          checked={paymentMethod == 1}
                          onChange={(event) =>
                            setPaymentMethod(event.target.value)
                          }
                        />
                        <Form.Check
                          type="radio"
                          id="payment-online"
                          name="payment_method"
                          style={{ width: "10px" }}
                          label="ONLINE"
                          value="2"
                          checked={paymentMethod == 2}
                          onChange={(event) =>
                            setPaymentMethod(event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <button type="submit" id="placeOrder">
                      Placed Order
                    </button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Row>
        </Container>
      </section>
    </>
  );
}

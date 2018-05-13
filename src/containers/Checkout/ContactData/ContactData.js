import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Val",
        address: {
          street: "Test Street",
          zipCode: "33300",
          country: "France"
        },
        email: "test@test.com"
      },
      deliveryMode: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.FormInput}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={classes.FormInput}
          type="email"
          name="email"
          placeholder="Your email"
        />
        <input
          className={classes.FormInput}
          type="text"
          name="street"
          placeholder="Your street"
        />
        <input
          className={classes.FormInput}
          type="text"
          name="postal"
          placeholder="Your zip code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
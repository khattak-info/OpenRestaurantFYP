import React, { Component } from "react";
import "antd/dist/antd.css";
import "./restaurantCard.css";
import {Rate, Space, Card, Button,Tooltip } from "antd";
import Image from 'react-bootstrap/Image'
import RatingComponent from '../reviewRatingComponents/ratingComponent'

const { Meta } = Card;

class ItemCard extends Component {
  state = {
    img: this.props.img_url,
    price: this.props.price,
    name: this.props.name,
    // reviews: this.props.reviews,
    count: this.props.count,
    ratings: this.props.ratings
  };

  render() {
    return (
        <Card className="card-unit" hoverable size="small" style={{width: '200px', height: '300px', alignItem: 'center'}} 
            cover={<Image className="cover-image"
              width={200} height={150}
              src={`http://localhost:4000/restaurantadmin/item/image/${this.state.img}`} roundedCircle/>}>
            <Meta className="card-meta" title={this.state.name}  />
            <span className="price">Rs. {this.state.price}</span> 
            <RatingComponent ratings={this.state.ratings} count={this.state.count} type="inner"/>
        </Card>
    );
  }
}

export default ItemCard;

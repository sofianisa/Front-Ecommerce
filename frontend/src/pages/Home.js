import React, {Component} from 'react';
import Axios from 'axios'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBLink, MDBIcon } from "mdbreact";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { API_URL } from './../supports/ApiURL';
import Numeral from 'numeral';
import Fade from 'react-reveal/Fade';
import { cartCounter } from './../redux/actions';

class Home extends Component {
    state = { 
        images:[
            "./images/pet-1.jpg",
            "./images/pet-2.jpg",
            "./images/pet-3.jpeg"
        ],

        products:[],
        redirectToAllProductBool:false
    }

    renderProducts=()=>{
        return this.state.products.map((val, index)=>{
            return(
                <>
                <Fade bottom>
                <div className="col-md-3" style={{marginTop:"5%"}}>
                    <Card>
                        <CardImg top width="100%" height="100%" src={val.image} alt="Card image cap" />
                        <div className="blackBox d-flex justify-content-center">
                            <Link to={`/productdetail/${val.id}`} className="insideButton">
                                <button className="buyNowButton px-5 py-2 btn-sm" style={{marginTop:"140%"}}><MDBIcon icon="cart-plus"/></button>
                            </Link>
                        </div>
                        <CardBody>
                        <CardTitle>{ val.name }</CardTitle>
                        <CardSubtitle>{ `Rp.`+ Numeral(val.price).format(0,0)}</CardSubtitle>
                        <Button className="rounded-pill btn-sm" color="green"><a href={`/productdetail/${val.id}`} style={{color:"white"}}>View Product</a></Button>
                        </CardBody>
                    </Card>
                </div>
                </Fade>

                </>
            )
        })
    }

    componentDidMount=()=>{
        Axios.get(`${API_URL}/products?_expand=category&_limit=8`)
        .then((res)=>{
            // console.log(res.data)
            this.setState({products:res.data})
            if(this.props.User.role=="user"){
                Axios.get(`${API_URL}/transactions?_embed=transactiondetails&userId=${this.props.User.id}&status=oncart`)
                .then((resoncart)=>{
                    if(this.props.User.isLoggedIn&&resoncart.data[0].transactiondetails.length>0){
                        var totalQtyOnCart=resoncart.data[0].transactiondetails.reduce((a, b)=>({qty:a.qty+b.qty})).qty
                        this.props.cartCounter(totalQtyOnCart)
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    renderImages=()=>{
        return this.state.images.map((val, index)=>{
            return (
                <>
                    <MDBCarouselItem itemId={index+1}>
                        <MDBView>
                            <img
                            className="d-block w-100"
                            src={val}
                            alt="slide-images"
                            />
                            <MDBMask overlay="black-light" />
                        </MDBView>
                        <MDBCarouselCaption>
                            <h2 style={{color:"white"}}>Welcome to our pet shoppy</h2>
                            <MDBLink to="/allproducts">
                                <Button color="green" className="rounded-pill px-5 py-3" size="lg">Shop Now</Button>
                            </MDBLink>                                
                        </MDBCarouselCaption>
                    </MDBCarouselItem>
                </>                
            )
        })
    }

    render() { 

        return ( 
            <>
                <div style={{marginTop:"120px"}}>                        
                <MDBCarousel
                activeItem={1}
                length={this.state.images.length}
                showControls={true}
                showIndicators={false}
                className="z-depth-1"
                >
                <MDBCarouselInner>
                    {this.renderImages()}
                </MDBCarouselInner>
                </MDBCarousel>                    
                </div>

                <div className="row" style={{paddingBottom:"5%"}}>                    
                    {this.renderProducts()}
                </div>

                <div className="d-flex justify-content-center">
                <MDBLink to="/allproducts">
                    <Button className="btn-lg rounded-pill px-5" color="green">See all collections</Button>
                </MDBLink>
                </div>
            </>
        )
    }
}

const MapStateToProps=(state)=>{
    return{
        User:state.Auth,
    }
}
export default connect(MapStateToProps, {cartCounter})(Home);

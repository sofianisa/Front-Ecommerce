import React, { Component } from 'react';
import Axios from 'axios'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Button, ButtonGroup } from 'reactstrap';
import { MDBIcon, MDBCol } from 'mdbreact';
import { API_URL } from './../supports/ApiURL';
import Numeral from 'numeral';
import Fade from 'react-reveal/Fade';
import { cartCounter } from './../redux/actions';

class AllProducts extends Component {
    state = { 
        products:[],
        products2:[],
        inputSearch:'',
        category:''
    }

    searchOnChange=(e)=>{
        this.setState({inputSearch:e.target.value})
        console.log(this.state.inputSearch)

        this.setState({products2:this.state.products.filter((val)=>{
            return val.name.toLowerCase().includes(this.state.inputSearch.toLowerCase())
        })})
    }

    renderProducts=()=>{

        if(this.state.products2.length===0||this.state.inputSearch===''){
            return this.state.products.map((val)=>{
                return(
                    <>
                        <Fade bottom>
                        <div className="col-md-3" style={{marginTop:"4%"}}>
                            <Card>
                                <CardImg top width="100%" height="100%" src={val.image} alt="Card image cap" />
                                <div className="blackBox d-flex justify-content-center">
                                    <Link to={`/productdetail/${val.id}`} className="insideButton">
                                        <button className="buyNowButton px-5 py-2 btn-sm" style={{marginTop:"140%"}}><div style={{color:"white"}}><MDBIcon icon="cart-plus"/></div></button>
                                    </Link>
                                </div>
                                <CardBody>
                                <CardTitle>{ val.name }</CardTitle>
                                <CardSubtitle>{ `Rp.`+ Numeral(val.price).format(0,0)}</CardSubtitle>
                                <Button className="rounded-pill btn-sm" color="brown"><a href={`/productdetail/${val.id}`} style={{color:"white"}}>View Product</a></Button>
                                </CardBody>
                            </Card>
                        </div>
                        </Fade>
                    </>
                )
            })
        }
        else{
            return this.state.products2.map((val)=>{
                return(
                    <>
                        <Fade bottom>
                        <div className="col-md-3" style={{marginTop:"4%"}}>
                            <Card>
                                <CardImg top width="100%" height="100%" src={val.image} alt="Card image cap" />
                                <div className="blackBox d-flex justify-content-center">
                                    <Link to={`/productdetail/${val.id}`} className="insideButton">
                                        <button className="buyNowButton px-5 py-2 btn-sm" style={{marginTop:"140%"}}><div style={{color:"white"}}><MDBIcon icon="cart-plus"/></div></button>
                                    </Link>
                                </div>
                                <CardBody>
                                <CardTitle>{ val.name }</CardTitle>
                                <CardSubtitle>{ `Rp.`+ Numeral(val.price).format(0,0)}</CardSubtitle>
                                <Button className="rounded-pill btn-sm" color="brown"><a href={`/productdetail/${val.id}`} style={{color:"white"}}>View Product</a></Button>
                                </CardBody>
                            </Card>
                        </div>
                        </Fade>
                    </>
                )
            })

        }
        
        
    }

    componentDidMount=()=>{
        Axios.get(`${API_URL}/products?_expand=category`)
        .then((res)=>{
            console.log(res.data)
            this.setState({products:res.data})

            Axios.get(`${API_URL}/transactions?_embed=transactiondetails&userId=${this.props.User.id}&status=oncart`)
            .then((resoncart)=>{
                if(this.props.User.isLoggedIn){
                    var totalQtyOnCart=resoncart.data[0].transactiondetails.reduce((a, b)=>({qty:a.qty+b.qty})).qty
                    this.props.cartCounter(totalQtyOnCart)
                }
            })
            .catch((err)=>{
                console.log(err)
            })

            // get Animals
            Axios.get(`${API_URL}/products?_expand=category&categoryId=1`)
            .then((res)=>{
                this.setState({categoryAnimals:res.data})
            })
            .catch((err)=>{
                console.log(err)
            })

            //get Foods
            Axios.get(`${API_URL}/products?_expand=category&categoryId=2`)
            .then((res)=>{
                this.setState({categoryFoods:res.data})
            })
            .catch((err)=>{
                console.log(err)
            })

            //get Accessoris
            Axios.get(`${API_URL}/products?_expand=category&categoryId=3`)
            .then((res)=>{
                this.setState({categoryAccessoris:res.data})
            })
            .catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    renderAnimals=()=>{
        if(this.state.categoryAnimals.length>0){
            return this.state.categoryAnimals.map((val)=>{
                return(
                    <>
                        <Fade bottom>
                        <div className="col-md-3" style={{marginTop:"4%"}}>
                            <Card>
                                <CardImg top width="100%" height="100%" src={val.image} alt="Card image cap" />
                                <div className="blackBox d-flex justify-content-center">
                                    <Link to={`/productdetail/${val.id}`} className="insideButton">
                                        <button className="buyNowButton px-5 py-2 btn-sm" style={{marginTop:"140%"}}><div style={{color:"white"}}><MDBIcon icon="cart-plus"/></div></button>
                                    </Link>
                                </div>
                                <CardBody>
                                <CardTitle>{ val.name }</CardTitle>
                                <CardSubtitle>{ `Rp.`+ Numeral(val.price).format(0,0)}</CardSubtitle>
                                <Button className="rounded-pill btn-sm" color="brown"><a href={`/productdetail/${val.id}`} style={{color:"white"}}>View Product</a></Button>
                                </CardBody>
                            </Card>
                        </div>
                        </Fade>
                    </>
                )
            })
        }
        else{

        }
    }

    renderFoods=()=>{
        if(this.state.categoryFoods.length>0){
            return this.state.categoryFoods.map((val)=>{
                return(
                    <>
                        <Fade bottom>
                        <div className="col-md-3" style={{marginTop:"4%"}}>
                            <Card>
                                <CardImg top width="100%" height="100%" src={val.image} alt="Card image cap" />
                                <div className="blackBox d-flex justify-content-center">
                                    <Link to={`/productdetail/${val.id}`} className="insideButton">
                                        <button className="buyNowButton px-5 py-2 btn-sm" style={{marginTop:"140%"}}><div style={{color:"white"}}><MDBIcon icon="cart-plus"/></div></button>
                                    </Link>
                                </div>
                                <CardBody>
                                <CardTitle>{ val.name }</CardTitle>
                                <CardSubtitle>{ `Rp.`+ Numeral(val.price).format(0,0)}</CardSubtitle>
                                <Button className="rounded-pill btn-sm" color="brown"><a href={`/productdetail/${val.id}`} style={{color:"white"}}>View Product</a></Button>
                                </CardBody>
                            </Card>
                        </div>
                        </Fade>
                    </>
                )
            })
        }
        else{

        }
    }

    renderAccessoris=()=>{
        if(this.state.categoryAccessoris.length>0){
            return this.state.categoryAccessoris.map((val)=>{
                return(
                    <>
                        <Fade bottom>
                        <div className="col-md-3" style={{marginTop:"4%"}}>
                            <Card>
                                <CardImg top width="100%" height="100%" src={val.image} alt="Card image cap" />
                                <div className="blackBox d-flex justify-content-center">
                                    <Link to={`/productdetail/${val.id}`} className="insideButton">
                                        <button className="buyNowButton px-5 py-2 btn-sm" style={{marginTop:"140%"}}><div style={{color:"white"}}><MDBIcon icon="cart-plus"/></div></button>
                                    </Link>
                                </div>
                                <CardBody>
                                <CardTitle>{ val.name }</CardTitle>
                                <CardSubtitle>{ `Rp.`+ Numeral(val.price).format(0,0)}</CardSubtitle>
                                <Button className="rounded-pill btn-sm" color="brown"><a href={`/productdetail/${val.id}`} style={{color:"white"}}>View Product</a></Button>
                                </CardBody>
                            </Card>
                        </div>
                        </Fade>
                    </>
                )
            })
        }
        else{

        }
    }

    clickCategoryAnimals=()=>{
        this.setState({category:"Animals"})
    }

    clickCategoryFoods=()=>{
        this.setState({category:"Foods"})
    }

    clickCategoryAccessoris=()=>{
        this.setState({category:"Accessoris"})
    }

    clickCategoryAll=()=>{
        this.setState({category:''})
    }

    
    
    render() { 

        return (
            <>
                <div style={{marginTop:"120px"}}> 
                    <div className="row d-flex justify-content-center" style={{backgroundColor:"lightgrey"}}>
                        <div style={{paddingTop:"20px"}}>
                        <MDBCol md="12">
                        <form className="form-inline mt-4 mb-4">
                            <MDBIcon icon="search" />
                            <input onChange={this.searchOnChange} name="inputSearch" className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
                        </form>
                        </MDBCol>
                    </div>                        
                    </div>
                    <div className="row d-flex justify-content-center" style={{backgroundColor:"lightgrey", paddingBottom:"30px"}}>
                    <div style={{paddingTop:"10px"}}>
                        show by category:
                    </div>
                    <ButtonGroup>
                        <Button className="btn-sm rounded-pill" color="green" onClick={this.clickCategoryAnimals}>Animals</Button>
                        <Button className="btn-sm rounded-pill" color="green" onClick={this.clickCategoryFoods}>Foods</Button>
                        <Button className="btn-sm rounded-pill" color="green" onClick={this.clickCategoryAccessoris}>Accessoris</Button>
                        <Button className="btn-sm rounded-pill" color="green" onClick={this.clickCategoryAll}>All</Button>
                    </ButtonGroup>                       
                    </div>
                    <div className="row" style={{paddingBottom:"5%"}}>                   
                    {
                        this.state.category==="Animals"?this.renderAnimals()
                        :
                        this.state.category==="Foods"?this.renderFoods()
                        :
                        this.state.category==="Accessoris"?this.renderAccessoris()
                        :
                        this.renderProducts()
                    }
                        {/* {this.renderProducts()} */}
                    
                    </div>
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
export default connect(MapStateToProps, {cartCounter})(AllProducts);
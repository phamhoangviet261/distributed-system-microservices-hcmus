import React, {useEffect, useState, useCallback, useContext} from 'react';
import {actFetchProductsRequest, AddCart} from './actions';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {ShoppingCartOutlined} from '@material-ui/icons';
import axios from 'axios';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import {Link} from 'react-router-dom';
import Filter from './Filter';
import {FilterProductContext} from '../FilterProductContext';
import myUrl from '../domain';

const Container = styled.div`
    display: grid;
    margin-top: 50px;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    @media (max-width: 1024px) {
        grid-template-columns: repeat(3, minmax(300px, 1fr));
    }
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 425px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

const ProducAddtocart = styled.div`
    width: 80%;
    height: 40px;
    background-color: #fff;
    text-align: center;
    line-height: 40px;
    border-radius: 1.2em;

    transition: 0.3s ease-in-out;
    cursor: pointer;
    border: 1px solid #1f1f1f1f;
    margin-bottom: 20px;
    margin-left: 50%;
    transform: translateX(-50%);
    &:hover {
        color: #fff;
        background-color: #000;
    }
`;

const ProductItem = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 30px;
    overflow: hidden;
    position: relative;
    transition: 0.4s ease-out;
    cursor: pointer;
`;

const ProductImage = styled.img`
    width: 100%;
    height: auto;
    &:hover {
        #addToCart {
            background-color: red;
        }
    }
`;

const ProductTitle = styled.h5`
    color: #000;
    font-size: 18px;
    font-weight: 600;
    opacity: 0.7;
    margin-top: 10px;
`;

const ProductPrice = styled.span`
    color: #000;
    font-size: 16px;
    opacity: 0.7;
`;

//

const ProductWrapper = styled.div`
    // width: 1200px;
    height: auto;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-width: 1024px) {
        max-width: 80%;
        /* font-size: 12px; */
    }
    @media (max-width: 768px) {
        max-width: 80%;
        font-size: 12px;
    }
`;
const ProductWrapperTitle = styled.h2`
    text-transform: uppercase;
`;
const ProductFilterAndSearch = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
`;
const ListFilterProduct = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    align-items: center;
`;
const FilterProduct = styled.div`
    border-bottom: 2px solid #fff;
    &:hover {
        border-bottom: 2px solid rgb(99, 113, 198);
    }
`;

const ProductFilterButton = styled.div`
    margin-left: 350px;
    cursor: pointer;
    border: 1px solid #717fe0;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    border-radius: 10px;
    &:hover {
        background-color: #717fe0;
        color: #fff;
    }
    @media (max-width: 1024px) {
        margin-left: 100px;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 10px;
        border-radius: 10px;
    }
    @media (max-width: 768px) {
        margin-left: 10px;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 5px;
        max-height: 35px;
    }
`;
const ProductSearchButton = styled.div`
    cursor: pointer;
    border: 1px solid #717fe0;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 10px;
    &:hover {
        background-color: #717fe0;
        color: #fff;
    }
    @media (max-width: 1024px) {
        max-width: 80%;
        font-size: 12px;
    }
    @media (max-width: 768px) {
        max-width: 80%;
        font-size: 12px;
        max-height: 35px;
        padding-top: 5px;
        padding-bottom: 10px;
    }
`;

// OPTION FILTER
const OptionFilter = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    padding: 0px 50px;
    margin-top: 5px;
    height: auto;
    background-color: #f2f2f2;
    overflow: hidden;
    transition: 1.5s linear;
    & li {
        list-style-type: none;
    }
    & div {
        margin-top: 10px;
        margin-bottom: 10px;
    }
`;

const FilterLink = styled.li`
    color: #aaa;
    margin-top: 10px;
    font-size: 0.9rem;
    & > a {
        color: #aaa;
    }
    & a:hover {
        color: #717fe0;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #000;
    border-bottom: 2px solid transparent;
    &:hover {
        /* border: 2px solid rgb(99,113,198); */
    }
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
        color: #000;
    }
`;

const WrapItem = styled.div`
    display: flex;
    flex-direction: column;
    alignitems: center;
    border: 2px solid #efefef;
    border-radius: 10px;
    margin-bottom: 20px;
    transition: 0.2s all linear;
    -webkit-box-shadow: -7px 8px 13px 5px rgba(0, 0, 0, 0.35);
    box-shadow: -7px 8px 13px 5px rgba(0, 0, 0, 0.35);
    &:hover {
        opacity: 0.9;
        color: blue;
        transform: translateY(-10px);
    }
`;

const Highlight = styled.span`
    font-weight: 600;
    padding-left: 8px;
`;

export const Products = (props) => {
    const [_products, setProducts] = useState([]); // use this list to filter
    const [products, setproducts] = useState([]); // use this list to get all product for other filter

    const filterProductContext = useContext(FilterProductContext);

    // console.log('filterContext: ', filterProductContext);

    const [quantity, setquantity] = useState(1);

    const numPerPage = 50;

    useEffect(() => {
        let header = document.getElementById('header');
        document.onscroll = () => {
            const y = window.scrollY;
            if (y > 100) {
                header.classList.add('changeHeaderColor');
            } else {
                header.classList.remove('changeHeaderColor');
            }
        };
    }, []);

    useEffect(() => {
        setProducts(filterProductContext.list);
        // console.log('useEffect re-assign');
    }, [filterProductContext.count]);

    // console.log('re-render Product component');
    useEffect(() => {
        let API_URL;
        let isMounted = true;
        if (props.typeQuery === 'store') {
            if (isMounted) setProducts(props.data);
            console.log('data:', props.data);
            if (isMounted) setproducts(props.data);
        } else {
            let method = 'GET';
            if (props.typeQuery === 'all') {
                API_URL = `${myUrl}/products/products`;
            } else if (props.typeQuery === 'many') {
                API_URL = `https://localhost:44352/api/product/many/${props.query}`;
            } else if (props.typeQuery === 'one') {
                API_URL = `https://localhost:44352/api/product/one/${props.query}`;
            }
            axios({
                method,
                url: API_URL,
                data: null
            })
                .catch((err) => {
                    console.log(err);
                })
                .then((res) => {
                    if (isMounted) {
                        setProducts(res.data.data);
                        setproducts(res.data.data);
                        filterProductContext.updateListProduct(res.data.data);
                        filterProductContext.updateListProductDefault(res.data.data);
                    }
                });
        }
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (_products && _products.length > 0) {
            filterProductContext.updateMaxPage(Math.ceil(_products.length / numPerPage));
        }
    }, [_products]);

    if (products && _products && _products.length > 0 && products.length > 0) {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <ProductWrapper>
                    <ProductWrapperTitle>SẢN PHẨM</ProductWrapperTitle>
                    {_products && _products.length > 0 && <Filter />}
                    <Container>
                        {_products.map((item, index) => {
                            if (index >= (filterProductContext.page - 1) * numPerPage && index < filterProductContext.page * numPerPage) {
                                return (
                                    <WrapItem key={item.id}>
                                        <StyledLink to={'/product/' + item.id}>
                                            <ProductItem key={item.id}>
                                                <ProductImage src={item.linkImg} alt="TEE" />
                                                <ProductTitle>{item.name}</ProductTitle>
                                                <ProductPrice>
                                                    Giá: <Highlight>{item.price} VNĐ</Highlight>
                                                </ProductPrice>
                                                <ProductPrice>
                                                    Đã bán: <Highlight>{item.sold}</Highlight>
                                                </ProductPrice>
                                                <ProductPrice>
                                                    Đánh giá: <Highlight>{item.rating}</Highlight>
                                                    <StarIcon style={{fontSize: '18px', transform: 'translateY(-1px)', color: '#dd9d0d', marginLeft: '2px'}}></StarIcon>
                                                </ProductPrice>
                                            </ProductItem>
                                        </StyledLink>

                                        <StyledLink style={{marginLeft: '30px'}} to={'/store/' + item.account_CH}>
                                            <p>
                                                Cửa hàng: <Highlight style={{marginLeft: '-8px'}}>{item.storeName || 'Cửa hàng Danh'}</Highlight>
                                            </p>
                                        </StyledLink>

                                        <ProducAddtocart
                                            onClick={() => {
                                                item['rest'] = quantity;
                                                return props.AddCart(item);
                                            }}
                                        >
                                            Thêm vào giỏ hàng
                                        </ProducAddtocart>
                                    </WrapItem>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </Container>
                </ProductWrapper>
            </div>
        );
    }
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <ProductWrapper>
                <ProductWrapperTitle>SẢN PHẨM</ProductWrapperTitle>
                <Filter />
            </ProductWrapper>
            <h2 style={{margin: '50px 0 50px 20px'}}>Không có sản phẩm</h2>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        _products: state._todoProduct
    };
};
function mapDispatchToProps(dispatch) {
    return {
        actFetchProductsRequest: () => dispatch(actFetchProductsRequest()),
        AddCart: (item) => dispatch(AddCart(item))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Products);

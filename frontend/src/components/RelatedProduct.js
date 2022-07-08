import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';
import {Link} from 'react-router-dom';
import myUrl from '../domain';

const Container = styled.div`
    display: grid;
    margin-top: 10px;
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
    margin-top: auto;
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
    flex: 1;
    .product-top {
        flex: 1;
    }
    .product-bottom {
        margin-top: auto;
        display: flex;
        flex-direction: column;
    }
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

const ProductWrapper = styled.div`
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

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #000;
    border-bottom: 2px solid transparent;
    display: flex;
    flex-direction: column;
    height: 100%;
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

    & > .store-name {
        font-size: 16px;

        flex: 1;
        margin-top: auto;
        padding: 0 30px;
        padding-bottom: 20px;
    }
`;

const Highlight = styled.span`
    font-weight: 600;
    padding-left: 8px;
`;

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

const RelatedProduct = (props) => {
    const [productId, setProductId] = useState(props.productId);
    // eslint-disable-next-line no-useless-constructor
    const [_products, setProducts] = useState([]);
    let API_URL;

    useEffect(() => {
        if (productId) {
            console.log('concac');
            let method = 'GET';
            API_URL = `${myUrl}/products/products/byType/${props.query}`;

            axios({
                method,
                url: API_URL,
                data: null
            })
                .catch((err) => {
                    // console.log(err);
                })
                .then((res) => {
                    let check = false;
                    for (const item of res.data.data) {
                        if (item.id === productId) check = true;
                    }
                    if (check) {
                        setProducts(shuffle(res.data.data.filter((product) => product.id !== productId)));
                    } else {
                        setProducts(shuffle(res.data.data));
                    }
                });
        }
    }, []);

    if (_products.length > 0) {
        return (
            <div style={{display: 'flex', flexDirection: 'column', maxWidth: '80%', margin: '-40px 0 40px 0'}}>
                <ProductWrapper>
                    <Container>
                        {_products.map((item, index) => {
                            if (index < 4) {
                                return (
                                    <WrapItem key={item.id}>
                                        <ProductItem key={item.id}>
                                            <StyledLink to={'/product/' + item.id}>
                                                <div className="product-top">
                                                    <ProductImage src={item.linkImg} alt="TEE" />
                                                    <ProductTitle>{item.name}</ProductTitle>
                                                </div>
                                                <div className="product-bottom">
                                                    <ProductPrice>
                                                        Giá: <Highlight>{item.price ? item.price.toLocaleString('en').replace(',', ' ') : ''} vnđ</Highlight>
                                                    </ProductPrice>
                                                    <ProductPrice>
                                                        Đã bán: <Highlight>{item.sold}</Highlight>
                                                    </ProductPrice>
                                                    <ProductPrice>
                                                        Đánh giá: <Highlight>{item.rating}</Highlight>
                                                        <StarIcon style={{fontSize: '18px', transform: 'translateY(-1px)', color: '#dd9d0d', marginLeft: '2px'}}></StarIcon>
                                                    </ProductPrice>
                                                    <StyledLink to={'/store/' + item.storeId}>
                                                        <ProductPrice>
                                                            Cửa hàng: <Highlight style={{marginLeft: '-8px'}}>{item.storeName || 'Cửa hàng Danh'}</Highlight>
                                                        </ProductPrice>
                                                    </StyledLink>
                                                </div>
                                            </StyledLink>
                                        </ProductItem>
                                    </WrapItem>
                                );
                            }
                        })}
                    </Container>
                </ProductWrapper>
            </div>
        );
    }

    return (
        <div className="row" style={{marginTop: '500px', marginBottom: '500px'}}>
            <h2>Loading...!</h2>
        </div>
    );
};
export default RelatedProduct;

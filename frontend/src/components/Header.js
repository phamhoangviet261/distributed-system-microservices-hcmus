import React, {useState, Component, useContext} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Badge} from '@material-ui/core';
// import { Search } from "@material-ui/icons";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';

const Container = styled.div`
    position: fixed;
    font-size: 16px;
    z-index: 10;
    display: flex;
    width: 100vw;
    height: 60px;
    padding: 20px;
    background-color: transparent;
    @media (max-width: 768px) {
        height: 60px;
        font-size: 12px;
    }
    @media (max-width: 425px) {
        height: 60px;
    }
`;

const Wrapper = styled.div`
    width: 100%;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 768px) {
    }
    @media (max-width: 425px) {
    }
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const BrandNameLeft = styled.div`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #44bbbb;
    border-bottom: 2px solid transparent;
    &:hover {
        border-bottom: 2px solid transparent !important;
    }
`;

const BrandNameRight = styled.div`
    text-align: center;
    font-size: 20px;
    margin-left: 10px;
    border-bottom: 2px solid transparent;
    &:hover {
        border-bottom: 2px solid transparent !important;
    }
`;

const Center = styled.div`
    display: flex;
    flex: 1;
    text-align: center;
    justify-content: flex-start;
    margin-left: 60px;
    & > a {
        margin-right: 40px;
    }
    @media (max-width: 768px) {
        display: none;
    }
`;

const Right = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    @media (max-width: 768px) {
    }
    @media (max-width: 425px) {
    }
`;

const MenuItem = styled.div`
    font-size: 16px;
    cursor: pointer;
    margin-left: 25px;
    padding: 0 10px;
    @media (max-width: 768px) {
    }
    @media (max-width: 425px) {
        display: none;
    }
`;

// change style Link
const StyledLink = styled(Link)`
    text-decoration: none;
    color: #fff;
    border-bottom: 2px solid transparent;
    &:hover {
        border-bottom: 2px solid #44bbbb;
        color: #44bbbb;
    }
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
`;

const LogoutItem = styled(Link)`
    margin-left: 25px;
    padding: 0 10px;
    text-decoration: none;
    color: #fff;
    border-bottom: 2px solid transparent;
    &:hover {
        border-bottom: 2px solid #44bbbb;
        color: #44bbbb;
    }
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
`;

const StyledMenuIcon = styled(MenuIcon)`
    display: none !important;
    margin-right: 10px;
    margin-bottom: 4px;
    @media (max-width: 768px) {
        display: block !important;
    }
`;

export class Header extends Component {
    constructor(props) {
        super(props);
        console.log('hehe:', this.props.numberCart);
        this.state = {
            linkToMyUser: localStorage.getItem('UDPTuser') ? `/about-me/${JSON.parse(localStorage.getItem('UDPTuser')).phoneNumber}` : ``,
            linkToMyOrder: localStorage.getItem('UDPTuser') ? `/myorder/${JSON.parse(localStorage.getItem('UDPTuser')).phoneNumber}` : ``,
            linkToNearest: localStorage.getItem('UDPTuser') ? `/nearest/${JSON.parse(localStorage.getItem('UDPTuser')).phoneNumber}` : ``,
            linkToMyStore: localStorage.getItem('UDPTuser') ? `/store/products` : ``,
            userInfo: JSON.parse(localStorage.getItem('UDPTuser')),
            isLogin: localStorage.getItem('UDPTisLogin')
        };
    }

    render() {
        return (
            <Container id="header">
                <Wrapper>
                    <StyledMenuIcon></StyledMenuIcon>
                    <StyledLink to="/">
                        <Left>
                            <BrandNameLeft>DICHOTHUE</BrandNameLeft>
                            <BrandNameRight id="brandNameRight">Market</BrandNameRight>
                        </Left>
                    </StyledLink>
                    <Center id="center">
                        <StyledLink to="/">Trang chủ</StyledLink>
                        <StyledLink to="/category/nsp001">Sản phẩm</StyledLink>
                        {this.state.isLogin && !this.state.userInfo.storeId && <StyledLink to="/store/register">Trở thành Người bán</StyledLink>}
                        {this.state.isLogin && this.state.userInfo.storeId && <StyledLink to={this.state.linkToMyStore}>Kênh người bán</StyledLink>}
                    </Center>
                    <Right>
                        {localStorage.getItem('UDPTisLogin') && (
                            <StyledLink to={this.state.linkToMyUser}>
                                <MenuItem style={{transform: 'translateY(0px)'}} className="menu-item">
                                    Xin chào, {this.state.userInfo.fullname}
                                </MenuItem>
                            </StyledLink>
                        )}
                        {!localStorage.getItem('UDPTisLogin') && (
                            <>
                                <StyledLink to="/signin">
                                    <MenuItem className="menu-item">Đăng nhập</MenuItem>
                                </StyledLink>
                                <StyledLink to="/signup">
                                    <MenuItem className="menu-item">Đăng ký</MenuItem>
                                </StyledLink>
                            </>
                        )}
                        {localStorage.getItem('UDPTisLogin') && (
                            <LogoutItem
                                className="menu-item"
                                onClick={() => {
                                    localStorage.clear();
                                    window.location.href = '/';
                                }}
                            >
                                Đăng xuất
                            </LogoutItem>
                        )}

                        <MenuItem>
                            <Link to={this.state.isLogin ? '/carts' : '/signin'}>
                                <Badge badgeContent={this.props.numberCart} color="primary">
                                    <ShoppingCartIcon id="shopping-icon" style={{color: '#fff'}}></ShoppingCartIcon>
                                </Badge>
                            </Link>
                        </MenuItem>
                    </Right>
                </Wrapper>
            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        numberCart: state._todoProduct.numberCart
    };
};
export default connect(mapStateToProps, null)(Header);

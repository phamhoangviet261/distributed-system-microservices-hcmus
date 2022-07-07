import React, {useEffect, useState, useContext} from 'react';
import {actFetchProductsRequest, AddCart} from './actions';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {ShoppingCartOutlined} from '@material-ui/icons';
import axios from 'axios';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import {Link} from 'react-router-dom';
import {FilterProductContext} from '../FilterProductContext';

const ProductFilterAndSearch = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
`;

const ProductFilterButton = styled.div`
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
    grid-template-columns: repeat(2, 1fr);
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
    cursor: pointer;
    color: #aaa;
    width: 250px;
    padding: 10px;
    border: 2px solid ${(props) => (props.choosen ? 'palevioletred' : 'white')};
    border-radius: 10px;
    &:hover {
        color: #717fe0;
    }
`;

const SortBy = styled.div``;

const Price = styled.div``;

const Color = styled.div``;

const Tags = styled.div``;

const OptionSearch = styled.div``;

// SEARCH
const SearchBar = styled.div`
    width: 100%auto;
    height: 60px;
    /* background-color: #f2f2f2; */
    margin-top: 10px;
    display: flex;
    border: 1px solid #e6e6e6;
    & i {
        align-items: center;
        font-size: 16px;
        margin-top: 22px;
        margin-left: 22px;
    }
`;

const SearchInput = styled.input`
    width: 100%;
    align-items: center;
    border: none;
    outline: none;
    text-indent: 22px;
    /* background-color: #f2f2f2; */
`;

const Filter = () => {
    console.log('re-render Filter');
    const filterProductContext = useContext(FilterProductContext);
    const [search, setSearch] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [orderBy, setOrderBy] = useState('default');
    const [filterPrice, setFilterPrice] = useState('all');

    let handleSearch = () => {
        handleShowHide();
        let listProductDefault = filterProductContext.listDef;
        if (search !== '') {
            const result = listProductDefault.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
            if (result.length === 0) {
                filterProductContext.updateCount(filterProductContext.listDef);
                return;
            }
            filterProductContext.updateCount(result);
        }
    };

    useEffect(() => {
        let listProductDefault = filterProductContext.listDef;
        if (search === '') {
            filterProductContext.updateCount(listProductDefault);
        }
    }, [search]);

    useEffect(() => {
        let listProductDefault = filterProductContext.listDef;
        if (listProductDefault && listProductDefault.length > 0) {
            let ls = listProductDefault;
            if (filterPrice === 'all') {
            } else if (filterPrice === '1') {
                // 1000-50000
                console.log('rs:', ls);

                const result = ls.filter((item) => item.price >= 1000 && item.price < 50000);

                ls = result;
                console.log('ls', ls);
            } else if (filterPrice === '2') {
                // 50000-100000
                console.log('rs:', ls);

                const result = ls.filter((item) => item.price >= 50000 && item.price < 100000);

                ls = result;
                console.log('ls', ls);
            } else if (filterPrice === '3') {
                console.log('rs:', ls);

                // 100000-200000
                const result = ls.filter((item) => item.price >= 100000 && item.price < 200000);

                ls = result;
                console.log('ls', ls);
            } else if (filterPrice === '4') {
                console.log('rs:', ls);

                // 200000-500000
                const result = ls.filter((item) => item.price >= 200000 && item.price < 400000);

                ls = result;
                console.log('ls', ls);
            } else if (filterPrice === '5') {
                console.log('rs:', ls);
                //  > 500000
                const result = ls.filter((item) => item.price >= 400000);

                ls = result;
                console.log('ls', ls);
            }

            if (orderBy === 'default') {
            } else if (orderBy === 'vote') {
                ls.sort((a, b) => b.rating - a.rating);
                console.log('ls', ls);
            } else if (orderBy === 'newest') {
                ls.sort((a, b) => b.NSX - a.NSX);
                console.log('ls', ls);
            } else if (orderBy === 'lowtohigh') {
                ls.sort((a, b) => a.price - b.price);
                console.log('ls', ls);
            } else if (orderBy === 'hightolow') {
                ls.sort((a, b) => b.price - a.price);
                console.log('ls', ls);
            }
            filterProductContext.updateCount(ls);
        }
    }, [filterPrice, orderBy]);

    let handleShowHide = () => {
        let option = document.getElementById('option-filter');

        option.style.maxHeight = '0';
        // option.style.transitionTimingFunction = "cubic-bezier(0.46, 0.14, 0.93, 0.76)"
        return setShowFilter(false);
    };

    return (
        <React.Fragment>
            <ProductFilterAndSearch>
                <ProductFilterButton
                    onClick={() => {
                        let option = document.getElementById('option-filter');
                        if (showFilter === true) {
                            option.style.maxHeight = '0';
                            // option.style.transitionTimingFunction = "cubic-bezier(0.46, 0.14, 0.93, 0.76)"
                        } else {
                            option.style.maxHeight = '1000px';
                            // option.style.transitionTimingFunction ="cubic-bezier(0.18, 0.28, 0, 0.95)"
                        }
                        return setShowFilter(!showFilter);
                    }}
                >
                    <FilterListIcon></FilterListIcon>
                    Bộ lọc
                </ProductFilterButton>
                <ProductSearchButton onClick={() => handleSearch()}>
                    <SearchIcon></SearchIcon>
                    Tìm kiếm
                </ProductSearchButton>
            </ProductFilterAndSearch>
            <SearchBar>
                <i className="fas fa-search"></i>
                <SearchInput type="text" name="search" id="searchbar" placeholder="Tìm kiếm..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </SearchBar>
            <OptionFilter id="option-filter">
                <SortBy>
                    <div>Sắp xếp theo</div>
                    <ul>
                        <FilterLink choosen={orderBy === 'default' ? true : false} onClick={() => setOrderBy('default')}>
                            Mặc định
                        </FilterLink>
                        <FilterLink choosen={orderBy === 'popular' ? true : false} onClick={() => setOrderBy('popular')}>
                            Phổ biến
                        </FilterLink>
                        <FilterLink choosen={orderBy === 'vote' ? true : false} onClick={() => setOrderBy('vote')}>
                            Đánh giá
                        </FilterLink>
                        <FilterLink choosen={orderBy === 'newest' ? true : false} onClick={() => setOrderBy('newest')}>
                            Mới nhất
                        </FilterLink>
                        <FilterLink choosen={orderBy === 'lowtohigh' ? true : false} onClick={() => setOrderBy('lowtohigh')}>
                            Giá: Thấp đến Cao
                        </FilterLink>
                        <FilterLink choosen={orderBy === 'hightolow' ? true : false} onClick={() => setOrderBy('hightolow')}>
                            Giá: Cao đến Thấp
                        </FilterLink>
                    </ul>
                </SortBy>
                <Price>
                    <div>Giá</div>
                    <ul>
                        <FilterLink choosen={filterPrice === 'all' ? true : false} onClick={() => setFilterPrice('all')}>
                            Tất cả
                        </FilterLink>
                        <FilterLink choosen={filterPrice === '1' ? true : false} onClick={() => setFilterPrice('1')}>
                            1 000VND - 50 000VND
                        </FilterLink>
                        <FilterLink choosen={filterPrice === '2' ? true : false} onClick={() => setFilterPrice('2')}>
                            50 000VND - 100 000VND
                        </FilterLink>
                        <FilterLink choosen={filterPrice === '3' ? true : false} onClick={() => setFilterPrice('3')}>
                            100 000VND - 200 000VND
                        </FilterLink>
                        <FilterLink choosen={filterPrice === '4' ? true : false} onClick={() => setFilterPrice('4')}>
                            200 000VND - 400 000VND
                        </FilterLink>
                        <FilterLink choosen={filterPrice === '5' ? true : false} onClick={() => setFilterPrice('5')}>
                            400 000VND+
                        </FilterLink>
                    </ul>
                </Price>
            </OptionFilter>
            <OptionSearch></OptionSearch>
        </React.Fragment>
    );
};

export default Filter;

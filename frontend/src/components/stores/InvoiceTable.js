import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import axios from 'axios';
import myUrl from '../../domain';
import Location from '../store/location.json'
import styled from 'styled-components';


const Image = styled.img`
    width: 50px;
`

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  Location.data.forEach(item => {
    if (item.code == row.address.districtId){
        row.address.district = item.name;
        item.wards.forEach(item2 => {
            if (item2.code == row.address.wardId){
                row.address.ward = item2.name;
            }
        })
    }
  })

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.user.name}
        </TableCell>
        <TableCell align="left">{row.phoneNumber}</TableCell>
        <TableCell align="left">{row.address.detail}, {row.address.district}, {row.address.ward}</TableCell>
        <TableCell align="right">{row.total}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Chi Tiết Đơn Hàng
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell align="right">Số lượng</TableCell>
                    <TableCell align="right">Đơn giá</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.productsDetail.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        <Image src={item.data.linkImg} alt='product image'/>
                      </TableCell>
                      <TableCell>{item.data.name}</TableCell>
                      <TableCell align="right">{row.products[index].quantity}</TableCell>
                      <TableCell align="right">
                        {Math.round(item.data.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
    const [rows, setRows] = useState();
    const user = JSON.parse(window.localStorage.getItem("UDPTuser"));

    React.useEffect(()=>{
        axios({
            method: 'get',
            url: `${myUrl}/invoices/invoices/getInvoicesByStoreId/${user.storeId}`,
        })
            .then(function (res) {
                console.log("abcte" ,res);
                setRows(res.data.data)
            })
            .catch(function (err) {
                console.log(err);
            });
    }, [])
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Người mua</TableCell>
            <TableCell align="left">Số điện thoại</TableCell>
            <TableCell align="left">Địa chỉ</TableCell>
            <TableCell align="right">Tổng tiền</TableCell>
            <TableCell align="right">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows? rows.map((row) => (
            <Row key={row.name} row={row} />
          )):<div></div>}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

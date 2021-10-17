import React, { CSSProperties, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import Rating from 'react-rating';
import * as NumericInput from "react-numeric-input2";
import { Row, Col, Skeleton, Button } from 'antd';

import { addToCart, add } from "@redux/actions";
// import { useSelector } from "react-redux";
// import { RootState } from "@redux/reducers";
import { useAppDispatch } from "@redux/store";

const fetcher = (url: any) => axios.get(url);

export const ProductDetail: React.FC = () => {
  const card: CSSProperties = {
    backgroundColor: '#FCFCFC',
    borderRadius: '18px',
    padding: '21px 20px 27px',
  };

  const title: CSSProperties = {
    fontFamily: 'Boon-600',
    fontSize: '28px',
    color: '#707070',
    lineHeight: '36px',
    marginBottom: '10px',
  };

  const txtReview: CSSProperties = {
    fontFamily: 'Boon-400',
    padding: '3px 0 0 10px',
    color: '#A4A4A4',
    fontSize: '14px',
    lineHeight: '18px',
  };

  const description: CSSProperties = {
    fontFamily: 'Boon-400',
    color: '#939393',
    fontSize: '14px',
    lineHeight: '18px',
  };

  const txtPrice: CSSProperties = {
    color: '#FF6F61',
    fontSize: '28px',
    lineHeight: '36px',
    fontFamily: 'Boon-500'
  };

  const fullPrice: CSSProperties = {
    padding: '0 0 4px 10px',
    textDecoration: 'line-through',
    color: '#939393',
    fontSize: '14px',
    lineHeight: '22px',
    fontFamily: 'Boon-400',
  };

  const addCart: CSSProperties = {
    backgroundColor: '#FF6F61',
    borderRadius: '10px',
    width: 202,
    height: 48,
    fontSize: '14px',
    lineHeight: '18px',
    fontFamily: 'Boon-600'
  }

  // const productItem = useSelector(
  //   (state: RootState) => state.rootReducer.cart
  // );

  const dispatch = useAppDispatch();

  const [count, setCount] = useState(1);

  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(
    `https://cc-mock-api.herokuapp.com/product`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <div style={{ padding: '50px 0 100px', color: '#484848' }}>
        <Row wrap={false} style={card}>
          <Skeleton active paragraph={{ rows: 10 }} />
        </Row>
      </div>
    );

  console.log('data', data);

  var temp: any = data.data;
  let temp2: any, res: any;

  temp2 = temp.filter((e: any, index: number) => {
    return e._id == id;
  });

  console.log('temp2', temp2);
  if (temp2?.length == 0) {
    router.push('/');
  }

  res = temp2[0];
  console.log('res', res);

  return (
    <div style={{ padding: '50px 0 100px', color: '#484848' }}>
      <Row wrap={false} style={card}>
        <Col span={24}>
          <Row gutter={[20, 25]} wrap={false}>
            <Col flex="none">
              <div className="wrapper-image">
                <img
                  className="rounded-15 image-product big"
                  src={res?.image_url}
                  alt={res?.name}
                  title={res?.name}
                />
              </div>
            </Col>

            <Col flex="auto">
              <div style={title}>{res?.name}</div>
              <Row wrap={false}>
                <Col flex="none">
                  <Rating
                    initialRating={res?.review?.rating}
                    emptySymbol={
                      <img
                        src="/icons/star.svg"
                        className="icon"
                        style={{ width: '13.33px' }}
                      />
                    }
                    fullSymbol={
                      <img
                        src="/icons/star-full.svg"
                        className="icon"
                        style={{ width: '13.33px' }}
                      />
                    }
                    fractions={2}
                  />
                </Col>
                <Col style={txtReview}>{res?.review?.number} reviews</Col>
              </Row>

              <div style={{ margin: '15px 0' }}>
                {res?.description
                  .replace('มีคุณสมบัติ Move IQ ', 'มีคุณสมบัติ Move IQ \n')
                  .split('\n')
                  .map(function (item: any, key: any) {
                    return (
                      <span key={key} style={description}>
                        {item}
                        <br />
                      </span>
                    );
                  })}
              </div>

              <div
                style={{
                  fontFamily: 'Boon-500',
                  color: '#939393',
                  fontSize: '14px',
                  lineHeight: '18px',
                }}
              >
                Price
              </div>
              <Row align="bottom">
                <Col flex="none" style={txtPrice}>
                  <NumberFormat
                    value={res?.price}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'฿'}
                  />
                </Col>
                <Col flex="none" style={fullPrice}>
                  <NumberFormat
                    value={+res?.price + 500}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'฿'}
                  />
                </Col>
              </Row>
              <Row align="middle" style={{margin: '15px 0'}}>
                <span style={{marginRight: '40px', fontFamily: 'Boon-400'}}>Quantitiy:</span>
                <NumericInput
                  initValue={count}
                  value={count}
                  min={1}
                  precision={0}
                  mobile
                  pattern="[0-9]"

                  onChange={(value:number) => {
                    return setCount(value)
                  }}
                />
              </Row>

              <Button type="primary" icon={<img src="/icons/add-cart.svg" alt="add-cart" style={{margin:'-1px 5px 0 -5px'}} />} danger style={addCart} onClick={(event) => {
                dispatch(addToCart({...res, quantity: count}));
                dispatch(add(count))
              }}>ADD TO CART</Button>

              {/* <Button type="primary" onClick={(event) => {
                console.log(productItem);
              }}>ss</Button> */}

            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
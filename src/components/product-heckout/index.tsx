import React, { CSSProperties } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Link from 'next/link';
import NumberFormat from 'react-number-format';
import { Row, Col, Skeleton, Button } from 'antd';

import { useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';

const fetcher = (url: any) => axios.get(url);

export const ProductCheckout: React.FC = () => {
  const card: CSSProperties = {
    backgroundColor: '#FCFCFC',
    borderRadius: '18px',
    padding: '21px 20px 27px',
  };

  const txtPrice: CSSProperties = {
    color: '#FF6F61',
    fontSize: '28px',
    lineHeight: '36px',
    fontFamily: 'Boon-500',
  };

  const btnCheckout: CSSProperties = {
    backgroundColor: '#FF6F61',
    borderRadius: '10px',
    width: 295,
    height: 48,
    fontSize: '14px',
    lineHeight: '18px',
    fontFamily: 'Boon-600',
  };

  const txtTotal: CSSProperties = {
    fontFamily: 'Boon-500',
    fontSize: '20px',
    lineHeight: '26px',
    color: '#484848',
    marginBottom: '24px',
    marginRight: '10px',
  };

  const cart = useSelector((state: RootState) => state.rootReducer.cart);

  let sumItem = [];
  let totalItem = [];
  cart.forEach((e, index) => {
    let aPrice = +e.price * e.quantity;
    sumItem.push(aPrice);
    totalItem.push(e.quantity);
  });
  // console.log('sumItem', sumItem);

  let sumPrice: number = sumItem.reduce((a, b) => a + b, 0);
  let sumQuantity: number = totalItem.reduce((a, b) => a + b, 0);
  // console.log('sumPrice', sumPrice, 'sumItem', sumItem)

  const { data, error } = useSWR(
    `https://cc-mock-api.herokuapp.com/product`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <div style={{ padding: '50px 0 100px', color: '#484848' }}>
        <Row wrap={false} style={card}>
          <Skeleton active paragraph={{ rows: 5 }} />
        </Row>
      </div>
    );

  console.log('data', data);

  var temp: any = data.data;
  let res: any;

  res = temp[0];
  console.log('res', res);

  return (
    <div style={{ padding: '50px 0 100px', color: '#484848' }}>
      {/* <pre>{JSON.stringify(cart, null, 2)}</pre> */}

      <Row wrap={false} style={card}>
        <Col span={24}>
          <div
            style={{
              color: '#484848',
              fontSize: '28px',
              lineHeight: '36px',
              fontFamily: 'Boon-500',
            }}
          >
            Cart
          </div>
          <div className="cart">
            <div className="wrap-cart-header">
              <h4
                className="cart-header"
                style={{
                  maxWidth: '370px',
                  minWidth: '370px',
                }}
              >
                PRODUCT NAME
              </h4>
              <h4
                className="cart-header"
                style={{
                  textAlign: 'center',
                  maxWidth: '120px',
                  minWidth: '120px',
                }}
              >
                PRICE
              </h4>
              <h4
                className="cart-header"
                style={{
                  maxWidth: '120px',
                  minWidth: '120px',
                  textAlign: 'center',
                }}
              >
                QUANTITY
              </h4>
              <h4
                className="cart-header"
                style={{
                  maxWidth: '120px',
                  minWidth: '120px',
                  textAlign: 'right',
                }}
              >
                TOTAL
              </h4>
            </div>

            {cart.length === 0 ? (
              <p></p>
            ) : (
              cart.map((item) => (
                <div key={item._id} className="cart-body">
                  <p
                    style={{
                      maxWidth: '370px',
                      minWidth: '370px',
                    }}
                  >
                    <Link href={'/product/' + item._id} passHref>
                      <a>
                    <Row wrap={false} align="middle">
                      <Col flex="none">
                        <div className="wrapper-image">
                          <img
                            className="rounded-10 image-product small"
                            src={item?.image_url}
                            alt={item?.name}
                            title={item?.name}
                          />
                        </div>
                      </Col>
                      <Col
                        flex="none"
                        style={{
                          paddingLeft: '10px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '320px',
                        }}
                      >
                        {item.name}
                      </Col>
                    </Row>
                    </a>
                    </Link>
                  </p>
                  <p
                    style={{
                      textAlign: 'center',
                      maxWidth: '120px',
                      minWidth: '120px',
                    }}
                  >
                    <NumberFormat
                      value={item.price}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'฿'}
                    />
                  </p>
                  <p
                    style={{
                      maxWidth: '120px',
                      minWidth: '120px',
                      textAlign: 'center',
                    }}
                  >
                    <NumberFormat
                      value={item.quantity}
                      displayType={'text'}
                      thousandSeparator={true}
                    />
                  </p>
                  <p
                    style={{
                      maxWidth: '120px',
                      minWidth: '120px',
                      textAlign: 'right',
                    }}
                  >
                    <NumberFormat
                      value={item.price * item.quantity}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'฿'}
                    />
                  </p>
                </div>
              ))
            )}
          </div>

          <Row align="middle" justify="end" style={{ margin: '40px 0 15px' }}>
            <Col flex="none">
              <span style={txtTotal}>Subtotal ({sumQuantity} Product):</span>
            </Col>
            <Col flex="none" style={txtPrice}>
              <NumberFormat
                value={sumPrice}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'฿'}
              />
            </Col>
          </Row>
          <Row align="middle" justify="end">
            <Button type="primary" danger style={btnCheckout}>
              Proceed to Check out
            </Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

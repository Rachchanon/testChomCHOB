import React, { CSSProperties } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Link from 'next/link';
import NumberFormat from 'react-number-format';
import Rating from 'react-rating';
import { Row, Col, Skeleton } from 'antd';

const fetcher = (url: any) => axios.get(url);

export const ProductLists: React.FC = () => {
  const gutterRow: CSSProperties = {
    padding: '0 11px',
  };

  const card: CSSProperties = {
    backgroundColor: '#FCFCFC',
    borderRadius: '15px',
    minHeight: '275px',
  };

  const logoBrand: CSSProperties = {
    overflow: 'hidden',
    width: '40px',
    height: '40px',
    marginRight: '10px',
  };

  const productDetail: CSSProperties = {
    padding: '10px 15px 18px',
  };

  const productTitle: CSSProperties = {
    color: '#484848',
    fontSize: '14px',
    lineHeight: '18px',
    fontFamily: 'Boon-600',
    marginBottom: '20px',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minHeight: '36px',
  };

  const productEtc: CSSProperties = {
    color: '#939393',
    fontSize: '12px',
    lineHeight: '14px',
    fontFamily: 'Boon-400',
  };

  const txtPrice: CSSProperties = {
    color: '#FF6F61',
    fontSize: '14px',
    lineHeight: '18px',
    fontFamily: 'Boon-500',
    fontWeight: 500,
  };

  const { data, error } = useSWR(
    `https://cc-mock-api.herokuapp.com/product`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <div style={{ padding: '50px 0 100px' }}>
        <Skeleton active paragraph={{ rows: 20 }} />
      </div>
    );

  let res: any = data.data;
  console.log('res', res);

  return (
    <div style={{ padding: '50px 0 100px', color: '#484848' }}>
      <div
        style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '24px' }}
      >
        products: ({res.length})
      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      <Row gutter={[22, 25]}>
        {res.map((item: any, index: any) => {
          return (
            <Col span={6} key={index} style={gutterRow}>
              <Link href={'/product/' + item._id} passHref>
                <a>
                  <div style={card}>
                    <div className="rounded-15 wrapper-image">
                      <img
                        className="image-product"
                        src={item.image_url}
                        alt={item.name}
                        title={item.name}
                      />
                    </div>
                    <Row wrap={false} style={productDetail}>
                      <Col flex="none" style={logoBrand}>
                        <div className="wrapper-image">
                          <img
                            className="rounded-10 image-brand"
                            src={item.brand_info.url}
                            alt={item.brand_info.name}
                            title={item.brand_info.name}
                          />
                        </div>
                      </Col>
                      <Col flex="auto">
                        <span style={productTitle}>
                          {item.name
                            .replace(
                              'THE MODERNIST 34MM ',
                              'THE MODERNIST 34MM\n'
                            )
                            .replace(
                              'GOLD-TONE STAINLESS ',
                              'GOLD-TONE STAINLESS\n'
                            )
                            .split('\n')
                            .map(function (item: any, key: any) {
                              return (
                                <span key={key}>
                                  {item}
                                  <br />
                                </span>
                              );
                            })}
                          {/* {item.name.replace(/([^\n]{1,32})\s/g, '[$1]\n')} */}
                        </span>

                        <Row wrap={false} style={productEtc}>
                          <Col
                            flex="auto"
                            style={{ minWidth: '75px', maxWidth: '75px' }}
                          >
                            <div>price</div>
                            <div style={txtPrice}>
                              <NumberFormat
                                value={item.price}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'฿'}
                              />
                            </div>
                          </Col>
                          <Col flex="auto">
                            <div>Reviews ({item.review.number} reviews)</div>
                            <div>
                              <Rating
                                initialRating={item.review.rating}
                                emptySymbol={
                                  <img src="/icons/star.svg" className="icon" />
                                }
                                fullSymbol={
                                  <img
                                    src="/icons/star-full.svg"
                                    className="icon"
                                  />
                                }
                                fractions={2}
                                readonly={true}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </a>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

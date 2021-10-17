import React, { CSSProperties } from 'react';
import { Row, Col, Space, Badge } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

import { useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';

import { Container, Logo } from '@components';

export const Header: React.FC = () => {
  const navMenu: CSSProperties = {
    fontSize: 16,
    color: '#F9F9F9',
    margin: '0 30px',
  };

  const cartMenu: CSSProperties = {
    fontSize: 12,
    color: '#F9F9F9',
    margin: '0 0 0 5px',
  };

  const count = useSelector(
    (state: RootState) => state.rootReducer.counter.count
  );

  return (
    <header
      style={{
        backgroundColor: '#FF6F61',
        height: '76px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Container>
        <Row wrap={false}>
          <Col flex="none" layout="row" layout-align="center center">
            <Link href="/" passHref>
              <a>
                <Logo />
              </a>
            </Link>
          </Col>
          <Col
            flex="auto"
            layout="row"
            layout-align="center center"
            hide-xs="true"
          >
            <Row justify="center" align="middle">
              <Space align="center" size="middle">
                <Link href="/" passHref>
                  <a style={navMenu}>Home</a>
                </Link>
                <a style={navMenu}>New Products</a>
                <a style={navMenu}>Women</a>
                <a style={navMenu}>Men</a>
                <a style={navMenu}>Kid</a>
                <a style={navMenu}>Accessories</a>
              </Space>
            </Row>
          </Col>
          <Col flex="none" layout="row" layout-align="center center">
            <Link href="/checkout" passHref>
              <a layout="row" layout-align="center center">
                <Col flex="none">
                  <Image
                    src="/icons/cart.svg"
                    alt="cart"
                    width="24"
                    height="24"
                  />
                  <Badge
                    showZero={true}
                    count={count}
                    style={{ margin: '-11px 0 0 -10px' }}
                  />
                </Col>
                <Col
                  flex="none"
                  layout="row"
                  layout-align="center center"
                  style={cartMenu}
                >
                  cart
                </Col>
              </a>
            </Link>
          </Col>
        </Row>
      </Container>
    </header>
  );
};
